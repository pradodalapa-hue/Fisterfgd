
(function() {
    "use strict";

    class Snapshot {
        constructor(value) {
            this._value = value;
        }
        val() {
            return this._value;
        }
    }

    class Reference {
        constructor(path, db) {
            this.path = path;
            this.db = db;
        }

        on(eventType, callback) {
            if (eventType === 'value') {
                if (!this.db.listeners[this.path]) {
                    this.db.listeners[this.path] = [];
                }
                this.db.listeners[this.path].push(callback);
                
                // Solicita o valor atual ao se registrar
                this.db.send({ type: 'SUBSCRIBE', path: this.path });
            }
        }

        set(value) {
            this.db.send({ type: 'SET', path: this.path, value: value });
        }

        transaction(updateFn, onComplete) {
            // Solicita uma transação segura ao servidor
            this.db.send({ type: 'TRANSACTION_REQUEST', path: this.path });
            
            // Registra um handler temporário para executar a transação assim que o valor atual chegar
            const self = this;
            this.db.tempTransactionHandler = function(currentValue) {
                const newValue = updateFn(currentValue);
                self.set(newValue);
                if (onComplete) {
                    onComplete(null, true, new Snapshot(newValue));
                }
            };
        }
    }

    class MockDatabase {
        constructor(databaseURL) {
            this.url = databaseURL;
            this.listeners = {};
            this.queue = [];
            this.tempTransactionHandler = null;
            this.connect();
        }

        connect() {
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                console.log("[HELENA-DB] Canal de comunicação estabelecido.");
                while (this.queue.length > 0) {
                    this.socket.send(this.queue.shift());
                }
            };

            this.socket.onmessage = (event) => {
                try {
                    const packet = JSON.parse(event.data);
                    
                    if (packet.type === 'SYNC' && this.listeners[packet.path]) {
                        const snap = new Snapshot(packet.value);
                        this.listeners[packet.path].forEach(callback => callback(snap));
                    }

                    if (packet.type === 'TRANSACTION_VAL' && this.tempTransactionHandler) {
                        this.tempTransactionHandler(packet.value);
                        this.tempTransactionHandler = null; // Limpa após executar
                    }
                } catch (e) {
                    console.error("[HELENA-DB] Erro ao decodificar frame de rede: ", e);
                }
            };

            this.socket.onclose = () => {
                console.log("[HELENA-DB] Conexão encerrada. Reconectando em 3s...");
                setTimeout(() => this.connect(), 3000);
            };
        }

        send(data) {
            const payload = JSON.stringify(data);
            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(payload);
            } else {
                this.queue.push(payload);
            }
        }

        ref(path) {
            return new Reference(path, this);
        }
    }

    // Expõe a API idêntica ao Firebase Compat para o JDP OS
    window.firebase = {
        initializeApp: function(config) {
            this._db = new MockDatabase(config.databaseURL);
            console.log("[HELENA-DB] Inicializado com sucesso.");
            return this;
        },
        database: function() {
            return this._db;
        }
    };
})();
