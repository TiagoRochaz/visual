// Dados dos serviços da Visual Isolamentos
const servicesData = {
    'paineis-isotermicos': {
        title: 'Montagem de Painéis Isotérmicos',
        image: 'assets/images/teste.png',
        summary: 'Montagem de câmaras frias, salas limpas e fachadas com painéis isotérmicos.',
        gallery: ['assets/images/montagemiso.png', 'assets/images/teste.png', 'assets/images/montagemiso.png'],
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
        image: 'assets/images/teste.png',
        summary: 'Aplicação de poliuretano e lã de rocha para linhas de refrigeração e aquecimento, com acabamento em alumínio.',
        gallery: ['assets/images/teste.png', 'assets/images/montagemiso.png', 'assets/images/teste.png'],
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