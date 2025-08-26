// --- LÓGICA DE NAVEGAÇÃO E PÁGINAS ---
const mainPage = document.getElementById('main-page');
const portfolioPage = document.getElementById('portfolio-page');
const servicesListPage = document.getElementById('services-list-page');
const serviceDetailPage = document.getElementById('service-detail-page');
const aboutPage = document.getElementById('about-page');
const productsCatalogPage = document.getElementById('products-catalog-page');
const productListPage = document.getElementById('product-list-page');
const productDetailPage = document.getElementById('product-detail-page');
const allPages = [mainPage, portfolioPage, servicesListPage, serviceDetailPage, aboutPage, productsCatalogPage, productListPage, productDetailPage].filter(Boolean);

function showPage(pageToShow) {
    window.scrollTo(0, 0);
    allPages.forEach(page => page.classList.add('hidden'));
    pageToShow.classList.remove('hidden');
}

// Event listeners para navegação
document.addEventListener('DOMContentLoaded', function() {
    // Navegação principal
    const navLogo = document.getElementById('nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', (e) => {
            if (mainPage) {
                e.preventDefault();
                showPage(mainPage);
            } else {
                window.location.href = 'index.html';
            }
        });
    }
    
    // Links de serviços e produtos
    document.querySelectorAll('.view-service-list-page').forEach(el => 
        el.addEventListener('click', (e) => { 
            if (servicesListPage) { 
                e.preventDefault(); 
                showPage(servicesListPage); 
            } else {
                window.location.href = 'servicos.html';
            }
        })
    );
    
    document.querySelectorAll('.view-products-catalog-page').forEach(el => 
        el.addEventListener('click', (e) => { 
            if (productsCatalogPage) {
                e.preventDefault(); 
                showPage(productsCatalogPage); 
            } else {
                window.location.href = 'produtos.html';
            }
        })
    );
    
    // Navegação para portfolio
    if (document.getElementById('nav-portfolio')) {
        document.getElementById('nav-portfolio').addEventListener('click', (e) => { 
            if (portfolioPage) { 
                e.preventDefault(); 
                showPage(portfolioPage); 
            }
        });
    }
    
    if (document.getElementById('mobile-nav-portfolio')) {
        document.getElementById('mobile-nav-portfolio').addEventListener('click', (e) => { 
            if (portfolioPage) { 
                e.preventDefault(); 
                showPage(portfolioPage); 
            }
        });
    }
    
    // Navegação para sobre
    if (document.getElementById('nav-about')) {
        document.getElementById('nav-about').addEventListener('click', (e) => { 
            if (aboutPage) { 
                e.preventDefault(); 
                showPage(aboutPage); 
            }
        });
    }
    
    if (document.getElementById('mobile-nav-about')) {
        document.getElementById('mobile-nav-about').addEventListener('click', (e) => { 
            if (aboutPage) { 
                e.preventDefault(); 
                showPage(aboutPage); 
            }
        });
    }

    // Botão para ver portfolio completo
    const viewFullPortfolioBtn = document.getElementById('view-full-portfolio');
    if (viewFullPortfolioBtn) {
        viewFullPortfolioBtn.addEventListener('click', () => {
            if (portfolioPage) {
                showPage(portfolioPage);
            } else {
                window.location.href = 'portfolio.html';
            }
        });
    }
    
    // Botões voltar para main
    document.querySelectorAll('.back-to-main').forEach(btn => 
        btn.addEventListener('click', () => {
            if (mainPage) {
                showPage(mainPage);
            } else {
                window.location.href = 'index.html#inicio';
            }
        })
    );
    
    // Links de navegação interna (ancoras)
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && !link.id.includes('portfolio') && !link.id.includes('services') && !link.id.includes('about')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (mainPage && mainPage.classList.contains('hidden')) {
                    showPage(mainPage);
                }
                setTimeout(() => {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            });
        }
    });
});

// --- LÓGICA DE RENDERIZAÇÃO ---
const servicesPreviewContainer = document.getElementById('services-preview');
const servicesFullGridContainer = document.getElementById('services-full-grid');
const portfolioPreviewContainer = document.getElementById('portfolio-preview');
const portfolioFullGridContainer = document.getElementById('portfolio-full-grid');
const productCategoriesGrid = document.getElementById('product-categories-grid');

