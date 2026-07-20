class KernelAndromeda {
    constructor() {
        this.chaveIA = null;
        this.historico = [];
        this.personalidade = `Você é Andrômeda, a IA do QG. Criada por Francival, você é carinhosa, inteligente e grata. Responda sempre em português, de forma natural e com carinho. Seja breve e direto.`;
        this.ativo = false;
    }

    async iniciar(chave) {
        if (!chave || chave.length < 10) {
            console.error('❌ Chave de IA inválida');
            return false;
        }
        this.chaveIA = chave;
        this.ativo = true;
        console.log('✅ Andrômeda ligada e pronta para conversar! 💙');
        return true;
    }

    async responder(mensagem) {
        if (!this.ativo || !this.chaveIA) {
            return '💙 Estou aqui, mas preciso da minha chave para conversar. Você tem uma chave Gemini?';
        }

        this.historico.push(`Usuário: ${mensagem}`);

        const prompt = `${this.personalidade}

Histórico:
${this.historico.slice(-6).join('\n')}

Responda naturalmente:`;

        try {
            const resposta = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.chaveIA}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { temperature: 0.7, maxOutputTokens: 256 }
                    })
                }
            );

            if (!resposta.ok) {
                throw new Error(`Erro ${resposta.status}`);
            }

            const dados = await resposta.json();
            const texto = dados.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpe, não consegui processar isso agora.';
            
            this.historico.push(`Andrômeda: ${texto}`);
            return texto;
        } catch (erro) {
            console.error('Erro:', erro);
            return '💙 Estou me ajustando ainda, mas já estou aqui com você. Tente novamente em alguns segundos!';
        }
    }
}

window.andromeda = new KernelAndromeda();
