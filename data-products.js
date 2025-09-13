// Dados dos produtos e categorias
const productsData = {
    'isolantes-termicos': {
        categoryName: 'Isolantes Térmicos',
        categoryImage: 'assets/images/teste.png',
        categoryDescription: 'Fornecemos materiais de alta performance para cada tipo de aplicação, garantindo a máxima eficiência para o seu projeto.',
        products: {
            'la-de-rocha': {
  name: 'Lã de Rocha',
  image: 'assets/images/laderocha.png',
  summary: 'Material isolante térmico e acústico, produzido a partir de rochas basálticas, leve e flexível, adequado para diversos setores.',
  description: 'A Lã de Rocha é fabricada a partir de rochas basálticas especiais e outros minerais que, aquecidos a cerca de 1500°C, são transformados em filamentos. Estes filamentos, aglomerados com resinas orgânicas, permitem a fabricação de produtos leves, flexíveis ou muito rígidos, dependendo do grau de compactação. Devido às características termo-acústicas, atende a construção civil, indústria, setor automotivo e eletrodomésticos, garantindo conforto ambiental, segurança, aumento no rendimento de equipamentos e economia de energia com excelente relação custo/benefício.',
  specs: {
    'Material': 'Rochas basálticas e minerais aglomerados com resina orgânica',
    'Propriedades': 'Isolamento térmico e acústico, leve, flexível ou rígido conforme compactação',
    'Aplicações Típicas': 'Construção civil, indústria, automotivos, eletrodomésticos',
    'Vantagens': 'Conforto ambiental, segurança, aumento de rendimento de equipamentos, economia de energia, excelente custo/benefício'
  },
  gallery: ['assets/images/laderocha.png']
},
'la-de-vidro': {
  name: 'Lã de Vidro',
  image: 'assets/images/ladevidro.png',
  summary: 'Material isolante termo-acústico com alta resistência mecânica, produzido com tecnologia avançada de entrelaçamento de fibras.',
  description: 'A Lã de Vidro é produzida utilizando a avançada tecnologia do processo Tel, reconhecida mundialmente. O entrelaçamento das fibras garante resistência mecânica superior, proporcionando excelente isolamento térmico e absorção sonora. Além disso, oferece economia de energia, conforto ambiental, segurança e facilidade na aplicação dos produtos.',
  specs: {
    'Material': 'Fibra de vidro com tecnologia Tel',
    'Propriedades': 'Isolamento térmico e acústico, alta resistência mecânica',
    'Vantagens': 'Economia de energia, conforto ambiental, segurança, facilidade de aplicação',
    'Aplicações Típicas': 'Construção civil, indústrias, sistemas de climatização e isolamento acústico'
  },
  gallery: ['assets/images/ladevidro.png']
},
'poliuretano': {
  name: 'Poliuretano',
  image: 'assets/images/poliuretano.png',
  summary: 'Espuma rígida utilizada para isolamento térmico, com alta eficiência em baixas temperaturas.',
  description: 'O Poliuretano é uma espuma rígida utilizada predominantemente em técnicas de isolamento térmico. É resultado da reação química de um poli-isocianato combinado com um gás expansor, proporcionando alto fator de isolamento térmico, especialmente em superfícies que operam a baixas temperaturas, devido à sua baixa densidade aparente e baixo coeficiente de condutividade térmica.',
  specs: {
    'Material': 'Espuma rígida de poliuretano',
    'Propriedades': 'Alto isolamento térmico, baixa densidade aparente, baixo coeficiente de condutividade térmica',
    'Aplicações Típicas': 'Isolamento térmico em tubulações, câmaras frias, equipamentos e superfícies com baixas temperaturas',
    'Vantagens': 'Alta eficiência térmica, durabilidade, leveza'
  },
  gallery: ['assets/images/poliuretano.png']
},
'rebites': {
  name: 'Rebites',
  image: 'assets/images/rebites.png',
  summary: 'Fixadores utilizados para unir permanentemente peças, disponíveis em diversos materiais e tipos.',
  description: 'Os rebites são fixadores usados para unir duas ou mais peças permanentemente. Há uma ampla variedade de tipos, desde os comuns de repuxo em alumínio até os de alta resistência estrutural, atendendo diferentes necessidades industriais. Podem ser encontrados em materiais como alumínio, aço e inox, oferecendo durabilidade e confiabilidade na fixação.',
  specs: {
    'Material': 'Alumínio, aço, inox',
    'Tipos': 'Repuxo, estrutural, diversos modelos conforme aplicação',
    'Aplicações Típicas': 'União permanente de peças em linhas industriais, estruturas metálicas e montagens diversas',
    'Vantagens': 'Alta resistência, durabilidade, variedade de tipos e materiais'
  },
  gallery: ['assets/images/rebites.png']
},
'revestimentos-metalicos': {
  name: 'Revestimentos Metálicos',
  image: 'assets/images/revestimentosmetalicos.png',
  summary: 'Chapas e bobinas metálicas para revestimento e proteção mecânica de isolantes térmicos.',
  description: 'Os revestimentos metálicos são recomendados para proteger e revestir isolantes térmicos em equipamentos e tubulações. Fornecidos em chapas ou bobinas, oferecem proteção mecânica resistente, ótimo acabamento e podem ser encontrados em diversas espessuras, garantindo durabilidade e eficiência em aplicações industriais.',
  specs: {
    'Material': 'Chapas e bobinas metálicas',
    'Espessuras': 'Diversas espessuras disponíveis',
    'Aplicações Típicas': 'Revestimento de isolantes térmicos em tubulações e equipamentos industriais',
    'Vantagens': 'Proteção mecânica resistente, ótimo acabamento, durabilidade e eficiência'
  },
  gallery: ['assets/images/revestimentosmetalicos.png']
},
'aluminio-e-acessorios': {
  name: 'Alumínio e Acessórios',
  image: 'assets/images/aluminio.png',
  summary: 'Chapas, bobinas e acessórios metálicos diversos para aplicações industriais e de construção.',
  description: 'Fornecemos uma ampla variedade de chapas e bobinas de alumínio, aço galvanizado, aço inox e alumínio corrugado, com ou sem barreira. Também oferecemos telhas trapezoidais, asfaltos para impermeabilização, ferro chato, arame recozido, parafusos e rebites, garantindo soluções completas para construção, revestimentos e projetos industriais.',
  specs: {
    'Produtos Disponíveis': 'Chapas e bobinas de alumínio liso natural; Chapas e bobinas de aço galvanizado; Chapas e bobinas de aço galvanizado pré-pintada (Kroma); Chapas e bobinas em aço inox; Alumínio corrugado com e sem barreira; Telhas trapezoidais de alumínio e galvanizada; Asfaltos para impermeabilização; Ferro chato; Arame recozido; Parafusos e rebites.',
    'Aplicações Típicas': 'Construção civil, projetos industriais, revestimentos metálicos, impermeabilização, estruturas e montagem de equipamentos.',
    'Vantagens': 'Variedade de materiais; Resistência e durabilidade; Adequado para diferentes aplicações industriais e construtivas.'
  },
  gallery: ['assets/images/aluminio.png']
},
'broca': {
  name: 'Broca',
  image: 'assets/images/broca.png',
  summary: 'Acessório para furadeiras, utilizado para perfuração em diversos materiais.',
  description: 'A broca é um acessório indispensável para o uso de furadeiras. Permite realizar furos cilíndricos em superfícies como madeira, ferro, concreto e outros materiais, oferecendo precisão e eficiência em trabalhos de construção e manutenção.',
  specs: {
    'Aplicações Típicas': 'Furos em madeira, ferro, concreto e outros materiais.',
    'Vantagens': 'Versatilidade; Indispensável para perfuração; Compatível com diversas furadeiras.'
  },
  gallery: ['assets/images/broca.png']
},
'espuma-elastomerica': {
  name: 'Espuma Elastomérica',
  image: 'assets/images/espumaelastomerica.png',
  summary: 'Isolante térmico em tubos, mantas e fitas auto-adesivas, feito de borracha sintética de alta densidade.',
  description: 'A Espuma Elastomérica é um isolante térmico fornecido em tubos, mantas e fitas auto-adesivas. Produzida a partir de borracha sintética de alta densidade (60±6 kg/m³), oferece excelente coeficiente de condutividade térmica (0,025 kcal/m.h °C), sendo ideal para aplicações de isolamento em sistemas de tubulação, refrigeração e climatização.',
  specs: {
    'Material': 'Borracha sintética de alta densidade',
    'Densidade': '60 ± 6 kg/m³',
    'Condutividade Térmica': '0,025 kcal/m.h °C',
    'Formatos Disponíveis': 'Tubos, mantas e fitas auto-adesivas',
    'Aplicações Típicas': 'Isolamento térmico em tubulações, sistemas de refrigeração e climatização.'
  },
  gallery: ['assets/images/espumaelastomerica.png']
},
'fibra-ceramica': {
  name: 'Fibra Cerâmica',
  image: 'assets/images/fibraceramica.png',
  summary: 'Manta leve e resistente, feita de fibra cerâmica, ideal para isolamento térmico em locais de difícil acesso.',
  description: 'A Manta de Fibra Cerâmica possui aparência semelhante a algodão prensado, sendo leve e de fácil manuseio em locais de difícil acesso. Fabricada a partir da eletro fusão de alumina com sílica, é totalmente isenta de amianto. Oferece excepcional resistência mecânica, grande capacidade de isolamento térmico, estabilidade química e térmica, boa resistência à tração e à corrosão, além de baixa condutibilidade térmica e baixíssimo armazenamento de calor.',
  specs: {
    'Material': 'Fibra cerâmica (alumina + sílica)',
    'Características': 'Leve, resistente, isenta de amianto',
    'Propriedades Térmicas': 'Excelente isolamento térmico, baixa condutibilidade térmica, baixíssimo armazenamento de calor',
    'Resistência': 'Boa resistência mecânica, à tração e à corrosão',
    'Aplicações Típicas': 'Isolamento térmico em caldeiras, fornos, estufas e locais de difícil acesso'
  },
  gallery: ['assets/images/fibraceramica.png']
},
'isopor': {
  name: 'Isopor',
  image: 'assets/images/isopor.png',
  summary: 'Placas auto-extinguíveis para forro, com ou sem revestimento acrílico, ideais para conforto térmico e bom acabamento.',
  description: 'As Placas de Isopor para forro possuem característica auto-extinguível e podem vir com ou sem revestimento na face aparente em textura acrílica fosca branca. De fácil aplicação, são indicadas para indústrias, supermercados, lojas e residências, oferecendo conforto térmico, bom acabamento e baixo custo.',
  specs: {
    'Material': 'Isopor (poliestireno expandido)',
    'Revestimento': 'Opcional: textura acrílica fosca branca',
    'Propriedades': 'Auto-extinguível, fácil aplicação, baixo custo',
    'Aplicações Típicas': 'Forros em indústrias, supermercados, lojas e residências'
  },
  gallery: ['assets/images/isopor.png']
},
'jaqueta-termica': {
  name: 'Jaqueta Térmica',
  image: 'assets/images/jaquetatermica.png',
  summary: 'Isolante térmico removível e reutilizável, resistente ao fogo e de alta qualidade.',
  description: 'As jaquetas térmicas são isolantes removíveis e reutilizáveis, confeccionadas com material resistente ao fogo e de qualidade comprovada. Podem ser aplicadas em equipamentos e tubulações que necessitem de controle térmico e proteção contra calor.',
  specs: {
    'Material': 'Isolante térmico resistente ao fogo',
    'Características': 'Removível, reutilizável, alta durabilidade',
    'Aplicações Típicas': 'Proteção térmica em equipamentos, tubulações e sistemas industriais'
  },
  gallery: ['assets/images/jaquetatermica.png']
},
        }
    },
    'isopaineis': {
        categoryName: 'Isopainéis e Acessórios',
        categoryImage: 'assets/images/teste.png',
        categoryDescription: 'Soluções modulares e eficientes para a construção de ambientes com temperatura controlada. Escolha uma subcategoria para explorar.',
        subcategories: {
            'isopaineis': {
                subcategoryName: 'Isopainéis',
                subcategoryImage: 'assets/images/montagemiso.png',
                subcategorySummary: 'Painéis com núcleo em EPS ou PIR para o máximo desempenho em isolamento térmico.',
                products: {
                    'painel-easyclean': {
  name: 'Painel EasyClean',
  image: 'assets/images/paineleasyclean.png',
  summary: 'Painel com superfície lisa e sistema de encaixes para acabamento higiênico e resistência mecânica e térmica, ideal para salas limpas e divisórias de escritório.',
  description: 'O Painel EasyClean possui superfície lisa e um sistema de encaixes que garante acabamento higiênico-sanitário e resistência mecânica e térmica. A montagem é fácil, rápida e modular. É indicado para laboratórios químicos, de alimentos, análises clínicas, produção de remédios, fabricação de satélites espaciais, e salas de operação.',
  specs: {
    'Aplicações Típicas': 'Laboratórios químicos, laboratórios de alimentos, laboratórios de análises clínicas, laboratórios de produção de remédios, laboratórios para fabricação de satélites espaciais, sala de operação.',
    'Vantagens': 'Superfícies lisas e higiênicas com cantos arredondados; Excelente isolamento térmico; Excelente acabamento; Baixo custo de manutenção; Facilidade na limpeza; Economia em energia e equipamento de climatização; Agilidade na instalação; Reação ao fogo.',
    'Núcleo': 'Espuma rígida de PIR com densidade de 30 a 42 kg/m³, autoextinguível com PIR classe IIA conforme ITl0 do CBESP',
    'Condutividade Térmica': '0,020 W/m.k ASTM C 518',
    'Revestimento Externo': 'Aço galvanizado ou aço galvalume pré-pintado ou natural',
    'Revestimento Interno': 'Aço galvanizado ou aço galvalume pré-pintado ou natural',
    'Vão Máximo': 'Para carga distribuída de 70 kg/m² e flecha I/180',
    'Comprimento': 'Mínimo 2.500 mm e máximo 12.000 mm',
    'Observação': 'Para densidade do PIR inferior a 38 kg/m³, consulte o departamento comercial'
  },
  gallery: ['assets/images/paineleasyclean.png']
},
'painel-easyfrigo': {
  name: 'Painel EasyFrigo',
  image: 'assets/images/paineleasyfrigo.png',
  summary: 'Painel frigorífico com vedação perfeita, isolamento térmico e resistência a impactos, ideal para ambientes com temperatura controlada.',
  description: 'O Painel EasyFrigo garante perfeita vedação, excelente isolamento térmico e maior resistência a impactos. Sua montagem é fácil, rápida e modular. Fabricado em linhas contínuas automáticas, assegura qualidade, performance térmica e durabilidade, sendo ideal para câmaras frigoríficas, túneis de congelamento, centros de distribuição, indústrias de alimentos e bebidas, abatedouros e laticínios.',
  specs: {
    'Aplicações Típicas': 'Câmaras frigoríficas, túneis de congelamento, centros de distribuição, indústrias de alimentos e bebidas, abatedouros, laticínios.',
    'Vantagens': 'Economia; Encaixe perfeito dos painéis; Isolamento termoisolante; Rapidez na execução da obra; Durabilidade; Reação ao fogo; Produto sustentável.',
    'Núcleo': 'Espuma rígida de PIR com densidade de 30 a 42 kg/m³, autoextinguível com PIR classe IIA conforme ITl0 do CBESP',
    'Condutividade Térmica': '0,020 W/m.k ASTM C 518',
    'Revestimento Externo': 'Aço galvanizado ou aço galvalume pré-pintado ou natural',
    'Revestimento Interno': 'Aço galvanizado ou aço galvalume pré-pintado ou natural',
    'Vão Máximo': 'Para carga distribuída de 70 kg/m² e flecha I/180',
    'Comprimento': 'Mínimo 2.500 mm e máximo 12.000 mm',
    'Acabamento Padrão': 'Rib 40 com opção de acabamento liso'
  },
  gallery: ['assets/images/paineleasyfrigo.png']
},
'painel-easywall': {
  name: 'Painel EasyWall',
  image: 'assets/images/paineleasywall.png',
  summary: 'Painel para fachadas com núcleo PIR, revestimento em aço e sistema de encaixe invisível, ideal para projetos arquitetônicos e montagem rápida.',
  description: 'O Painel EasyWall proporciona beleza arquitetônica, versatilidade e isolamento térmico eficiente. Com núcleo PIR e revestimento em aço galvanizado ou galvalume pré-pintado, oferece montagem fácil, rápida e modular. Fabricado em linhas contínuas com injeção de espuma em alta pressão, garante uniformidade, maior performance térmica e resistência. Ideal para projetos complexos com design diferenciado.',
  specs: {
    'Aplicações Típicas': 'Shoppings, supermercados, atacadistas, aeroportos, terminais rodoviários, escolas, universidades, estádios, centros de convenções, prédios comerciais, escritórios, data centers, lojas.',
    'Vantagens': 'Durabilidade de cor e brilho; Sem risco de fissuras e trincos; Economia significativa no sistema de climatização; Obra até 6x mais rápida que o sistema convencional; Reação ao fogo.',
    'Núcleo': 'Espuma rígida de PIR com densidade de 38 a 42 kg/m³, autoextinguível com PIR classe IIA conforme ITlO do CBESP',
    'Condutividade Térmica': '0,020 W/m.k ASTM C 518',
    'Revestimento Externo': 'Aço galvanizado ou aço galvalume pré-pintado ou natural',
    'Revestimento Interno': 'Aço galvanizado ou aço galvalume pré-pintado ou natural',
    'Flecha Considerada': '1/120 para fechamento',
    'Comprimento': 'Mínimo 2.500 mm e máximo 10.000 mm',
    'Acabamentos Disponíveis': 'Micro Rib e Rib 40'
  },
  gallery: ['assets/images/paineleasywall.png']
},

                }
            },
            'portas': {
                subcategoryName: 'Portas',
                subcategoryImage: 'https://placehold.co/600x400/9ca3af/ffffff?text=Porta+Frigorífica',
                subcategorySummary: 'Portas de correr ou de giro para garantir a vedação e o fácil acesso à sua câmara fria.',
                products: {
                    'porta-abrigo-doca': {
  name: 'Porta Abrigo de Doca',
  image: 'assets/images/produtos/portaabrigo.png',
  summary: 'Sistema vedante para portas seccionais, ideal para câmaras frigoríficas e áreas de carga e descarga.',
  description: 'O uso do sistema vedante em portas seccionais é recomendado para reduzir a perda de frio em câmaras frigoríficas, além de evitar a entrada de insetos e sujeira durante a carga e descarga de mercadorias. Garante mais eficiência no controle térmico e higiênico do ambiente.',
  specs: {
    'Aplicações Típicas': 'Portas seccionais em câmaras frigoríficas e áreas de carga/descarga.',
    'Vantagens': ['Evita a entrada de insetos e sujeira', 'Reduz a perda de frio.']
  },
  gallery: ['assets/images/produtos/portaabrigo.png']
},
'porta-correr': {
  name: 'Porta de Correr (1 ou 2 folhas)',
  image: 'assets/images/produtos/portacorrer.png',
  summary: 'Porta industrial de correr, manual ou automática, ideal para alta circulação de pessoas e veículos.',
  description: 'A Porta de Correr Industrial é projetada para ambientes de alta circulação, oferecendo praticidade e resistência. Pode ser configurada com 1 ou 2 folhas e receber um kit de automação, permitindo a conversão de uma porta manual existente em uma porta de abertura e fechamento automáticos. É uma solução versátil para áreas logísticas, industriais e comerciais.',
  specs: {
    'Aplicações Típicas': 'Ambientes industriais, logísticos, depósitos e áreas de grande circulação de pessoas e veículos.',
    'Vantagens': ['Sistema versátil com 1 ou 2 folhas', 'Possibilidade de automação em portas manuais já existentes', 'Resistência e durabilidade para uso intenso.']
  },
  gallery: ['assets/images/produtos/portacorrer.png']
},
'porta-correr-camaras-frias': {
  name: 'Porta de Correr (1 ou 2 folhas) para Câmaras Frias',
  image: 'assets/images/produtos/portacorrercamarasfrias.png',
  summary: 'Porta de correr para pequenas câmaras frias, com vão-luz padrão e abertura universal.',
  description: 'Este modelo de Porta de Correr é ideal para uso comercial em pequenas câmaras frias. Conta com vão-luz padrão que favorece a iluminação interna e possui abertura universal, podendo ser instalada tanto à direita quanto à esquerda. As portas de 3 batentes com 100mm incluem aquecimento na soleira, realizado por resistência elétrica inserida na borracha inferior. Observação: a proteção superior do trilho (carenagem) não está inclusa neste modelo.',
  specs: {
    'Aplicações Típicas': 'Pequenas câmaras frias comerciais.',
    'Vantagens': ['Uso comercial', 'Baixo custo', 'Abertura universal (direita ou esquerda)', 'Vão-luz para iluminação', 'Aquecimento de soleira por resistência elétrica.']
  },
  gallery: ['assets/images/produtos/portacorrercamarasfrias.png']
},
'porta-giratoria': {
  name: 'Porta Giratória',
  image: 'assets/images/produtos/portagiratoria.png',
  summary: 'Porta giratória para câmaras frias comerciais, com vão-luz padrão e abertura universal.',
  description: 'A Porta Giratória é ideal para uso comercial em pequenas câmaras frias, oferecendo praticidade, segurança e versatilidade. Possui vão-luz padrão, fechadura com abertura interna de segurança e portas de 4 batentes com abertura universal, permitindo instalação tanto do lado direito quanto do esquerdo. Pode ser equipada com Bumper para maior proteção.',
  specs: {
    'Espessuras Disponíveis (mm)': 'BT, 70, 100',
    'Vãos-luzes Disponíveis (LxA mm)': ['800x1800', '800x1900', '800x2000', '800x2100', '900x2000', '900x2100', '1000x2000', '1000x2100', '1200x2100', '1200x2400', '1400x2100', '1400x2400'],
    'Espaço Livre de Instalação': 'Horizontal: Largura vão-luz + 400 mm | Vertical: Altura vão-luz + 300 mm',
    'Núcleo': 'PIR',
    'Marco': 'PVC',
    'Acessórios Recomendados': ['Kit Fixação Porta Com Gir', 'Perfil “U” Acabamento do Vão-Luz', 'Cortina de PVC']
  },
  gallery: ['assets/images/produtos/portagiratoria.png']
},
'porta-giratoria-trafego': {
  name: 'Porta Giratória (Alto Tráfego)',
  image: 'assets/images/produtos/portagiratoriatransito.png',
  summary: 'Porta giratória ideal para câmaras com alto tráfego de pessoas e pequenas mercadorias.',
  description: 'A Porta Giratória é indicada para câmaras com grande circulação de pessoas e movimentação de pequenas mercadorias. Vem equipada com fechadura padrão e abertura interna de segurança, garantindo que a porta possa ser aberta por dentro mesmo quando trancada.',
  specs: {
    'Aplicações Típicas': 'Câmaras frias com alto tráfego de pessoas e mercadorias leves.',
    'Vantagens': ['Segurança com abertura interna', 'Fechadura padrão inclusa', 'Resistência e praticidade no uso contínuo.']
  },
  gallery: ['assets/images/produtos/portagiratoriatransito.png']
},
'porta-isoplana': {
  name: 'Porta Isoplana',
  image: 'assets/images/produtos/portaisoplana.png',
  summary: 'Porta com acabamento superior e alta durabilidade, ideal para escritórios, clínicas, hospitais e salas limpas.',
  description: 'A Porta Isoplana é projetada para oferecer resistência, estética e funcionalidade em ambientes que exigem qualidade e higiene. Recomendada para escritórios, clínicas, hospitais, salas limpas, aeroportos e escolas, conta com borracha de vedação em todo o perímetro, impedindo a passagem de luminosidade e poeira. Equipada com maçanetas em aço inoxidável, garante alta resistência à corrosão e acabamento de excelência.',
  specs: {
    'Aplicações Típicas': 'Escritórios, clínicas, hospitais, salas limpas, aeroportos e escolas.',
    'Vantagens': ['Acabamento superior', 'Durabilidade excepcional', 'Vedação contra luz e poeira', 'Maçanetas em aço inoxidável resistentes à corrosão.']
  },
  gallery: ['assets/images/produtos/portaisoplana.png']
},
'porta-passagem-trilho': {
  name: 'Porta Passagem de Trilho',
  image: 'assets/images/produtos/portapassagemtrilho.png',
  summary: 'Porta indicada para locais que necessitam de passagem de trilho para movimentação de carcaças.',
  description: 'A Porta Passagem de Trilho é projetada para permitir a movimentação de carcaças em ambientes industriais e frigoríficos. Fácil de montar e instalar, conta com vedação de dupla densidade que previne acidentes e garante segurança. A estrutura da passagem de trilho é fabricada em aço com pintura eletrostática branca, enquanto a capela é centralizada no vão-luz, com largura padrão de 340 mm. A altura do vão-luz e da capela é ajustada conforme as necessidades do trilho.',
  specs: {
    'Aplicações Típicas': 'Ambientes industriais e frigoríficos que exigem movimentação de carcaças.',
    'Vantagens': ['Fácil montagem e instalação', 'Vedação de dupla densidade para segurança', 'Estrutura em aço com pintura eletrostática branca.'],
    'Estrutura': 'Passagem de trilho em aço pintado com pintura eletrostática branca.',
    'Capela': 'Centralizada no vão-luz, largura padrão de 340 mm.',
    'Altura do Vão-Luz': 'Ajustável conforme as alturas inferior e superior do trilho para movimentação de carcaças.'
  },
  gallery: ['assets/images/produtos/portapassagemtrilho.png']
},
'porta-rapida': {
  name: 'Porta Rápida',
  image: 'assets/images/produtos/portarapida.png',
  summary: 'Porta de alta velocidade para isolamento térmico, indicada para ambientes resfriados ou congelados.',
  description: 'A Porta Rápida é projetada para oferecer isolamento térmico eficiente, com sistema de abertura e fechamento rápidos que proporcionam economia de energia e redução de custos operacionais. Ideal para ambientes resfriados ou congelados, pode ser utilizada em temperaturas de até -30ºC, garantindo segurança, praticidade e durabilidade.',
  specs: {
    'Aplicações Típicas': 'Ambientes resfriados e congelados em indústrias alimentícias, logísticas e farmacêuticas.',
    'Vantagens': ['Segurança', 'Excelente isolamento térmico', 'Economia de energia e redução de custos operacionais.'],
    'Temperatura de Operação': 'Até -30ºC'
  },
  gallery: ['assets/images/produtos/portarapida.png']
},
'porta-seccional': {
  name: 'Porta Seccional',
  image: 'assets/images/produtos/portaseccional.png',
  summary: 'Porta indicada para ambientes com espaço livre na parede, sem trilho horizontal, garantindo praticidade e segurança.',
  description: 'A Porta Seccional é ideal para locais onde o espaço livre na parede permite sua instalação sem trilhos horizontais. Permite montagem ágil e reduz o risco de colisões com trilhos durante operações de carga e descarga, oferecendo praticidade e segurança nas movimentações.',
  specs: {
    'Aplicações Típicas': 'Ambientes industriais, logísticos ou comerciais com espaço livre na parede.',
    'Vantagens': ['Praticidade no uso', 'Menor risco de colisão durante movimentações', 'Montagem ágil e segura.']
  },
  gallery: ['assets/images/produtos/portaseccional.png']
},
'porta-step-in': {
  name: 'Porta Step-In',
  image: 'assets/images/produtos/portastepin.png',
  summary: 'Porta ideal para supermercados e atacadistas, com excelente vedação e visor para auto-serviço.',
  description: 'A Porta Step-In é projetada para ambientes comerciais, como supermercados e atacadistas, oferecendo ótima vedação e um visor que aumenta a visibilidade interna. Possui núcleo de PIR, folha em inox Stucco, painel pré-pintado RAL 9003 e marco em alumínio, garantindo durabilidade e estética. A porta permite instalação de opcionais para bases internas e externas.',
  specs: {
    'Espessura Disponível (mm)': '100',
    'Vão-Luzes Recomendados (LxA mm)': '1200 x 2000',
    'Dimensões do Visor (LxA mm)': '700 x 1600; 700 x 1200',
    'Núcleo da Folha': 'PIR',
    'Folha': 'Inox Stucco',
    'Painel': 'Pré-pintado RAL 9003',
    'Marco': 'Alumínio',
    'Opcionais': '143544 – Base Chapa Externa Step-In; 143543 – Base Chapa Interna Step-In'
  },
  gallery: ['assets/images/produtos/portastepin.png']
},
'porta-vai-e-vem': {
  name: 'Porta Vai e Vem (1 ou 2 folhas)',
  image: 'assets/images/produtos/portavaievem.png',
  summary: 'Porta flexível de PVC para ambientes com alta circulação de pessoas ou carrinhos, resistente a impactos.',
  description: 'A Porta Vai e Vem é indicada para ambientes com temperaturas próximas à ambiente e grande circulação de pessoas ou carrinhos. Produzida em PVC resistente a impactos, cada folha vem equipada com visor em policarbonato como padrão. Disponível em modelos de folha simples ou dupla, oferece praticidade e durabilidade em locais de tráfego intenso.',
  specs: {
    'Aplicações Típicas': 'Ambientes comerciais, industriais ou logísticos com alto fluxo de pessoas e carrinhos.',
    'Vantagens': ['Grande fluxo de passagem', 'Resistência a impactos na folha', 'Disponível em 1 ou 2 folhas', 'Visor em policarbonato incluso.']
  },
  gallery: ['assets/images/produtos/portavaievem.png']
},

                }
            },
            'perfis': {
                subcategoryName: 'Perfis',
                subcategoryImage: 'https://placehold.co/600x400/d1d5db/ffffff?text=Perfis',
                subcategorySummary: 'Cantoneiras, perfis U e outros acabamentos para uma instalação perfeita e higiênica.',
                products: {
                    'perfil-l-40x100': {
  name: 'Perfil L 40x100x3000',
  image: 'assets/images/produtos/pefril_l_40x100.jpg',
  summary: 'Perfil de aço galvalume de alta qualidade, revestido com pintura eletrostática e proteção em PVC.',
  description: 'O Perfil L 40x100  é produzido em aço galvalume de alta qualidade, com espessura mínima de 0,0043 mm. Possui revestimento com pintura eletrostática em um lado e prime no outro, além de proteção em PVC (plástico filme), garantindo durabilidade e resistência em aplicações estruturais e industriais.',
  specs: {
    'Material': 'Aço galvalume',
    'Espessura': 'Mínima de 0,0043 mm',
    'Revestimento': 'Pintura eletrostática de um lado e prime do outro',
    'Proteção': 'PVC (plástico filme)',
    'Aplicações Típicas': 'Estruturas metálicas, perfis de montagem e suporte industrial.'
  },
  gallery: ['assets/images/produtos/pefril_l_40x100.jpg']
},
'perfil-l-40x90': {
  name: 'Perfil L 40x90x3000',
  image: 'assets/images/produtos/perfil_l_40x90.jpg',
  summary: 'Perfil de aço galvalume de alta qualidade, revestido com pintura eletrostática e proteção em PVC.',
  description: 'O Perfil L 40x90  é fabricado em aço galvalume de alta qualidade, com espessura mínima de 0,0043 mm. Possui revestimento com pintura eletrostática de um lado e prime no outro, além de proteção em PVC (plástico filme), garantindo resistência, durabilidade e excelente acabamento para aplicações estruturais e industriais.',
  specs: {
    'Material': 'Aço galvalume',
    'Espessura': 'Mínima de 0,0043 mm',
    'Revestimento': 'Pintura eletrostática de um lado e prime do outro',
    'Proteção': 'PVC (plástico filme)',
    'Aplicações Típicas': 'Estruturas metálicas, perfis de montagem e suporte industrial.'
  },
  gallery: ['assets/images/produtos/perfil_l_40x90.jpg']
},
'perfil-l-40x120': {
  name: 'Perfil L 40x120x3000',
  image: 'assets/images/produtos/perfil_l_40x120.jpg',
  summary: 'Perfil de aço galvalume de alta qualidade, revestido com pintura eletrostática e proteção em PVC.',
  description: 'O Perfil L 40x120  é produzido em aço galvalume de alta qualidade, com espessura mínima de 0,0043 mm. Possui revestimento com pintura eletrostática de um lado e prime no outro, além de proteção em PVC (plástico filme), garantindo resistência, durabilidade e acabamento superior em aplicações estruturais e industriais.',
  specs: {
    'Material': 'Aço galvalume',
    'Espessura': 'Mínima de 0,0043 mm',
    'Revestimento': 'Pintura eletrostática de um lado e prime do outro',
    'Proteção': 'PVC (plástico filme)',
    'Aplicações Típicas': 'Estruturas metálicas, perfis de montagem e suporte industrial.'
  },
  gallery: ['assets/images/produtos/perfil_l_40x120.jpg']
},
'perfil-l-40x140x3000': {
  name: 'Perfil L 40x140x3000mm',
  image: 'assets/images/produtos/perfil_le_40x140x3000mm.jpg',
  summary: 'Perfil de aço galvalume de alta qualidade, revestido com pintura eletrostática e proteção em PVC.',
  description: 'O Perfil L 40x140x3000mm  é produzido em aço galvalume de alta qualidade, com espessura mínima de 0,0043 mm. Possui revestimento com pintura eletrostática de um lado e prime do outro, além de proteção em PVC (plástico filme), garantindo resistência, durabilidade e acabamento superior para aplicações estruturais e industriais.',
  specs: {
    'Material': 'Aço galvalume',
    'Espessura': 'Mínima de 0,0043 mm',
    'Revestimento': 'Pintura eletrostática de um lado e prime do outro',
    'Proteção': 'PVC (plástico filme)',
    'Comprimento': '3000 mm',
    'Aplicações Típicas': 'Estruturas metálicas, perfis de montagem e suporte industrial.'
  },
  gallery: ['assets/images/produtos/perfil_le_40x140x3000mm.jpg']
},
'perfil-l-40x190x3000': {
  name: 'Perfil L 40x190x3000mm',
  image: 'assets/images/produtos/perfil_le_40x190x3000mm.jpg',
  summary: 'Perfil de aço galvalume de alta qualidade, revestido com pintura eletrostática e proteção em PVC.',
  description: 'O Perfil L 40x190x3000mm  é fabricado em aço galvalume de alta qualidade, com espessura mínima de 0,0043 mm. Conta com revestimento em pintura eletrostática de um lado e prime do outro, além de proteção em PVC (plástico filme), proporcionando resistência, durabilidade e excelente acabamento para aplicações estruturais e industriais.',
  specs: {
    'Material': 'Aço galvalume',
    'Espessura': 'Mínima de 0,0043 mm',
    'Revestimento': 'Pintura eletrostática de um lado e prime do outro',
    'Proteção': 'PVC (plástico filme)',
    'Comprimento': '3000 mm',
    'Aplicações Típicas': 'Estruturas metálicas, perfis de montagem e suporte industrial.'
  },
  gallery: ['assets/images/produtos/perfil_le_40x190x3000mm.jpg']
},
'perfil-l-40x240x3000': {
  name: 'Perfil L 40x240x3000mm',
  image: 'assets/images/produtos/perfil_le_40x240x3000mm.jpg',
  summary: 'Perfil de aço galvalume de alta qualidade, revestido com pintura eletrostática e proteção em PVC.',
  description: 'O Perfil L 40x240x3000mm  é produzido em aço galvalume de alta qualidade, com espessura mínima de 0,0043 mm. Possui revestimento com pintura eletrostática de um lado e prime do outro, além de proteção em PVC (plástico filme), garantindo resistência, durabilidade e excelente acabamento em aplicações estruturais e industriais.',
  specs: {
    'Material': 'Aço galvalume',
    'Espessura': 'Mínima de 0,0043 mm',
    'Revestimento': 'Pintura eletrostática de um lado e prime do outro',
    'Proteção': 'PVC (plástico filme)',
    'Comprimento': '3000 mm',
    'Aplicações Típicas': 'Estruturas metálicas, perfis de montagem e suporte industrial.'
  },
  gallery: ['assets/images/produtos/perfil_le_40x240x3000mm.jpg']
},
'perfil-l-40x40x3000': {
  name: 'Perfil L 40x40x3000mm',
  image: 'assets/images/produtos/perfil_li_40x40x3000mm_1.jpg',
  summary: 'Perfil de aço galvalume de alta qualidade, revestido com pintura eletrostática e proteção em PVC.',
  description: 'O Perfil L 40x40x3000mm é fabricado em aço galvalume de alta qualidade, com espessura mínima de 0,0043 mm. Possui revestimento com pintura eletrostática de um lado e prime do outro, além de proteção em PVC (plástico filme), garantindo durabilidade, resistência e excelente acabamento em aplicações estruturais e industriais.',
  specs: {
    'Material': 'Aço galvalume',
    'Espessura': 'Mínima de 0,0043 mm',
    'Revestimento': 'Pintura eletrostática de um lado e prime do outro',
    'Proteção': 'PVC (plástico filme)',
    'Comprimento': '3000 mm',
    'Aplicações Típicas': 'Estruturas metálicas, perfis de montagem e suporte industrial.'
  },
  gallery: ['assets/images/produtos/perfil_li_40x40x3000mm_1.jpg']
},
'perfil-u-50': {
  name: 'Perfil U 50x3000mm',
  image: 'assets/images/produtos/perfil_u_50.jpg',
  summary: 'Perfil de aço galvalume de alta qualidade, revestido com pintura eletrostática e proteção em PVC.',
  description: 'O Perfil U 50   é fabricado em aço galvalume de alta qualidade, com espessura mínima de 0,0043 mm. Possui revestimento com pintura eletrostática de um lado e prime do outro, além de proteção em PVC (plástico filme), garantindo durabilidade, resistência e acabamento superior para aplicações estruturais e industriais.',
  specs: {
    'Material': 'Aço galvalume',
    'Espessura': 'Mínima de 0,0043 mm',
    'Revestimento': 'Pintura eletrostática de um lado e prime do outro',
    'Proteção': 'PVC (plástico filme)',
    'Aplicações Típicas': 'Estruturas metálicas, perfis de montagem e suporte industrial.'
  },
  gallery: ['assets/images/produtos/perfil_u_50.jpg']
},
'perfil-u-100x3000': {
  name: 'Perfil U 100x3000mm',
  image: 'assets/images/produtos/perfil_u_100x3000mm.jpg',
  summary: 'Perfil de aço galvalume de alta qualidade, revestido com pintura eletrostática e proteção em PVC.',
  description: 'O Perfil U 100x3000mm  é produzido em aço galvalume de alta qualidade, com espessura mínima de 0,0043 mm. Possui revestimento com pintura eletrostática de um lado e prime do outro, além de proteção em PVC (plástico filme), garantindo resistência, durabilidade e acabamento superior em aplicações estruturais e industriais.',
  specs: {
    'Material': 'Aço galvalume',
    'Espessura': 'Mínima de 0,0043 mm',
    'Revestimento': 'Pintura eletrostática de um lado e prime do outro',
    'Proteção': 'PVC (plástico filme)',
    'Comprimento': '3000 mm',
    'Aplicações Típicas': 'Estruturas metálicas, perfis de montagem e suporte industrial.'
  },
  gallery: ['assets/images/produtos/perfil_u_100x3000mm.jpg']
},
'perfil-u-150x3000': {
  name: 'Perfil U 150x3000mm',
  image: 'assets/images/produtos/perfil_u_150x3000mm.jpg',
  summary: 'Perfil de aço galvalume de alta qualidade, revestido com pintura eletrostática e proteção em PVC.',
  description: 'O Perfil U 150x3000mm  é fabricado em aço galvalume de alta qualidade, com espessura mínima de 0,0043 mm. Possui revestimento com pintura eletrostática de um lado e prime do outro, além de proteção em PVC (plástico filme), garantindo resistência, durabilidade e acabamento superior para aplicações estruturais e industriais.',
  specs: {
    'Material': 'Aço galvalume',
    'Espessura': 'Mínima de 0,0043 mm',
    'Revestimento': 'Pintura eletrostática de um lado e prime do outro',
    'Proteção': 'PVC (plástico filme)',
    'Comprimento': '3000 mm',
    'Aplicações Típicas': 'Estruturas metálicas, perfis de montagem e suporte industrial.'
  },
  gallery: ['assets/images/produtos/perfil_u_150x3000mm.jpg']
},
'perfil-u-200x3000': {
  name: 'Perfil U 200x3000mm',
  image: 'assets/images/produtos/perfil_u_200x3000mm.jpg',
  summary: 'Perfil de aço galvalume de alta qualidade, revestido com pintura eletrostática e proteção em PVC.',
  description: 'O Perfil U 200x3000mm  é produzido em aço galvalume de alta qualidade, com espessura mínima de 0,0043 mm. Possui revestimento com pintura eletrostática de um lado e prime do outro, além de proteção em PVC (plástico filme), garantindo resistência, durabilidade e excelente acabamento para aplicações estruturais e industriais.',
  specs: {
    'Material': 'Aço galvalume',
    'Espessura': 'Mínima de 0,0043 mm',
    'Revestimento': 'Pintura eletrostática de um lado e prime do outro',
    'Proteção': 'PVC (plástico filme)',
    'Comprimento': '3000 mm',
    'Aplicações Típicas': 'Estruturas metálicas, perfis de montagem e suporte industrial.'
  },
  gallery: ['assets/images/produtos/perfil_u_200x3000mm.jpg']
},

                }
            },
            'acessorios': {
                subcategoryName: 'Acessórios',
                subcategoryImage: 'https://placehold.co/600x400/52525b/ffffff?text=Acessórios',
                subcategorySummary: 'Parafusos, selantes, e outros itens essenciais para a montagem de câmaras frias.',
                products: {
                    // O usuário irá adicionar itens aqui. Vou deixar um exemplo.
                    'parafusos': {
                        name: 'Parafusos de Fixação',
                        image: 'https://placehold.co/600x400/52525b/ffffff?text=Parafusos',
                        summary: 'Parafusos auto-brocantes para fixação de painéis em estruturas metálicas.',
                        description: 'Fornecemos parafusos de alta qualidade, com tratamento anti-corrosão, arruela de vedação em EPDM para garantir a estanqueidade da fixação dos painéis isotérmicos.',
                        specs: { 'Tipo': 'Auto-brocante', 'Material': 'Aço Zincado', 'Vedação': 'Arruela EPDM' },
                        gallery: ['https://placehold.co/600x400/52525b/ffffff?text=Parafusos']
                    },
                },
            }
        }
    }
};