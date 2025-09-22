// --- LÓGICA DE NAVEGAÇÃO SPA (Single Page Application) E ROTEAMENTO ---
const pages = {
    servicesList: document.getElementById('services-list-page'),
    serviceDetail: document.getElementById('service-detail-page'),
    productsCatalog: document.getElementById('products-catalog-page'),
    productList: document.getElementById('product-list-page'),
    productDetail: document.getElementById('product-detail-page'),
};

function showPage(pageToShow) {
    window.scrollTo(0, 0);
    Object.values(pages).filter(Boolean).forEach(page => page.classList.add('hidden'));
    if (pageToShow) {
        pageToShow.classList.remove('hidden');
    }
}

function handleRouting() {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get('service');
    const categoryId = params.get('category');
    const subcategoryId = params.get('subcategory');
    const productId = params.get('product');
    const bodyId = document.body.id;

    if (bodyId === 'servicos-body') {
        if (serviceId) {
            showServiceDetail(serviceId, false);
        } else {
            showPage(pages.servicesList);
        }
    }

    if (bodyId === 'produtos-body') {
        if (productId) {
            showProductDetailPage(categoryId, subcategoryId, productId, false);
        } else if (categoryId) {
            showProductListPage(categoryId, false);
        } else {
            showPage(pages.productsCatalog);
        }
    }

    if (bodyId === 'produtos-lista-body') {
        if (productId) {
            showProductDetailPage(categoryId, subcategoryId, productId, false);
        } else if (categoryId && subcategoryId) {
            renderSubcategoryProducts(categoryId, subcategoryId);
            showPage(pages.productList);
        }
    }
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

    window.addEventListener('popstate', handleRouting);
    handleRouting(); // Roda na carga inicial da página
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
function showProductListPage(categoryId, push = true) {
    if (push) {
        const url = new URL(window.location);
        url.searchParams.set('category', categoryId);
        url.searchParams.delete('subcategory');
        url.searchParams.delete('product');
        history.pushState({ page: 'productList', categoryId }, '', url);
    }

    if (typeof productsData === 'undefined' || !productsData[categoryId]) return;
    
    const category = productsData[categoryId];
    let productsHtml = '';
    
    // Se a categoria for 'isopaineis', mostramos os links para as subcategorias.
    if (categoryId === 'isopaineis' && category.subcategories) {
        Object.keys(category.subcategories).forEach(subcatId => {
            const subcategory = category.subcategories[subcatId];
            productsHtml += `
                <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden group transform hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div class="relative h-56">
                        <img src="${subcategory.subcategoryImage}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <h3 class="absolute bottom-4 left-4 text-2xl font-bold text-white">${subcategory.subcategoryName}</h3>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <p class="text-gray-400 flex-grow">${subcategory.subcategorySummary}</p>
                        <button class="view-subcategory-list-page mt-4 text-blue-400 font-semibold self-start" data-category="${categoryId}" data-subcategory="${subcatId}">Explorar Itens &rarr;</button>
                    </div>
                </div>
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
            <button class="back-button text-gray-400 font-semibold">&larr; Voltar ao Catálogo</button>
        </div>
    `;

    if (pages.productList) {
        pages.productList.innerHTML = pageContent;
        showPage(pages.productList);
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
        <div class="text-center mt-12"><a href="produtos.html" class="text-gray-400 font-semibold">&larr; Voltar às Categorias</a></div>
    `;
    container.innerHTML = pageContent;
}

function showProductDetailPage(categoryId, subcategoryId, productId, push = true) {
    if (push) {
        const url = new URL(window.location);
        url.searchParams.set('category', categoryId);
        if (subcategoryId) {
            url.searchParams.set('subcategory', subcategoryId);
        } else {
            url.searchParams.delete('subcategory');
        }
        url.searchParams.set('product', productId);
        history.pushState({ page: 'productDetail', categoryId, subcategoryId, productId }, '', url);
    }
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
            <div class="lg:sticky top-24">
                <img src="${product.image}" class="w-full h-auto rounded-lg shadow-2xl">
            </div>
            <div>
                <h1 class="text-5xl font-bold text-white mb-4">${product.name}</h1>
                <p class="text-lg text-gray-300 leading-relaxed mb-6">${product.description}</p>
                <div class="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
                    <h3 class="text-2xl font-bold text-white mb-4">Especificações Técnicas</h3>
                    <ul>${specsHtml}</ul>
                </div>
                <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button class="contact-from-service-button w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">Solicitar Orçamento</button>
                    <a href="https://wa.me/551531912990?text=Ol%C3%A1!%20vim%20pelo%20Site%20e%20gostaria%20de%20falar%20com%20um%20especialista." target="_blank" rel="noopener noreferrer" class="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center space-x-2 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.068-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.1-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                        </svg>
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
            <div class="text-center mt-16">
            <button class="back-button text-gray-400 font-semibold">&larr; Voltar para ${backButtonText}</button>
        </div>
    `;

    if (pages.productDetail) {
        pages.productDetail.innerHTML = pageContent;
        showPage(pages.productDetail);
    }
}

// Event listeners para produtos
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-product-list-page')) {
        e.preventDefault();
        const categoryId = e.target.dataset.category;
        // Carrega a lista de produtos ou a lista de subcategorias na mesma página.
        if (productsData[categoryId]) {
            showProductListPage(categoryId);
        }
    }
    if (e.target.classList.contains('view-subcategory-list-page')) {
        e.preventDefault();
        const categoryId = e.target.dataset.category;
        const subcategoryId = e.target.dataset.subcategory;
        window.location.href = `produtos-lista.html?category=${categoryId}&subcategory=${subcategoryId}`;
    }
    if (e.target.classList.contains('view-product-detail-page')) {
        e.preventDefault();
        const categoryId = e.target.dataset.category;
        const subcategoryId = e.target.dataset.subcategory; // Can be undefined
        const productId = e.target.dataset.product;
        showProductDetailPage(categoryId, subcategoryId, productId, true);
    }
    if (e.target.classList.contains('back-button')) {
        e.preventDefault();
        history.back();
    }
});

// --- LÓGICA PÁGINA DE DETALHE DE SERVIÇO ---
function showServiceDetail(serviceId, push = true) {
    if (push) {
        const url = new URL(window.location);
        url.searchParams.set('service', serviceId);
        history.pushState({ page: 'serviceDetail', serviceId }, '', url);
    }
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

    if (pages.serviceDetail) {
        pages.serviceDetail.innerHTML = `
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
                            <div class="bg-gray-50 p-6 rounded-lg shadow-lg lg:sticky top-24">
                                <h3 class="text-2xl font-bold text-gray-800 mb-4">Galeria de Exemplos</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    ${galleryHtml}
                                </div>
                                <div class="mt-6 space-y-3">
                                    <p class="text-sm text-gray-600"><strong>Público-Alvo:</strong> ${service.targetAudience}</p>
                                    <p class="text-sm text-gray-600"><strong>Prazo de Execução:</strong> ${service.executionTime}</p>
                                    <p class="text-sm text-gray-600"><strong>Modelo de Precificação:</strong> ${service.pricingModel}</p>
                                </div>
                                <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <button class="contact-from-service-button w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">Solicitar Orçamento</button>
                                    <a href="https://wa.me/551531912990?text=Ol%C3%A1!%20vim%20pelo%20Site%20e%20gostaria%20de%20falar%20com%20um%20especialista." target="_blank" rel="noopener noreferrer" class="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center space-x-2 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.068-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.1-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                        </svg>
                                        <span>WhatsApp</span>
                                    </a>
                                </div>
                                <button class="back-button mt-3 w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition duration-300">Voltar aos Serviços</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        `;
        showPage(pages.serviceDetail);
    }
}

// Event listeners para detalhes de serviços
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-service-detail')) {
        e.preventDefault();
        const serviceId = e.target.dataset.service;
        if (serviceId === 'produtos') { // O card de produtos redireciona para a página de produtos
            window.location.href = 'produtos.html';
        } else {
            // Se estiver na página de serviços, usa a navegação SPA. Senão, redireciona.
            if (document.body.id === 'servicos-body') {
                showServiceDetail(serviceId, true);
            } else {
                window.location.href = `servicos.html?service=${serviceId}`;
            }
        }
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
                <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button class="contact-from-service-button w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition">Entrar em Contato</button>
                    <a href="https://wa.me/551531912990?text=Ol%C3%A1!%20vim%20pelo%20Site%20e%20gostaria%20de%20falar%20com%20um%20especialista." target="_blank" rel="noopener noreferrer" class="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center space-x-2 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.068-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.1-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                        </svg>
                        <span>WhatsApp</span>
                    </a>
                </div>
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

// --- LÓGICA DO BOTÃO VOLTAR AO TOPO ---
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top-button');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
                backToTopButton.classList.remove('hidden');
                backToTopButton.classList.add('flex');
            } else {
                backToTopButton.classList.add('hidden');
                backToTopButton.classList.remove('flex');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// --- LÓGICA DO CARROSSEL DE PARCEIROS ---
document.addEventListener('DOMContentLoaded', function() {
    const partnersTrack = document.getElementById('partners-track');

    function updatePartnersCarousel() {
        if (partnersTrack && typeof partnersData !== 'undefined') {
            partnersTrack.innerHTML = ''; // Limpa para reconstruir em caso de redimensionamento
            const isMobile = window.innerWidth < 768;
            const itemsVisible = isMobile ? 1.5 : 6; // Exibe 1.5 logos no mobile para mais espaço e tamanho, 6 no desktop
            const itemWidthPercent = 100 / itemsVisible;

            // Duplica os parceiros para o efeito de loop
            const allPartners = [...partnersData, ...partnersData];

            // A largura total do track é o número total de parceiros * a largura de cada um
            partnersTrack.style.width = `${allPartners.length * itemWidthPercent}%`;

            allPartners.forEach(partner => {
                const partnerDiv = document.createElement('div');
                // A largura de cada item é 1/total_de_itens da largura do track (100% / 16 = 6.25%)
                partnerDiv.className = 'flex-shrink-0 w-[6.25%] px-8 md:px-4 flex flex-col items-center justify-center';
                
                const img = document.createElement('img');
                img.src = partner.logo;
                img.alt = partner.name;
                img.className = 'h-24 md:h-24 mx-auto grayscale hover:grayscale-0 transition duration-300';
                
                const p = document.createElement('p');
                p.className = 'mt-2 text-center text-xs md:text-sm font-semibold text-gray-600';
                p.textContent = partner.name;
                
                partnerDiv.appendChild(img);
                partnerDiv.appendChild(p);
                partnersTrack.appendChild(partnerDiv);
            });
        }
    }

    updatePartnersCarousel(); // Executa na carga inicial

    // Atualiza o carrossel ao redimensionar a janela para garantir a responsividade
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updatePartnersCarousel, 250);
    });
});

