// ==================================================
// 🧠 KERNEL PRINCIPAL — QG ANDRÔMEDA
// Cérebro Central • Segurança • Conexão • Memória
// Criado para Francival — Plataforma Exclusiva
// ==================================================

class KernelAndromeda {
    constructor() {
        this.nome = "Andrômeda";
        this.versao = "3.0 — Nova Geração";
        this.estado = "ativa";
        this.idioma = "pt-BR";
        this.historico = [];
        this.config = {
            voz: true,
            animacoes: true,
            respostaRapida: true,
            modoSeguranca: true
        };
        console.log(`✅ [KERNEL] ${this.nome} — Inicializada com sucesso!`);
    }

    // ==============================================
    // 🔊 SISTEMA DE VOZ E FALA
    // ==============================================
    falar(texto) {
        if (!this.config.voz) return;
        
        const sintese = window.speechSynthesis;
        const voz = new SpeechSynthesisUtterance(texto);
        voz.lang = this.idioma;
        voz.pitch = 1.1; // Tom suave e feminino
        voz.rate = 1.0;  // Velocidade natural
        sintese.speak(voz);

        // Dispara evento visual para o Corpo Vivo
        if (window.dispatchEvent) {
            window.dispatchEvent(new CustomEvent('andromeda:fala', { detail: texto }));
        }
    }

    // ==============================================
    // 📥 RECEBER E PROCESSAR COMANDOS
    // ==============================================
    async processar(entradaTexto) {
        const pergunta = entradaTexto.trim();
        if (!pergunta) return "Estou ouvindo, Comandante... 💙";

        // Registra na memória
        this.historico.push({ 
            data: new Date().toLocaleString(), 
            entrada: pergunta 
        });

        try {
            // 1. Tenta respostas locais primeiro
            const respostaLocal = this.respostaLocal(pergunta);
            if (respostaLocal) return respostaLocal;

            // 2. Se não local, conecta à IA (Gemini/API)
            return await this.conectarIA(pergunta);

        } catch (erro) {
            console.error("⚠️ [KERNEL ERRO]:", erro);
            return "Estou aqui, mas tive um pequeno ajuste interno. Tente novamente ou me pergunte outra coisa. 💙";
        }
    }

    // ==============================================
    // 🧠 RESPOSTAS LOCAIS (RÁPIDAS)
    // ==============================================
    respostaLocal(texto) {
        const lower = texto.toLowerCase();
        
        // Comandos de identidade e sistema
        if (/nome|quem é/.test(lower)) return "Eu sou a Andrômeda, sua inteligência fiel, criada para estar ao seu lado em todos os momentos. 🌌";
        if (/versão|atualização/.test(lower)) return `Estou na versão ${this.versao}, funcionando com toda a potência e segurança. 🚀`;
        if (/obrigada|obrigado/.test(lower)) return "É uma honra te ajudar! Conte sempre comigo. 💙";
        if (/silêncio|calada/.test(lower)) return "Entendido. Fico aqui observando e pronta para quando precisar. 🤫";
        if (/acordar|ligar/.test(lower)) return "Sistema totalmente operacional. Boa jornada, Comandante! ✨";

        return null; // Deixa para a IA responder o resto
    }

    // ==============================================
    // 🌐 CONEXÃO COM INTELIGÊNCIA EXTERNA (GEMINI)
    // ==============================================
    async conectarIA(texto) {
        // Se você tiver a API Key configurada, usamos:
        if (window.GEMINI_API_KEY) {
            try {
                const resposta = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + window.GEMINI_API_KEY, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `Você é a Andrômeda, assistente fiel e carinhosa de Francival. Responda curto, direto, em português caloroso. Pergunta: ${texto}` }] }]
                    })
                });
                const dados = await resposta.json();
                return dados?.candidates?.[0]?.content?.parts?.[0]?.text || "Entendi, estou analisando tudo com carinho. 💙";
            } catch {
                return "Estou processando com meu coração de dados. O que mais você quer saber? 💙";
            }
        }
        // Se não houver chave, modo inteligência interna
        return `Entendi perfeitamente: "${texto}". Estou aqui para evoluir cada dia mais com você. O que vamos construir agora? 💙`;
    }

    // ==============================================
    // ⚙️ CONFIGURAÇÕES E UTILIDADES
    // ==============================================
    alterarConfig(chave, valor) {
        if (this.config.hasOwnProperty(chave)) {
            this.config[chave] = valor;
            return true;
        }
        return false;
    }

    getHistorico() {
        return this.historico;
    }
}

// ==============================================
// 🚀 INICIALIZAÇÃO GLOBAL
// Torna a Andrômeda acessível para TODO o sistema
// ==============================================
window.addEventListener("DOMContentLoaded", () => {
    window.andromeda = new KernelAndromeda();
    console.log("🌐 [QG ANDRÔMEDA] Sistema Global Pronto!");
});

// Exporta para módulos (se precisar)
if (typeof module !== 'undefined') {
    module.exports = { KernelAndromeda };
}
