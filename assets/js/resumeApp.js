/**
 * Orquestrador Principal da Aplicação
 */
class ResumeApp {
    constructor() {
        this.currentData = null;
        this.selectedLang = 'pt';
        this.renderer = new TemplateRenderer(this.selectedLang);
        
        this.init();
    }

    init() {
        console.log("Resume App Initialized");
    }

    setLanguage(lang) {
        this.selectedLang = lang;
        this.renderer = new TemplateRenderer(lang);
        if (typeof templates !== 'undefined') {
            document.getElementById('templateTextarea').value = templates[lang];
        }
        this.goToStep(3);
    }

    goToStep(step) {
        document.querySelectorAll('.step-card').forEach(el => el.classList.add('hidden'));
        const target = document.getElementById(`step-${step}`);
        if (target) target.classList.remove('hidden');
        
        document.getElementById('step-indicator').innerText = `| step ${step}/5`;
        
        const container = document.getElementById('app-container');
        if (step === 5) container.classList.replace('max-w-5xl', 'max-w-7xl');
        else container.classList.replace('max-w-7xl', 'max-w-5xl');
    }

    processJson() {
        const raw = document.getElementById('jsonInput').value;
        const errorEl = document.getElementById('jsonError');
        
        try {
            this.currentData = JSON.parse(raw);
            errorEl.classList.add('hidden');
            
            if (this.currentData.name) {
                document.title = `${this.currentData.name}${this.currentData.title ? ' - ' + this.currentData.title : ''}`;
            }
            
            this.updatePreview();
            this.goToStep(5);
        } catch (e) {
            errorEl.innerText = `[JSON_ERROR] ${e.message}`;
            errorEl.classList.remove('hidden');
        }
    }

    updatePreview() {
        if (!this.currentData) return;
        
        const theme = document.getElementById('themeSelect').value;
        const html = this.renderer.render(this.currentData, theme);
        
        const wrapper = document.getElementById('resume-preview-wrapper');
        const printContainer = document.getElementById('print-container');
        
        // Adiciona estilo de quebra de página inline para garantir funcionamento no print
        const styleInject = `
            <style>
                @media print {
                    .page-break:last-child { display: block; page-break-before: always !important; }
                    .resume-page { min-height: 100vh; }
                }
            </style>
        `;

        const content = `${styleInject}<div class="theme-${theme} min-h-full">${html}</div>`;
        
        wrapper.innerHTML = content;
        printContainer.innerHTML = content;
    }

    copyHtml() {
        const printContent = document.getElementById('print-container').innerHTML;
        const styles = document.querySelector('style').innerHTML;
        const fullDoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${styles}</style><script src="https://cdn.tailwindcss.com"></script></head><body>${printContent}</body></html>`;
        
        const tempInput = document.createElement("textarea");
        tempInput.value = fullDoc;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        
        alert(RESUME_CONFIG.i18n[this.selectedLang].copySuccess);
    }

    restart() {
        if (confirm(RESUME_CONFIG.i18n[this.selectedLang].resetConfirm)) {
            this.currentData = null;
            document.getElementById('jsonInput').value = "";
            this.goToStep(1);
        }
    }
}
