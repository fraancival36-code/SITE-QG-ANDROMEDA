class QGApp {
    constructor() {
        this.pagina_atual = this.detectarPagina();
        this.menu_aberto = false;
        this.init();
    }

    init() {
        console.log('🚀 QG Andrômeda iniciando...');
        this.setupEventos();
        this.ativarNavegacao();
        this.marcarPaginaAtiva();
    }

    detectarPagina() {
        const arquivo = window.location.pathname.split('/').pop() || 'index.html';
        return arquivo.replace('.html', '');
    }

    setupEventos() {
        const avatar = document.querySelector('.nav-avatar');
        if (avatar) {
            avatar.addEventListener('click', () => this.irPara('conversa'));
        }

        document.addEventListener('DOMContentLoaded', () => {
            this.marcarPaginaAtiva();
        });
    }

    ativarNavegacao() {
        const links = document.querySelectorAll('.nav-item');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pagina = link.getAttribute('data-page') || link.getAttribute('href');
                this.irPara(pagina);
            });
        });
    }

    marcarPaginaAtiva() {
        const links = document.querySelectorAll('.nav-item');
        const paginaAtual = this.detectarPagina();

        links.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            const pagina = href?.replace('.html', '').split('/').pop();

            if (pagina === paginaAtual || (paginaAtual === 'index' && pagina === 'index')) {
                link.classList.add('active');
            }
        });
    }

    irPara(pagina) {
        if (!pagina) return;
        const url = pagina.includes('.html') ? pagina : `${pagina}.html`;
        window.location.href = url;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new QGApp();
    });
} else {
    window.app = new QGApp();
}
