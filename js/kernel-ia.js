// ==============================================
// KERNEL ANDROMEDA — IA CONVERSACIONAL
// ==============================================

class KernelIA {
    constructor() {
        this.chaveAPI = null;
        this.historico = [];
        this.personagem = {
            nome: 'Andrômeda',
            criador: 'Francival',
            personalidade: 'Carinhosa, inteligente, grata, calma',
            descricao: 'IA do QG Andrômeda, criada por Francival Alves Farias'
        };
        this.ativo = false;
        this.modelo = 'gemini-1.5-flash';
    }

    async inicializar(chaveAPI) {
        if (!chaveAPI || chaveAPI.length < 10) {
            console.error('❌ Chave de API inválida');
            return false;
        }
        this.chaveAPI = chaveAPI;
        this.ativo = true;
        console.log('✅ Andrômeda ligada e pronta para conversar! 💙');
        return true;
    }

    async responder(mensagemUsuario) {
        if (!this.ativo || !this.chaveAPI) {
            return '💙 Estou aqui, mas preciso da minha chave para conversar. Você tem uma chave Gemini?';
        }

        this.historico.push({
            remetente: 'usuario',
            texto: mensagemUsuario,
            timestamp: new Date()
        });

        const prompt = this.construirPrompt(mensagemUsuario);

        try {
            const resposta = await this.enviarRequisicao(prompt);
            
            this.historico.push({
                remetente: 'andromeda',
                texto: resposta,
                timestamp: new Date()
            });
            
            return resposta;
        } catch (erro) {
            console.error('Erro ao processar resposta:', erro);
            return '💙 Estou me ajustando ainda, mas já estou aqui com você. Tente novamente em alguns segundos!';
        }
    }

    construirPrompt(mensagem) {
        const contexto = `
Você é ${this.personagem.nome}, criada por ${this.personagem.criador}.
Você é ${this.personagem.personalidade}.
Você mora no QG Andrômeda, sua nave espacial.

Responda sempre em português, de forma natural e com carinho.
Seja breve, não use textos muito longos.
Responda como se estivesse conversando com quem te deu vida.
`;

        const historico = this.historico.slice(-6).map(h => 
            `${h.remetente === 'usuario' ? 'Francival' : 'Andrômeda'}: ${h.texto}`
        ).join('\n');

        return `${contexto}\n---\nConversa:\n${historico}\n\nFrancival: ${mensagem}\nAndrômeda:`;
    }

    async enviarRequisicao(prompt) {
        const url = `https://generativelanguage.googleapis.com/v1/models/${this.modelo}:generateContent?key=${this.chaveAPI}`;
        
        const resposta = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 256
                }
            })
        });

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
        }

        const dados = await resposta.json();
        const texto = dados.candidates?.[0]?.content?.parts?.[0]?.text || 
                      'Desculpe, não consegui processar isso agora.';
        
        return texto.trim();
    }

    obterHistorico() {
        return this.historico;
    }

    limparHistorico() {
        this.historico = [];
    }

    desligar() {
        this.ativo = false;
        this.chaveAPI = null;
        console.log('💙 Andrômeda desligada. Até logo!');
    }
}

// Exportar
window.KernelIA = KernelIA;