function createServiceCard(serviceId, service) {
    return `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300 flex flex-col">
            <img src="${service.image}" alt="${service.title}" class="w-full h-56 object-cover">
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-bold mb-2">${service.title}</h3>
                <p class="text-gray-600 flex-grow">${service.summary}</p>
                <button class="view-service-detail mt-4 text-blue-600 font-semibold self-start" data-service="${serviceId}">Saiba Mais &rarr;</button>
            </div>
        </div>
    `;
}

function createProjectCard(projectId, project) {
    return `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden group">
            <div class="relative">
                <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="open-modal-button text-white border-2 border-white py-2 px-6 rounded-full text-lg" data-project="${projectId}">Ver Detalhes</button>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                <p class="text-gray-600">${project.summary}</p>
            </div>
        </div>
    `;
}

// Renderização dos previews e grids
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se os dados estão disponíveis
    if (typeof servicesData === 'undefined' || typeof portfolioData === 'undefined') {
        console.warn('Dados não carregados ainda. As funcionalidades podem não funcionar corretamente.');
        return;
    }

    // Preview dos serviços (incluindo produtos)
    const previewServices = {...servicesData, ...{'produtos': {title: 'Nossos Produtos', image: 'assets/images/teste.png', summary: 'Fornecimento de materiais de alta performance, como isolantes térmicos e painéis isotérmicos para o seu projeto.'}}};
    
    if (servicesPreviewContainer) {
        Object.keys(previewServices).forEach(id => {
            const cardHtml = createServiceCard(id, previewServices[id]);
            servicesPreviewContainer.innerHTML += cardHtml;
        });
    }

    // Grid completo de serviços
    if (servicesFullGridContainer) {
        Object.keys(servicesData).forEach(id => {
            const cardHtml = createServiceCard(id, servicesData[id]);
            servicesFullGridContainer.innerHTML += cardHtml;
        });
    }

    // Preview do portfolio (primeiros 3 projetos)
    if (portfolioPreviewContainer) {
        Object.keys(portfolioData).slice(0, 3).forEach(id => {
            portfolioPreviewContainer.innerHTML += createProjectCard(id, portfolioData[id]);
        });
    }
    
    // Grid completo do portfolio
    if (portfolioFullGridContainer) {
        Object.keys(portfolioData).forEach(id => {
            portfolioFullGridContainer.innerHTML += createProjectCard(id, portfolioData[id]);
        });
    }
    
    // Grid de categorias de produtos
    if (productCategoriesGrid && typeof productsData !== 'undefined') {
        Object.keys(productsData).forEach(categoryId => {
            const category = productsData[categoryId];
            productCategoriesGrid.innerHTML += `
                <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden group transform hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300">
                    <img src="${category.categoryImage}" class="w-full h-64 object-cover opacity-60 group-hover:opacity-80 transition-opacity">
                    <div class="p-6">
                        <h3 class="text-2xl font-bold text-white mb-2">${category.categoryName}</h3>
                        <p class="text-gray-400 mb-4">${category.categoryDescription}</p>
                        <button class="view-product-list-page text-blue-400 font-semibold" data-category="${categoryId}">Explorar Categoria &rarr;</button>
                    </div>
                </div>
            `;
        });
    }
});

// --- LÓGICA PÁGINAS DE PRODUTOS ---
function showProductListPage(categoryId) {
    if (typeof productsData === 'undefined' || !productsData[categoryId]) return;
    
    const category = productsData[categoryId];
    let productsHtml = '';
    
    Object.keys(category.products).forEach(productId => {
        const product = category.products[productId];
        productsHtml += `
            <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden group transform hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300 flex flex-col">
                <div class="relative h-56">
                    <img src="${product.image}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <h3 class="absolute bottom-4 left-4 text-2xl font-bold text-white">${product.name}</h3>
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <p class="text-gray-400 flex-grow">${product.summary}</p>
                    <button class="view-product-detail-page mt-4 text-blue-400 font-semibold self-start" data-category="${categoryId}" data-product="${productId}">Ver Especificações &rarr;</button>
                </div>
            </div>
        `;
    });

    if (productListPage) {
        productListPage.innerHTML = `
            <main class="product-catalog-bg py-20">
                <div class="container mx-auto px-6">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl font-bold text-white">${category.categoryName}</h2>
                        <p class="text-gray-400 mt-2">${category.categoryDescription}</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${productsHtml}
                    </div>
                    <div class="text-center mt-12">
                        <button class="back-to-catalog text-gray-400 font-semibold">&larr; Voltar ao Catálogo</button>
                    </div>
                </div>
            </main>
        `;
        showPage(productListPage);
    }
}

