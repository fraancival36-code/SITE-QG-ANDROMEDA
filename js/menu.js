// ===============================================
// ANDRÔMEDA QG — MENU HANDLER
// Controla o menu lateral e interações
// ===============================================

class MenuHandler {
    constructor() {
        this.menu = null;
        this.btnToggle = null;
        this.overlay = null;
        this.ativo = false;
        this.init();
    }

    init() {
        this.menu = document.querySelector('.menu-lateral');
        this.btnToggle = document.querySelector('.btn-menu-toggle');
        this.overlay = document.querySelector('.menu-overlay');

        if (this.btnToggle) {
            this.btnToggle.addEventListener('click', () => this.toggle());
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.fechar());
        }

        // Fechar menu ao clicar em links
        const links = this.menu?.querySelectorAll('a');
        links?.forEach(link => {
            link.addEventListener('click', () => this.fechar());
        });

        // Fechar ao pressionar Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.ativo) {
                this.fechar();
            }
        });
    }

    toggle() {
        if (this.ativo) {
            this.fechar();
        } else {
            this.abrir();
        }
    }

    abrir() {
        if (this.menu) {
            this.menu.classList.add('ativo');
            this.ativo = true;
        }
        if (this.overlay) {
            this.overlay.classList.add('ativo');
        }
    }

    fechar() {
        if (this.menu) {
            this.menu.classList.remove('ativo');
            this.ativo = false;
        }
        if (this.overlay) {
            this.overlay.classList.remove('ativo');
        }
    }
}

// Inicializar menu quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.menu = new MenuHandler();
    });
} else {
    window.menu = new MenuHandler();
}
