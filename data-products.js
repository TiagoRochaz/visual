// Dados dos produtos e categorias
const productsData = {
    'isolantes-termicos': {
        categoryName: 'Isolantes Térmicos',
        categoryImage: 'assets/images/teste.png',
        categoryDescription: 'Fornecemos materiais de alta performance para cada tipo de aplicação, garantindo a máxima eficiência para o seu projeto.',
        products: {
            'la-de-rocha': {
                name: 'Lã de Rocha',
                image: 'assets/images/montagemiso.png',
                summary: 'Ideal para isolamento de altas temperaturas, como linhas de vapor e caldeiras.',
                description: 'A Lã de Rocha é um material incombustível de alta performance, ideal para o isolamento térmico e acústico em aplicações industriais de alta temperatura. Suporta picos de até 1000°C, garantindo segurança e eficiência.',
                specs: {
                    'Temperatura de Operação': '-200°C a 750°C',
                    'Densidade': '32 a 160 kg/m³',
                    'Aplicações Típicas': 'Tubulações de vapor, caldeiras, fornos, estufas.'
                },
                gallery: ['assets/images/montagemiso.png']
            },
            'poliuretano': {
                name: 'Poliuretano (PU)',
                image: 'assets/images/teste.png',
                summary: 'Solução de alto desempenho para isolamento de baixas temperaturas e sistemas de refrigeração.',
                description: 'O Poliuretano (PU) é um dos isolantes térmicos mais eficientes para baixas temperaturas. Sua estrutura de células fechadas impede a passagem de calor e a condensação, sendo a escolha ideal para linhas de amônia, glicol e câmaras de resfriados.',
                specs: {
                    'Temperatura de Operação': '-50°C a 110°C',
                    'Densidade': '35 a 40 kg/m³',
                    'Aplicações Típicas': 'Linhas de refrigeração, câmaras de resfriados, tanques de água gelada.'
                },
                gallery: ['assets/images/teste.png']
            },
             'fibra-ceramica': {
                name: 'Fibra Cerâmica',
                image: 'https://placehold.co/600x400/a3a3a3/ffffff?text=Fibra+Cerâmica',
                summary: 'Para temperaturas extremamente altas, ideal para fornos e equipamentos especiais.',
                description: 'A Fibra Cerâmica é um material refratário leve e de baixa condutividade térmica, projetado para suportar temperaturas superiores a 1200°C. É fornecida em mantas, placas ou módulos.',
                specs: {
                    'Temperatura de Operação': 'Até 1400°C',
                    'Formatos': 'Mantas, Placas, Módulos',
                    'Aplicações Típicas': 'Revestimento de fornos, carros-forno, portas corta-fogo.'
                },
                gallery: ['https://placehold.co/600x400/a3a3a3/ffffff?text=Fibra+Cerâmica']
            },
            'espuma-elastomerica': {
                name: 'Espuma Elastomérica',
                image: 'https://placehold.co/600x400/3b82f6/ffffff?text=Espuma',
                summary: 'Flexível e eficiente, ideal para sistemas de ar condicionado e refrigeração comercial.',
                description: 'A Espuma Elastomérica é um isolante flexível com excelente resistência à difusão de vapor de água, o que a torna perfeita para evitar a condensação em sistemas de ar condicionado e refrigeração.',
                specs: {
                    'Temperatura de Operação': '-50°C a 105°C',
                    'Formatos': 'Tubos, Mantas',
                    'Aplicações Típicas': 'Sistemas de HVAC, tubulações de água gelada, refrigeração comercial.'
                },
                gallery: ['https://placehold.co/600x400/3b82f6/ffffff?text=Espuma']
            }
        }
    },
    'isopaineis': {
        categoryName: 'Isopainéis e Acessórios',
        categoryImage: 'assets/images/teste.png',
        categoryDescription: 'Soluções modulares e eficientes para a construção de ambientes com temperatura controlada.',
        products: {
            'painel-eps': {
                name: 'Painel Isotérmico (EPS)',
                image: 'assets/images/montagemiso.png',
                summary: 'Excelente custo-benefício para câmaras de resfriados e congelados.',
                description: 'Os painéis com núcleo de Poliestireno Expandido (EPS) são uma solução versátil e econômica para a construção de câmaras frias. Oferecem ótimo isolamento térmico e são leves, facilitando a montagem.',
                specs: {
                    'Núcleo': 'EPS (Poliestireno Expandido)',
                    'Espessuras': '50mm a 250mm',
                    'Aplicações Típicas': 'Câmaras de resfriados, túneis de congelamento, fachadas.'
                },
                gallery: ['assets/images/montagemiso.png']
            },
            'painel-pir': {
                name: 'Painel Isotérmico (PIR)',
                image: 'assets/images/teste.png',
                summary: 'Máxima segurança e eficiência, com propriedade retardante a chamas.',
                description: 'Os painéis com núcleo de Poliisocianurato (PIR) são a escolha ideal para projetos que exigem o mais alto nível de segurança contra incêndio, sem abrir mão do excelente desempenho térmico. São aprovados pelas seguradoras mais exigentes.',
                specs: {
                    'Núcleo': 'PIR (Poliisocianurato)',
                    'Espessuras': '50mm a 200mm',
                    'Aplicações Típicas': 'Indústrias com alta exigência de segurança, centros de distribuição, áreas com risco de incêndio.'
                },
                gallery: ['assets/images/teste.png']
            },
            'porta-frigorifica': {
                name: 'Porta Frigorífica',
                image: 'https://placehold.co/600x400/9ca3af/ffffff?text=Porta+Frigorífica',
                summary: 'Portas de correr ou de giro para garantir a vedação e o fácil acesso à sua câmara fria.',
                description: 'Fornecemos portas frigoríficas robustas e eficientes, com núcleo isolante e vedação de alta qualidade para evitar a perda de frio e garantir a higiene do ambiente.',
                specs: {
                    'Tipos': 'De Correr, De Giro',
                    'Núcleo': 'PUR ou PIR',
                    'Aplicações': 'Câmaras frias, docas climatizadas, antecâmaras.'
                },
                gallery: ['https://placehold.co/600x400/9ca3af/ffffff?text=Porta+Frigorífica']
            },
            'perfis-acabamento': {
                name: 'Perfis de Acabamento',
                image: 'https://placehold.co/600x400/d1d5db/ffffff?text=Perfis',
                summary: 'Cantoneiras, perfis U e outros acabamentos para uma instalação perfeita.',
                description: 'Oferecemos uma linha completa de perfis de acabamento em aço pré-pintado para a montagem de painéis, garantindo uma instalação esteticamente agradável, higiênica e com vedação perfeita.',
                specs: {
                    'Tipos': 'Cantoneira Interna/Externa, Perfil U, Perfil L',
                    'Material': 'Aço pré-pintado branco',
                    'Aplicações': 'Arremate de cantos, pisos e tetos em câmaras frias.'
                },
                gallery: ['https://placehold.co/600x400/d1d5db/ffffff?text=Perfis']
            }
        }
    }
};