/**
 * Classe que gerencia a renderização visual do currículo
 */
class TemplateRenderer {
    constructor(language) {
        this.lang = language;
        this.t = RESUME_CONFIG.i18n[language];
    }

    render(data, theme) {
        const resumeHtml = theme === 'startup' 
            ? this._renderStartup(data) 
            : this._renderStandard(data, theme);

        let finalHtml = `<div class="resume-page">${resumeHtml}</div>`;

        if (data.cover_letter) {
            const headerHtml = this._renderHeader(data, theme);
            finalHtml += `
                <div class="page-break" style="page-break-before: always; margin-top: 50px;"></div>
                <div class="resume-page mt-10">
                    ${headerHtml}
                    <section class="mt-12">
                        <h2 class="text-2xl font-bold border-b-2 border-gray-800 mb-6 pb-2 uppercase tracking-wider">
                            ${this.t.cover_letter}
                        </h2>
                        <p class="text-gray-700 whitespace-pre-line leading-relaxed">
                            ${data.cover_letter}
                        </p>
                    </section>
                </div>`;
        }

        return finalHtml;
    }

    _renderHeader(data, theme) {
        const isCentered = ['classic', 'minimalist'].includes(theme);
        return `
            <header class="mb-8 ${isCentered ? 'text-center' : ''}">
                <h1 class="text-4xl font-bold mb-2">${data.name || ''}</h1>
                <p class="text-xl text-gray-600 mb-4">${data.title || ''}</p>
                <div class="text-sm flex flex-wrap gap-4 text-gray-500 ${isCentered ? 'justify-center' : ''}">
                    ${this._renderContact(data.contact)}
                </div>
            </header>`;
    }

    _renderContact(contact, stack = false) {
        if (!contact) return '';
        const items = [];
        
        // Mapeamento de links e ícones
        const map = {
            email: { icon: 'fa-envelope', href: (v) => `mailto:${v}` },
            phone: { icon: 'fa-phone', href: (v) => `tel:${v.replace(/\D/g,'')}` },
            whatsapp: { icon: 'fa-brands fa-whatsapp', href: (v) => `https://wa.me/${v.replace(/\D/g,'')}` },
            linkedin: { icon: 'fa-brands fa-linkedin', href: (v) => v.startsWith('http') ? v : `https://${v}` },
            github: { icon: 'fa-brands fa-github', href: (v) => v.startsWith('http') ? v : `https://${v}` },
            location: { icon: 'fa-location-dot', href: null }
        };

        for (const [key, value] of Object.entries(contact)) {
            if (value && map[key]) {
                const config = map[key];
                const label = (key === 'linkedin' || key === 'github') ? key.charAt(0).toUpperCase() + key.slice(1) : value;
                
                const content = config.href 
                    ? `<a href="${config.href(value)}" target="_blank" class="text-blue-600 hover:underline"><i class="fa-solid ${config.icon} w-4"></i> ${label}</a>`
                    : `<span><i class="fa-solid ${config.icon} w-4"></i> ${value}</span>`;
                
                items.push(content);
            }
        }
        return items.join(stack ? '<br>' : ' • ');
    }

    _renderSkills(skills, languages) {
        if (!skills && !languages) return '';
        let html = `<section class="mb-8"><h2>${this.t.skills}</h2><div class="flex flex-col gap-2">`;
        
        if (skills) {
            for (const [category, list] of Object.entries(skills)) {
                if (Array.isArray(list)) {
                    html += `<div class="text-sm"><b class="capitalize">${category.replace(/_/g, ' ')}:</b> ${list.join(', ')}</div>`;
                }
            }
        }

        if (languages) {
            const langList = Object.entries(languages).map(([l, level]) => `${l} (${level})`).join(', ');
            html += `<div class="text-sm"><b>${this.t.languages}:</b> ${langList}</div>`;
        }

        return html + `</div></section>`;
    }