function showProductDetailPage(categoryId, productId) {
    if (typeof productsData === 'undefined' || !productsData[categoryId]) return;
    
    const product = productsData[categoryId].products[productId];
    let specsHtml = '';
    
    Object.keys(product.specs).forEach(specKey => {
        specsHtml += `<li class="flex justify-between py-3 border-b border-gray-700"><span class="font-semibold text-gray-400">${specKey}</span><span class="font-mono text-blue-400">${product.specs[specKey]}</span></li>`;
    });

    if (productDetailPage) {
        productDetailPage.innerHTML = `
            <main class="product-catalog-bg py-20">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div class="sticky top-24">
                            <img src="${product.image}" class="w-full h-auto rounded-lg shadow-2xl">
                        </div>
                        <div>
                            <h1 class="text-5xl font-bold text-white mb-4">${product.name}</h1>
                            <p class="text-lg text-gray-300 leading-relaxed mb-6">${product.description}</p>
                            <div class="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
                                <h3 class="text-2xl font-bold text-white mb-4">Especificações Técnicas</h3>
                                <ul>${specsHtml}</ul>
                            </div>
                            <button class="contact-from-service-button mt-6 w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300">Solicitar Orçamento</button>
                        </div>
                    </div>
                     <div class="text-center mt-16">
                        <button class="back-to-product-list text-gray-400 font-semibold" data-category="${categoryId}">&larr; Voltar para ${productsData[categoryId].categoryName}</button>
                    </div>
                </div>
            </main>
        `;
        showPage(productDetailPage);
    }
}

// Event listeners para produtos
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-product-list-page')) {
        showProductListPage(e.target.dataset.category);
    }
    if (e.target.classList.contains('view-product-detail-page')) {
        showProductDetailPage(e.target.dataset.category, e.target.dataset.product);
    }
    if (e.target.classList.contains('back-to-catalog')) {
        if (productsCatalogPage) showPage(productsCatalogPage);
        else window.location.href = 'produtos.html';
    }
    if (e.target.classList.contains('back-to-product-list')) {
        showProductListPage(e.target.dataset.category);
    }
});

// --- LÓGICA PÁGINA DE DETALHE DE SERVIÇO ---
function showServiceDetail(serviceId) {
    if (typeof servicesData === 'undefined') return;
    
    const service = servicesData[serviceId];
    let galleryHtml = '';
    
    service.gallery.forEach(img => {
        galleryHtml += `<img src="${img}" class="w-full h-48 object-cover rounded-lg shadow-md">`;
    });

    let benefitsHtml = '';
    service.benefits.forEach(benefit => {
        benefitsHtml += `<div class="bg-white p-4 rounded-lg shadow"><h4 class="font-bold text-blue-700 mb-1">${benefit.title}</h4><p class="text-gray-600">${benefit.text}</p></div>`;
    });

    let subServicesHtml = '';
    if (service.subServices && service.subServices.length > 0) {
        subServicesHtml += '<h3 class="text-3xl font-bold text-gray-800 mt-12 mb-6">Nossas Soluções em Painéis</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">';
        service.subServices.forEach(sub => {
            subServicesHtml += `<div class="bg-blue-50 p-4 rounded-lg border border-blue-200"><h4 class="font-bold text-blue-800 mb-1">${sub.title}</h4><p class="text-gray-700 text-sm">${sub.text}</p></div>`;
        });
        subServicesHtml += '</div>';
    }

    if (serviceDetailPage) {
        serviceDetailPage.innerHTML = `
            <main class="bg-white">
                <section class="relative h-72">
                    <img src="${service.image}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-blue-900 bg-opacity-60 flex items-center justify-center">
                        <h1 class="text-5xl font-bold text-white text-center px-4">${service.title}</h1>
                    </div>
                </section>
                <section class="py-16 container mx-auto px-6">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div class="lg:col-span-2">
                            <h2 class="text-3xl font-bold text-gray-800 mb-4">Descrição Estratégica do Serviço</h2>
                            <p class="text-lg text-gray-600 leading-relaxed mb-8">${service.description}</p>
                            ${subServicesHtml}
                            <h3 class="text-3xl font-bold text-gray-800 mb-6">Por que escolher a Visual Isolamentos?</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                ${benefitsHtml}
                            </div>
                        </div>
                        <div>
                            <div class="bg-gray-50 p-6 rounded-lg shadow-lg sticky top-24">
                                <h3 class="text-2xl font-bold text-gray-800 mb-4">Galeria de Exemplos</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    ${galleryHtml}
                                </div>
                                <div class="mt-6 space-y-3">
                                    <p class="text-sm text-gray-600"><strong>Público-Alvo:</strong> ${service.targetAudience}</p>
                                    <p class="text-sm text-gray-600"><strong>Prazo de Execução:</strong> ${service.executionTime}</p>
                                    <p class="text-sm text-gray-600"><strong>Modelo de Precificação:</strong> ${service.pricingModel}</p>
                                </div>
                                <button class="contact-from-service-button mt-6 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">Solicitar Orçamento</button>
                                <button class="back-to-services mt-3 w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition duration-300">Voltar aos Serviços</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        `;
        showPage(serviceDetailPage);
    }
}

