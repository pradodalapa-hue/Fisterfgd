const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const http = require('http');

// CONFIGURAÇÕES DO SR. JOSÉ DIVINO PRADO DA LAPA - GOLD CAR WASH
const LINK_APP = "https://pradodalapa-hue.github.io/GOLD_CAR_WASHapp/";
const LINK_STATUS = "https://pradodalapa-hue.github.io/Leocardios_burguers_status/";

let qrCodeDataURL = null;
let statusConexao = "Iniciando motor...";

// SERVIDOR WEB VISUAL - HELENA CORE
const PORT = process.env.PORT || 10000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    let html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Painel Helena Core - Gold Car Wash</title>
        <style>
            body { background: #020617; color: #06b6d4; font-family: monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .box { border: 2px solid #06b6d4; padding: 25px; border-radius: 12px; background: #090d16; text-align: center; box-shadow: 0 0 20px rgba(6,182,212,0.2); max-width: 90%; }
            h1 { color: #fde047; font-size: 1.3rem; margin-bottom: 5px; }
            p { font-size: 0.9rem; color: #94a3b8; }
            img { margin-top: 15px; border-radius: 8px; border: 4px solid #fff; max-width: 250px; }
            .online { color: #22c55e; font-weight: bold; font-size: 1.2rem; }
        </style>
    </head>
    <body>
        <div class="box">
            <h1>SISTEMA HELENA - GOLD CAR WASH 🚘</h1>
            <p>Engenharia: <b>Sr. José Divino Prado da Lapa</b></p>
            <hr style="border-color:#1e293b;">
    `;

    if (statusConexao === "CONECTADO") {
        html += `<div class="online">● BOT GOLD CAR WASH CONECTADO E PRONTO 24H!</div>`;
    } else if (qrCodeDataURL) {
        html += `
            <p>Aponte a câmera do WhatsApp comercial para conectar:</p>
            <img src="${qrCodeDataURL}" alt="QR Code WhatsApp" />
            <p><small>Atualize a página se o QR Code expirar.</small></p>
        `;
    } else {
        html += `<p>Status atual: <b>${statusConexao}</b></p><p>Aguarde gerando QR Code...</p>`;
    }

    html += `</div></body></html>`;
    res.end(html);
}).listen(PORT, () => {
    console.log(`[HELENA] Servidor HTTP operando na porta ${PORT}`);
});

async function iniciarBot() {
    statusConexao = "Buscando versão do WhatsApp...";
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState('./sessao_auth_gold');

    const sock = makeWASocket({
        version,
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ["Helena Core (Gold Car Wash)", "Chrome", "1.0.0"]
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            const QRCode = require('qrcode');
            qrCodeDataURL = await QRCode.toDataURL(qr);
            statusConexao = "QR Code pronto no navegador";
            console.log("[HELENA] NOVO QR CODE GERADO COM SUCESSO! Acesse o link no Render.");
        }

        if (connection === 'close') {
            const statusCode = (lastDisconnect?.error)?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            statusConexao = `Desconectado (Código: ${statusCode}). Reconectando...`;
            console.log(`[HELENA] Conexão encerrada (${statusCode}). Reconexão: ${shouldReconnect}`);
            
            if (shouldReconnect) {
                setTimeout(iniciarBot, 5000);
            }
        } else if (connection === 'open') {
            statusConexao = "CONECTADO";
            qrCodeDataURL = null;
            console.log("==================================================");
            console.log("BOT GOLD CAR WASH ONLINE E CONECTADO COM SUCESSO!");
            console.log("==================================================");
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // ESCUTA E DISPARO DE MENSAGENS EM ALTA VELOCIDADE
    sock.ev.on('messages.upsert', async (m) => {
        try {
            const msg = m.messages[0];
            if (!msg.message || msg.key.fromMe || msg.key.remoteJid.includes('@g.us')) return;

            const remetente = msg.key.remoteJid;
            const textoCorpo = (
                msg.message.conversation ||
                msg.message.extendedTextMessage?.text ||
                ""
            ).trim().toLowerCase();

            if (!textoCorpo) return;

            // Palavras-chave ampliadas para o Lava-Jato
            const keywords = ['oi', 'olá', 'boa noite', 'bom dia', 'boa tarde', 'lavagem', 'lavar', 'carro', 'moto', 'tabela', 'preço', 'app', 'menu'];

            if (keywords.includes(textoCorpo)) {
                const menu = `🚘 *GOLD CAR WASH* 🏍\n\n` +
                    `Bem-vindo! Escolha uma opção:\n\n` +
                    `1️⃣ *Acompanhar minha lavagem*\n` +
                    `2️⃣ *Acessar nosso App*\n` +
                    `3️⃣ *Falar com atendente*\n\n` +
                    `_Responda com o número da opção._`;

                await sock.sendMessage(remetente, { text: menu });
            } 
            else if (textoCorpo === '1') {
                await sock.sendMessage(remetente, { text: `🚀 *Status da Lavagem*\n\nAcompanhe o andamento do seu veículo em tempo real:\n${LINK_STATUS}` });
            } 
            else if (textoCorpo === '2') {
                await sock.sendMessage(remetente, { text: `📱 *Nosso Aplicativo*\n\nAgende e confira os serviços pelo app:\n${LINK_APP}` });
            } 
            else if (textoCorpo === '3') {
                await sock.sendMessage(remetente, { text: `📞 *Atendimento Humano*\n\nAguarde um instante, nossa equipe já vai te responder!` });
            }
        } catch (e) {
            console.error('[ERRO MSG]:', e.message);
        }
    });
}

iniciarBot();
