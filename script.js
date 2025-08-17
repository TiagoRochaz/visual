// Envolve todo o script em uma IIFE (Immediately Invoked Function Expression) para evitar poluir o escopo global.
(() => {
    // --- BANCO DE DADOS (OBJETOS JAVASCRIPT) ---
    const servicesData = {
        'paineis-isotermicos': {
            title: 'Montagem de Painéis Isotérmicos',
            image: 'https://images.unsplash.com/photo-1628501899932-26151e356261?q=80&w=1974&auto=format=fit=crop',
            summary: 'Montagem de câmaras frias, salas limpas e fachadas com painéis isotérmicos.',
            gallery: ['https://images.unsplash.com/photo-1516880711640-ef7db81602c6?q=80&w=2070&auto=format=fit=crop', 'https://images.unsplash.com/photo-1621993205994-81c2b_54d4f6a?q=80&w=1932&auto=format=fit=crop', 'https://images.unsplash.com/photo-1587293852726-70cdb120d5ae?q=80&w=2070&auto=format=fit=crop'],
            description: 'Mais do que uma simples montagem, nosso serviço de painéis isotérmicos é uma solução de engenharia completa para ambientes que exigem controle rigoroso de temperatura e higiene. Entendemos que cada grau Celsius economizado e cada padrão sanitário atendido representa um ganho direto para a sua operação. Por isso, nosso foco é entregar um sistema de isolamento que não seja um custo, mas sim um investimento estratégico com retorno garantido.',
            subServices: [
                { title: 'Instalação e Manutenção de Portas Frigoríficas', text: 'Implementamos e realizamos a manutenção de portas de correr e de giro, essenciais para o bom funcionamento e vedação da sua câmara.' },
                { title: 'Remoção e Desmonte Técnico', text: 'Executamos a remoção segura e planejada de painéis existentes para reformas, ampliações ou desmobilização de áreas.' },
                { title: 'Proteção de Alto Impacto', text: 'Aplicamos proteções robustas como chapa de aço xadrez (antiderrapante) em pisos e paredes para proteger os painéis contra impactos de empilhadeiras e carrinhos.' }
            ],
            benefits: [
                { title: 'Economia de Energia de até 30%', text: 'Um sistema bem executado pode reduzir drasticamente o consumo de energia do seu sistema de refrigeração, pagando o investimento ao longo do tempo.' },
                { title: 'Garantia de Qualidade do Produto', text: 'A estabilidade térmica é crucial para a segurança alimentar. Nosso serviço assegura a manutenção da cadeia de frio, protegendo seu produto.' },
                { title: 'Conformidade com Normas', text: 'Nossos projetos seguem as rigorosas normas sanitárias (ANVISA, MAPA), garantindo que sua operação esteja sempre pronta para auditorias.' },
                { title: 'Aumento da Vida Útil', text: 'O uso de materiais de alta performance e acabamentos de proteção aumenta a durabilidade da sua instalação, reduzindo custos de manutenção.' }
            ],
            targetAudience: 'Ideal para frigoríficos, indústrias alimentícias, centros de distribuição, hospitais e laboratórios que necessitam de ambientes com temperatura controlada e alto padrão de higiene.',
            executionTime: 'O tempo de execução varia conforme a complexidade e o tamanho do projeto. Uma câmara de médio porte pode levar de 2 a 4 semanas, enquanto projetos maiores são definidos em um cronograma detalhado junto ao cliente.',
            pricingModel: 'Nosso orçamento é calculado com base na área total (m²) dos painéis, tipo de acabamento, complexidade da montagem e acessórios necessários, como portas e proteções. Oferecemos um valor justo e transparente, detalhando todos os custos envolvidos.'
        },
        'isolamento-tubulacoes': {
            title: 'Isolamento de Tubulações',
            image: 'https://images.unsplash.com/photo-1599228245247-4462503a27a8?q=80&w=2070&auto=format=fit-crop',
            summary: 'Aplicação de poliuretano e lã de rocha para linhas de refrigeração e aquecimento, com acabamento em alumínio.',
            gallery: ['https://images.unsplash.com/photo-1633382108450-25838a84a2b2?q=80&w=1974&auto=format=fit=crop', 'https://images.unsplash.com/photo-1496368733358-f33e-03236d45?q=80&w=2070&auto=format=fit=crop', 'https://images.unsplash.com/photo-1616091093714-c64882e9ab55?q=80&w=1974&auto=format=fit=crop'],
            description: 'O isolamento de tubulações é um dos investimentos com maior taxa de retorno em uma planta industrial. Cada metro de tubulação não isolada ou mal isolada é um ponto de perda de energia e dinheiro. Nosso serviço transforma esse passivo em um ativo, otimizando seu processo e protegendo sua infraestrutura e sua equipe.',
            subServices: [],
            benefits: [
                { title: 'Redução de Perdas Térmicas em até 90%', text: 'Minimize a perda de calor ou frio, resultando em economia direta de combustível e energia elétrica e maior eficiência do sistema.' },
                { title: 'Segurança Operacional (NR-12)', text: 'Proteja seus colaboradores contra queimaduras em tubulações quentes (acima de 60°C) e evite a condensação em linhas frias, que causa gotejamento e pisos escorregadios.' },
                { title: 'Aumento da Vida Útil da Tubulação', text: 'O revestimento de alumínio oferece uma barreira robusta contra corrosão, impactos e intempéries, prolongando a vida útil do sistema.' },
                { title: 'Controle de Processo', text: 'Garanta que a temperatura do seu fluido se mantenha estável ao longo de todo o percurso, o que é vital para a qualidade de muitos processos industriais.' }
            ],
            targetAudience: 'Essencial para indústrias de todos os segmentos que operam com linhas de fluidos quentes ou frios, como petroquímicas, alimentícias, usinas de açúcar e álcool, e farmacêuticas.',
            executionTime: 'O prazo é definido pela metragem total e pela complexidade de acesso às tubulações (andaimes, trabalho em altura). Projetos são planejados para otimizar o tempo e minimizar a interferência na produção.',
            pricingModel: 'O valor é calculado por metro linear, variando conforme o diâmetro da tubulação, a espessura do isolante e o tipo de acabamento. Peças especiais como curvas, flanges e válvulas possuem um valor de metro equivalente.'
        }
    };
    
    const productsData = {
        'isolantes-termicos': {
            categoryName: 'Isolantes Térmicos',
            categoryImage: 'https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3?q=80&w=2070&auto=format=fit-crop',
            categoryDescription: 'Fornecemos materiais de alta performance para cada tipo de aplicação, garantindo a máxima eficiência para o seu projeto.',
            products: {
                'la-de-rocha': {
                    name: 'Lã de Rocha',
                    image: 'https://images.unsplash.com/photo-1618510045973-c2a4a38356b7?q=80&w=1939&auto=format=fit=crop',
                    summary: 'Ideal para isolamento de altas temperaturas, como linhas de vapor e caldeiras.',
                    description: 'A Lã de Rocha é um material incombustível de alta performance, ideal para o isolamento térmico e acústico em aplicações industriais de alta temperatura. Suporta picos de até 1000°C, garantindo segurança e eficiência.',
                    specs: {
                        'Temperatura de Operação': '-200°C a 750°C',
                        'Densidade': '32 a 160 kg/m³',
                        'Aplicações Típicas': 'Tubulações de vapor, caldeiras, fornos, estufas.'
                    },
                    gallery: ['https://images.unsplash.com/photo-1618510045973-c2a4a38356b7?q=80&w=1939&auto=format=fit=crop']
                },
                'poliuretano': {
                    name: 'Poliuretano (PU)',
                    image: 'https://images.unsplash.com/photo-1628904889531-935a823223c2?q=80&w=2070&auto=format=fit=crop',
                    summary: 'Solução de alto desempenho para isolamento de baixas temperaturas e sistemas de refrigeração.',
                    description: 'O Poliuretano (PU) é um dos isolantes térmicos mais eficientes para baixas temperaturas. Sua estrutura de células fechadas impede a passagem de calor e a condensação, sendo a escolha ideal para linhas de amônia, glicol e câmaras de resfriados.',
                    specs: {
                        'Temperatura de Operação': '-50°C a 110°C',
                        'Densidade': '35 a 40 kg/m³',
                        'Aplicações Típicas': 'Linhas de refrigeração, câmaras de resfriados, tanques de água gelada.'
                    },
                    gallery: ['https://images.unsplash.com/photo-1628904889531-935a823223c2?q=80&w=2070&auto=format=fit=crop']
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
            categoryImage: 'https://images.unsplash.com/photo-1600577916048-820890415442?q=80&w=1935&auto=format=fit-crop',
            categoryDescription: 'Soluções modulares e eficientes para a construção de ambientes com temperatura controlada.',
            products: {
                'painel-eps': {
                    name: 'Painel Isotérmico (EPS)',
                    image: 'https://images.unsplash.com/photo-1621993205994-81c2b_54d4f6a?q=80&w=1932&auto=format=fit=crop',
                    summary: 'Excelente custo-benefício para câmaras de resfriados e congelados.',
                    description: 'Os painéis com núcleo de Poliestireno Expandido (EPS) são uma solução versátil e econômica para a construção de câmaras frias. Oferecem ótimo isolamento térmico e são leves, facilitando a montagem.',
                    specs: {
                        'Núcleo': 'EPS (Poliestireno Expandido)',
                        'Espessuras': '50mm a 250mm',
                        'Aplicações Típicas': 'Câmaras de resfriados, túneis de congelamento, fachadas.'
                    },
                    gallery: ['https://images.unsplash.com/photo-1621993205994-81c2b_54d4f6a?q=80&w=1932&auto=format=fit=crop']
                },
                'painel-pir': {
                    name: 'Painel Isotérmico (PIR)',
                    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1974&auto=format=fit=crop',
                    summary: 'Máxima segurança e eficiência, com propriedade retardante a chamas.',
                    description: 'Os painéis com núcleo de Poliisocianurato (PIR) são a escolha ideal para projetos que exigem o mais alto nível de segurança contra incêndio, sem abrir mão do excelente desempenho térmico. São aprovados pelas seguradoras mais exigentes.',
                    specs: {
                        'Núcleo': 'PIR (Poliisocianurato)',
                        'Espessuras': '50mm a 200mm',
                        'Aplicações Típicas': 'Indústrias com alta exigência de segurança, centros de distribuição, áreas com risco de incêndio.'
                    },
                    gallery: ['https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1974&auto=format=fit=crop']
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

    const portfolioData = {
        '1': {
            title: 'Projeto Frigorífico Better Beef',
            image: 'https://images.unsplash.com/photo-1516880711640-ef7db81602c6?q=80&w=2070&auto=format=fit-crop',
            gallery: ['https://images.unsplash.com/photo-1516880711640-ef7db81602c6?q=80&w=2070&auto=format=fit-crop', 'https://images.unsplash.com/photo-1621993205994-81c2b_54d4f6a?q=80&w=1932&auto=format=fit-crop', 'https://images.unsplash.com/photo-1587293852726-70cdb120d5ae?q=80&w=2070&auto=format=fit-crop'],
            summary: 'Montagem completa de câmara fria com divisória interna e isolamento de tubulações.',
            description: 'Neste projeto de grande escala para o Frigorífico Better Beef, fomos responsáveis pela montagem completa de uma câmara fria de 695 m². A execução incluiu a instalação de painéis isotérmicos de alta performance para paredes e forro, além da montagem de uma divisória interna e duas portas frigoríficas. Todo o sistema foi vedado com PU40 para garantir o máximo isolamento térmico e eficiência energética, atendendo às rigorosas normas do setor alimentício.',
            keyFeatures: ['Montagem de 695 m² de painéis', 'Instalação de portas frigoríficas', 'Vedação completa com PU40', 'Projeto executado em tempo recorde'],
            details: { 'Local': 'Araçatuba, SP', 'Ano': '2025', 'Serviço': 'Montagem de Câmara Fria' }
        },
        '2': {
            title: 'Projeto BioDiesel FugaCouros',
            image: 'https://images.unsplash.com/photo-1633382108450-25838a84a2b2?q=80&w=1974&auto=format=fit-crop',
            gallery: ['https://images.unsplash.com/photo-1633382108450-25838a84a2b2?q=80&w=1974&auto=format=fit-crop', 'https://images.unsplash.com/photo-1496368733358-f33e-03236d45?q=80&w=2070&auto=format=fit-crop', 'https://images.unsplash.com/photo-1616091093714-c64882e9ab55?q=80&w=1974&auto=format=fit-crop'],
            summary: 'Isolamento térmico de mais de 1000m de tubulação de vapor e condensado com lã de rocha.',
            description: 'Um desafio técnico que envolveu o isolamento completo de 1.030 metros de tubulação de vapor e condensado. O trabalho foi executado em altura, utilizando isotubos de lã de rocha e um revestimento final em chapa de alumínio para garantir durabilidade e máxima eficiência. A segurança foi prioridade, com toda a equipe seguindo as normas NR-35.',
            keyFeatures: ['1.030 metros de tubulação isolada', 'Trabalho em altura (pipe rack)', 'Uso de Lã de Rocha e Alumínio', 'Logística com contêineres e andaimes'],
            details: { 'Local': 'Rio Grande do Sul', 'Ano': '2025', 'Serviço': 'Isolamento de Tubulação' }
        },
        '3': {
            title: 'Projetos Industriais Diversos',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format=fit-crop',
            gallery: ['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format=fit-crop', 'https://images.unsplash.com/photo-1567942712689-763d3de35559?q=80&w=2070&auto=format=fit-crop', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2070&auto=format=fit-crop'],
            summary: 'Soluções customizadas para diversas plantas industriais, garantindo eficiência energética e segurança.',
            description: 'Atuamos em diversos segmentos da indústria, oferecendo soluções personalizadas para cada necessidade. Nossos projetos incluem desde o isolamento de tanques e equipamentos até a manutenção e otimização de sistemas existentes, sempre com foco na qualidade e na eficiência energética.',
            keyFeatures: ['Análise de viabilidade técnica', 'Projetos personalizados', 'Otimização de processos', 'Consultoria especializada'],
            details: { 'Local': 'Todo o Brasil', 'Ano': 'Desde 2020', 'Serviço': 'Soluções Customizadas' }
        },
        '4': {
            title: 'Isolamento de Tanques',
            image: 'https://images.unsplash.com/photo-1562431089-31a89c526829?q=80&w=1964&auto=format=fit-crop',
            gallery: ['https://images.unsplash.com/photo-1562431089-31a89c526829?q=80&w=1964&auto=format=fit-crop', 'https://images.unsplash.com/photo-1562431089-add471891942?q=80&w=1964&auto=format=fit-crop'],
            summary: 'Isolamento térmico em grande escala para tanques de armazenamento de produtos químicos.',
            description: 'Projeto de alta complexidade para isolamento de tanques industriais, garantindo a manutenção da temperatura e a segurança do processo produtivo.',
            keyFeatures: ['Isolamento de superfícies cilíndricas', 'Acabamento em alumínio', 'Segurança em áreas classificadas', 'Alta durabilidade'],
            details: { 'Local': 'Polo Petroquímico', 'Ano': '2024', 'Serviço': 'Isolamento de Tanques' }
        },
        '5': {
            title: 'Adequação de Sala Limpa',
            image: 'https://images.unsplash.com/photo-1581092580497-c3d25cb63492?q=80&w=2070&auto=format=fit-crop',
            gallery: ['https://images.unsplash.com/photo-1581092580497-c3d25cb63492?q=80&w=2070&auto=format=fit-crop', 'https://images.unsplash.com/photo-1581093450021-4a7360e9a1b5?q=80&w=2070&auto=format=fit-crop'],
            summary: 'Instalação de painéis sanitários para indústria alimentícia, seguindo normas da ANVISA.',
            description: 'Adequação completa de salas de processo para indústria alimentícia, com instalação de painéis sanitários, cantos arredondados e vedação especial.',
            keyFeatures: ['Painéis com padrão sanitário', 'Conformidade com ANVISA', 'Facilidade de higienização', 'Controle de contaminação'],
            details: { 'Local': 'São Paulo, SP', 'Ano': '2024', 'Serviço': 'Salas Limpas' }
        },
        '6': {
            title: 'Centro de Distribuição',
            image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format=fit-crop',
            gallery: ['https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format=fit-crop', 'https://images.unsplash.com/photo-1586528116311-01dd233366d3?q=80&w=2070&auto=format=fit-crop'],
            summary: 'Construção de docas climatizadas e áreas de armazenamento refrigerado.',
            description: 'Desenvolvimento e execução de projeto para docas climatizadas em centro de distribuição logístico, otimizando a cadeia de frio e garantindo a qualidade dos produtos.',
            keyFeatures: ['Docas climatizadas', 'Controle de temperatura', 'Otimização da cadeia de frio', 'Armazenamento refrigerado'],
            details: { 'Local': 'Extrema, MG', 'Ano': '2023', 'Serviço': 'Logística Fria' }
        }
    };
    
    const partnersData = [
        { name: 'Better Beef', logo: 'assets/images/partners/betterbeef.webp' },
        { name: 'Grupo Fuga', logo: 'assets/images/partners/Grupo Fuga.webp' },
        { name: 'FrigoSul', logo: 'assets/images/partners/Frigosul.png' },
        { name: 'Marfrig.', logo: 'assets/images/partners/logo-marfrig.png' },
        { name: 'MBP IsoBlock', logo: 'assets/images/partners/Logos-MBP-Isoblock.png' },
        { name: 'Pantanal Frigorifico', logo: 'assets/images/partners/Pantanal Frigorifico.png' },
        { name: 'Pharma Co.', logo: 'assets/images/partners/pharma-co.png' },
        { name: 'Centro Logístico', logo: 'assets/images/partners/centro-log.png' }
    ];

    const teamData = [
        { name: 'Tiago Rocha', role: 'Diretor e Responsável Técnico', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format=fit=crop', bio: 'Com mais de 15 anos de experiência em campo, Tiago lidera nossos projetos com conhecimento técnico e uma paixão por entregar resultados impecáveis.' },
        { name: 'Ana Clara', role: 'Gerente Administrativa', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format=fit=crop', bio: 'Ana é o coração da nossa organização, garantindo que a documentação, logística e o atendimento ao cliente funcionem com perfeição.' },
        { name: 'Jussara Pixel', role: 'Desenvolvedora & Designer', image: 'https://i.imgur.com/8x2qE2r.png', bio: 'Responsável por toda a nossa identidade visual e presença digital, transformando a qualidade do nosso trabalho em uma experiência online.' }
    ];

    // --- FUNÇÕES DE CRIAÇÃO DE COMPONENTES (CARDS, MODAL, ETC) ---

    function createServiceCard(serviceId, service, isPreview) {
        const link = isPreview ? `servicos.html#service-${serviceId}` : `#service-${serviceId}`;
        return /*html*/`
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300 flex flex-col">
                <img src="${service.image}" alt="${service.title}" class="w-full h-56 object-cover">
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold mb-2">${service.title}</h3>
                    <p class="text-gray-600 flex-grow">${service.summary}</p>
                    <a href="${link}" class="mt-4 text-blue-600 font-semibold self-start">Saiba Mais &rarr;</a>
                </div>
            </div>
        `;
    }

    function createProjectCard(projectId, project) {
            return /*html*/`
                <div class="bg-white rounded-lg shadow-lg overflow-hidden group">
                    <div class="relative">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover">
                        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button class="open-modal-button text-white border-2 border-white py-2 px-6 rounded-full text-lg hover:bg-white hover:text-black transition-colors" data-project="${projectId}">Ver Detalhes</button>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                        <p class="text-gray-600">${project.summary}</p>
                    </div>
                </div>
            `;
    }
    
    function createTeamMemberCard(member) {
        return /*html*/`
            <div class="text-center bg-white p-6 rounded-lg shadow-lg">
                <img class="w-32 h-32 rounded-full mx-auto mb-4 object-cover" src="${member.image}" alt="Foto de ${member.name}">
                <h4 class="text-xl font-bold">${member.name}</h4>
                <p class="text-blue-600 font-semibold">${member.role}</p>
                <p class="text-gray-500 mt-2 text-sm">${member.bio}</p>
            </div>
        `;
    }

    function createProductCategoryCard(categoryId, category) {
        return /*html*/`
            <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden group transform hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300">
                <img src="${category.categoryImage}" alt="${category.categoryName}" class="w-full h-64 object-cover opacity-60 group-hover:opacity-80 transition-opacity">
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-white mb-2">${category.categoryName}</h3>
                    <p class="text-gray-400 mb-4">${category.categoryDescription}</p>
                    <a href="produtos.html#${categoryId}" class="text-blue-400 font-semibold">Explorar Categoria &rarr;</a>
                </div>
            </div>
        `;
    }

    // --- LÓGICA DO MODAL DO PORTFÓLIO ---

    function createProjectModal(project) {
        const galleryHTML = project.gallery.map(img => `<img src="${img}" alt="Galeria do projeto ${project.title}" class="w-full h-auto rounded-lg shadow-md">`).join('');
        const keyFeaturesHTML = project.keyFeatures.map(feature => `<li class="flex items-start"><svg class="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg><span>${feature}</span></li>`).join('');
        const detailsHTML = Object.entries(project.details).map(([key, value]) => `<div class="text-sm"><strong class="font-semibold text-gray-700">${key}:</strong> ${value}</div>`).join('');

        return /*html*/`
            <div id="portfolio-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[100] animate-fade-in">
                <div id="modal-content" class="bg-gray-50 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-6 md:p-8 transform scale-95 animate-scale-in">
                    <button id="modal-close-button" class="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-4xl font-light focus:outline-none z-10">&times;</button>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h2 class="text-3xl font-bold text-gray-800 mb-2">${project.title}</h2>
                            <div class="flex flex-wrap gap-x-4 gap-y-2 mb-4 border-b pb-4">
                                ${detailsHTML}
                            </div>
                            <p class="text-gray-600 mb-6">${project.description}</p>
                            
                            <h3 class="text-xl font-semibold text-gray-800 mb-3">Destaques do Projeto</h3>
                            <ul class="space-y-2 text-gray-600">
                                ${keyFeaturesHTML}
                            </ul>
                        </div>
                        <div class="space-y-4">
                            ${galleryHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --- LÓGICA DOS GRÁFICOS ANIMADOS ---
    function setupCharts() {
        function createDonutChart(elementId, value, color, unit = '%') {
            const element = document.getElementById(elementId);
            if (!element) return;

            const width = 192, height = 192, margin = 5;
            const radius = Math.min(width, height) / 2 - margin;

            const svg = d3.select("#" + elementId)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`);

            const data = [value, 1 - value];

            const colorScale = d3.scaleOrdinal()
                .domain([0, 1])
                .range([color, '#374151']);

            const pie = d3.pie().sort(null);

            const arc = d3.arc()
                .innerRadius(radius * 0.7)
                .outerRadius(radius);

            const path = svg.selectAll('path')
                .data(pie(data))
                .enter()
                .append('path')
                .attr('fill', (d, i) => colorScale(i))
                .attr('d', arc);

            const text = svg.append("text")
                .attr("text-anchor", "middle")
                .attr("dy", ".35em")
                .style("font-size", "2.5rem")
                .style("font-weight", "700")
                .style("fill", "white");

            function animate(finalValue) {
                text.transition()
                    .duration(1500)
                    .tween("text", function() {
                        const i = d3.interpolate(0, finalValue * 100);
                        const format = unit === 'min' ? (d) => `${Math.round(d)}<tspan font-size="1rem">min</tspan>` : (d) => `${Math.round(d)}<tspan font-size="1.5rem">%</tspan>`;
                        return function(t) {
                            d3.select(this).html(format(i(t)));
                        };
                    });
                
                path.filter((d, i) => i === 0)
                    .transition()
                    .duration(1500)
                    .attrTween('d', function(d) {
                        const start = {startAngle: 0, endAngle: 0};
                        const i = d3.interpolate(start, d);
                        return function(t) {
                            return arc(i(t));
                        }
                    });
            }
            element.animateChart = animate;
        }

        createDonutChart('chart1', 0.95, '#3b82f6', '%');
        createDonutChart('chart2', 0.60, '#10b981', 'min');
        createDonutChart('chart3', 0.85, '#ef4444', '%');

        const statsSection = document.getElementById('stats');
        if (statsSection) {
            let hasAnimated = false;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        document.getElementById('chart1').animateChart(0.95);
                        document.getElementById('chart2').animateChart(0.60);
                        document.getElementById('chart3').animateChart(0.85);
                        hasAnimated = true;
                        observer.unobserve(statsSection);
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(statsSection);
        }
    }

    // --- LÓGICA PRINCIPAL DA APLICAÇÃO ---

    function setupLayout() {
        const mainHeader = document.getElementById('main-header');
        if (mainHeader) {
            mainHeader.innerHTML = `
                <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
                    <a href="index.html" class="flex items-center">
                        <svg width="180" height="40" viewBox="0 0 350 80">
                            <defs><linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#2563eb;"></stop><stop offset="100%" style="stop-color:#3b82f6;"></stop></linearGradient></defs>
                            <g transform="translate(0, 5) scale(0.8)"><path d="M0 0 L35 70 L70 0 L50 0 L35 30 L20 0 Z" fill="url(#logoGradient)"></path></g>
                            <g transform="translate(60, 0)"><text x="0" y="40" font-family="Poppins, sans-serif" font-size="36" font-weight="700" fill="#2563eb">VISUAL</text><text x="0" y="68" font-family="Poppins, sans-serif" font-size="16" font-weight="300" fill="#6b7280" letter-spacing="0.5">ISOLAMENTOS</text></g>
                        </svg>
                    </a>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="index.html" class="text-gray-600 hover:text-blue-600 transition duration-300">Início</a>
                        <div class="relative dropdown">
                            <a href="servicos.html" class="text-gray-600 hover:text-blue-600 transition duration-300 flex items-center py-3">Serviços e Produtos<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></a>
                            <div class="dropdown-menu absolute bg-white shadow-lg rounded-md mt-0 py-2 w-48 z-50">
                                <a href="servicos.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Nossos Serviços</a>
                                <a href="produtos.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Catálogo de Produtos</a>
                            </div>
                        </div>
                        <a href="portfolio.html" class="text-gray-600 hover:text-blue-600 transition duration-300">Portfólio</a>
                        <a href="sobre.html" class="text-gray-600 hover:text-blue-600 transition duration-300">Sobre Nós</a>
                        <a href="index.html#contato" class="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">Contato</a>
                    </div>
                    <div class="md:hidden">
                        <button id="mobile-menu-button" class="text-gray-600 focus:outline-none">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </nav>
                <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
                    <a href="index.html" class="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">Início</a>
                    <a href="servicos.html" class="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">Nossos Serviços</a>
                    <a href="produtos.html" class="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">Catálogo de Produtos</a>
                    <a href="portfolio.html" class="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">Portfólio</a>
                    <a href="sobre.html" class="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">Sobre Nós</a>
                    <a href="index.html#contato" class="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">Contato</a>
                </div>
            `;
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }
        }

        const mainFooter = document.getElementById('main-footer');
        if (mainFooter) {
            mainFooter.innerHTML = `
                <div class="container mx-auto py-8 px-6 text-center">
                    <p>&copy; ${new Date().getFullYear()} Visual Isolamentos. Todos os direitos reservados.</p>
                    <p class="text-sm text-gray-400 mt-2">Desenvolvido por Jussara Pixel</p>
                </div>
            `;
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        setupLayout();

        const pageId = document.body.id;

        // Lógica específica para cada página
        if (pageId === 'page-home') {
            const servicesPreviewContainer = document.getElementById('services-preview');
            const portfolioPreviewContainer = document.getElementById('portfolio-preview');
            const partnersTrack = document.getElementById('partners-track');

            if (servicesPreviewContainer) {
                const previewServices = { ...servicesData, 'produtos': { title: 'Nossos Produtos', image: 'https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3?q=80&w=2070&auto=format=fit-crop', summary: 'Fornecimento de materiais de alta performance para o seu projeto.' } };
                servicesPreviewContainer.innerHTML = Object.keys(previewServices)
                    .map(id => {
                        const service = previewServices[id];
                        const link = id === 'produtos' ? 'produtos.html' : `servicos.html#service-${id}`;
                        return `
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300 flex flex-col">
                                <img src="${service.image}" alt="${service.title}" class="w-full h-56 object-cover">
                                <div class="p-6 flex flex-col flex-grow">
                                    <h3 class="text-xl font-bold mb-2">${service.title}</h3>
                                    <p class="text-gray-600 flex-grow">${service.summary}</p>
                                    <a href="${link}" class="mt-4 text-blue-600 font-semibold self-start">Saiba Mais &rarr;</a>
                                </div>
                            </div>
                        `;
                    })
                    .join('');
            }

            if (portfolioPreviewContainer) {
                portfolioPreviewContainer.innerHTML = Object.keys(portfolioData).slice(0, 3)
                    .map(id => createProjectCard(id, portfolioData[id]))
                    .join('');
            }

            if (partnersTrack) {
                const allPartners = [...partnersData, ...partnersData];
                const slideWidthPercent = 100 / partnersData.length;
                partnersTrack.style.width = `${allPartners.length * slideWidthPercent}%`;

                // Calcula a duração da animação dinamicamente (ex: 5s por parceiro)
                const animationDuration = partnersData.length * 5;
                partnersTrack.style.animationDuration = `${animationDuration}s`;

                partnersTrack.innerHTML = allPartners.map(partner => `
                    <div class="flex-shrink-0 px-8 flex flex-col items-center justify-center" style="width: ${slideWidthPercent}%"> 
                        <img src="${partner.logo}" alt="${partner.name}" class="h-24 w-full object-contain mx-auto grayscale hover:grayscale-0 transition duration-300">
                        <p class="mt-2 text-sm font-semibold text-gray-600 text-center">${partner.name}</p>
                    </div>
                `).join('');
            }

            setupCharts();

        } else if (pageId === 'page-services') {
            const servicesFullGridContainer = document.getElementById('services-full-grid');
            if (servicesFullGridContainer) {
                servicesFullGridContainer.innerHTML = Object.keys(servicesData)
                    .map(id => createServiceCard(id, servicesData[id], false))
                    .join('');
            }
        } else if (pageId === 'page-products') {
            const productCategoriesGrid = document.getElementById('product-categories-grid');
            if (productCategoriesGrid) {
                productCategoriesGrid.innerHTML = Object.keys(productsData)
                    .map(categoryId => createProductCategoryCard(categoryId, productsData[categoryId]))
                    .join('');
            }
        } else if (pageId === 'page-portfolio') {
            const portfolioFullGridContainer = document.getElementById('portfolio-full-grid');
            if (portfolioFullGridContainer) {
                portfolioFullGridContainer.innerHTML = Object.keys(portfolioData)
                    .map(id => createProjectCard(id, portfolioData[id]))
                    .join('');
            }
        } else if (pageId === 'page-about') {
            const teamGrid = document.getElementById('team-grid');
            if (teamGrid) {
                teamGrid.innerHTML = teamData.map(createTeamMemberCard).join('');
            }
        }

        // --- LÓGICA DO MODAL DO PORTFÓLIO (GLOBAL) ---
        function openModal(projectId) {
            const project = portfolioData[projectId];
            if (!project) return;

            closeModal(true); 

            const modalHTML = createProjectModal(project);
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            document.body.style.overflow = 'hidden';
        }

        function closeModal(immediate = false) {
            const modal = document.getElementById('portfolio-modal');
            if (modal) {
                if (immediate) {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                    return;
                }
                
                const modalContent = document.getElementById('modal-content');
                modal.classList.remove('animate-fade-in');
                modal.classList.add('animate-fade-out');
                if (modalContent) {
                    modalContent.classList.remove('animate-scale-in');
                    modalContent.classList.add('animate-scale-out');
                }

                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        }

        document.body.addEventListener('click', (event) => {
            const openButton = event.target.closest('.open-modal-button');
            if (openButton) {
                event.preventDefault();
                const projectId = openButton.dataset.project;
                openModal(projectId);
            }

            const modal = document.getElementById('portfolio-modal');
            if (!modal) return;

            const isCloseButton = event.target.closest('#modal-close-button');
            const isOverlayClick = event.target.id === 'portfolio-modal';

            if (isCloseButton || isOverlayClick) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    });
})();