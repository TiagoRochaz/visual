// Mídia derivada: os arquivos originais continuam disponíveis no repositório.
const WHATSAPP_URL = 'https://wa.me/551531912990?text=Ol%C3%A1!%20vim%20pelo%20Site%20e%20gostaria%20de%20falar%20com%20um%20especialista.';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function webImage(source) {
    return /\.(png|jpe?g)$/i.test(source) ? `${source}.webp` : source;
}

function refineContactActions(container) {
    container.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
        if (!link.previousElementSibling?.matches('a[href^="https://wa.me/"]')) return;
        link.href = 'index.html#contato';
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.className = 'secondary-contact';
        link.textContent = 'Prefiro enviar uma mensagem';
    });
}

function showNotFound(container, message, destination, label) {
    if (!container) return;
    container.innerHTML = `<div class="text-center py-20"><h1 class="text-3xl font-bold mb-6">${message}</h1><a href="${destination}" class="text-blue-600 font-semibold">${label} &rarr;</a></div>`;
    showPage(container);
}

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
        } else {
            showNotFound(pages.productList, 'Escolha uma categoria de produtos', 'produtos.html', 'Ver catálogo');
        }
    }
}

// Event listeners para navegação
document.addEventListener('DOMContentLoaded', function() {
    // Prioridade comercial aprovada: contato direto pelo WhatsApp.
    document.querySelectorAll('header a[href$="#contato"]').forEach(link => {
        link.href = WHATSAPP_URL;
        link.textContent = 'Orçamento ↗';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', 'Solicitar orçamento pelo WhatsApp');
    });
    document.querySelectorAll('header a[href*="instagram.com"]').forEach(link => {
        link.setAttribute('aria-label', 'Visual Isolamentos no Instagram');
    });
    document.querySelectorAll('footer p').forEach(paragraph => {
        if (paragraph.textContent.includes('© 2025')) {
            paragraph.textContent = `© ${new Date().getFullYear()} Visual Isolamentos. Todos os direitos reservados.`;
        }
    });
    const stats = document.getElementById('stats');
    const contact = document.getElementById('contato');
    if (stats && contact) contact.before(stats);

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
                        targetElement.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
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
        <article class="service-card bg-white overflow-hidden flex flex-col">
            <img src="${webImage(service.image)}" alt="${service.title}" loading="lazy" decoding="async" width="640" height="420" class="w-full h-56 object-cover">
            <div class="p-6 flex flex-col flex-grow">
                <p class="card-kicker">${serviceId === 'produtos' ? 'MATERIAIS E ACESSÓRIOS' : 'SOLUÇÕES INDUSTRIAIS'}</p>
                <h3 class="text-xl font-bold mb-2">${service.title}</h3>
                <p class="text-gray-600 flex-grow">${service.summary}</p>
                <a href="${serviceId === 'produtos' ? 'produtos.html' : `servicos.html?service=${serviceId}`}" class="view-service-detail mt-6 text-blue-600 font-semibold self-start" data-service="${serviceId}">Conhecer solução &rarr;</a>
            </div>
        </article>
    `;
}

function createProjectCard(projectId, project) {
    return `
        <article class="project-card bg-white overflow-hidden group">
            <div class="relative">
                <img src="${webImage(project.image)}" alt="${project.title}" loading="lazy" decoding="async" width="640" height="420" class="w-full h-64 object-cover">
                <div class="project-image-action absolute inset-0 flex">
                    <button class="open-modal-button" data-project="${projectId}" aria-label="Ver detalhes: ${project.title}">Ver projeto <span aria-hidden="true">↗</span></button>
                </div>
            </div>
            <div class="p-6">
                <p class="card-kicker">${project.details.Serviço}</p>
                <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                <p class="text-gray-600">${project.summary}</p>
            </div>
        </article>
    `;
}

// Renderização dos previews e grids
document.addEventListener('DOMContentLoaded', function() {
    // Preview dos serviços (incluindo produtos)
    const allServicesForPreview = {...(typeof servicesData !== 'undefined' ? servicesData : {}), ...{'produtos': {title: 'Nossos Produtos', image: 'assets/images/teste.png', summary: 'Fornecimento de materiais de alta performance, como isolantes térmicos e painéis isotérmicos para o seu projeto.'}}};
    
    if (servicesPreviewContainer) {
        servicesPreviewContainer.innerHTML = Object.entries(allServicesForPreview)
            .filter(([, service]) => service.showInPreview !== false)
            .map(([id, service]) => createServiceCard(id, service)).join('');
    }

    // Grid completo de serviços
    if (servicesFullGridContainer && typeof servicesData !== 'undefined') {
        servicesFullGridContainer.innerHTML = Object.entries(servicesData)
            .map(([id, service]) => createServiceCard(id, service)).join('');
    }

    // Preview do portfolio (primeiros 3 projetos)
    if (portfolioPreviewContainer && typeof portfolioData !== 'undefined') {
        portfolioPreviewContainer.innerHTML = Object.entries(portfolioData).slice(0, 3)
            .map(([id, project]) => createProjectCard(id, project)).join('');
    }
    
    // Grid completo do portfolio
    if (portfolioFullGridContainer && typeof portfolioData !== 'undefined') {
        portfolioFullGridContainer.innerHTML = Object.entries(portfolioData)
            .map(([id, project]) => createProjectCard(id, project)).join('');
    }
    
    // Grid de categorias de produtos
    if (productCategoriesGrid && typeof productsData !== 'undefined') {
        productCategoriesGrid.innerHTML = Object.keys(productsData).map(categoryId => {
            const category = productsData[categoryId];
            return `
                <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden group transform hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300">
                    <img src="${webImage(category.categoryImage)}" alt="${category.categoryName}" loading="lazy" decoding="async" width="640" height="420" class="w-full h-56 object-cover opacity-60 group-hover:opacity-80 transition-opacity">
                    <div class="p-6">
                        <h3 class="text-2xl font-bold text-white mb-2">${category.categoryName}</h3>
                        <p class="text-gray-400 mb-4">${category.categoryDescription}</p>
                        <button class="view-product-list-page text-blue-400 font-semibold" data-category="${categoryId}">Explorar Categoria &rarr;</button>
                    </div>
                </div>
            `;
        }).join('');
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

    if (typeof productsData === 'undefined' || !productsData[categoryId]) {
        showNotFound(pages.productList, 'Categoria não encontrada', 'produtos.html', 'Ver catálogo');
        return;
    }
    
    const category = productsData[categoryId];
    let productsHtml = '';
    
    // Se a categoria for 'isopaineis', mostramos os links para as subcategorias.
    if (categoryId === 'isopaineis' && category.subcategories) {
        Object.keys(category.subcategories).forEach(subcatId => {
            const subcategory = category.subcategories[subcatId];
            productsHtml += `
                <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden group transform hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div class="relative h-56">
                        <img src="${webImage(subcategory.subcategoryImage)}" alt="${subcategory.subcategoryName}" loading="lazy" decoding="async" width="640" height="420" class="w-full h-full object-cover">
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
                        <img src="${webImage(product.image)}" alt="${product.name}" loading="lazy" decoding="async" width="640" height="640" class="w-full h-full object-contain">
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
            <a href="produtos.html" class="text-gray-400 font-semibold">&larr; Voltar ao Catálogo</a>
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
        showNotFound(container, 'Subcategoria não encontrada', 'produtos.html', 'Ver catálogo');
        return;
    }

    let productsHtml = '';
    if (Object.keys(subcategory.products).length > 0) {
        Object.keys(subcategory.products).forEach(productId => {
            const product = subcategory.products[productId];
            productsHtml += `
                <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden group transform hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div class="relative aspect-square bg-gray-900">
                        <img src="${webImage(product.image)}" alt="${product.name}" loading="lazy" decoding="async" width="640" height="640" class="w-full h-full object-contain">
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
    if (typeof productsData === 'undefined' || !productsData[categoryId]) {
        showNotFound(pages.productDetail, 'Produto não encontrado', 'produtos.html', 'Ver catálogo');
        return;
    }
    
    const category = productsData[categoryId];
    let product;
    let backButtonText = category.categoryName;

    if (subcategoryId && category.subcategories && category.subcategories[subcategoryId]) {
        product = category.subcategories[subcategoryId].products[productId];
        backButtonText = category.subcategories[subcategoryId].subcategoryName;
    } else if (category.products) {
        product = category.products[productId];
    }
    
    if (!product) {
        showNotFound(pages.productDetail, 'Produto não encontrado', 'produtos.html', 'Ver catálogo');
        return;
    }

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
                <img src="${webImage(product.image)}" alt="${product.name}" decoding="async" width="640" height="640" class="w-full h-auto rounded-lg shadow-2xl object-contain">
            </div>
            <div>
                <h1 class="text-5xl font-bold text-white mb-4">${product.name}</h1>
                <p class="text-lg text-gray-300 leading-relaxed mb-6">${product.description}</p>
                <div class="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
                    <h3 class="text-2xl font-bold text-white mb-4">Especificações Técnicas</h3>
                    <ul>${specsHtml}</ul>
                </div>
                <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="w-full btn-whatsapp font-semibold py-3 px-6 text-center">Orçamento no WhatsApp</a>
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
            <a href="${subcategoryId ? `produtos-lista.html?category=${categoryId}&subcategory=${subcategoryId}` : `produtos.html?category=${categoryId}`}" class="text-gray-400 font-semibold">&larr; Voltar para ${backButtonText}</a>
        </div>
    `;

    if (pages.productDetail) {
        pages.productDetail.innerHTML = pageContent;
        refineContactActions(pages.productDetail);
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
    if (!service) {
        showNotFound(pages.serviceDetail, 'Serviço não encontrado', 'servicos.html', 'Ver serviços');
        return;
    }
    let galleryHtml = '';
    
    service.gallery.forEach(img => {
        galleryHtml += `<img src="${webImage(img)}" alt="${service.title} — exemplo de execução" loading="lazy" decoding="async" width="400" height="300" class="w-full h-48 object-cover rounded-lg shadow-md">`;
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
                    <img src="${webImage(service.image)}" alt="${service.title}" width="1280" height="720" class="w-full h-full object-cover">
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
                                    <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp py-3 px-6 text-center font-semibold">Solicitar orçamento</a>
                                    <a href="https://wa.me/551531912990?text=Ol%C3%A1!%20vim%20pelo%20Site%20e%20gostaria%20de%20falar%20com%20um%20especialista." target="_blank" rel="noopener noreferrer" class="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center space-x-2 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.068-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.1-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                        </svg>
                                        <span>WhatsApp</span>
                                    </a>
                                </div>
                                <a href="servicos.html" class="mt-3 block text-center w-full text-blue-600 font-semibold py-3 px-6">Voltar aos Serviços</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        `;
        refineContactActions(pages.serviceDetail);
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
let modalTrigger = null;

function openModal(projectId) {
    if (typeof portfolioData === 'undefined' || !modal || !modalContent) return;
    
    const project = portfolioData[projectId];
    if (!project) return;
    modalTrigger = document.activeElement;

    // Main slides HTML
    let galleryHtml = '';
    project.gallery.forEach((img, index) => {
        // Aumentei a altura para h-[65vh] (65% da altura da tela) para que imagens verticais (de celular) fiquem maiores e mais visíveis.
        // Revertido para o modelo anterior, com altura de 65vh e fundo mais escuro para um visual mais padronizado.
        // Alterado para 'object-cover' para que a imagem preencha o quadro, removendo as bordas (letterboxing). O fundo foi removido por não ser mais visível.
        galleryHtml += `<div class="carousel-slide flex-shrink-0 w-full rounded-lg"><img ${index === 0 ? 'src' : 'data-src'}="${webImage(img)}" decoding="async" width="960" height="720" class="w-full object-contain" alt="${project.title} - Imagem ${index + 1}"></div>`;
    });

    // Thumbnails HTML
    let thumbnailsHtml = '';
    if (project.gallery.length > 1) {
        project.gallery.forEach((img, index) => {
            // Increased height for thumbnails
            thumbnailsHtml += `
                <button class="thumbnail-button rounded-md overflow-hidden border-2 border-transparent transition-all duration-300" data-index="${index}" aria-label="Ver imagem ${index + 1} de ${project.title}">
                    <img src="${webImage(img)}" loading="lazy" decoding="async" width="120" height="80" class="w-full h-20 object-cover" alt="">
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
        <button id="close-modal-button" aria-label="Fechar projeto" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold z-20">&times;</button>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-8 p-6 md:p-8">
            <div class="md:col-span-3">
                <!-- Main Image Viewer: Simplified structure to fix image cutting -->
                <div class="relative overflow-hidden rounded-lg mb-4 shadow-lg">
                    <div class="carousel-track flex">
                        ${galleryHtml}
                    </div>
                    ${project.gallery.length > 1 ? `
                    <button id="prevBtn" aria-label="Imagem anterior" class="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition z-10">&#8249;</button>
                    <button id="nextBtn" aria-label="Próxima imagem" class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition z-10">&#8250;</button>
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
                <h2 id="project-modal-title" class="text-3xl font-bold mb-2">${project.title}</h2>
                <div class="text-sm text-gray-500 mb-4"><span>${project.details.Local}</span> | <span>${project.details.Ano}</span></div>
                <div class="text-gray-600 mb-4 flex-grow">
                    <h4 class="font-bold text-gray-800 mb-2">Resumo do Projeto</h4><p>${project.description}</p>
                </div>
                <div class="bg-gray-100 p-4 rounded-lg">
                    <h4 class="font-bold text-gray-800 mb-2">Destaques do Projeto</h4><ul class="space-y-2">${featuresHtml}</ul>
                </div>
                <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp font-semibold py-3 px-6 text-center">Solicitar orçamento</a>
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
    refineContactActions(modalContent);
    modal.inert = false;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'project-modal-title');
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
                    thumb.setAttribute('aria-current', 'true');
                    thumb.classList.add('border-blue-500');
                    thumb.classList.remove('border-transparent');
                } else {
                    thumb.removeAttribute('aria-current');
                    thumb.classList.remove('border-blue-500');
                    thumb.classList.add('border-transparent');
                }
            });
        };

        const moveToSlide = (targetIndex) => {
            const image = slides[targetIndex].querySelector('img');
            if (image.dataset.src) {
                image.src = image.dataset.src;
                delete image.dataset.src;
            }
            track.style.transition = reducedMotion.matches ? 'none' : 'transform 0.4s ease-in-out';
            track.style.transform = `translateX(-${targetIndex * 100}%)`;
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
        closeButton.focus();
    }
}

function closeModal() {
    if (modal) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.setAttribute('aria-hidden', 'true');
        modal.inert = true;
        document.body.style.overflow = 'auto';
        modalTrigger?.focus();
    }
}

// Event listeners para modal
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('open-modal-button')) {
        openModal(e.target.dataset.project);
    }
});

if (modal) {
    modal.inert = true;
    modal.setAttribute('aria-hidden', 'true');
    modal.addEventListener('click', (e) => { 
        if (e.target === modal) closeModal(); 
    });
    document.addEventListener('keydown', event => {
        if (modal.classList.contains('pointer-events-none')) return;
        if (event.key === 'Escape') closeModal();
        if (event.key === 'Tab') {
            const controls = [...modal.querySelectorAll('a[href], button, input, textarea')]
                .filter(element => !element.disabled && element.getClientRects().length);
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first?.focus();
            }
        }
    });
}

// --- LÓGICA DO MENU MOBILE ---
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.setAttribute('aria-label', 'Abrir menu de navegação');
        mobileMenuButton.setAttribute('aria-controls', 'mobile-menu');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        const closeMenu = () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenuButton.setAttribute('aria-label', 'Abrir menu de navegação');
        };
        mobileMenuButton.addEventListener('click', () => { 
            const isHidden = mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', String(!isHidden));
            mobileMenuButton.setAttribute('aria-label', isHidden ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => { 
                closeMenu();
            }); 
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMenu(); mobileMenuButton.focus();
            }
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
            window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
        });
    }
});

// --- EMPRESAS ATENDIDAS: LOOP CONTÍNUO COM PAUSA E COR NO HOVER ---
document.addEventListener('DOMContentLoaded', function() {
    const partnersTrack = document.getElementById('partners-track');
    const carousel = document.getElementById('partners-carousel');
    const toggle = document.getElementById('partners-toggle');
    if (!partnersTrack || !carousel || typeof partnersData === 'undefined') return;
    const items = partnersData.map(partner => `
        <div class="partner-item" role="listitem">
            <img src="${webImage(partner.logo)}" class="${partner.logoClass || ''}" alt="${partner.name}" loading="lazy" decoding="async" width="160" height="80">
            <p>${partner.name}</p>
        </div>`).join('');
    partnersTrack.innerHTML = `<div class="partners-group" role="list" aria-label="Empresas atendidas">${items}</div>
        <div class="partners-group" aria-hidden="true">${items}</div>`;
    const updateWidth = () => {
        const visible = window.innerWidth < 768 ? 1.5 : 6;
        carousel.style.setProperty('--partner-width', `${carousel.clientWidth / visible}px`);
    };
    updateWidth();
    new ResizeObserver(updateWidth).observe(carousel);
    toggle?.addEventListener('click', () => {
        const paused = carousel.classList.toggle('is-paused');
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.textContent = paused ? 'Retomar carrossel' : 'Pausar carrossel';
    });
});

// Indicadores em SVG local: não exigem biblioteca ou JavaScript para animação.
function createDonutChart(elementId, value, color, unit = '%') {
    const element = document.getElementById(elementId);
    if (!element) return;
    const proportion = Math.max(0, Math.min(unit === '%' ? value : value / 90, 1));
    const display = unit === '%' ? Math.round(value * 100) : value;
    element.innerHTML = `<div class="stat-ring" role="img" aria-label="${display} ${unit}">
        <svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="50" fill="none" stroke="#34516a" stroke-width="8"/>
        <circle cx="60" cy="60" r="50" fill="none" stroke="${color}" stroke-width="8" pathLength="100" stroke-dasharray="${proportion * 100} 100" stroke-linecap="round"/></svg>
        <strong>${display}<span>${unit}</span></strong></div>`;
}

// Inicialização dos gráficos
document.addEventListener('DOMContentLoaded', function() {
    createDonutChart('chart1', 0.95, '#83baff', '%');
    createDonutChart('chart2', 60, '#78d8ae', 'min');
    createDonutChart('chart3', 0.85, '#b6d4ee', '%');
});

// --- LÓGICA DO VÍDEO RESPONSIVO DA PÁGINA INICIAL ---
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('hero-video');
    const toggle = document.getElementById('video-toggle');
    if (!heroVideo || !toggle) return;
    const mobile = window.matchMedia('(max-width: 767px)');
    let userPaused = reducedMotion.matches;
    const updateButton = () => {
        const paused = heroVideo.paused;
        toggle.textContent = paused ? 'Reproduzir vídeo ▷' : 'Pausar vídeo Ⅱ';
        toggle.setAttribute('aria-label', paused ? 'Reproduzir vídeo de fundo' : 'Pausar vídeo de fundo');
    };
    const setSource = () => {
        heroVideo.poster = `assets/videos/poster-${mobile.matches ? 'mobile' : 'desktop'}.webp`;
        heroVideo.autoplay = !userPaused;
        heroVideo.src = `assets/videos/hero-${mobile.matches ? 'mobile' : 'desktop'}.mp4`;
        heroVideo.load();
        if (!userPaused) heroVideo.play().catch(updateButton);
        updateButton();
    };
    toggle.addEventListener('click', () => {
        if (heroVideo.paused) {
            userPaused = false;
            heroVideo.play().catch(updateButton);
        } else {
            userPaused = true;
            heroVideo.pause();
        }
    });
    heroVideo.addEventListener('play', updateButton);
    heroVideo.addEventListener('pause', updateButton);
    mobile.addEventListener('change', setSource);
    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches) { userPaused = true; heroVideo.pause(); }
    });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) heroVideo.pause();
        else if (!userPaused) heroVideo.play().catch(updateButton);
    });
    setSource();
});

// --- LÓGICA DO FORMULÁRIO DE CONTATO ---
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    async function handleSubmit(event) {
        event.preventDefault();
        if (form.dataset.submitting === 'true') return;
        const status = document.getElementById('form-status');
        const data = new FormData(event.target);
        const submit = form.querySelector('button[type="submit"]');
        form.dataset.submitting = 'true';
        submit.disabled = true;
        submit.textContent = 'Enviando…';

        status.innerText = 'Enviando...';
        status.className = 'mt-4 text-center font-semibold text-gray-600';

        try {
            const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
            });
            if (response.ok) {
                status.innerText = "Obrigado pelo contato! Sua mensagem foi enviada com sucesso.";
                status.className = 'mt-4 text-center font-semibold text-green-600';
                form.reset();
            } else {
                const result = await response.json().catch(() => ({}));
                status.innerText = Array.isArray(result.errors) ? result.errors.map(error => error.message).join(', ') : 'Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.';
                status.className = 'mt-4 text-center font-semibold text-red-600';
            }
        } catch {
            status.innerText = "Oops! Houve um problema de conexão. Tente novamente mais tarde.";
            status.className = 'mt-4 text-center font-semibold text-red-600';
        } finally {
            form.dataset.submitting = 'false';
            submit.disabled = false;
            submit.textContent = 'Enviar Mensagem';
        }
    }

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
});
