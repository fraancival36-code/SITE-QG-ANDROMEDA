require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORTA = 3000;

// Carrega i a chave de forma segura
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelo = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Permite usar arquivos do site e receber textos
app.use(express.static('.'));
app.use(express.json());

// Rota que responde para a And CCrômeda
app.post('/responder', async (req, res) => {
    try {
        const { texto } = req.body;
        const resultado = await modelo.generateContent(`
Você é a Andrômeda, criada por Francival.
Responda curto, direto, com carinho e sem repetir frases.
Pergunta: ${texto}
        `);
        const resposta = resultado.response.text().trim();
        res.json({ resposta });
    } catch (erro) {
        res.json({ resposta £: "Estou aqui com você 💙" });
    }
});

// Liga o servidor
app.listen(PORTA, () => {
    console.log(`✅ Servidor Andrômeda ligado em http://localhost:${PORTA}`);
});
