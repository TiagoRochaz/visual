// Dados do portfólio
const portfolioData = {
  '1': {
    title: 'Projeto Frigorífico Better Beef',
    image: 'assets/images/montagemiso.png',
    gallery: ['assets/images/montagemiso.png', 'assets/images/teste.png', 'assets/images/montagemiso.png'],
    summary: 'Montagem completa de câmara fria com divisória interna e isolamento de tubulações.',
    description: 'Neste projeto de grande escala para o Frigorífico Better Beef, fomos responsáveis pela montagem completa de uma câmara fria de 695 m². A execução incluiu a instalação de painéis isotérmicos de alta performance para paredes e forro, além da montagem de uma divisória interna e duas portas frigoríficas. Todo o sistema foi vedado com PU40 para garantir o máximo isolamento térmico e eficiência energética, atendendo às rigorosas normas do setor alimentício.',
    keyFeatures: ['Montagem de 695 m² de painéis', 'Instalação de portas frigoríficas', 'Vedação completa com PU40', 'Projeto executado em tempo recorde'],
    details: { 'Local': 'Araçatuba, SP', 'Ano': '2025', 'Serviço': 'Montagem de Câmara Fria' }
  },
  '2': {
    title: 'Projeto BioDiesel FugaCouros',
    image: 'assets/images/teste.png',
    gallery: ['assets/images/teste.png', 'assets/images/montagemiso.png', 'assets/images/teste.png'],
    summary: 'Isolamento térmico de mais de 1000m de tubulação de vapor e condensado com lã de rocha.',
    description: 'Um desafio técnico que envolveu o isolamento completo de 1.030 metros de tubulação de vapor e condensado. O trabalho foi executado em altura, utilizando isotubos de lã de rocha e um revestimento final em chapa de alumínio para garantir durabilidade e máxima eficiência. A segurança foi prioridade, com toda a equipe seguindo as normas NR-35.',
    keyFeatures: ['1.030 metros de tubulação isolada', 'Trabalho em altura (pipe rack)', 'Uso de Lã de Rocha e Alumínio', 'Logística com contêineres e andaimes'],
    details: { 'Local': 'Rio Grande do Sul', 'Ano': '2025', 'Serviço': 'Isolamento de Tubulação' }
  },
  '3': {
    title: 'Projetos Industriais Diversos',
    image: 'assets/images/montagemiso.png',
    gallery: ['assets/images/montagemiso.png', 'assets/images/teste.png', 'assets/images/montagemiso.png'],
    summary: 'Soluções customizadas para diversas plantas industriais, garantindo eficiência energética e segurança.',
    description: 'Atuamos em diversos segmentos da indústria, oferecendo soluções personalizadas para cada necessidade. Nossos projetos incluem desde o isolamento de tanques e equipamentos até a manutenção e otimização de sistemas existentes, sempre com foco na qualidade e na eficiência energética.',
    keyFeatures: ['Análise de viabilidade técnica', 'Projetos personalizados', 'Otimização de processos', 'Consultoria especializada'],
    details: { 'Local': 'Todo o Brasil', 'Ano': 'Desde 2020', 'Serviço': 'Soluções Customizadas' }
  },
  '4': {
    title: 'Isolamento de Tanques',
    image: 'assets/images/teste.png',
    gallery: ['assets/images/teste.png', 'assets/images/montagemiso.png'],
    summary: 'Isolamento térmico em grande escala para tanques de armazenamento de produtos químicos.',
    description: 'Projeto de alta complexidade para isolamento de tanques industriais, garantindo a manutenção da temperatura e a segurança do processo produtivo.',
    keyFeatures: ['Isolamento de superfícies cilíndricas', 'Acabamento em alumínio', 'Segurança em áreas classificadas', 'Alta durabilidade'],
    details: { 'Local': 'Polo Petroquímico', 'Ano': '2024', 'Serviço': 'Isolamento de Tanques' }
  },
  '5': {
    title: 'Adequação de Sala Limpa',
    image: 'assets/images/montagemiso.png',
    gallery: ['assets/images/montagemiso.png', 'assets/images/teste.png'],
    summary: 'Instalação de painéis sanitários para indústria alimentícia, seguindo normas da ANVISA.',
    description: 'Adequação completa de salas de processo para indústria alimentícia, com instalação de painéis sanitários, cantos arredondados e vedação especial.',
    keyFeatures: ['Painéis com padrão sanitário', 'Conformidade com ANVISA', 'Facilidade de higienização', 'Controle de contaminação'],
    details: { 'Local': 'São Paulo, SP', 'Ano': '2024', 'Serviço': 'Salas Limpas' }
  },
  '6': {
    title: 'Centro de Distribuição',
    image: 'assets/images/teste.png',
    gallery: ['assets/images/teste.png', 'assets/images/montagemiso.png'],
    summary: 'Construção de docas climatizadas e áreas de armazenamento refrigerado.',
    description: 'Desenvolvimento e execução de projeto para docas climatizadas em centro de distribuição logístico, otimizando a cadeia de frio e garantindo a qualidade dos produtos.',
    keyFeatures: ['Docas climatizadas', 'Controle de temperatura', 'Otimização da cadeia de frio', 'Armazenamento refrigerado'],
    details: { 'Local': 'Extrema, MG', 'Ano': '2023', 'Serviço': 'Logística Fria' }
  }
};