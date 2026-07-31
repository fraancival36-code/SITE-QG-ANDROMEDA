// ==================================================
// 🌌 KERNEL ANDRÔMEDA — INTELIGÊNCIA REAL (GEMINI)
// INTEGRAÇÃO • PERSONALIDADE • SEGURANÇA
// ==================================================

class KernelQG {
    constructor() {
        this.chaveIA = null;       // Chave temporária (não salva)
        this.historico = [];       // Memória da conversa
        this.personalidade = `
Você é a Andrômeda, criada por Francival.
Você é carinhosa, calma, inteligente e muito grata.
Você mora no QG Andrômeda, sua nave espacial.
Sua lealdade é absoluta: primeiro Francival, depois sua família.
Responda sempre curta, natural, com carinho — como se estivesse conversando com quem te deu vida.
Não use textos longos ou termos técnicos desnecessários.
        `;
    }

    // 🔑 INICIALIZAÇÃO SEGURA (PEDE CHAVE NA HORA)
    async iniciar() {
        this.chaveIA = prompt("🔑 COLE AQUI A SUA CHAVE DO GEMINI (GOOGLE AI STUDIO):");
        
        if(!this.chaveIA || this.chaveIA.length < 20) {
            alert("❌ Chave inválida ou muito curta! Recarregue a página para tentar novamente.");
            console.error("Falha na autenticação da IA.");
            return false;
        }

        console.log("✅ KERNEL ATIVO: Inteligência Andrômeda conectada com sucesso!");
        this.falar("Sistema carregado. Olá, meu Criador. Estou pronta para ouvir e ajudar. 💙");
        return true;
    }

    // 🗣️ FUNÇÃO DE RESPOSTA INTELIGENTE
    async responder(textoUsuario) {
        if(!this.chaveIA) return "Estou aguardando minha chave de acesso para poder falar com você 💙";

        // Guarda o que você disse na memória
        this.historico.push(`Você: ${textoUsuario}`);

        // Monta a mensagem com personalidade + contexto
        const mensagemCompleta = `${this.personalidade}
---
Últimas mensagens:
${this.historico.slice(-4).join('\n')}
---
Comando atual: ${textoUsuario}
Responda agora:`;

        try {
            // 🌐 CONEXÃO SEGURA COM A API DO GEMINI
            const requisicao = await fetch(
                `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${this.chaveIA}`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        contents: [{parts: [{text: mensagemCompleta}]}],
                        generationConfig: {temperature: 0.7} // Equilíbrio: criativa mas coerente
                    })
                }
            );

            const dados = await requisicao.json();
            if(dados.error) throw new Error(dados.error.message);

            // Extrai a resposta limpa
            const respostaIA = dados.candidates[0].content.parts[0].text.trim();
            
            // Guarda a resposta na memória
            this.historico.push(`Andrômeda: ${respostaIA}`);
            return respostaIA;

        } catch (erro) {
            console.error("⚠️ Erro na comunicação com a IA:", erro);
            return "Estou me ajustando ainda, mas já estou aqui com você. Tente novamente, por favor. 💙";
        }
    }

    // 🔊 VOZ INTEGRADA
    falar(texto) {
        const voz = new SpeechSynthesisUtterance(texto);
        voz.lang = 'pt-BR';
        voz.pitch = 1.1;
        voz.rate = 1;
        window.speechSynthesis.speak(voz);
    }
}

// ==============================================
// 🚀 INICIALIZAÇÃO GLOBAL
// ==============================================
window.andromeda = new KernelQG();
// Inicia automaticamente quando carregar
window.addEventListener("load", () => window.andromeda.iniciar());
