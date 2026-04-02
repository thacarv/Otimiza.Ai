// Inicialização Global
const app = new ResumeApp();

// Mapeamento de funções globais
window.goToStep = (s) => app.goToStep(s);
window.setLanguage = (l) => app.setLanguage(l);
window.processJson = () => app.processJson();
window.changeTheme = () => app.updatePreview();
window.copyHtml = () => app.copyHtml();
window.restartApp = () => app.restart();
window.copyTemplate = () => {
    const tx = document.getElementById('templateTextarea');
    tx.select();
    document.execCommand('copy');
    const btn = document.getElementById('copyText');
    btn.innerText = "copied()";
    setTimeout(() => btn.innerText = "copy()", 2000);
};

// Start
app.goToStep(1);