const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const http = require('http');

const LINK_CARDAPIO = "https://pradodalapa-hue.github.io/Jdp-industrial-supreme-/";
const LINK_STATUS = "https://pradodalapa-hue.github.io/Leocardios_burguers_status/";

let qrCodeDataURL = null;
let statusConexao = "Iniciando motor...";

// SERVIDOR WEB VISUAL - MOSTRA O QR CODE DIRETO NO NAVEGADOR
const PORT = process.env.PORT || 10000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    let html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Painel Helena Core - Bot Leocardio's</title>
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
            <h1>SISTEMA HELENA - LEOCARDIO'S</h1>
            <p>Engenharia: <b>Sr. José Divino Prado da Lapa</b></p>
            <hr style="border-color:#1e293b;">
    `;

    if (statusConexao === "CONECTADO") {
        html += `<div class="online">● BOT CONECTADO E PRONTO PARA ATENDIMENTO 24H!</div>`;
    } else if (qrCodeDataURL) {
        html += `
            <p>Aponte a câmera do WhatsApp para conectar:</p>
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
    const { state, saveCreds } = await useMultiFileAuthState('./sessao_auth');

    const sock = makeWASocket({
        version,
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ["Helena Core", "Chrome", "1.0.0"]
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            // Converte o QR Code para imagem visual na web
            const QRCode = require('qrcode');
            qrCodeDataURL = await QRCode.toDataURL(qr);
            statusConexao = "QR Code pronto no navegador";
            console.log("[HELENA] NOVO QR CODE GERADO COM SUCESSO! Veja no link do Render.");
        }

        if (connection === 'close') {
            const statusCode = (lastDisconnect?.error)?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            statusConexao = `Desconectado (Código: ${statusCode}). Reconectando...`;
            console.log(`[HELENA] Conexão encerrada (${statusCode}). Reconexão: ${shouldReconnect}`);
            
            // Delay anti-ban e anti-bloqueio de IP do Render (espera 5 segundos)
            if (shouldReconnect) {
                setTimeout(iniciarBot, 5000);
            }
        } else if (connection === 'open') {
            statusConexao = "CONECTADO";
            qrCodeDataURL = null;
            console.log("==================================================");
            console.log("BOT LEOCARDIO'S ONLINE E CONECTADO COM SUCESSO!");
            console.log("==================================================");
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // MENSAGENS E ATENDIMENTO INSTANTÂNEO
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

            const keywords = ['oi', 'olá', 'boa noite', 'bom dia', 'boa tarde', 'cardapio', 'cardápio', 'lanche', 'menu'];

            if (keywords.includes(textoCorpo)) {
                const menu = `🍔 *LEOCARDIO'S BURGUER'S* 🍔\n\n` +
                    `Bem-vindo! Escolha uma opção:\n\n` +
                    `1️⃣ *Acompanhar meu pedido*\n` +
                    `2️⃣ *Ver Cardápio*\n` +
                    `3️⃣ *Falar com atendente*\n\n` +
                    `_Responda com o número da opção._`;

                await sock.sendMessage(remetente, { text: menu });
            } 
            else if (textoCorpo === '1') {
                await sock.sendMessage(remetente, { text: `🚀 *Status do Pedido*\n\nAcompanhe em tempo real:\n${LINK_STATUS}` });
            } 
            else if (textoCorpo === '2') {
                await sock.sendMessage(remetente, { text: `🌐 *Cardápio Digital*\n\nVeja as opções aqui:\n${LINK_CARDAPIO}` });
            } 
            else if (textoCorpo === '3') {
                await sock.sendMessage(remetente, { text: `📞 *Atendimento Humano*\n\nAguarde um instante, um atendente já vai te responder!` });
            }
        } catch (e) {
            console.error('[ERRO MSG]:', e.message);
        }
    });
}

iniciarBot();