// --- LÓGICA DOS GRÁFICOS ANIMADOS ---
function createDonutChart(elementId, value, color, unit = '%') {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Para '%', o valor é uma proporção (0-1). Para 'min', o código original passava um valor semelhante a uma proporção (0,60 para 60).
    // Isso é frágil. Tornamos isso mais robusto, lidando com o valor bruto para 'min'.
    // Assumimos um máximo de 90 minutos para o arco, tornando-o significativo.
    const arcProportion = unit === '%' ? value : value / 90.0;
    // Garante que a proporção esteja entre 0 e 1 para evitar erros no D3.
    const data = [Math.min(arcProportion, 1), 1 - Math.min(arcProportion, 1)];

    const isMobile = window.innerWidth < 768;
    const size = isMobile ? 144 : 192; // Tamanho menor para mobile (144px), padrão (192px)
    const width = size, height = size, margin = 5;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#" + elementId)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

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
        .style("font-size", isMobile ? "2rem" : "2.5rem") // Fonte menor para mobile
        .style("font-weight", "700")
        .style("fill", "white");

    function animate(finalValue) {
        // Para '%', o valor de exibição é finalValue * 100. Para 'min', é apenas o finalValue.
        const displayValue = unit === '%' ? finalValue * 100 : finalValue;

        // Animação do número
        text.transition()
            .duration(1500)
            .tween("text", function() {
                const i = d3.interpolate(0, displayValue);
                const unitFontSize = isMobile ? "0.8rem" : "1rem";
                const percentUnitFontSize = isMobile ? "1.2rem" : "1.5rem";
                const format = unit === 'min' ? (d) => `${Math.round(d)}<tspan font-size="${unitFontSize}">min</tspan>` : (d) => `${Math.round(d)}<tspan font-size="${percentUnitFontSize}">%</tspan>`;
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
    createDonutChart('chart1', 0.95, '#3b82f6', '%');
    createDonutChart('chart2', 60, '#10b981', 'min'); // 60 min
    createDonutChart('chart3', 0.85, '#ef4444', '%');

    const statsSection = document.getElementById('stats');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                const chart1 = document.getElementById('chart1');
                const chart2 = document.getElementById('chart2');
                const chart3 = document.getElementById('chart3');
                
                if (chart1 && chart1.animateChart) chart1.animateChart(0.95);
                if (chart2 && chart2.animateChart) chart2.animateChart(60);
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

// --- LÓGICA DO VÍDEO RESPONSIVO DA PÁGINA INICIAL ---
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('hero-video');

    function setHeroVideoSource() {
        // Esta função só deve rodar na página inicial onde o vídeo existe
        if (heroVideo) {
            const isMobile = window.innerWidth < 768;
            const mobileSrc = 'assets/videos/9X16.mp4';
            const desktopSrc = 'assets/videos/hero-video.mp4';
            const newSrc = isMobile ? mobileSrc : desktopSrc;

            // Extrai apenas o nome do arquivo da URL completa para uma comparação segura
            const currentSrcPath = heroVideo.currentSrc ? heroVideo.currentSrc.split('/').pop() : null;
            const newSrcPath = newSrc.split('/').pop();

            // Altera a fonte apenas se for diferente da atual para evitar recarregamentos desnecessários
            if (currentSrcPath !== newSrcPath) {
                heroVideo.src = newSrc;
                heroVideo.load();
                // O 'play' é importante após o 'load' para garantir que o vídeo inicie
                heroVideo.play().catch(error => console.log("Autoplay do vídeo foi bloqueado pelo navegador:", error));
            }
        }
    }

    // Define o vídeo na carga inicial
    setHeroVideoSource();

    // Atualiza o vídeo ao redimensionar a janela (com um pequeno atraso para performance)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setHeroVideoSource, 250);
    });
});

// --- LÓGICA DO FORMULÁRIO DE CONTATO ---
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    async function handleSubmit(event) {
        event.preventDefault();
        const status = document.getElementById('form-status');
        const data = new FormData(event.target);

        status.innerText = 'Enviando...';
        status.className = 'mt-4 text-center font-semibold text-gray-600';

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.innerText = "Obrigado pelo contato! Sua mensagem foi enviada com sucesso.";
                status.className = 'mt-4 text-center font-semibold text-green-600';
                form.reset();
            } else {
                response.json().then(data => {
                    status.innerText = data.errors ? data.errors.map(error => error.message).join(', ') : "Oops! Houve um problema ao enviar seu formulário.";
                    status.className = 'mt-4 text-center font-semibold text-red-600';
                });
            }
        }).catch(error => {
            status.innerText = "Oops! Houve um problema de conexão. Tente novamente mais tarde.";
            status.className = 'mt-4 text-center font-semibold text-red-600';
        });
    }

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
});