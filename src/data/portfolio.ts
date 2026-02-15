export interface Project {
    title: string
    description: string
    tags: string[]
    github: string
    demo?: string
    category: 'ai' | 'research' | 'visualization'
    featured: boolean
}

export interface Experience {
    role: string
    company: string
    period: string
    description: string[]
    type: 'intern' | 'freelance' | 'organization'
}

export interface Certification {
    title: string
    issuer: string
    year: string
    topics?: string[]
}

export const profile = {
    name: 'Darrell Rafif Kenzie',
    role: 'Data Scientist',
    tagline: 'Transforming complex data into strategic insights.',
    bio: 'A skilled Data Science undergraduate student in end-to-end analysis, transforming complex data into strategic insights. Experienced in designing innovative metrics to answer fundamental questions and enthusiastic about applying these skills to support data-driven policy formulation.',
    location: 'Medan, Sumatera Utara',
    email: 'darelrafif.kz@gmail.com',
    phone: '087777618696',
    university: 'University of Muhammadiyah North Sumatra',
    degree: 'S1 Data Science',
    gpa: '3.6/4.0',
    startYear: 2023,
    links: {
        linkedin: 'https://www.linkedin.com/in/darrell-rafif-kenzie-914037288/',
        github: 'https://github.com/Darelrk',
        medium: 'https://medium.com/@darelrafif.kz',
    },
}

export const skills = {
    hard: [
        { name: 'Python', category: 'Programming' },
        { name: 'Pandas', category: 'Programming' },
        { name: 'NumPy', category: 'Programming' },
        { name: 'Web Scraping', category: 'Programming' },
        { name: 'SQL', category: 'Programming' },
        { name: 'Looker Studio', category: 'Visualization & BI' },
        { name: 'Microsoft Excel', category: 'Visualization & BI' },
        { name: 'SAP Analytics Cloud', category: 'Visualization & BI' },
        { name: 'n8n', category: 'Automation' },
    ],
    soft: [
        'Analytical Thinking',
        'Problem-Solving',
        'Detail-Oriented',
        'Data Storytelling',
        'Initiative & Self-Learning',
        'Communication',
    ],
}

export const projects: Project[] = [
    {
        title: 'Tabular Synthesis LLM',
        description:
            'Research on using Large Language Models for tabular data synthesis, exploring novel approaches to generate realistic synthetic datasets.',
        tags: ['Python', 'LLM', 'Data Synthesis', 'Machine Learning'],
        github: 'https://github.com/Darelrk/Tabular-Synthesis-LLM',
        category: 'ai',
        featured: true,
    },
    {
        title: 'MAE Hybrid Imputation Study',
        description:
            'A study on hybrid imputation methods using Masked Autoencoders for handling missing data in complex datasets.',
        tags: ['Python', 'Deep Learning', 'MAE', 'Data Imputation'],
        github: 'https://github.com/Darelrk/mae-hybrid-imputation-study',
        category: 'research',
        featured: true,
    },
    {
        title: 'Dashboard Analisis Universitas LPDP',
        description:
            'Interactive dashboard to assist prospective students in making strategic university decisions. Features a custom "Hidden Gem Score" metric.',
        tags: ['Looker Studio', 'Pandas', 'Data Visualization'],
        github:
            'https://github.com/Darelrk/Dashboard-Analisis-Universitas-LPDP',
        category: 'visualization',
        featured: false,
    },
]

export const experiences: Experience[] = [
    {
        role: 'Data Management & Automation Intern',
        company: 'PT PLN (Persero) ULP Medan Baru',
        period: 'Sep 2025',
        description: [
            'Developed automated workflows using n8n to reduce manual entry time.',
            'Executed data validation on customer records from the AP2T system.',
            'Collaborated with the technical team to verify and reconcile data.',
        ],
        type: 'intern',
    },
    {
        role: 'Blockchain QA & Data Tester',
        company: 'Remote (Freelance)',
        period: 'Jan 2024 – Present',
        description: [
            'Tested 10+ early-stage blockchain protocols (testnet & mainnet).',
            'Analyzed complex technical documentation for dApps & smart contracts.',
            'Tracked thousands of on-chain transactions via block explorers.',
        ],
        type: 'freelance',
    },
    {
        role: 'Member, R&D Division',
        company: 'HIMASDA (Data Science Student Association)',
        period: '2024 – Present',
        description: [
            'Active in the Research & Development division of the Data Science Student Association.',
        ],
        type: 'organization',
    },
]

export const certifications: Certification[] = [
    {
        title: 'Intermediate Data Science',
        issuer: 'Fresh Graduate Academy – Digital Talent Scholarship',
        year: '2025',
        topics: [
            'Data Screening',
            'Model Design',
            'Implementation',
            'Evaluation',
        ],
    },
    {
        title: 'ASEAN Data Science Explorers (ADSE)',
        issuer: 'ADSE Enablement Session',
        year: '2024',
        topics: ['SAP Analytics Cloud', 'SAP Build Apps'],
    },
]
