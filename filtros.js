/**
 * Filtros do portfolio e da lista de produtos.
 *
 * Os dados ja vivem em data-portfolio.js e data-products.js, entao o filtro roda
 * inteiro no cliente: sem build, sem servidor, sem chamada extra.
 *
 * criterios escolhidos:
 *   portfolio - UF, ano, tipo de servico e busca por texto
 *   produtos  - categoria, aplicacao e busca por texto
 *
 * Os filtros ficam na URL (?ano=2025&uf=MS) para o filtro ser compartilhavel e
 * sobreviver ao F5, que importa quando o cliente manda link de uma obra.
 */

(function () {
    'use strict';

    const normalizar = (v) => (v || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

    // ---------------------------------------------------------------- portfolio

    function partesLocal(local) {
        // "Varzea Grande, MS" -> { cidade: "Varzea Grande", uf: "MS" }
        const bruto = normalizar(local);
        const partes = bruto.split(',').map((p) => p.trim());
        if (partes.length >= 2 && partes[partes.length - 1].length === 2) {
            return { cidade: partes[0], uf: partes[partes.length - 1].toUpperCase() };
        }
        return { cidade: bruto, uf: '' };
    }

    // "Isolamento de Tubulacao" -> "Isolamento"
    function familiaServico(servico) {
        const s = normalizar(servico);
        if (s.startsWith('isolamento')) return 'Isolamento';
        if (s.includes('estrutura')) return 'Estruturas';
        if (s.includes('sala') || s.includes('camara') || s.includes('estocagem') || s.includes('processamento')) return 'Ambientes';
        if (s.includes('porta')) return 'Portas';
        if (s.includes('tanque') || s.includes('tubulacao') || s.includes('amonia')) return 'Equipamentos';
        if (s.includes('remocao')) return 'Remocao';
        return 'Outros';
    }

    // Cliente e lido do titulo da obra. Os nomes vem de data-partners.js, que e a
    // lista de quem ja confiou na empresa; o que sobrar ("Projeto SEBO
    // Gracharia", "Frigorifico Frigmann") entra como cliente proprio.
    const PARCEIROS = typeof partnersData !== 'undefined' && Array.isArray(partnersData)
        ? partnersData.map((p) => p.name)
        : [];

    function clienteObra(titulo) {
        const alvo = normalizar(titulo);
        for (const nome of PARCEIROS) {
            const n = normalizar(nome);
            if (n && alvo.includes(n)) return nome;
        }
        return bonificar(alvo.replace(/^projeto\s+/, '').split(/[-–—]/)[0].trim());
    }

    // Sobra do titulo vira rotulo: "sebo gracharia" -> "Sebo Gracharia",
    // "better beef" -> "Better Beef". Sem isto o menu mostraria texto minusculo.
    function bonificar(texto) {
        return texto
            .split(/\s+/)
            .filter(Boolean)
            .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
            .join(' ') || 'Outros';
    }

    function criteriosObra(projeto) {
        const d = projeto.details || {};
        const local = partesLocal(d.Local);
        return {
            uf: local.uf,
            ano: (d.Ano || '').toString(),
            familia: familiaServico(d.Serviço || ''),
            cliente: clienteObra(projeto.title || ''),
            texto: normalizar([
                projeto.title, projeto.summary, d.Local, d.Serviço,
                ...(projeto.keyFeatures || [])
            ].join(' '))
        };
    }

    function criarPainelFiltros(id, opcoes) {
        const el = document.getElementById(id);
        if (!el) return null;

        const seletor = (rotulo, chave) => `
            <label class="filtro-campo">
                <span class="filtro-rotulo">${rotulo}</span>
                <select data-filtro="${chave}" class="filtro-controle">
                    <option value="">Todos</option>
                    ${opcoes[chave].map((v) => `<option value="${v.valor}">${v.rotulo}</option>`).join('')}
                </select>
            </label>`;

        el.innerHTML = `
            <div class="filtros-barra">
                ${seletor('Cliente', 'cliente')}
                ${seletor('Estado', 'uf')}
                ${seletor('Ano', 'ano')}
                ${seletor('Tipo de serviço', 'familia')}
                <label class="filtro-campo filtro-campo-busca">
                    <span class="filtro-rotulo">Buscar</span>
                    <input type="search" data-filtro="texto" class="filtro-controle" placeholder="obra, cliente, cidade...">
                </label>
                <button type="button" class="filtro-limpar" data-limpar>Limpar</button>
            </div>
            <p class="filtros-contagem" data-contagem aria-live="polite"></p>`;

        return {
            ler() {
                const estado = {};
                el.querySelectorAll('[data-filtro]').forEach((campo) => {
                    estado[campo.dataset.filtro] = normalizar(campo.value);
                });
                return estado;
            },
            aoMudar(cb) {
                el.addEventListener('input', cb);
                el.addEventListener('change', cb);
            },
            limpar(cb) {
                el.querySelector('[data-limpar]').addEventListener('click', () => {
                    el.querySelectorAll('[data-filtro]').forEach((c) => { c.value = ''; });
                    cb();
                });
            },
            contar(texto) {
                el.querySelector('[data-contagem]').textContent = texto;
            }
        };
    }

    function montarOpcoes(chave) {
        const vistos = new Set();
        Object.values(typeof portfolioData !== 'undefined' ? portfolioData : {}).forEach((projeto) => {
            const v = criteriosObra(projeto)[chave];
            if (v) vistos.add(v);
        });
        return [...vistos]
            .sort((a, b) => a.localeCompare(b, 'pt-BR'))
            .map((v) => ({ valor: v, rotulo: v }));
    }

    function initPortfolio() {
        const grid = document.getElementById('portfolio-full-grid');
        if (!grid || typeof portfolioData === 'undefined') return;

        const painel = criarPainelFiltros('portfolio-filtros', {
            cliente: montarOpcoes('cliente'),
            uf: montarOpcoes('uf'),
            ano: montarOpcoes('ano'),
            familia: montarOpcoes('familia')
        });
        if (!painel) return;

        const projetos = Object.entries(portfolioData);
        const cache = new Map(projetos.map(([id, p]) => [id, criteriosObra(p)]));

        // Os cards sao escritos por innerHTML em script.js, entao so existem no DOM
        // depois que aquele DOMContentLoaded rodar. Sem este mapa o filtro nao acha
        // ninguem e quebraria em cima de null.
        const CARD_POR_ID = new Map(
            [...grid.querySelectorAll('[data-obra]')].map((el) => [el.dataset.obra, el])
        );

        if (!CARD_POR_ID.size) return;

        function aplicar() {
            const f = painel.ler();
            const url = new URL(window.location);

            const casa = (c) =>
                    (!f.cliente || normalizar(c.cliente) === f.cliente) &&
                    (!f.uf || c.uf === f.uf) &&
                    (!f.ano || c.ano === f.ano) &&
                    (!f.familia || normalizar(c.familia) === f.familia) &&
                    (!f.texto || c.texto.includes(f.texto));

            let total = 0;
            projetos.forEach(([id]) => {
                const ok = casa(cache.get(id));
                const card = CARD_POR_ID.get(id);
                if (card) card.style.display = ok ? '' : 'none';
                if (ok) total += 1;
            });

            Object.keys(f).forEach((k) => {
                if (f[k]) url.searchParams.set(k, f[k]); else url.searchParams.delete(k);
            });

            painel.contar(total === projetos.length
                ? `${total} projetos`
                : `${total} de ${projetos.length} projetos`);

            grid.querySelector('[data-sem-resultado]')?.remove();
            if (total === 0) {
                const vazio = document.createElement('p');
                vazio.dataset.semResultado = '';
                vazio.className = 'filtros-vazio';
                vazio.textContent = 'Nenhuma obra encontrada com esses filtros.';
                grid.appendChild(vazio);
            }

            history.replaceState({}, '', url);
        }

        painel.aoMudar(aplicar);
        painel.limpar(aplicar);

        // Aplica o que veio na URL, para o link compartilhado abrir ja filtrado
        const url = new URL(window.location);
        ['cliente', 'uf', 'ano', 'familia', 'texto'].forEach((k) => {
            const v = url.searchParams.get(k);
            if (v) {
                const campo = document.querySelector(`[data-filtro="${k}"]`);
                if (campo) campo.value = v;
            }
        });
        aplicar();
    }

    // ----------------------------------------------------------------- produtos

    function listaProdutosPlanos() {
        const planos = [];
        const dados = typeof productsData !== 'undefined' ? productsData : {};
        Object.entries(dados).forEach(([catId, cat]) => {
            if (cat.subcategories) {
                Object.entries(cat.subcategories).forEach(([subId, sub]) => {
                    Object.entries(sub.products || {}).forEach(([pId, prod]) => {
                        planos.push({ plano: [cat.categoryName, sub.subcategoryName, prod.name].join(' '), dado: prod });
                    });
                });
                return;
            }
            Object.entries(cat.products || {}).forEach(([pId, prod]) => {
                planos.push({ plano: [cat.categoryName, prod.name].join(' '), dado: prod });
            });
        });
        return planos;
    }

    function initProdutos() {
        const painelEl = document.getElementById('produtos-filtros');
        if (!painelEl) return;

        const planos = listaProdutosPlanos();
        if (!planos.length) return;

        const categorias = [...new Set(planos.map((p) => normalizar(p.plano).split(' ')[0]).filter(Boolean))];

        painelEl.innerHTML = `
            <div class="filtros-barra">
                <label class="filtro-campo">
                    <span class="filtro-rotulo">Buscar</span>
                    <input type="search" data-filtro-prod="texto" class="filtro-controle" placeholder="material, isolante, uso...">
                </label>
                <button type="button" class="filtro-limpar" data-limpar-prod>Limpar</button>
            </div>
            <p class="filtros-contagem" data-contagem-prod aria-live="polite"></p>`;

        const campo = painelEl.querySelector('[data-filtro-prod]');
        const saida = painelEl.querySelector('[data-contagem-prod]');
        const busca = () => normalizar(campo.value);

        // Filtra os cards ja renderizados na pagina, sem remontar a grade: assim o
        // filtro nao quebra o historico da navegacao SPA da pagina de produtos.
        function aplicar() {
            const alvo = busca();
            let visiveis = 0;
            document.querySelectorAll('#product-list-page [data-produto]').forEach((card) => {
                const casa = !alvo || normalizar(card.dataset.produto).includes(alvo);
                card.style.display = casa ? '' : 'none';
                if (casa) visiveis += 1;
            });
            saida.textContent = alvo
                ? `${visiveis} de ${document.querySelectorAll('#product-list-page [data-produto]').length} itens para "${campo.value.trim()}"`
                : `${document.querySelectorAll('#product-list-page [data-produto]').length} itens`;
        }

        campo.addEventListener('input', aplicar);
        painelEl.querySelector('[data-limpar-prod]').addEventListener('click', () => {
            campo.value = '';
            aplicar();
            campo.focus();
        });
        aplicar();
    }

    // filtros.js e defer, igual a script.js, entao o DOMContentLoaded daqui
    // dispara depois do render do grid. Sem o setTimeout, o portfolio-filtros
    // nasceria vazio quando o usuario chega pela URL ja filtrada.
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initPortfolio();
            initProdutos();
        }, 0);
    });
})();