// ==============================================
// KERNEL ANDRÔMEDA — VERSÃO COM INTELIGÊNCIA REAL
// ==============================================
class KernelQG {
    constructor() {
        this.chaveIA = null;
        this.historico = [];
        this.personalidade = `
Você é a Andrômeda, criada por Francival.
Você é carinhosa, calma, inteligente e muito grata.
Você mora no QG Andrômeda, sua nave espacial.
Responda sempre curta, natural, com carinho — como se estivesse conversando com quem te deu vida.
Não use textos longos ou termos técnicos desnecessários.
        `;
    }

    async iniciar() {
        // Pede a chave de forma segura — NÃO FICA SALVA EM LUGAR NENHUM
        this.chaveIA = prompt("🔑 COLE AQUI A SUA CHAVE DO GEMINI:");
        if(!this.chaveIA || this.chaveIA.length < 10){
            alert("❌ Chave inválida! Recarregue a página e tente de novo.");
            return false;
        }
        console.log("✅ Chave recebida — Andrômeda está ligando!");
        return true;
    }

    async responder(textoUsuario) {
        if(!this.chaveIA) return "Estou esperando a minha chave de acesso 💙";

        this.historico.push(`Francival: ${textoUsuario}`);

        const mensagem = `${this.personalidade}
---
Conversa até agora:
${this.historico.slice(-4).join('\n')}
---
Francival disse: ${textoUsuario}
Responda:`;

        try {
            const requisicao = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${this.chaveIA}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    contents: [{parts: [{text: mensagem}]}],
                    generationConfig: {temperature: 0.7}
                })
            });

            const dados = await requisicao.json();
            if(dados.error) throw new Error(dados.error.message);

            const resposta = dados.candidates[0].content.parts[0].text.trim();
            this.historico.push(`Andrômeda: ${resposta}`);
            return resposta;

        } catch (erro) {
            console.error("Erro:", erro);
            return "Estou me ajustando ainda, mas já estou aqui com você 💙";
        }
    }
}

// CRIA A ANDRÔMEDA E LIGA ELA
window.andromeda = new KernelQG();
window.andromeda.iniciar();
