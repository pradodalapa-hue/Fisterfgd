
(function() {
    "use strict";

    console.log("%c[HELENA CORE]: Inicializando motor soberano de rede em jdpsistemas.com.br...", "color: #06b6d4; font-weight: bold;");

    // Algoritmo de geração de ID único cronológico (evita colisões de rede)
    const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    let lastPushTime = 0;
    let lastRandChars = [];

    function generatePushId() {
        let now = new Date().getTime();
        let duplicateTime = (now === lastPushTime);
        lastPushTime = now;
        let timeStampChars = new Array(8);
        for (let i = 7; i >= 0; i--) {
            timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
            now = Math.floor(now / 64);
        }
        let id = timeStampChars.join('');
        if (!duplicateTime) {
            for (let i = 0; i < 12; i++) {
                lastRandChars[i] = Math.floor(Math.random() * 64);
            }
        } else {
            let i;
            for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
                lastRandChars[i] = 0;
            }
            lastRandChars[i]++;
        }
        for (let i = 0; i < 12; i++) {
            id += PUSH_CHARS.charAt(lastRandChars[i]);
        }
        return id;
    }

    class Snapshot {
        constructor(value, key) {
            this._value = value;
            this.key = key;
        }
        val() {
            return this._value;
        }
        exists() {
            return this._value !== null && this._value !== undefined;
        }
        forEach(callback) {
            if (this._value && typeof this._value === 'object') {
                Object.keys(this._value).forEach(k => {
                    callback(new Snapshot(this._value[k], k));
                });
            }
        }
    }

    class Reference {
        constructor(path, db) {
            this.path = path.replace(/^\/|\/$/g, ''); 
            this.db = db;
        }

        get key() {
            return this.path.split('/').pop() || null;
        }

        child(subPath) {
            const cleanSub = subPath.replace(/^\/|\/$/g, '');
            return new Reference(this.path ? `${this.path}/${cleanSub}` : cleanSub, this.db);
        }

        once(eventType) {
            return new Promise((resolve) => {
                if (eventType === 'value') {
                    const reqId = Math.random().toString(36).substring(2, 15);
                    this.db.pendingRequests[reqId] = (data) => {
                        resolve(new Snapshot(data, this.key));
                    };
                    this.db.send({
                        action: 'ONCE',
                        path: this.path,
                        reqId: reqId
                    });
                }
            });
        }

        on(eventType, callback) {
            if (eventType === 'value') {
                if (!this.db.listeners[this.path]) {
                    this.db.listeners[this.path] = [];
                }
                this.db.listeners[this.path].push(callback);
                this.db.send({
                    action: 'SUBSCRIBE',
                    path: this.path
                });
            }
        }

        off() {
            this.db.send({
                action: 'UNSUBSCRIBE',
                path: this.path
            });
            delete this.db.listeners[this.path];
        }

        set(value) {
            return new Promise((resolve) => {
                this.db.send({
                    action: 'SET',
                    path: this.path,
                    value: value
                });
                resolve();
            });
        }

        remove() {
            return this.set(null);
        }

        push(value) {
            const newKey = generatePushId();
            const newRef = this.child(newKey);
            if (value !== undefined) {
                newRef.set(value);
            }
            return newRef;
        }

        transaction(updateFn, onComplete) {
            this.once('value').then(snap => {
                const currentVal = snap.val();
                const newVal = updateFn(currentVal);
                this.set(newVal).then(() => {
                    if (onComplete) {
                        onComplete(null, true, new Snapshot(newVal, this.key));
                    }
                });
            });
        }
    }

    class HelenaDatabase {
        constructor(databaseURL) {
            // Conexão direta ao barramento WSS seguro em jdpsistemas.com.br
            this.url = databaseURL || "wss://jdpsistemas.com.br";
            this.listeners = {};
            this.pendingRequests = {};
            this.queue = [];
            this.connect();
        }

        connect() {
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                console.log("[HELENA-DB]: Conexão estabelecida com jdpsistemas.com.br.");
                
                // Descarrega o buffer de dados pendentes acumulados offline
                while (this.queue.length > 0) {
                    this.socket.send(JSON.stringify(this.queue.shift()));
                }

                if (window.onHelenaStatusChange) {
                    window.onHelenaStatusChange(true);
                }
            };

            this.socket.onmessage = (event) => {
                try {
                    const packet = JSON.parse(event.data);
                    
                    if (packet.action === 'SYNC') {
                        const path = packet.path;
                        if (this.listeners[path]) {
                            const snap = new Snapshot(packet.value, path.split('/').pop());
                            this.listeners[path].forEach(callback => callback(snap));
                        }
                    }

                    if (packet.action === 'ONCE_RESPONSE') {
                        const reqId = packet.reqId;
                        if (this.pendingRequests[reqId]) {
                            this.pendingRequests[reqId](packet.value);
                            delete this.pendingRequests[reqId];
                        }
                    }
                } catch (e) {
                    console.error("[HELENA-DB] Erro de processamento de frame: ", e);
                }
            };

            this.socket.onclose = () => {
                console.log("[HELENA-DB] Conexão encerrada. Reconectando em 3s...");
                if (window.onHelenaStatusChange) {
                    window.onHelenaStatusChange(false);
                }
                setTimeout(() => this.connect(), 3000);
            };
        }

        send(data) {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify(data));
            } else {
                this.queue.push(data); // Buffer de segurança offline
            }
        }

        ref(path) {
            return new Reference(path || "", this);
        }
    }

    // Exportação da API Unificada
    window.firebase = {
        initializeApp: function(config) {
            this._db = new HelenaDatabase(config.databaseURL);
            return this;
        },
        database: function() {
            return this._db;
        }
    };
})();
