
(function() {
    "use strict";

    console.log("%c[HELENA ENGINE]: Inicializando conexões soberanas com jdpsistemas.com.br...", "color: #06b6d4; font-weight: bold;");

    class Snapshot {
        constructor(value) {
            this._value = value;
        }
        val() {
            return this._value;
        }
        exists() {
            return this._value !== null && this._value !== undefined;
        }
    }

    class Reference {
        constructor(path, db) {
            this.path = path.replace(/^\/|\/$/g, ''); // Normaliza barras
            this.db = db;
        }

        child(subPath) {
            return new Reference(this.path + '/' + subPath.replace(/^\/|\/$/g, ''), this.db);
        }

        once(eventType) {
            return new Promise((resolve) => {
                if (eventType === 'value') {
                    const reqId = Math.random().toString(36).substring(2, 15);
                    this.db.pendingRequests[reqId] = (data) => {
                        resolve(new Snapshot(data));
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

        off(eventType) {
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

        transaction(updateFn, onComplete) {
            this.once('value').then(snap => {
                const currentVal = snap.val();
                const newVal = updateFn(currentVal);
                this.set(newVal).then(() => {
                    if (onComplete) {
                        onComplete(null, true, new Snapshot(newVal));
                    }
                });
            });
        }
    }

    class MockDatabase {
        constructor(databaseURL) {
            // Se nenhuma URL for passada, conecta automaticamente via SSL seguro no seu domínio
            this.url = databaseURL || "wss://jdpsistemas.com.br";
            this.listeners = {};
            this.pendingRequests = {};
            this.queue = [];
            this.connect();
        }

        connect() {
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                console.log("[HELENA-DB]: Canal de comunicação seguro estabelecido.");
                
                // Descarrega o buffer de operações offline
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
                            const snap = new Snapshot(packet.value);
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
                console.log("[HELENA-DB] Conexão encerrada pelo host. Reconectando em 3s...");
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
                this.queue.push(data); // Armazena em cache offline se o celular perder o sinal
            }
        }

        ref(path) {
            return new Reference(path, this);
        }
    }

    // Define o objeto global exatamente igual ao Firebase para manter compatibilidade absoluta
    window.firebase = {
        initializeApp: function(config) {
            this._db = new MockDatabase(config.databaseURL);
            return this;
        },
        database: function() {
            return this._db;
        }
    };
})();
