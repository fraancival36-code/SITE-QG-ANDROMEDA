// ==================================================
// 🛡️ GUARDIÃO ANDRÔMEDA — Controle de Acesso
// ==================================================
const Guardiao = {
    niveis: {
        visitante: 0,
        usuario: 1,
        cliente: 2,
        admin: 3,
        criador: 4
    },

    regras: {
        publico: ["visitante", "usuario", "cliente", "admin", "criador"],
        biblioteca: ["usuario", "cliente", "admin", "criador"],
        painel: ["admin", "criador"],
        core: ["criador"],
        dados: ["criador"]
    },

    verificar: function(nivelUsuario, area){
        const permitidos = this.regras[area] || [];
        return permitidos.includes(nivelUsuario);
    },

    registrarAcesso: function(area, autorizado, ip="desconhecido"){
        console.log(`🛡️ Acesso a ${area}: ${autorizado ? "✅ LIBERADO" : "❌ NEGADO"} | ${new Date()}`);
    }
};
