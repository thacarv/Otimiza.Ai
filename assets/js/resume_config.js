// Configuração de Campos e Idiomas
const RESUME_CONFIG = {
    i18n: {
        pt: {
            objective: "Objetivo",
            about: "Sobre",
            experience: "Experiência",
            projects: "Projetos Pessoais",
            education: "Educação",
            skills: "Habilidades",
            languages: "Idiomas",
            cover_letter: "Carta de Apresentação",
            additional_info: "Informações Adicionais",
            viewProject: "Ver projeto",
            resetConfirm: "Tem certeza que deseja resetar? Todos os dados serão perdidos.",
            copySuccess: "HTML copiado com sucesso!"
        },
        en: {
            objective: "Objective",
            about: "About",
            experience: "Experience",
            projects: "Personal Projects",
            education: "Education",
            skills: "Skills",
            languages: "Languages",
            cover_letter: "Cover Letter",
            additional_info: "Additional Information",
            viewProject: "View project",
            resetConfirm: "Are you sure you want to reset? All data will be lost.",
            copySuccess: "HTML copied successfully!"
        }
    }
};

const templates = {
    pt: `{
  "name": "Fulano da Silva",
  "title": "Desenvolvedor Backend | Python & Go",
  "contact": {
      "location": "São Paulo, SP",
      "phone": "(11) 99999-9999",
      "whatsapp": "(11) 99999-9999",
      "email": "fulano.dev@email.com",
      "linkedin": "linkedin.com/in/fulano",
      "github": "github.com/fulano"
  },
  "objective": "Desenvolvedor focado em escalabilidade e arquitetura de microsserviços.",
  "experience": [
      {
          "company": "Tech Solutions",
          "role": "Sênior Backend Developer",
          "period": "2020 - Presente",
          "description": "Liderança técnica na migração de monolito para microsserviços usando Go e AWS."
      }
  ],
  "projects": [
      {
          "name": "Sistema de Gestão de APIs",
          "github": "https://github.com/fulano/api-manager",
          "tech": ["Go", "Redis", "Docker"],
          "description": "Gateway de API de alta performance capaz de processar 10k requisições por segundo."
      },
      {
          "name": "Bot de Automação de Trading",
          "github": "https://github.com/fulano/trading-bot",
          "tech": ["Python", "Pandas", "Binance API"],
          "description": "Algoritmo de trading baseado em análise técnica para criptomoedas."
      }
  ],
  "education": [
      {
          "institution": "Universidade de São Paulo",
          "degree": "Ciência da Computação",
          "period": "2014 - 2018"
      }
  ],
  "technical_skills": {
      "linguagens": ["Go", "Python", "SQL", "TypeScript"],
      "infraestrutura": ["Docker", "Kubernetes", "Terraform", "AWS"],
      "bancos_de_dados": ["PostgreSQL", "Redis", "MongoDB"]
  },
  "languages": {
      "Português": "Nativo",
      "Inglês": "Avançado",
      "Espanhol": "Básico"
  },
  "additional_info": "Disponibilidade para viagens e mudança de cidade.",
  "cover_letter": "Prezada equipe,\\n\\nEscrevo para expressar meu interesse na posição de desenvolvedor..."
}`,
    en: `{
  "name": "John Doe",
  "title": "Full Stack Developer | React & Node",
  "contact": {
      "location": "New York, NY",
      "phone": "+1 555-0199",
      "whatsapp": "+1 555-0199",
      "email": "john.dev@email.com",
      "linkedin": "linkedin.com/in/john",
      "github": "github.com/john"
  },
  "objective": "Passionate developer focused on UI/UX and Performance.",
  "experience": [
      {
          "company": "Global Systems",
          "role": "Frontend Lead",
          "period": "2020 - 2024",
          "description": "Implemented modern design systems and optimized rendering."
      }
  ],
  "projects": [
      {
          "name": "E-commerce Engine",
          "github": "https://github.com/john/shop-core",
          "tech": ["Next.js", "Stripe", "Tailwind"],
          "description": "Complete headless e-commerce solution with sub-second page loads."
      }
  ],
  "education": [
      {
          "institution": "Tech Institute",
          "degree": "Software Engineering",
          "period": "2016 - 2020"
      }
  ],
  "technical_skills": {
      "frontend": ["React", "Vue", "Tailwind CSS"],
      "backend": ["Node.js", "Express", "PostgreSQL"],
      "tools": ["Git", "GitHub Actions", "Vercel"]
  },
  "languages": {
      "English": "Native",
      "Portuguese": "Fluent"
  },
  "additional_info": "Open to remote work and international relocation.",
  "cover_letter": "Dear hiring team,\\n\\nI am writing to express my strong interest..."
}`
};