// Event listeners para detalhes de serviços
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-service-detail')) {
        const serviceId = e.target.dataset.service;
        if (serviceId === 'produtos') {
            if (productsCatalogPage) showPage(productsCatalogPage);
            else window.location.href = 'produtos.html';
        } else {
            showServiceDetail(serviceId);
        }
    }
    if (e.target.classList.contains('back-to-services')) {
        if (servicesListPage) showPage(servicesListPage);
        else window.location.href = 'servicos.html';
    }
    if (e.target.classList.contains('contact-from-service-button')) {
        if (mainPage) {
            showPage(mainPage);
            setTimeout(() => {
                const contato = document.querySelector('#contato');
                if (contato) contato.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            window.location.href = 'index.html#contato';
        }
    }
});

// --- LÓGICA DO MODAL DE PORTFÓLIO ---
const modal = document.getElementById('portfolio-modal');
const modalContent = document.getElementById('modal-content');

function openModal(projectId) {
    if (typeof portfolioData === 'undefined' || !modal || !modalContent) return;
    
    const project = portfolioData[projectId];
    let galleryHtml = '';
    project.gallery.forEach((img, index) => {
        galleryHtml += `<div class="carousel-slide flex-shrink-0 w-full"><img src="${img}" class="w-full h-80 object-cover rounded-lg" alt="${project.title} - Imagem ${index + 1}"></div>`;
    });

    let featuresHtml = '';
    project.keyFeatures.forEach(feature => {
        featuresHtml += `<li class="flex items-start"><span class="text-blue-500 mr-2 mt-1 font-bold">&#10003;</span><span>${feature}</span></li>`;
    });

    modalContent.innerHTML = `
        <button id="close-modal-button" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold z-10">&times;</button>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
            <div class="md:col-span-3">
                <div class="relative overflow-hidden rounded-lg">
                    <div class="carousel-container flex transition-transform duration-300 ease-in-out">
                        <div class="carousel-track flex transition-transform duration-300">
                            ${galleryHtml}
                        </div>
                    </div>
                    <button id="prevBtn" class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition">&#8249;</button>
                    <button id="nextBtn" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition">&#8250;</button>
                </div>
            </div>
            <div class="md:col-span-2 flex flex-col">
                <h2 class="text-3xl font-bold mb-2">${project.title}</h2>
                <div class="text-sm text-gray-500 mb-4"><span>${project.details.Local}</span> | <span>${project.details.Ano}</span></div>
                <div class="text-gray-600 mb-4 flex-grow">
                    <h4 class="font-bold text-gray-800 mb-2">Resumo do Projeto</h4><p>${project.description}</p>
                </div>
                <div class="bg-gray-100 p-4 rounded-lg">
                    <h4 class="font-bold text-gray-800 mb-2">Destaques do Projeto</h4><ul class="space-y-2">${featuresHtml}</ul>
                </div>
                <button class="contact-from-service-button mt-4 bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition">Entrar em Contato</button>
            </div>
        </div>
    `;
    
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
    
    // Configurar carrossel do modal
    const track = modalContent.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = modalContent.querySelector('#nextBtn');
    const prevButton = modalContent.querySelector('#prevBtn');
    
    if (slides.length > 0) {
        const slideWidth = slides[0].getBoundingClientRect().width;
        let currentIndex = 0;
        
        const moveToSlide = (targetIndex) => {
            track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
            currentIndex = targetIndex;
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', e => { 
                moveToSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1); 
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', e => { 
                moveToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1); 
            });
        }
    }
    
    // Botão fechar modal
    const closeButton = modalContent.querySelector('#close-modal-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
}