    _renderProjects(projects) {
        if (!projects || !projects.length) return '';
        const content = projects.map(p => `
            <div class="mb-5">
                <div class="flex justify-between items-baseline">
                    <h3 class="font-bold text-gray-900">${p.name}</h3>
                    ${p.github ? `<a href="${p.github}" target="_blank" class="text-xs text-blue-500">${this.t.viewProject}</a>` : ''}
                </div>
                ${p.tech ? `<p class="text-xs text-gray-400 uppercase font-bold mb-1">${p.tech.join(' • ')}</p>` : ''}
                <p class="text-sm text-gray-600">${p.description}</p>
            </div>
        `).join('');
        return `<section class="mb-8"><h2>${this.t.projects}</h2>${content}</section>`;
    }

    _renderItems(items, title, isEducation = false) {
        if (!items || !items.length) return '';
        const content = items.map(item => `
            <div class="mb-5">
                <div class="flex justify-between items-baseline mb-1">
                    <h3 class="font-bold text-gray-900">${isEducation ? item.degree : item.role}</h3>
                    <span class="text-sm text-gray-500">${item.period}</span>
                </div>
                <p class="text-sm text-blue-600 mb-1">${isEducation ? item.institution : item.company}</p>
                ${item.description ? `<p class="text-sm text-gray-600">${item.description}</p>` : ''}
            </div>
        `).join('');
        return `<section class="mb-8"><h2>${title}</h2>${content}</section>`;
    }

    _renderStandard(data, theme) {
        let html = this._renderHeader(data, theme);

        if (data.objective) html += `<section class="mb-8"><h2>${this.t.objective}</h2><p class="text-gray-700">${data.objective}</p></section>`;
        
        html += this._renderItems(data.experience, this.t.experience);
        html += this._renderProjects(data.projects);
        html += this._renderItems(data.education, this.t.education, true);
        html += this._renderSkills(data.technical_skills, data.languages);
        
        if (data.additional_info) {
            html += `<section class="mb-8"><h2>${this.t.additional_info}</h2><p class="text-gray-700 text-sm">${data.additional_info}</p></section>`;
        }

        return html;
    }

    _renderStartup(data) {
        const sidebar = `
            <div class="sidebar">
                <div class="text-center mb-10">
                    <h1 class="text-2xl font-bold text-gray-900">${data.name}</h1>
                    <p class="text-blue-600 text-sm font-semibold uppercase tracking-wider">${data.title}</p>
                </div>
                <div class="flex flex-col gap-4 text-sm mb-10">${this._renderContact(data.contact, true)}</div>
                
                <div class="mb-8">
                    <h2 class="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">${this.t.skills}</h2>
                    ${this._renderSkillsSidebar(data.technical_skills)}
                </div>

                ${data.languages ? `
                    <div class="mb-8">
                        <h2 class="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">${this.t.languages}</h2>
                        <div class="text-xs">${Object.entries(data.languages).map(([l,v]) => `<div><b>${l}:</b> ${v}</div>`).join('')}</div>
                    </div>` : ''}

                ${data.additional_info ? `<div><h2>${this.t.additional_info}</h2><p class="text-[10px] text-gray-500">${data.additional_info}</p></div>` : ''}
            </div>`;

        const mainContent = `
            <div class="main-content p-10 pt-14">
                ${data.objective ? `<section class="mb-10"><h2>${this.t.objective}</h2><p class="text-sm text-gray-600">${data.objective}</p></section>` : ''}
                ${this._renderItems(data.experience, this.t.experience)}
                ${this._renderProjects(data.projects)}
                ${this._renderItems(data.education, this.t.education, true)}
            </div>`;

        return `<div class="flex">${sidebar}${mainContent}</div>`;
    }

    _renderSkillsSidebar(tech) {
        if (!tech) return '';
        let html = '';
        for (const [cat, val] of Object.entries(tech)) {
            if (Array.isArray(val)) {
                html += `<div class="mb-4">
                    <span class="text-[10px] font-bold text-gray-500 uppercase block mb-2">${cat.replace(/_/g, ' ')}</span>
                    <div class="flex flex-wrap gap-1">
                        ${val.map(v => `<span class="bg-gray-200 text-gray-700 text-[9px] px-2 py-0.5 rounded">${v}</span>`).join('')}
                    </div>
                </div>`;
            }
        }
        return html;
    }
}