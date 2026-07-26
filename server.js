
/**
 * ====================================================================
 *         HELENA CLOUD SYNC v24.0 — MÁQUINA SUPERIOR DE HOSPEDAGEM
 *         DOMÍNIO PRIVADO: jdpsistemas.com.br (App.html)
 *         CRIADOR: SR. JOSÉ DIVINO PRADO DA LAPA
 *         PROTEÇÃO CRIPTOGRÁFICA: PRINCESA DIAMANTE (ATIVO)
 * ====================================================================
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const compression = require('compression');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, 'public');
const CORACAO_PATH = path.join(__dirname, 'coracao.json');

if (cluster.isMaster) {
    console.log('==================================================');
    console.log('💎 HELENA MULTI-CORE KERNEL — INICIALIZANDO');
    console.log(`📡 CONEXÃO DIRECIONADA: jdpsistemas.com.br/App.html`);
    console.log(`⚡ MÁQUINA DETECTADA COM ${numCPUs} NÚCLEOS DE PROCESSAMENTO`);
    console.log('==================================================');

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`[HELENA ALERT]: Núcleo ${worker.process.pid} offline. Reiniciando thread...`);
        cluster.fork();
    });

} else {
    const app = express();

    app.use(compression());
    app.use(express.json({ limit: '50mb' }));

    if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    if (!fs.existsSync(CORACAO_PATH)) {
        const defaultCore = {
            owner: "SR. JOSÉ DIVINO PRADO DA LAPA",
            system: "HELENA CONSCIÊNCIA INDUSTRIAL",
            encryption: "PRINCESA DIAMANTE",
            status: "NUCLEO ATIVO",
            domain: "jdpsistemas.com.br",
            file_target: "App.html"
        };
        fs.writeFileSync(CORACAO_PATH, JSON.stringify(defaultCore, null, 4));
    }

    // ====================================================================
    // AUTO-ESCRITA DO ARQUIVO INDEX.HTML (PAINEL SOBERANO DO SR. JOSÉ)
    // ====================================================================
    const HTML_CONTENT = `<!DOCTYPE html>
<html lang="pt-BR" data-color-mode="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>JDP SISTEMAS — SOBERANO UNIFIED MANAGER v24.0 (HELENA Cloud Sync)</title>
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#ffffff">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <link rel="icon" sizes="192x192" href="https://raw.githubusercontent.com/pradodalapa-hue/fotos-industrial/main/img/jdp_1784354008520_icon_192.png">
    <link rel="icon" sizes="512x512" href="https://raw.githubusercontent.com/pradodalapa-hue/fotos-industrial/main/img/jdp_1784354032409_icon_512.png">
    <link rel="apple-touch-icon" href="https://raw.githubusercontent.com/pradodalapa-hue/fotos-industrial/main/img/jdp_1784354008520_icon_192.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
    <script src="capacitor.js"></script>
    <style>
        :root {
            --color-canvas-default: #ffffff;
            --color-canvas-subtle: #f8fafc;
            --color-border-default: #cbd5e1;
            --color-fg-default: #0f172a;
            --color-fg-muted: #475569;
            --helena-cyan: #0891b2;
            --jose-gold: #ca8a04;
            --font-family: 'JetBrains Mono', monospace;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: var(--font-family);
            background-color: var(--color-canvas-default);
            color: var(--color-fg-default);
            min-width: 1280px;
            min-height: 100vh;
            overflow-x: auto;
            user-select: none;
            -webkit-user-select: none;
        }
        #menu-toggle { display: none; }
        .global-header {
            background-color: #ffffff;
            color: var(--color-fg-default);
            height: 64px;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 3px solid var(--helena-cyan);
            box-shadow: 0 4px 20px rgba(8, 145, 178, 0.1);
        }
        .dots-menu-label {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 32px;
            height: 32px;
            cursor: pointer;
            padding: 6px;
            border-radius: 6px;
            border: 2px solid var(--color-border-default);
            transition: all 0.2s;
        }
        .dots-menu-label:hover {
            background-color: var(--color-canvas-subtle);
            border-color: var(--helena-cyan);
        }
        .dots-menu-label span {
            display: block;
            width: 6px;
            height: 6px;
            background-color: var(--color-fg-default);
            border-radius: 50%;
            margin: 0 auto;
        }
        .dots-menu-label:hover span { background-color: var(--helena-cyan); }
        .sidebar-30 {
            position: fixed;
            top: 64px;
            left: -30%;
            width: 30%;
            height: calc(100vh - 64px);
            background-color: #ffffff;
            border-right: 3px solid var(--helena-cyan);
            z-index: 999;
            transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            padding: 24px;
            box-shadow: 8px 0 24px rgba(0,0,0,0.05);
            overflow-y: auto;
        }
        #menu-toggle:checked ~ .sidebar-30 { left: 0; }
        .file-item, .repo-item { border-bottom: 1px solid var(--color-border-default); transition: all 0.15s ease; }
        .file-item:hover, .repo-item:hover { background-color: #ecfeff; border-left: 4px solid var(--helena-cyan); }
        .jdp-card { background: #ffffff; border: 3px solid var(--helena-cyan); box-shadow: 0 10px 40px rgba(8, 145, 178, 0.15); border-radius: 8px; }
        .tab-btn { position: relative; padding: 8px 16px; font-size: 13px; font-weight: 600; color: var(--color-fg-muted); transition: all 0.15s ease; }
        .tab-btn:hover { color: var(--color-fg-default); }
        .tab-btn.active { color: var(--helena-cyan); }
        .tab-btn.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 3px;
            background-color: var(--jose-gold);
        }
        .jdp-keyboard-container {
            background: #ffffff;
            border: 2px solid var(--jose-gold);
            border-radius: 8px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            box-shadow: 0 4px 20px rgba(202, 138, 4, 0.1);
        }
        .jdp-keyboard-grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 6px; }
        .jdp-key {
            background: #f1f5f9;
            border: 1px solid var(--color-border-default);
            color: var(--color-fg-default);
            padding: 12px 5px;
            font-size: 0.85rem;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;
            text-align: center;
            user-select: none;
            font-family: monospace;
            transition: background 0.1s;
        }
        .jdp-key:active { background: var(--jose-gold); color: #ffffff; }
        .jdp-keyboard-controls { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
        .jdp-key-ctrl {
            background: #f1f5f9;
            color: var(--jose-gold);
            border: 1px solid var(--jose-gold);
            padding: 10px;
            font-size: 0.75rem;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            border-radius: 4px;
            text-align: center;
            transition: all 0.2s;
        }
        .jdp-key-ctrl:hover { background: var(--jose-gold); color: #ffffff; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: var(--helena-cyan); border-radius: 3px; }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between">
    <div id="auth-gatekeeper" class="fixed inset-0 bg-[#ffffff] z-[9999] flex items-center justify-center font-mono">
        <div class="w-full max-w-lg p-8 bg-[#f8fafc] border-2 border-cyan-600 rounded-lg shadow-[0_10px_40px_rgba(8,145,178,0.15)]">
            <div class="text-center mb-6">
                <span class="text-4xl text-[#ca8a04]">🛡️</span>
                <h1 class="text-xl font-black text-[#ca8a04] tracking-widest mt-2 font-['Orbitron']" id="gatekeeper-title">HELENA SOBERANO v24.0</h1>
                <p class="text-[9px] text-slate-500 uppercase tracking-widest mt-1" id="gatekeeper-subtitle">SISTEMA DE GESTÃO UNIFICADA — JDP INDUSTRIAL</p>
                <div id="project-boot-indicator" class="hidden mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded text-xs text-cyan-700">
                    <i class="fas fa-network-wired animate-pulse mr-2"></i> HOST ATIVO: <span id="boot-project-name" class="font-bold text-slate-900"></span>
                </div>
            </div>
            <div id="auth-modes-selector" class="flex border-b border-slate-200 mb-6">
                <button onclick="toggleAuthMode('login')" id="btn-mode-login" class="flex-1 py-2 text-xs font-bold uppercase tracking-wider text-cyan-600 border-b-2 border-cyan-600">Entrar</button>
                <button onclick="toggleAuthMode('register')" id="btn-mode-register" class="flex-1 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Cadastrar Porta</button>
            </div>
            <div class="flex flex-col gap-4">
                <div id="operator-field-container">
                    <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Operador / ID do Administrador</label>
                    <input type="text" id="auth-username" placeholder="Ex: Jose" class="w-full bg-white border border-slate-300 rounded p-2.5 text-xs text-slate-900 outline-none focus:border-cyan-600">
                </div>
                <div>
                    <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Chave Unificadora (Senha)</label>
                    <div id="auth-password-display" class="w-full bg-white border border-slate-300 rounded p-2.5 text-center text-xs text-[#ca8a04] font-bold tracking-widest cursor-pointer hover:border-[#ca8a04]" onclick="focarTecladoAuth()">
                        CLIQUE PARA INSERIR CHAVE
                    </div>
                </div>
                <div class="jdp-keyboard-container mt-2" id="jdp-keyboard-auth">
                    <div class="jdp-keyboard-grid" id="jdp-keyboard-grid-auth"></div>
                    <div class="jdp-keyboard-controls">
                        <div class="jdp-key-ctrl" onclick="apagarCaractereAuth()">← APAGAR</div>
                        <div class="jdp-key-ctrl" onclick="misturarTecladoAuth()">🔀 SHUFFLE</div>
                        <button class="jdp-key-ctrl bg-cyan-50 text-cyan-700 border-cyan-600 font-bold" id="btn-auth-action" onclick="executarAutenticacao()">✓ CONFIRMAR</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="main-app" class="hidden flex-1 flex flex-col justify-between">
        <input type="checkbox" id="menu-toggle">
        <header class="global-header">
            <div class="flex items-center">
                <label for="menu-toggle" class="dots-menu-label" title="Painel HELENA">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <div class="flex items-center gap-3 ml-4">
                    <span class="text-xl text-[#ca8a04]">⚙️</span>
                    <span class="text-xs font-black tracking-widest text-slate-900 font-['Orbitron']">JDP SISTEMAS</span>
                    <span class="text-[9px] bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded font-bold uppercase border border-cyan-200">HELENA v24.0 SOBERANO</span>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded border border-slate-200">
                    <span class="text-[9px] text-slate-500 font-bold shrink-0">OPERADOR ATIVO:</span>
                    <span id="activeUserDisplay" class="text-[10px] text-cyan-700 font-bold font-mono">Nenhum</span>
                    <span id="vaultStatus" class="text-[8px] text-yellow-600 font-mono font-bold">● PORTA SEGURA</span>
                </div>
                <div class="text-right">
                    <div id="pathDisp" class="text-[10px] text-slate-700 font-bold max-w-xs truncate">SELECIONE UM REPOSITÓRIO</div>
                    <div class="text-[8px] text-emerald-600 font-bold uppercase" id="syncStatus">Firebase Realtime: Conectado</div>
                </div>
                <button onclick="logoutSeguro()" class="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 px-2.5 py-1.5 rounded text-[10px] font-bold transition">
                    🚪 SAIR
                </button>
            </div>
        </header>

        <div class="layout-wrapper flex flex-1 relative">
            <aside class="sidebar-30 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-center pb-4 mb-4 border-b border-slate-200">
                        <span class="text-xs font-black text-[#ca8a04] uppercase tracking-wider font-['Orbitron']">Controles Industriais</span>
                        <span class="text-[9px] bg-yellow-400 text-black px-2.5 py-1 rounded-full font-black">Mestre José</span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <button onclick="exportDatabase()" class="w-full text-left bg-slate-50 hover:bg-cyan-600 hover:text-white border-2 border-slate-200 rounded p-3 text-[11px] font-bold flex items-center justify-between transition">
                            <span>Exportar database.json (Backup)</span>
                            <span class="text-xs">📥</span>
                        </button>
                        <button onclick="triggerImport()" class="w-full text-left bg-slate-50 hover:bg-cyan-600 hover:text-white border-2 border-slate-200 rounded p-3 text-[11px] font-bold flex items-center justify-between transition">
                            <span>Importar database.json</span>
                            <span class="text-xs">📤</span>
                        </button>
                        <input type="file" id="import-db-file" accept=".json" class="hidden" onchange="importDatabase(event)">
                        <button onclick="switchTab('new-repo')" class="w-full text-left bg-slate-50 hover:bg-cyan-600 hover:text-white border-2 border-slate-200 rounded p-3 text-[11px] font-bold flex items-center justify-between transition">
                            <span>Criar Novo Cliente</span>
                            <span class="text-xs">📦</span>
                        </button>
                        <button onclick="downloadRepoZip()" class="w-full text-left bg-slate-50 hover:bg-cyan-600 hover:text-white border-2 border-slate-200 rounded p-3 text-[11px] font-bold flex items-center justify-between transition">
                            <span>Baixar ZIP do Cliente</span>
                            <span class="text-xs">🗄️</span>
                        </button>
                        <button onclick="disconnectRepo()" class="w-full text-left bg-slate-50 hover:bg-cyan-600 hover:text-white border-2 border-slate-200 rounded p-3 text-[11px] font-bold flex items-center justify-between transition">
                            <span>Fechar Cliente Ativo</span>
                            <span class="text-xs">🚪</span>
                        </button>
                        <button onclick="destroyLocalDatabase()" class="w-full text-left bg-red-50 hover:bg-red-600 hover:text-white border-2 border-red-100 rounded p-3 text-[11px] font-bold flex items-center justify-between transition">
                            <span>Destruir Banco Local e Nuvem</span>
                            <span class="text-xs">⚠️</span>
                        </button>
                    </div>
                </div>
                <div class="mt-8 pt-4 border-t border-slate-200 text-[9px] text-slate-400 font-mono">
                    HELENA CORE v24.0: Conectada ao canal de segurança 'Princesa Diamante'.
                </div>
            </aside>

            <div class="flex-1 grid grid-cols-[320px_1fr] bg-white">
                <aside class="bg-[#f8fafc] border-r border-slate-200 p-6 overflow-y-auto flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Meus Clientes / Portas</span>
                            <button onclick="switchTab('new-repo')" class="text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded font-bold transition">Novo</button>
                        </div>
                        <input type="text" id="repoSearch" placeholder="Filtrar cliente..." class="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 font-mono outline-none mb-4 focus:border-cyan-600" oninput="filterRepos()">
                        <div id="repoList" class="flex flex-col gap-1.5"></div>
                    </div>
                </aside>

                <main class="p-8 flex flex-col gap-6 overflow-y-auto">
                    <div class="border border-slate-200 rounded-lg p-4 bg-[#f8fafc] flex flex-col gap-3">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <span class="text-xl">⚙️</span>
                                <span class="text-xs text-slate-500 font-bold">PORTA_ATIVA</span>
                                <span class="text-slate-400">/</span>
                                <span class="text-sm font-black text-slate-900" id="repoNameDisp">Selecione um Cliente</span>
                                <span class="text-[9px] bg-cyan-50 text-cyan-700 border border-cyan-200 px-2 py-0.5 rounded font-bold uppercase mr-2" id="repoVisibilityDisp">AES-256</span>
                                <span id="clientStatusBadge" onclick="alternarStatusCliente()" class="hidden cursor-pointer text-[9px] px-2 py-0.5 rounded font-bold uppercase transition border"></span>
                            </div>
                        </div>
                        <div class="border-b border-slate-200 flex gap-2" id="repoNavigationTabs">
                            <button onclick="switchTab('code')" id="tab-code" class="tab-btn active text-slate-900">Arquivos de Segurança</button>
                            <button onclick="switchTab('settings')" id="tab-settings" class="tab-btn text-slate-400">Configurações</button>
                            <button onclick="switchTab('new-repo')" id="tab-new-repo" class="tab-btn text-slate-400">Novo Cliente</button>
                        </div>
                    </div>

                    <div class="border border-slate-200 rounded-lg bg-[#f8fafc] shadow-sm overflow-hidden">
                        <div class="bg-white px-4 py-2 flex justify-between items-center border-b border-slate-200">
                            <span class="text-[10px] font-black text-cyan-700 uppercase tracking-wider flex items-center gap-2">
                                <span class="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse"></span>
                                HELENA OPERATIONAL SYSTEM LOGS
                            </span>
                        </div>
                        <div id="terminalLogs" class="p-4 h-24 overflow-y-auto text-[10px] font-mono text-slate-700 leading-relaxed bg-white border-t border-slate-100">
                            [HELENA CORE v24.0]: Conectada ao Criador SR. JOSÉ DIVINO PRADO DA LAPA.<br>
                            [SISTEMA]: Divisor de Criptografia Realtime Ativo. Sincronizando com Firebase.<br>
                            [JDP-SVH]: Pronto para gerenciar as cascas PWA isoladas conectadas à nuvem.
                        </div>
                    </div>

                    <div id="panel-code" class="tab-panel border border-slate-200 rounded-lg bg-[#f8fafc] shadow-sm overflow-hidden">
                        <div class="bg-white p-4 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <span class="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <span class="text-cyan-600">⚡</span> CLIENTE ATIVO: <span id="activeRepoName" class="text-cyan-700 font-mono">Nenhum</span>
                                </span>
                                <div class="text-[9px] text-slate-500 font-mono mt-1">Caminho atual: <span id="currentPathDisp">/</span></div>
                            </div>
                            <div class="flex gap-2">
                                <button id="btnExecIndex" onclick="executarIndexVirtual()" class="text-[10px] bg-slate-100 text-slate-400 font-black px-4 py-1.5 rounded transition uppercase cursor-not-allowed border border-slate-200" disabled>
                                    ⚡ Executar Casca
                                </button>
                                <button id="btnGetSovereignLink" onclick="gerarLinkSoberano()" class="text-[10px] bg-slate-100 text-slate-400 font-black px-4 py-1.5 rounded transition uppercase cursor-not-allowed border border-slate-200" disabled>
                                    🔗 Link Soberano
                                </button>
                                <button id="btnDownloadPWA" onclick="baixarCascaPwa()" class="text-[10px] bg-slate-100 text-slate-400 font-black px-4 py-1.5 rounded transition uppercase cursor-not-allowed border border-slate-200" disabled>
                                    📥 Baixar Casca PWA
                                </button>
                                <button id="btnNewFile" onclick="openModal('text')" class="text-[10px] bg-slate-100 text-slate-400 font-black px-3 py-1.5 rounded transition uppercase cursor-not-allowed border border-slate-200" disabled>
                                    + Novo Arquivo
                                </button>
                                <button id="btnNewFolder" onclick="openModal('folder')" class="text-[10px] bg-slate-100 text-slate-400 font-black px-3 py-1.5 rounded transition uppercase cursor-not-allowed border border-slate-200" disabled>
                                    + Nova Pasta
                                </button>
                            </div>
                        </div>
                        <div id="fileList" class="divide-y divide-slate-200 bg-white">
                            <div class="p-8 text-center text-slate-400 text-xs font-bold uppercase">
                                <i class="fas fa-folder-open text-xl mb-2 block text-cyan-600"></i>
                                Selecione um cliente para carregar os arquivos.
                            </div>
                        </div>
                    </div>

                    <div id="panel-settings" class="tab-panel hidden border border-slate-200 rounded-lg bg-[#f8fafc] shadow-sm p-6">
                        <h3 class="text-sm font-black text-red-600 uppercase mb-2">Danger Zone</h3>
                        <button onclick="deleteRepository()" class="bg-red-600 text-white text-xs font-black px-4 py-2 rounded transition uppercase">Deletar Repositório</button>
                    </div>

                    <div id="panel-new-repo" class="tab-panel hidden border border-slate-200 rounded-lg bg-[#f8fafc] shadow-sm p-8">
                        <h1 class="text-lg font-black text-slate-900 mb-1">Criar Novo Cliente / Porta</h1>
                        <div class="flex flex-col gap-4 max-w-2xl">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1">ID do Cliente *</label>
                                <input type="text" id="newRepoName" placeholder="Ex: DONY_BURGER1" class="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-900 font-mono outline-none focus:border-cyan-600">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1">HTML do Sistema Real (Upload do Celular)</label>
                                <input type="file" id="newRepoShellInput" accept=".html" class="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-900 font-mono outline-none focus:border-cyan-600">
                                <span class="text-[9px] text-slate-500 mt-1 block">Este arquivo HTML será criptografado e guardado diretamente na nuvem Firebase.</span>
                            </div>
                            <button onclick="createRepositoryDatabase()" class="bg-emerald-600 text-white text-xs font-black py-3 rounded uppercase tracking-wider transition">
                                Inicializar Estrutura do Cliente
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>

    <div id="modal" class="hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-3xl jdp-card p-6 z-50">
        <h3 id="mTitle" class="text-slate-900 font-black text-sm uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
            <span>Criar Novo Item</span>
        </h3>
        <div class="mb-3">
            <label class="block text-[10px] font-bold text-slate-500 mb-1" id="mNameLabel">NOME DO ARQUIVO</label>
            <input type="text" id="mName" placeholder="Ex: dados.json" class="w-full bg-[#f8fafc] border border-slate-300 rounded p-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-cyan-600">
        </div>
        <div class="mb-4" id="mTextContainer">
            <label class="block text-[10px] font-bold text-slate-500 mb-1">CÓDIGO / CONTEÚDO</label>
            <textarea id="mText" placeholder="Escreva seu código..." class="w-full h-96 bg-[#f8fafc] border border-slate-300 rounded p-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-cyan-600 resize-y"></textarea>
        </div>
        <div class="flex gap-2">
            <button onclick="saveFile()" class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-black py-3 rounded text-xs uppercase transition">
                💾 Salvar Item
            </button>
            <button onclick="closeModal()" class="flex-1 border border-slate-300 text-slate-700 py-3 rounded text-xs uppercase hover:bg-slate-50 transition">
                Cancelar
            </button>
        </div>
    </div>

    <div id="backdrop" class="hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40" onclick="closeAllModals()"></div>

    <script id="helena-embedded-db-block">
        window.EMBEDDED_DB = { "version": "24.0", "usuarios": [] };
    </script>

    <script>
        // DETECTOR DINÂMICO DE SUB-CAMINHO (PREVINE ERRO 404 NO DOMÍNIO /APP)
        const API_PREFIX = window.location.pathname.toLowerCase().includes('/app') ? '/App/api' : '/api';

        const firebaseConfig = {
            apiKey: "AIzaSyCEdXF7ScnMYz0Ce0OW-B_UJ8Bm5Pl9m8o",
            databaseURL: "https://dony-burguers-default-rtdb.firebaseio.com"
        };

        firebase.initializeApp(firebaseConfig);
        const fbDatabase = firebase.database();
        const firebaseDbRef = fbDatabase.ref("jdp_sistemas/database");

        let LOGGED_USER = null;
        let ACTIVE_PASSWORD = '';
        let SELECTED_REPO_ID = '';
        let currentPath = '';
        let isEditing = false;
        let fileToDelete = null;
        let authMode = 'login';
        let tempPasswordArray = [];
        
        let bootProjectMode = false;
        let bootProjectUser = "";
        let bootProjectId = "";
        let bootClientMode = false;
        let targetClienteId = "";
        let payloadCriptografadoBase64 = "";

        const CARACTERES_TECLADO = [
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            '0','1','2','3','4','5','6','7','8','9','!','@','#','$','%','&','*'
        ];

        async function carregarBancoDoManifest() {
            try {
                logHELENA("[NÚCLEO]: Conectando ao Firebase Realtime Database...");
                const snapshot = await firebaseDbRef.once('value');
                const cloudDb = snapshot.val();
                if (cloudDb) {
                    logHELENA("[NÚCLEO]: Base de dados em nuvem recuperada.");
                    localStorage.setItem('jdp_database_json', JSON.stringify(cloudDb, null, 2));
                } else {
                    logHELENA("[NÚCLEO]: Banco vazio. Inicializando...");
                    const initialDb = { version: "24.0", usuarios: [] };
                    await firebaseDbRef.set(initialDb);
                    localStorage.setItem('jdp_database_json', JSON.stringify(initialDb, null, 2));
                }
            } catch (err) {
                logHELENA(\`[Aviso]: Rodando com banco local (\${err.message}).\`);
            }
        }

        function getDatabase() {
            let db = localStorage.getItem('jdp_database_json');
            if (!db) {
                const initialDb = { version: "24.0", usuarios: [] };
                localStorage.setItem('jdp_database_json', JSON.stringify(initialDb, null, 2));
                return initialDb;
            }
            return JSON.parse(db);
        }

        async function saveDatabase(dbObj) {
            localStorage.setItem('jdp_database_json', JSON.stringify(dbObj, null, 2));
            try {
                await firebaseDbRef.set(dbObj);
                logHELENA("[NUVEM]: Firebase sincronizado.");
            } catch (err) {
                logHELENA(\`[ERRO NUVEM]: Falha ao sincronizar: \${err.message}\`);
            }
        }

        function ativarRealtimeListener() {
            firebaseDbRef.on('value', async (snapshot) => {
                const cloudDb = snapshot.val();
                if (cloudDb && LOGGED_USER) {
                    logHELENA("[NUVEM]: Sincronização em tempo real recebida.");
                    localStorage.setItem('jdp_database_json', JSON.stringify(cloudDb, null, 2));
                    const userObj = cloudDb.usuarios.find(u => u.username.toLowerCase() === LOGGED_USER.username.toLowerCase());
                    if (userObj) {
                        try {
                            const decryptedStr = await decryptPayload(userObj, ACTIVE_PASSWORD);
                            LOGGED_USER = JSON.parse(decryptedStr);
                            loadRepositories();
                            if (SELECTED_REPO_ID) { selectRepository(SELECTED_REPO_ID); }
                        } catch (e) {
                            logHELENA("[ERRO]: Falha ao descriptografar atualização.");
                        }
                    }
                }
            });
        }

        async function inicializarSistemaSoberano() {
            await carregarBancoDoManifest();
            const urlParams = new URLSearchParams(window.location.search);
            const routeClient = urlParams.get('c');
            const routeProject = urlParams.get('p');
            const routeUser = urlParams.get('u');

            if (routeClient) {
                bootClientMode = true;
                targetClienteId = routeClient;
                document.getElementById('auth-modes-selector').classList.add('hidden');
                document.getElementById('operator-field-container').classList.add('hidden');
                document.getElementById('gatekeeper-title').innerText = \`PORTAL CLIENTE: \${routeClient}\`;
                document.getElementById('gatekeeper-subtitle').innerText = "SISTEMA DE SEGURANÇA ISOLADO JDP";
                document.getElementById('btn-auth-action').innerText = "⚡ ACESSAR SISTEMA";
                logHELENA(\`[CLIENTE]: Inicializando portal seguro para [\${routeClient}]\`);
                carregarSinalDoFirebaseDirect(routeClient);
                misturarTecladoAuth();
                return;
            }

            if (routeProject && routeUser) {
                bootProjectMode = true;
                bootProjectId = routeProject;
                bootProjectUser = routeUser;
                document.getElementById('auth-modes-selector').classList.add('hidden');
                document.getElementById('auth-username').value = routeUser;
                document.getElementById('auth-username').disabled = true;
                document.getElementById('project-boot-indicator').classList.remove('hidden');
                document.getElementById('boot-project-name').innerText = routeProject.replace('repo_', 'PROJETO-');
                document.getElementById('btn-auth-action').innerText = "⚡ EXECUÇÃO SOBERANA";
                logHELENA(\`[JDP-SVH]: Bootloader iniciado para [\${routeProject}]\`);
            }
            misturarTecladoAuth();
        }

        async function carregarSinalDoFirebaseDirect(clientId) {
            const authDisplay = document.getElementById('auth-password-display');
            try {
                const snapshot = await fbDatabase.ref(\`princesa/clientes/\${clientId}\`).once("value");
                const data = snapshot.val();
                if (data && data.config) {
                    if (data.config.status !== "ativo") {
                        authDisplay.innerText = "ACESSO SUSPENSO";
                        authDisplay.onclick = null;
                        document.getElementById('btn-auth-action').disabled = true;
                        alert("ACESSO BLOQUEADO PELO ADMINISTRADOR DO SISTEMA.");
                        return;
                    }
                    payloadCriptografadoBase64 = data.payload;
                    authDisplay.innerText = "CLIQUE PARA INSERIR CHAVE";
                } else {
                    authDisplay.innerText = "CLIENTE NÃO CONFIGURADO";
                    alert("Erro: Cliente não localizado no servidor.");
                }
            } catch (e) {
                authDisplay.innerText = "SERVIDOR SEM SINAL";
            }
        }

        window.addEventListener('DOMContentLoaded', inicializarSistemaSoberano);

        function logHELENA(msg) {
            const terminal = document.getElementById('terminalLogs');
            if (terminal) {
                const time = new Date().toLocaleTimeString();
                terminal.innerHTML += \`<br>[\${time}] \${msg}\`;
                terminal.scrollTop = terminal.scrollHeight;
            }
        }

        function focarTecladoAuth() {
            document.getElementById('auth-password-display').innerText = "DIGITANDO...";
            tempPasswordArray = [];
            misturarTecladoAuth();
        }

        function misturarTecladoAuth() {
            const grid = document.getElementById('jdp-keyboard-grid-auth');
            if (!grid) return;
            grid.innerHTML = '';
            let shuf = [...CARACTERES_TECLADO];
            for (let i = shuf.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuf[i], shuf[j]] = [shuf[j], shuf[i]];
            }
            shuf.forEach(char => {
                const btn = document.createElement('div');
                btn.className = 'jdp-key';
                btn.innerText = char;
                btn.onclick = () => {
                    tempPasswordArray.push(char);
                    document.getElementById('auth-password-display').innerText = "• ".repeat(tempPasswordArray.length).trim();
                };
                grid.appendChild(btn);
            });
        }

        function apagarCaractereAuth() {
            tempPasswordArray.pop();
            if (tempPasswordArray.length === 0) {
                document.getElementById('auth-password-display').innerText = "CLIQUE PARA INSERIR CHAVE";
            } else {
                document.getElementById('auth-password-display').innerText = "• ".repeat(tempPasswordArray.length).trim();
            }
        }

        function toggleAuthMode(mode) {
            authMode = mode;
            document.getElementById('btn-mode-login').className = mode === 'login' ? 'flex-1 py-2 text-xs font-bold uppercase tracking-wider text-cyan-600 border-b-2 border-cyan-600' : 'flex-1 py-2 text-xs font-bold uppercase tracking-wider text-slate-400';
            document.getElementById('btn-mode-register').className = mode === 'register' ? 'flex-1 py-2 text-xs font-bold uppercase tracking-wider text-cyan-600 border-b-2 border-cyan-600' : 'flex-1 py-2 text-xs font-bold uppercase tracking-wider text-slate-400';
            document.getElementById('btn-auth-action').innerText = mode === 'login' ? '✓ Confirmar Entrada' : '🔒 Concluir Cadastro';
            tempPasswordArray = [];
            document.getElementById('auth-password-display').innerText = "CLIQUE PARA INSERIR CHAVE";
        }

        function arrayBufferToBase64(buffer) {
            const bytes = new Uint8Array(buffer);
            let binary = '';
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) { binary += String.fromCharCode(bytes[i]); }
            return btoa(binary);
        }

        function base64ToArrayBuffer(base64) {
            const binaryString = atob(base64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
            return bytes.buffer;
        }

        async function deriveKey(password, salt) {
            const encoder = new TextEncoder();
            const baseKey = await crypto.subtle.importKey(
                "raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]
            );
            return crypto.subtle.deriveKey(
                { name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" },
                baseKey,
                { name: "AES-GCM", length: 256 },
                false,
                ["encrypt", "decrypt"]
            );
        }

        async function encryptPayload(plainText, password) {
            const encoder = new TextEncoder();
            const salt = crypto.getRandomValues(new Uint8Array(16));
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const key = await deriveKey(password, salt);
            const encrypted = await crypto.subtle.encrypt(
                { name: "AES-GCM", iv: iv }, key, encoder.encode(plainText)
            );
            return {
                ciphertext: arrayBufferToBase64(encrypted),
                iv: arrayBufferToBase64(iv),
                salt: arrayBufferToBase64(salt)
            };
        }

        async function decryptPayload(encryptedObj, password) {
            const decoder = new TextDecoder();
            const ciphertext = base64ToArrayBuffer(encryptedObj.ciphertext);
            const iv = base64ToArrayBuffer(encryptedObj.iv);
            const salt = base64ToArrayBuffer(encryptedObj.salt);
            const key = await deriveKey(password, salt);
            const decrypted = await crypto.subtle.decrypt(
                { name: "AES-GCM", iv: iv }, key, ciphertext
            );
            return decoder.decode(decrypted);
        }

        async function executarAutenticacao() {
            const password = tempPasswordArray.join('');
            if (bootClientMode) {
                if (!password || !payloadCriptografadoBase64) return;
                try {
                    const check = await fbDatabase.ref(\"princesa/clientes/\" + targetClienteId + \"/config/status\").once("value");
                    if (check.val() !== "ativo") {
                        alert("ACESSO BLOQUEADO PELO SERVIDOR.");
                        return;
                    }
                    const payloadEncryptedObj = JSON.parse(atob(payloadCriptografadoBase64));
                    const decryptedText = await decryptPayload(payloadEncryptedObj, password);
                    if (decryptedText.startsWith("JDP_CORE|||")) {
                        const htmlReal = decryptedText.substring("JDP_CORE|||".length);
                        document.getElementById('auth-gatekeeper').classList.add('hidden');
                        document.open();
                        document.write(htmlReal);
                        document.close();
                    } else {
                        throw new Error();
                    }
                } catch (e) {
                    alert("CHAVE INCORRETA. ACESSO NEGADO.");
                    tempPasswordArray = [];
                    document.getElementById('auth-password-display').innerText = "CLIQUE PARA INSERIR CHAVE";
                }
                return;
            }

            const username = document.getElementById('auth-username').value.trim();
            if (!username || !password) {
                alert("Mestre, informe o operador e preencha a chave de acesso.");
                return;
            }

            const db = getDatabase();

            if (authMode === 'register') {
                const userExists = db.usuarios.find(u => u.username.toLowerCase() === username.toLowerCase());
                if (userExists) return alert("Esse operador já possui uma chave registrada!");
                try {
                    const initialSpace = { username: username, repos: [] };
                    const encrypted = await encryptPayload(JSON.stringify(initialSpace), password);
                    db.usuarios.push({
                        username: username,
                        salt: encrypted.salt,
                        iv: encrypted.iv,
                        ciphertext: encrypted.ciphertext
                    });
                    await saveDatabase(db);
                    alert("PORTA REGISTRADA!");
                    toggleAuthMode('login');
                } catch (err) {
                    alert("Falha de criptografia: " + err.message);
                }
            } else {
                const userObj = db.usuarios.find(u => u.username.toLowerCase() === username.toLowerCase());
                if (!userObj) {
                    alert("Porta de segurança não encontrada.");
                    return;
                }
                try {
                    const decrypted = await decryptPayload(userObj, password);
                    LOGGED_USER = JSON.parse(decrypted);
                    ACTIVE_PASSWORD = password;
                    if (bootProjectMode) {
                        const repo = LOGGED_USER.repos.find(r => r.id === bootProjectId);
                        if (!repo) {
                            alert("Projeto não localizado.");
                            logoutSeguro();
                            return;
                        }
                        document.getElementById('auth-gatekeeper').classList.add('hidden');
                        executarProjetoNoEscopoPrincipal(repo);
                        return;
                    }
                    document.getElementById('auth-gatekeeper').classList.add('hidden');
                    document.getElementById('main-app').classList.remove('hidden');
                    document.getElementById('activeUserDisplay').innerText = LOGGED_USER.username;
                    logHELENA(\`[SISTEMA]: Operador '\${LOGGED_USER.username}' conectado.\`);
                    loadRepositories();
                    ativarRealtimeListener();
                } catch (err) {
                    alert("CHAVE INCORRETA. ACESSO NEGADO.");
                }
            }
        }

        function executarProjetoNoEscopoPrincipal(repo) {
            const indexFile = repo.files.find(f => f.path.toLowerCase() === 'index.html' || f.path.toLowerCase().endsWith('/index.html'));
            if (!indexFile) {
                alert("Erro Fatal: index.html não localizado.");
                logoutSeguro();
                return;
            }
            let htmlContent = indexFile.content;
            repo.files.forEach(file => {
                if (file.path.toLowerCase() === 'index.html' || file.path.toLowerCase().endsWith('/index.html')) return;
                let mimeType = 'text/plain';
                if (file.path.endsWith('.css')) mimeType = 'text/css';
                if (file.path.endsWith('.js')) mimeType = 'application/javascript';
                if (file.path.endsWith('.json')) mimeType = 'application/json';
                if (file.path.endsWith('.html')) mimeType = 'text/html';
                const blob = new Blob([file.content], { type: mimeType });
                const blobUrl = URL.createObjectURL(blob);
                const relativePathEscaped = file.path.replace(/[-\/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&');
                const regexSimple = new RegExp(\`(["'])\${relativePathEscaped}(["'])\`, 'g');
                const regexDotSlash = new RegExp(\`(["'])\\\\.\\\\/\${relativePathEscaped}(["'])\`, 'g');
                htmlContent = htmlContent.replace(regexSimple, \`$1\${blobUrl}$2\`);
                htmlContent = htmlContent.replace(regexDotSlash, \`$1\${blobUrl}$2\`);
            });
            document.open();
            document.write(htmlContent);
            document.close();
        }

        function loadRepositories() {
            const listContainer = document.getElementById('repoList');
            if (!LOGGED_USER || !LOGGED_USER.repos || LOGGED_USER.repos.length === 0) {
                listContainer.innerHTML = \`<div class="p-4 text-center text-slate-500 text-[10px]">Nenhum cliente criado.</div>\`;
                return;
            }
            listContainer.innerHTML = LOGGED_USER.repos.map(repo => \`
                <div class="repo-item p-3 bg-white rounded border border-slate-200 flex items-center justify-between cursor-pointer" onclick="selectRepository('\${repo.id}')">
                    <span class="text-[11px] text-slate-800 font-bold truncate">\${repo.name}</span>
                    <span class="text-[8px] px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-600 border border-cyan-200 font-bold">ABRIR</span>
                </div>
            \`).join('');
        }

        function selectRepository(id) {
            SELECTED_REPO_ID = id;
            const repo = LOGGED_USER.repos.find(r => r.id === id);
            if (repo) {
                document.getElementById('repoNameDisp').innerText = repo.name;
                document.getElementById('activeRepoName').innerText = repo.name;
                document.getElementById('pathDisp').innerText = \`/DB/\${LOGGED_USER.username}/\${repo.name}\`;
                updateFileButtonsState(true);
                switchTab('code');
                loadFiles('');
                atualizarBadgeStatusCliente(repo.name);
            }
        }

        async function atualizarBadgeStatusCliente(clientName) {
            const badge = document.getElementById('clientStatusBadge');
            try {
                const snapshot = await fbDatabase.ref(\`princesa/clientes/\${clientName}/config\`).once('value');
                const config = snapshot.val();
                if (config) {
                    badge.classList.remove('hidden');
                    if (config.status === 'ativo') {
                        badge.innerText = 'STATUS: ATIVO';
                        badge.className = "cursor-pointer text-[9px] bg-green-100 text-green-700 border border-green-300 px-2 py-0.5 rounded font-bold uppercase transition";
                    } else {
                        badge.innerText = 'STATUS: BLOQUEADO';
                        badge.className = "cursor-pointer text-[9px] bg-red-100 text-red-700 border border-red-300 px-2 py-0.5 rounded font-bold uppercase transition animate-pulse";
                    }
                } else {
                    badge.classList.add('hidden');
                }
            } catch (e) {
                badge.classList.add('hidden');
            }
        }

        async function alternarStatusCliente() {
            const repo = LOGGED_USER.repos.find(r => r.id === SELECTED_REPO_ID);
            if (!repo) return;
            const pathRef = fbDatabase.ref(\`princesa/clientes/\${repo.name}/config\`);
            try {
                const snapshot = await pathRef.once('value');
                const config = snapshot.val();
                if (config) {
                    const novoStatus = config.status === 'ativo' ? 'inativo' : 'ativo';
                    await pathRef.child('status').set(novoStatus);
                    logHELENA(\`[SISTEMA]: Status do cliente \${repo.name} alterado para [\${novoStatus.toUpperCase()}].\`);
                    atualizarBadgeStatusCliente(repo.name);
                }
            } catch (e) {
                alert("Falha ao alternar status.");
            }
        }

        function loadFiles(path = '') {
            currentPath = path;
            document.getElementById('currentPathDisp').innerText = \`/\${path}\`;
            const repo = LOGGED_USER.repos.find(r => r.id === SELECTED_REPO_ID);
            if (!repo) return;
            let html = '';
            if (currentPath) {
                html += \`
                <div class="file-item p-3 flex items-center gap-3 cursor-pointer bg-slate-50" onclick="goBack()">
                    <span class="text-sm">🔙</span>
                    <span class="text-[10px] text-cyan-600 font-bold uppercase">.. (Voltar)</span>
                </div>\`;
            }
            const filesInPath = [];
            const foldersInPath = new Set();
            repo.files.forEach(f => {
                let isDirectChild = false;
                if (currentPath === '') {
                    if (!f.path.includes('/')) { isDirectChild = true; } else { foldersInPath.add(f.path.split('/')[0]); }
                } else {
                    if (f.path.startsWith(currentPath + '/')) {
                        const relative = f.path.substring(currentPath.length + 1);
                        if (!relative.includes('/')) { isDirectChild = true; } else { foldersInPath.add(relative.split('/')[0]); }
                    }
                }
                if (isDirectChild && !f.path.endsWith('.placeholder')) { filesInPath.push(f); }
            });
            foldersInPath.forEach(folder => {
                const folderFullPath = currentPath ? \`\${currentPath}/\${folder}\` : folder;
                html += \`
                <div class="file-item p-3.5 flex items-center justify-between gap-4 bg-white">
                    <div class="flex items-center gap-3 truncate flex-1 cursor-pointer" onclick="loadFiles('\${folderFullPath}')">
                        <span class="text-base shrink-0">📁</span>
                        <span class="text-[11px] text-slate-800 font-bold block truncate">\${folder}</span>
                    </div>
                    <button onclick="requestDeleteFolder('\${folderFullPath}')" class="bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded text-[9px] font-bold transition">EXCLUIR</button>
                </div>\`;
            });
            if (filesInPath.length > 0 || foldersInPath.size > 0) {
                filesInPath.forEach(f => {
                    const sizeText = (f.size / 1024).toFixed(1) + ' KB';
                    html += \`
                    <div class="file-item p-3.5 flex items-center justify-between bg-white">
                        <div class="flex items-center gap-3 truncate flex-1 cursor-pointer" onclick="requestEditFile('\${f.path}')">
                            <span class="text-base">📄</span>
                            <div class="truncate">
                                <span class="text-[11px] text-slate-800 font-bold block truncate">\${f.path.split('/').pop()}</span>
                                <span class="text-[8px] text-slate-500 block truncate">/\${f.path}</span>
                            </div>
                        </div>
                        <div class="flex gap-2 shrink-0">
                            <button onclick="requestEditFile('\${f.path}')" class="bg-yellow-50 hover:bg-yellow-500 text-yellow-700 px-2.5 py-1 rounded text-[9px] font-bold transition">EDITAR</button>
                            <button onclick="requestDelete('\${f.path}')" class="bg-red-50 hover:bg-red-500 text-red-600 px-2.5 py-1 rounded text-[9px] font-bold transition">EXCLUIR</button>
                            <span class="text-[9px] text-slate-400 font-mono w-16 text-right shrink-0">\${sizeText}</span>
                        </div>
                    </div>\`;
                });
                document.getElementById('fileList').innerHTML = html;
            } else {
                document.getElementById('fileList').innerHTML = \`
                <div class="p-8 text-center text-slate-400 text-xs font-bold uppercase">
                    <i class="fas fa-folder-open text-xl mb-2 block text-cyan-600"></i>
                    Diretório Vazio.
                </div>\`;
            }
        }

        async function saveFile() {
            const name = document.getElementById('mName').value.trim();
            const content = document.getElementById('mText').value;
            if (!name) return alert("Insira um nome válido.");
            const repo = LOGGED_USER.repos.find(r => r.id === SELECTED_REPO_ID);
            if (!repo) return;
            let filePath = currentPath ? \`\${currentPath}/\${name}\` : name;
            if (window.lastType === 'folder') {
                filePath = \`\${filePath}/.placeholder\`;
                const existingFileIndex = repo.files.findIndex(f => f.path === filePath);
                if (existingFileIndex === -1) { repo.files.push({ path: filePath, content: "placeholder", size: 11 }); }
            } else {
                const existingFileIndex = repo.files.findIndex(f => f.path === filePath);
                if (existingFileIndex !== -1) {
                    repo.files[existingFileIndex].content = content;
                    repo.files[existingFileIndex].size = new Blob([content]).size;
                } else {
                    repo.files.push({ path: filePath, content: content, size: new Blob([content]).size });
                }
            }
            await saveCurrentUserSpace();
            closeModal();
            loadFiles(currentPath);
        }

        function requestEditFile(path) {
            const repo = LOGGED_USER.repos.find(r => r.id === SELECTED_REPO_ID);
            const file = repo.files.find(f => f.path === path);
            isEditing = true;
            openModal('text');
            document.getElementById('mName').value = path.split('/').pop();
            document.getElementById('mName').disabled = true;
            document.getElementById('mText').value = file.content;
        }

        function requestDelete(path) {
            if (confirm(\`Deseja deletar o arquivo: \${path}?\`)) {
                const repo = LOGGED_USER.repos.find(r => r.id === SELECTED_REPO_ID);
                repo.files = repo.files.filter(f => f.path !== path);
                saveCurrentUserSpace().then(() => loadFiles(currentPath));
            }
        }

        function requestDeleteFolder(folderFullPath) {
            if (confirm(\`Deseja DESTRUIR a pasta "\${folderFullPath}"?\`)) {
                const repo = LOGGED_USER.repos.find(r => r.id === SELECTED_REPO_ID);
                if (!repo) return;
                repo.files = repo.files.filter(f => !f.path.startsWith(folderFullPath + '/') && f.path !== folderFullPath && f.path !== \`\${folderFullPath}/.placeholder\`);
                saveCurrentUserSpace().then(() => loadFiles(currentPath));
            }
        }

        async function saveCurrentUserSpace() {
            if (!LOGGED_USER) return;
            const db = getDatabase();
            const userIndex = db.usuarios.findIndex(u => u.username.toLowerCase() === LOGGED_USER.username.toLowerCase());
            if (userIndex !== -1) {
                const encrypted = await encryptPayload(JSON.stringify(LOGGED_USER), ACTIVE_PASSWORD);
                db.usuarios[userIndex] = {
                    username: LOGGED_USER.username,
                    salt: encrypted.salt,
                    iv: encrypted.iv,
                    ciphertext: encrypted.ciphertext
                };
                await saveDatabase(db);
                logHELENA("[SISTEMA]: Alterações salvas na nuvem.");
            }
        }

        async function createRepositoryDatabase() {
            const name = document.getElementById('newRepoName').value.toUpperCase().trim();
            if (!name) return alert("Insira o ID do cliente.");
            const fileInput = document.getElementById('newRepoShellInput');
            if (fileInput.files.length === 0) { return alert("Mestre, selecione o arquivo HTML do Sistema Real!"); }
            logHELENA("[Divisor]: Lendo o Aplicativo Real...");
            const originalHtml = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsText(fileInput.files[0]);
            });
            logHELENA("[Divisor]: Criptografando o Aplicativo Real...");
            const payloadComAssinatura = "JDP_CORE|||" + originalHtml;
            const encryptedPayloadObj = await encryptPayload(payloadComAssinatura, ACTIVE_PASSWORD);
            const payloadCriptografadoBase64 = btoa(JSON.stringify(encryptedPayloadObj));
            logHELENA("[Firebase]: Gravando Payload...");
            const clientPayloadData = {
                config: { id: name, apiKey: btoa(name), status: "ativo", path: \`clientes/\${name}/\`, modelo: \`cliente_\${name}\` },
                operador: LOGGED_USER.username,
                payload: payloadCriptografadoBase64,
                timestamp: Date.now()
            };
            await fbDatabase.ref(\`princesa/clientes/\${name}\`).set(clientPayloadData);
            logHELENA("[Divisor]: Montando Casca...");
            const cascaHtml = document.documentElement.outerHTML; // Clonagem da própria casca atualizada
            const manifestJson = {
                name: \`JDP Portal \${name}\`, short_name: name, start_url: "index.html", display: "standalone", background_color: "#ffffff", theme_color: "#ca8a04",
                icons: [{ "src": "https://cdn-icons-png.flaticon.com/512/5087/5087579.png", "sizes": "512x512", "type": "image/png" }]
            };
            const serviceWorkerJs = \`const CACHE_NAME = 'jdp-cache-\${name}'; self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(['index.html', 'manifest.json']))); }); self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(response => response || fetch(e.request))); });\`;
            const defaultFiles = [
                { path: "dados.json", content: JSON.stringify({ id: name, tipo: "dados", data: [] }, null, 2) },
                { path: "seguro.json", content: JSON.stringify({ id: name, tipo: "seguro", data: [] }, null, 2) },
                { path: "payload.json", content: JSON.stringify({ payload: payloadCriptografadoBase64 }, null, 2) },
                { path: "manifest.json", content: JSON.stringify(manifestJson, null, 2) },
                { path: "sw.js", content: serviceWorkerJs },
                { path: "index.html", content: cascaHtml }
            ];
            const newRepo = {
                id: 'repo_' + Date.now(), name: name,
                files: defaultFiles.map(f => ({ path: f.path, content: f.content, size: new Blob([f.content]).size }))
            };
            LOGGED_USER.repos.push(newRepo);
            await saveCurrentUserSpace();
            document.getElementById('newRepoName').value = '';
            document.getElementById('newRepoShellInput').value = '';
            loadRepositories();
            selectRepository(newRepo.id);
            logHELENA(\`[Sucesso]: Cliente \${name} gerado. Pacote pronto.\`);
        }

        async function baixarCascaPwa() {
            if (!SELECTED_REPO_ID || !LOGGED_USER) return;
            const repo = LOGGED_USER.repos.find(r => r.id === SELECTED_REPO_ID);
            try {
                const zip = new JSZip();
                repo.files.forEach(f => { zip.file(f.path, f.content); });
                const content = await zip.generateAsync({ type: "blob" });
                const url = URL.createObjectURL(content);
                const a = document.createElement('a');
                a.href = url;
                a.download = \`\${repo.name}_PWA_COMPILADO.zip\`;
                a.click();
                URL.revokeObjectURL(url);
                logHELENA(\`[PWA]: Pacote baixado para \${repo.name}.\`);
            } catch (err) { alert("Erro ao compilar ZIP."); }
        }

        function gerarLinkSoberano() {
            if (!SELECTED_REPO_ID || !LOGGED_USER) return;
            const repo = LOGGED_USER.repos.find(r => r.id === SELECTED_REPO_ID);
            const linkSoberano = \`\${window.location.origin}\${window.location.pathname}?c=\${repo.name}\`;
            navigator.clipboard.writeText(linkSoberano).then(() => {
                logHELENA("[JDP-SVH]: Link Soberano direto gerado.");
                alert(\`LINK SOBERANO DIRETO GERADO!\\n\\nCopie o link abaixo para rodar o sistema:\\n\\n\${linkSoberano}\`);
            });
        }

        function executarIndexVirtual() {
            if (!SELECTED_REPO_ID) return;
            const repo = LOGGED_USER.repos.find(r => r.id === SELECTED_REPO_ID);
            const indexFile = repo.files.find(f => f.path.toLowerCase() === 'index.html');
            if (!indexFile) return alert("index.html não localizado.");
            const sandbox = window.open('about:blank', '_blank');
            sandbox.document.open();
            sandbox.document.write(indexFile.content);
            sandbox.document.close();
        }

        function logoutSeguro() {
            LOGGED_USER = null; ACTIVE_PASSWORD = ''; SELECTED_REPO_ID = ''; bootProjectMode = false; bootClientMode = false;
            firebaseDbRef.off();
            document.getElementById('auth-username').value = '';
            document.getElementById('auth-username').disabled = false;
            document.getElementById('project-boot-indicator').classList.add('hidden');
            document.getElementById('auth-modes-selector').classList.remove('hidden');
            document.getElementById('operator-field-container').classList.remove('hidden');
            document.getElementById('gatekeeper-title').innerText = "HELENA SOBERANO v24.0";
            document.getElementById('gatekeeper-subtitle').innerText = "SISTEMA DE GESTÃO UNIFICADA — JDP INDUSTRIAL";
            document.getElementById('auth-password-display').innerText = 'CLIQUE PARA INSERIR CHAVE';
            tempPasswordArray = [];
            document.getElementById('main-app').classList.add('hidden');
            document.getElementById('auth-gatekeeper').classList.remove('hidden');
            document.getElementById('clientStatusBadge').classList.add('hidden');
            toggleAuthMode('login');
        }

        function filterRepos() {
            const term = document.getElementById('repoSearch').value.toLowerCase();
            const items = document.querySelectorAll('.repo-item');
            items.forEach(item => {
                if (item.innerText.toLowerCase().includes(term)) { item.style.display = 'flex'; } else { item.style.display = 'none'; }
            });
        }

        function switchTab(tabId) {
            document.querySelectorAll('#repoNavigationTabs button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
            const activeBtn = document.getElementById(\`tab-\${tabId}\`);
            if (activeBtn) activeBtn.classList.add('active');
            const activePanel = document.getElementById(\`panel-\${tabId}\`);
            if (activePanel) activePanel.classList.remove('hidden');
        }

        function updateFileButtonsState(enabled) {
            const elements = ['btnNewFile', 'btnNewFolder', 'btnExecIndex', 'btnGetSovereignLink', 'btnDownloadPWA'];
            elements.forEach(id => {
                const el = document.getElementById(id);
                if (enabled) {
                    el.disabled = false;
                    el.classList.remove('bg-slate-100', 'text-slate-400', 'cursor-not-allowed');
                    if (id === 'btnExecIndex') { el.className = "text-[10px] bg-[#ca8a04] hover:bg-yellow-600 text-white font-black px-4 py-1.5 rounded border border-yellow-500 font-bold cursor-pointer"; }
                    else if (id === 'btnGetSovereignLink') { el.className = "text-[10px] bg-purple-600 hover:bg-purple-500 text-white font-black px-4 py-1.5 rounded border border-purple-700 font-bold cursor-pointer"; }
                    else if (id === 'btnDownloadPWA') { el.className = "text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-1.5 rounded border border-emerald-700 font-bold cursor-pointer"; }
                    else if (id === 'btnNewFolder') { el.className = "text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-800 font-black px-3 py-1.5 rounded border border-slate-300 cursor-pointer"; }
                    else { el.className = "text-[10px] bg-cyan-600 hover:bg-cyan-500 text-white font-black px-3 py-1.5 rounded cursor-pointer"; }
                } else {
                    el.disabled = true;
                    el.className = "text-[10px] bg-slate-100 text-slate-400 font-black px-4 py-1.5 rounded border border-slate-200 cursor-not-allowed";
                }
            });
        }

        function openModal(type) {
            window.lastType = type;
            document.getElementById('modal').classList.remove('hidden');
            document.getElementById('backdrop').classList.remove('hidden');
            if (type === 'folder') {
                document.getElementById('mTitle').innerText = "Criar Nova Pasta";
                document.getElementById('mNameLabel').innerText = "NOME DA PASTA";
                document.getElementById('mName').placeholder = "Ex: assets ou css";
                document.getElementById('mTextContainer').classList.add('hidden');
                document.getElementById('mName').disabled = false;
                document.getElementById('mName').value = '';
            } else {
                document.getElementById('mTitle').innerText = isEditing ? "Editar Arquivo" : "Criar Novo Arquivo";
                document.getElementById('mNameLabel').innerText = "NOME DO ARQUIVO";
                document.getElementById('mName').placeholder = "Ex: index.html ou config.json";
                document.getElementById('mTextContainer').classList.remove('hidden');
                if (!isEditing) {
                    document.getElementById('mName').disabled = false;
                    document.getElementById('mName').value = '';
                    document.getElementById('mText').value = '';
                }
            }
        }

        function closeModal() {
            document.getElementById('modal').classList.add('hidden');
            document.getElementById('backdrop').classList.add('hidden');
            isEditing = false;
        }

        function closeAllModals() { closeModal(); }
        function disconnectRepo() { SELECTED_REPO_ID = ''; loadRepositories(); updateFileButtonsState(false); document.getElementById('clientStatusBadge').classList.add('hidden'); }
        
        function exportDatabase() {
            const db = getDatabase();
            const blob = new Blob([JSON.stringify(db, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "database.json";
            a.click();
        }
        
        function triggerImport() { document.getElementById('import-db-file').click(); }
        
        function importDatabase(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async function(e) {
                try {
                    const imported = JSON.parse(e.target.result);
                    if (imported.usuarios) {
                        await saveDatabase(imported);
                        alert("Importação Concluída.");
                        logoutSeguro();
                    }
                } catch (err) { alert("Arquivo inválido."); }
            };
            reader.readAsText(file);
        }
        
        function destroyLocalDatabase() {
            if (confirm("Deseja DESTRUIR o banco local e nuvem permanentemente?")) {
                localStorage.removeItem('jdp_database_json');
                firebaseDbRef.remove().then(() => { logoutSeguro(); });
            }
        }

        function goBack() {
            if (currentPath.includes('/')) {
                let parts = currentPath.split('/');
                parts.pop();
                loadFiles(parts.join('/'));
            } else { loadFiles(''); }
        }
    </script>
</body>
</html>`;

    // Gravação imediata do painel de controle
    fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), HTML_CONTENT, 'utf8');

    // ====================================================================
    // EXPOSIÇÃO DE ROTAS E DEFENSORES DE REDE (AJUSTE HÍBRIDO SOBERANO)
    // ====================================================================
    const router = express.Router();

    router.use(express.static(PUBLIC_DIR));

    router.get('/api/status', (req, res) => {
        fs.readFile(CORACAO_PATH, 'utf8', (err, data) => {
            if (err) return res.status(500).json({ error: "Falha de hardware." });
            res.json(JSON.parse(data));
        });
    });

    router.get('/', (req, res) => {
        res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
    });

    // Helena mapeia o roteador em ambas as portas de entrada de tráfego
    app.use('/App', router);
    app.use('/', router);

    // Tratamento de Erros de Processamento Independente (Sem quedas de servidor)
    process.on('uncaughtException', (err) => {
        console.error(`[HELENA CORE CORE]: Erro mitigado em tempo de execução: ${err.message}`);
    });

    process.on('unhandledRejection', (reason, p) => {
        console.error(`[HELENA REJECT]: Rejeição interceptada: ${reason}`);
    });

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`[HELENA CORE CLUSTER]: Thread ${process.pid} ativa no domínio jdpsistemas.com.br na porta ${PORT}`);
    });
}
