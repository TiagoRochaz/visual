// --- LÓGICA DE NAVEGAÇÃO E PÁGINAS ---
const servicesListPage = document.getElementById('services-list-page');
const serviceDetailPage = document.getElementById('service-detail-page');
const productsCatalogPage = document.getElementById('products-catalog-page');
const productListPage = document.getElementById('product-list-page');
const productDetailPage = document.getElementById('product-detail-page');

function showPage(pageToShow) {
    window.scrollTo(0, 0);
    // Hide all major page containers
    [servicesListPage, serviceDetailPage, productsCatalogPage, productListPage, productDetailPage].filter(Boolean).forEach(page => page.classList.add('hidden'));
    // Show the target page
    pageToShow.classList.remove('hidden');
}

// Event listeners para navegação
document.addEventListener('DOMContentLoaded', function() {
    // Botão para ver portfolio completo
    const viewFullPortfolioBtn = document.getElementById('view-full-portfolio');
    if (viewFullPortfolioBtn) {
        viewFullPortfolioBtn.addEventListener('click', () => {
            window.location.href = 'portfolio.html';
        });
    }

    // Links de navegação interna (ancoras)
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && !link.id.includes('portfolio') && !link.id.includes('services') && !link.id.includes('about')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Smooth scroll to anchor
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
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
    const allServicesForPreview = {...servicesData, ...{'produtos': {title: 'Nossos Produtos', image: 'assets/images/teste.png', summary: 'Fornecimento de materiais de alta performance, como isolantes térmicos e painéis isotérmicos para o seu projeto.'}}};
    
    if (servicesPreviewContainer) {
        Object.keys(allServicesForPreview).forEach(id => {
            const service = allServicesForPreview[id];
            // Mostra o serviço no preview apenas se a flag `showInPreview` não for explicitamente `false`.
            // Isso permite que serviços sem a flag (padrão) apareçam.
            if (service.showInPreview !== false) {
                const cardHtml = createServiceCard(id, service);
                servicesPreviewContainer.innerHTML += cardHtml;
            }
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
                    <img src="${category.categoryImage}" class="w-full h-56 object-cover opacity-60 group-hover:opacity-80 transition-opacity">
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
    
    // Se a categoria for 'isopaineis', mostramos os links para as subcategorias.
    if (categoryId === 'isopaineis' && category.subcategories) {
        Object.keys(category.subcategories).forEach(subcatId => {
            const subcategory = category.subcategories[subcatId];
            productsHtml += `
                <a href="produtos-lista.html?category=${categoryId}&subcategory=${subcatId}" class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden group transform hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div class="relative h-56">
                        <img src="${subcategory.subcategoryImage}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <h3 class="absolute bottom-4 left-4 text-2xl font-bold text-white">${subcategory.subcategoryName}</h3>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <p class="text-gray-400 flex-grow">${subcategory.subcategorySummary}</p>
                        <span class="mt-4 text-blue-400 font-semibold self-start">Explorar Itens &rarr;</span>
                    </div>
                </a>
            `;
        });
    }
    // Para outras categorias, mostramos os produtos diretamente.
    else if (category.products) {
        Object.keys(category.products).forEach(productId => {
            const product = category.products[productId];
            productsHtml += `
                <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden group transform hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div class="relative aspect-square bg-gray-900">
                        <img src="${product.image}" class="w-full h-full object-contain">
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
    }

    const pageContent = `
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
    `;

    if (productListPage) {
        productListPage.innerHTML = pageContent;
        showPage(productListPage);
    }
}

function renderSubcategoryProducts(categoryId, subcategoryId) {
    const container = document.getElementById('product-list-page');
    if (!container || typeof productsData === 'undefined') return;

    const subcategory = productsData[categoryId]?.subcategories?.[subcategoryId];
    if (!subcategory) {
        container.innerHTML = '<p class="text-white text-center text-xl">Subcategoria não encontrada.</p>';
        return;
    }

    let productsHtml = '';
    if (Object.keys(subcategory.products).length > 0) {
        Object.keys(subcategory.products).forEach(productId => {
            const product = subcategory.products[productId];
            productsHtml += `
                <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden group transform hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div class="relative aspect-square bg-gray-900">
                        <img src="${product.image}" class="w-full h-full object-contain">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <h3 class="absolute bottom-4 left-4 text-2xl font-bold text-white">${product.name}</h3>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <p class="text-gray-400 flex-grow">${product.summary}</p>
                        <button class="view-product-detail-page mt-4 text-blue-400 font-semibold self-start" data-category="${categoryId}" data-subcategory="${subcategoryId}" data-product="${productId}">Ver Especificações &rarr;</button>
                    </div>
                </div>
            `;
        });
    } else {
        productsHtml = '<p class="text-gray-400 text-center col-span-1 md:col-span-2 lg:col-span-3">Nenhum produto nesta subcategoria ainda. Volte em breve!</p>';
    }

    const pageContent = `
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-white">${subcategory.subcategoryName}</h2>
            <p class="text-gray-400 mt-2">Explore os produtos disponíveis nesta subcategoria.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${productsHtml}</div>
        <div class="text-center mt-12"><a href="produtos.html" class="text-gray-400 font-semibold">&larr; Voltar ao Catálogo Principal</a></div>
    `;
    container.innerHTML = pageContent;
}

function showProductDetailPage(categoryId, subcategoryId, productId) {
    if (typeof productsData === 'undefined' || !productsData[categoryId]) return;
    
    const category = productsData[categoryId];
    let product;
    let backButtonText = category.categoryName;

    if (subcategoryId && category.subcategories && category.subcategories[subcategoryId]) {
        product = category.subcategories[subcategoryId].products[productId];
        backButtonText = category.subcategories[subcategoryId].subcategoryName;
    } else if (category.products) {
        product = category.products[productId];
    }
    
    if (!product) return;

    let specsHtml = '';
    if (product.specs) {
        Object.keys(product.specs).forEach(specKey => {
            const specValue = product.specs[specKey];
            
            // Se o valor for um array, cria uma lista de "tags" que quebram a linha.
            if (Array.isArray(specValue)) {
                const listItems = specValue.map(item => `<li class="inline-block mr-2 mb-2 px-3 py-1 bg-gray-800 border border-gray-600 rounded-full">${item}</li>`).join('');
                specsHtml += `
                    <li class="flex flex-col py-3 border-b border-gray-700">
                        <span class="font-semibold text-gray-400 mb-3">${specKey}</span>
                        <ul class="flex flex-wrap font-mono text-blue-300">
                            ${listItems}
                        </ul>
                    </li>`;
            } 
            // Se for uma string, mantém o formato original de chave-valor.
            else {
                specsHtml += `<li class="flex justify-between py-3 border-b border-gray-700"><span class="font-semibold text-gray-400">${specKey}</span><span class="font-mono text-blue-400">${specValue}</span></li>`;
            }
        });
    }

    const pageContent = `
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
            <button class="back-to-product-list text-gray-400 font-semibold" data-category="${categoryId}" data-subcategory="${subcategoryId || ''}">&larr; Voltar para ${backButtonText}</button>
        </div>
    `;

    if (productDetailPage) {
        productDetailPage.innerHTML = pageContent;
        showPage(productDetailPage);
    }
}

// Event listeners para produtos
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-product-list-page')) {
        const categoryId = e.target.dataset.category;
        // Carrega a lista de produtos ou a lista de subcategorias na mesma página.
        if (productsData[categoryId]) {
            showProductListPage(categoryId);
        }
    }
    if (e.target.classList.contains('view-product-detail-page')) {
        const categoryId = e.target.dataset.category;
        const subcategoryId = e.target.dataset.subcategory; // Can be undefined
        const productId = e.target.dataset.product;
        showProductDetailPage(categoryId, subcategoryId, productId);
    }
    if (e.target.classList.contains('back-to-catalog')) {
        if (productsCatalogPage) showPage(productsCatalogPage); // SPA-like behavior on products.html
        else window.location.href = 'produtos.html';
    }
    if (e.target.classList.contains('back-to-product-list')) {
        // This is more efficient and correctly returns to the previous list (category or subcategory)
        if (productListPage) {
            showPage(productListPage);
        }
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
        if (serviceId === 'produtos') { // O card de produtos redireciona para a página de produtos
            window.location.href = 'produtos.html';
        } else {
            showServiceDetail(serviceId);
        }
    }
    if (e.target.classList.contains('back-to-services')) {
        if (servicesListPage) showPage(servicesListPage);
        else window.location.href = 'servicos.html';
    }
    if (e.target.classList.contains('contact-from-service-button')) {
        window.location.href = 'index.html#contato';
    }
});

// --- LÓGICA DO MODAL DE PORTFÓLIO ---
const modal = document.getElementById('portfolio-modal');
const modalContent = document.getElementById('modal-content');

function openModal(projectId) {
    if (typeof portfolioData === 'undefined' || !modal || !modalContent) return;
    
    const project = portfolioData[projectId];

    // Main slides HTML
    let galleryHtml = '';
    project.gallery.forEach((img, index) => {
        // Aumentei a altura para h-[65vh] (65% da altura da tela) para que imagens verticais (de celular) fiquem maiores e mais visíveis.
        // Revertido para o modelo anterior, com altura de 65vh e fundo mais escuro para um visual mais padronizado.
        // Alterado para 'object-cover' para que a imagem preencha o quadro, removendo as bordas (letterboxing). O fundo foi removido por não ser mais visível.
        galleryHtml += `<div class="carousel-slide flex-shrink-0 w-full rounded-lg"><img src="${img}" class="w-full h-[65vh] object-cover" alt="${project.title} - Imagem ${index + 1}"></div>`;
    });

    // Thumbnails HTML
    let thumbnailsHtml = '';
    if (project.gallery.length > 1) {
        project.gallery.forEach((img, index) => {
            // Increased height for thumbnails
            thumbnailsHtml += `
                <button class="thumbnail-button rounded-md overflow-hidden border-2 border-transparent focus:outline-none transition-all duration-300" data-index="${index}">
                    <img src="${img}" class="w-full h-20 object-cover" alt="Thumbnail ${index + 1}">
                </button>
            `;
        });
    }

    // Key features HTML
    let featuresHtml = '';
    project.keyFeatures.forEach(feature => {
        featuresHtml += `<li class="flex items-start"><span class="text-blue-500 mr-2 mt-1 font-bold">&#10003;</span><span>${feature}</span></li>`;
    });

    modalContent.innerHTML = `
        <button id="close-modal-button" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold z-20">&times;</button>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-8 p-6 md:p-8">
            <div class="md:col-span-3">
                <!-- Main Image Viewer: Simplified structure to fix image cutting -->
                <div class="relative overflow-hidden rounded-lg mb-4 shadow-lg">
                    <div class="carousel-track flex">
                        ${galleryHtml}
                    </div>
                    ${project.gallery.length > 1 ? `
                    <button id="prevBtn" class="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-10">&#8249;</button>
                    <button id="nextBtn" class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-10">&#8250;</button>
                    ` : ''}
                </div>
                <!-- Thumbnails: Added for image preview -->
                ${project.gallery.length > 1 ? `
                <div class="thumbnail-container grid grid-cols-5 gap-2">
                    ${thumbnailsHtml}
                </div>
                ` : ''}
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
                <button class="contact-from-service-button mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition">Entrar em Contato</button>
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
    const thumbnails = modalContent.querySelectorAll('.thumbnail-button');
    
    if (slides.length > 1) {
        let currentIndex = 0;
        
        const updateThumbnails = (activeIndex) => {
            thumbnails.forEach((thumb, index) => {
                if (index === activeIndex) {
                    thumb.classList.add('border-blue-500');
                    thumb.classList.remove('border-transparent');
                } else {
                    thumb.classList.remove('border-blue-500');
                    thumb.classList.add('border-transparent');
                }
            });
        };

        const moveToSlide = (targetIndex) => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
            currentIndex = targetIndex;
            updateThumbnails(currentIndex);
        };
        
        prevButton.addEventListener('click', () => { 
            const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
            moveToSlide(newIndex); 
        });
        
        nextButton.addEventListener('click', () => { 
            const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
            moveToSlide(newIndex); 
        });

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index, 10);
                moveToSlide(index);
            });
        });

        // Initial state
        updateThumbnails(0);
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

        // Para exibir 4 logos, cada um precisa de 25% do container.
        // O track tem 16 logos (8 duplicados), então a largura total do track deve ser 16 * 25% = 400% do container.
        partnersTrack.style.width = `${allPartners.length * 25}%`;

        allPartners.forEach(partner => {
            const partnerDiv = document.createElement('div');
            // A largura de cada item deve ser 1/16 da largura total do track (400%).
            // 100% / 16 = 6.25%. Isso resulta em um tamanho renderizado de 6.25% de 400% = 25% do container, mantendo o tamanho desejado.
            partnerDiv.className = 'flex-shrink-0 w-[6.25%] px-8 flex flex-col items-center justify-center';
            
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