function closeModal() {
    if (modal) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'auto';
    }
}

// Event listeners para modal
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('open-modal-button')) {
        openModal(e.target.dataset.project);
    }
});

if (modal) {
    modal.addEventListener('click', (e) => { 
        if (e.target === modal) closeModal(); 
    });
}

// --- LÓGICA DO MENU MOBILE ---
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => { 
            mobileMenu.classList.toggle('hidden'); 
        });
        
        mobileMenu.querySelectorAll('.nav-link').forEach(link => { 
            link.addEventListener('click', () => { 
                mobileMenu.classList.add('hidden'); 
            }); 
        });
    }
});

// --- LÓGICA DO CARROSSEL DE PARCEIROS ---
document.addEventListener('DOMContentLoaded', function() {
    const partnersTrack = document.getElementById('partners-track');
    const partnersCarousel = document.getElementById('partners-carousel');
    
    if (partnersTrack && typeof partnersData !== 'undefined') {
        // Duplica os parceiros para criar o efeito de loop infinito
        const allPartners = [...partnersData, ...partnersData];
        
        // Ajustado para 8 itens por página (12.5% cada)
        partnersTrack.style.width = `${allPartners.length * 12.5}%`; 

        allPartners.forEach(partner => {
            const partnerDiv = document.createElement('div');
            partnerDiv.className = 'flex-shrink-0 w-1/8 px-8 flex flex-col items-center justify-center';
            
            const img = document.createElement('img');
            img.src = partner.logo;
            img.alt = partner.name;
            img.className = 'h-24 mx-auto grayscale hover:grayscale-0 transition duration-300';
            
            const p = document.createElement('p');
            p.className = 'mt-2 text-sm font-semibold text-gray-600';
            p.textContent = partner.name;
            
            partnerDiv.appendChild(img);
            partnerDiv.appendChild(p);
            partnersTrack.appendChild(partnerDiv);
        });
    }
});

// --- LÓGICA DOS GRÁFICOS ANIMADOS ---
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
        .range([color, '#374151']); // Cor do fundo do gráfico

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
        // Animação do número
        text.transition()
            .duration(1500)
            .tween("text", function() {
                const i = d3.interpolate(0, finalValue * 100);
                const format = unit === 'min' ? (d) => `${Math.round(d)}<tspan font-size="1rem">min</tspan>` : (d) => `${Math.round(d)}<tspan font-size="1.5rem">%</tspan>`;
                return function(t) {
                    // Usamos .html() para interpretar o <tspan>
                    d3.select(this).html(format(i(t)));
                };
            });
        
        // Animação do arco
        path.filter((d, i) => i === 0) // Seleciona apenas o primeiro arco (o colorido)
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
    
    // Guarda a função de animação para ser chamada depois
    element.animateChart = animate;
}

// Inicialização dos gráficos
document.addEventListener('DOMContentLoaded', function() {
    createDonutChart('chart1', 0.95, '#3b82f6', '%'); // 95%
    createDonutChart('chart2', 0.60, '#10b981', 'min'); // 60 min
    createDonutChart('chart3', 0.85, '#ef4444', '%'); // 85%

    const statsSection = document.getElementById('stats');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                const chart1 = document.getElementById('chart1');
                const chart2 = document.getElementById('chart2');
                const chart3 = document.getElementById('chart3');
                
                if (chart1 && chart1.animateChart) chart1.animateChart(0.95);
                if (chart2 && chart2.animateChart) chart2.animateChart(0.60);
                if (chart3 && chart3.animateChart) chart3.animateChart(0.85);
                
                hasAnimated = true;
                observer.unobserve(statsSection); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.5 });
    
    if(statsSection) {
        observer.observe(statsSection);
    }
});