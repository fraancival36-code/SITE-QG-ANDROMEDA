// ==================================================
// 🧠 NÚCLEO CENTRAL ANDRÔMEDA — Orquestrador Inteligente
// Versão: 2.1.0 | Decisão, Permissões Específicas, Tarefas e Identidade
// ==================================================

const AndromedaCore = {
    versao: "2.1.0",
    status: "ATIVO",
    dataInicio: new Date(),
    
    // ==============================================
    // 👤 IDENTIDADE E NÍVEIS DE USUÁRIOS
    // ==============================================
    usuarios: [
        { id: "USR001", nome: "Visitante", nivel: "visitante", ativo: true },
        { id: "USR002", nome: "Usuário Comum", nivel: "usuario", ativo: true },
        { id: "USR003", nome: "Cliente", nivel: "cliente", ativo: true },
        { id: "USR004", nome: "Administrador", nivel: "admin", ativo: true },
        { id: "USR005", nome: "Criador", nivel: "criador", ativo: true }
    ],

    // ==============================================
    // 🔒 REGRAS DE PERMISSÃO POR MÓDULO
    // ==============================================
    permissoes: {
        nucleo: ["criador"],
        gestao: ["admin", "criador"],
        mobilidade: ["usuario", "cliente", "admin", "criador"],
        conteudo: ["usuario", "cliente", "admin", "criador"],
        emergencia: ["visitante", "usuario", "cliente", "admin", "criador"],
        industria: ["admin", "criador"],
        comercio: ["visitante", "usuario", "cliente", "admin", "criador"],
        aplicativo: ["visitante", "usuario", "cliente", "admin", "criador"],
        publico: ["visitante", "usuario", "cliente", "admin", "criador"]
    },

    // ==============================================
    // 👥 ASSESSORES ESPECIALIZADOS
    // ==============================================
    assessores: {
        mobilidade: { status: "ONLINE", nome: "Assessor de Mobilidade" },
        conteudo: { status: "ONLINE", nome: "Assessor de Conteúdo e Biblioteca" },
        emergencia: { status: "ONLINE", nome: "Assessor de Emergência" },
        industria: { status: "ONLINE", nome: "Assessor Técnico e Industrial" },
        comercio: { status: "ONLINE", nome: "Assessor de Comércio e Aqui Tem" },
        aplicativo: { status: "ONLINE", nome: "Assessor de Aplicativo" },
        gestao: { status: "ONLINE", nome: "Assessor de Gestão" }
    },

    // ==============================================
    // 🧠 CÉREBRO DE DECISÃO — DIZ QUAL ASSESSOR CHAMAR
    // ==============================================
    cerebro: {
        analisarPedido: function(pedido){
            const texto = pedido.toLowerCase();
            if(texto.includes("carro") || texto.includes("rota") || texto.includes("corrida")) return "mobilidade";
            if(texto.includes("livro") || texto.includes("licença") || texto.includes("curso")) return "conteudo";
            if(texto.includes("acidente") || texto.includes("socorro") || texto.includes("primeiros")) return "emergencia";
            if(texto.includes("cálculo") || texto.includes("estrutura") || texto.includes("projeto")) return "industria";
            if(texto.includes("venda") || texto.includes("produto") || texto.includes("compra")) return "comercio";
            return "aplicativo";
        }
    },

    // ==============================================
    // 📋 SISTEMA DE TAREFAS E ACOMPANHAMENTO
    // ==============================================
    tarefas: [],
    criarTarefa: function(origem, destino, acao, prioridade="normal"){
        const nova = {
            id: `TASK${Date.now()}`,
            origem, destino, acao, prioridade,
            status: "CRIADA",
            data: new Date()
        };
        this.tarefas.push(nova);
        console.log(`📋 Tarefa ${nova.id} criada para ${destino}`);
        return nova;
    },

    // ==============================================
    // 🔐 CONTROLE DE ACESSO
    // ==============================================
    verificarPermissao: function(nivelUsuario, modulo){
        const permitidos = this.permissoes[modulo] || [];
        return permitidos.includes(nivelUsuario);
    },

    // ==============================================
    // 🗄️ MEMÓRIA CENTRAL SEPARADA
    // ==============================================
    memoria: {
        dadosPrivados: [],
        dadosPublicos: [],
        salvar: function(tipo, informacao){
            if(tipo === "privado") this.dadosPrivados.push({...informacao, hora: new Date()});
            if(tipo === "publico") this.dadosPublicos.push({...informacao, hora: new Date()});
        }
    },

    // ==============================================
    // 📜 HISTÓRICO GERAL
    // ==============================================
    historico: [],

    // ==============================================
    // 🎯 FUNÇÃO PRINCIPAL
    // ==============================================
    processarPedido: function(pedido, nivelUsuario="visitante"){
        const destino = this.cerebro.analisarPedido(pedido);
        
        if(!this.verificarPermissao(nivelUsuario, destino)){
            console.warn("🚫 Acesso negado:", nivelUsuario, "→", destino);
            return {erro: "Sem permissão para acessar esse recurso"};
        }

        if(!this.assessores[destino] || this.assessores[destino].status !== "ONLINE"){
            return {erro: "Serviço temporariamente indisponível"};
        }

        const tarefa = this.criarTarefa("QG", destino, pedido);
        this.historico.push({pedido, destino, nivelUsuario, data: new Date()});
        this.memoria.salvar("privado", {pedido, destino, tarefa});

        console.log(`✅ PEDIDO ENCAMINHADO: ${destino}`);
        return {
            sucesso: true,
            assessor: destino,
            tarefa: tarefa.id,
            mensagem: "Solicitação em andamento"
        };
    },

    // ==============================================
    // 📊 VERIFICAÇÃO GERAL
    // ==============================================
    verificarSistema: function(){
        console.log("🧠 ANDRÔMEDA 2.1.0 — SISTEMA COMPLETO");
        console.log(`Usuários cadastrados: ${this.usuarios.length}`);
        console.log(`Assessores ativos: ${Object.keys(this.assessores).length}`);
        console.log(`Módulos com regras: ${Object.keys(this.permissoes).length}`);
        return true;
    }
};

// ==============================================
// 🚀 INICIALIZAÇÃO
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
    AndromedaCore.verificarSistema();
    console.log("✅ NÚCLEO 2.1 — INTELIGÊNCIA, REGRAS E TAREFAS PRONTAS!");
});

// Exemplo de uso:
// AndromedaCore.processarPedido("Quero calcular uma rota de carro", "usuario");
// AndromedaCore.processarPedido("Quero ver o relatório financeiro", "criador");
