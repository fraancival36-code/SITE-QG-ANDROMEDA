// ==============================================
// APLICAÇÃO ANDROMEDA — NÚCLEO CENTRAL
// ==============================================

class NucleoAndromeda {
    constructor() {
        this.modulos = {};
        this.usuario = null;
        this.config = {
            tema: 'escuro',
            idioma: 'pt-BR',
            notificacoes: true
        };
        this.estado = {};
    }

    async inicializar() {
        console.log('🚀 Iniciando Núcleo Andromeda...');
        
        // Restaurar configurações
        this.carregarConfiguracao();
        
        // Registrar listeners
        this.registrarEventos();
        
        // Carregar módulos
        this.carregarModulos();
        
        // Atualizar navegação
        this.atualizarNavegacao();
        
        console.log('✅ Andromeda pronta!');
    }

    registrarEventos() {
        // Navegação inferior
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.navegarPara(item.dataset.page);
                this.atualizarNavegacao();
            });
        });

        // Fechar modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('ativo');
            }
        });
    }

    carregarConfiguracao() {
        const salvo = localStorage.getItem('andromedaConfig');
        if (salvo) {
            this.config = JSON.parse(salvo);
        }
    }

    salvarConfiguracao() {
        localStorage.setItem('andromedaConfig', JSON.stringify(this.config));
    }

    carregarModulos() {
        // Aqui serão registrados todos os módulos
        this.modulos = {
            'biblioteca': { nome: 'Biblioteca', url: 'biblioteca.html' },
            'laboratorio': { nome: 'Laboratório', url: 'laboratorio.html' },
            'checklists': { nome: 'Checklists', url: 'checklists.html' },
            'normas': { nome: 'Normas', url: 'normas.html' },
            'treinamentos': { nome: 'Treinamentos', url: 'treinamentos.html' },
            'arquivos': { nome: 'Arquivos', url: 'arquivos.html' },
            'painel': { nome: 'Painel', url: 'painel.html' },
            'conversa': { nome: 'Conversa', url: 'conversa.html' }
        };
    }

    atualizarNavegacao() {
        const paginaAtual = this.obterPaginaAtual();
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === paginaAtual);
        });
    }

    obterPaginaAtual() {
        const arquivo = window.location.pathname.split('/').pop() || 'index.html';
        return arquivo.replace('.html', '');
    }

    navegarPara(pagina) {
        window.location.href = `${pagina}.html`;
    }

    // ===== GERENCIAMENTO DE ESTADO =====
    definirEstado(chave, valor) {
        this.estado[chave] = valor;
        localStorage.setItem(`estado_${chave}`, JSON.stringify(valor));
    }

    obterEstado(chave) {
        if (this.estado[chave]) return this.estado[chave];
        const salvo = localStorage.getItem(`estado_${chave}`);
        return salvo ? JSON.parse(salvo) : null;
    }

    // ===== NOTIFICAÇÕES =====
    mostrarNotificacao(mensagem, tipo = 'info') {
        const div = document.createElement('div');
        div.className = `notificacao notificacao-${tipo}`;
        div.textContent = mensagem;
        div.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 204, 255, 0.2);
            border: 1px solid #00CCFF;
            color: #FFFFFF;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 300;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3000);
    }

    // ===== MODAIS =====
    abrirModal(conteudo, titulo = '') {
        const modal = document.createElement('div');
        modal.className = 'modal ativo';
        modal.innerHTML = `
            <div class="modal-conteudo">
                ${titulo ? `<h2>${titulo}</h2>` : ''}
                ${conteudo}
            </div>
        `;
        document.body.appendChild(modal);
    }

    // ===== API E DADOS =====
    async buscarDados(url, opcoes = {}) {
        try {
            const resposta = await fetch(url, opcoes);
            if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);
            return await resposta.json();
        } catch (erro) {
            console.error('Erro ao buscar dados:', erro);
            this.mostrarNotificacao('Erro ao carregar dados', 'erro');
            return null;
        }
    }
}

// Instância global
window.andromeda = new NucleoAndromeda();

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.andromeda.inicializar();
    });
} else {
    window.andromeda.inicializar();
}
