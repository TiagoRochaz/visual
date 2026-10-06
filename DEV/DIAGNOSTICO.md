# Diagnóstico inicial — Visual Isolamentos

Data: 2026-10-06. Evidência: leitura do código, inventário Git e validação sintática. Não foram medidos Lighthouse, Core Web Vitals ou layout em navegador; as propostas visuais precisam de preview desktop/mobile.

## Estrutura

- Site estático, HTML/CSS/JavaScript, com seis páginas públicas: início, serviços, catálogo, lista de produtos, portfólio e sobre.
- `data-services.js`, `data-products.js`, `data-portfolio.js` e `data-partners.js` centralizam conteúdo. São uma boa base para edição.
- `script.js` (951 linhas) concentra renderização, navegação com query strings/history, modal, menu, gráficos, vídeo, parceiros e formulário.
- Tailwind é gerado no navegador pelo CDN. D3 e Google Fonts são dependências externas; Formspree recebe o contato. WhatsApp e Instagram usam links externos.
- Cabeçalho/rodapé são repetidos nas páginas. Não há manifesto npm, build, lint, testes ou CI no inventário inicial.
- Git inicialmente limpo. Origin: `TiagoRochaz/visual`; upstream: `Kamolese/visual`.

## Performance — prioridade alta

Tamanhos decimais obtidos de `git ls-tree -rl HEAD assets`, válidos para a versão rastreada e não equivalentes ao total transferido em uma visita:

| Arquivo | Tamanho aproximado |
|---|---:|
| `assets/videos/hero-video.mp4` | 32,80 MB |
| `assets/videos/9X16.mp4` | 6,39 MB |
| `assets/images/bannertub.png` | 7,10 MB |
| `assets/images/banneriso.png` | 2,42 MB |
| `assets/images/montagemiso.png` | 1,30 MB |
| `assets/images/produtos/LadeRocha.png` | 1,22 MB |

1. Vídeo sem poster; fonte definida depois de DOMContentLoaded e reprodução automática. Propor poster otimizado, vídeo comprimido e política móvel/reduced-motion. O impacto real depende da rede e do navegador.
2. Compilar Tailwind para CSS estático, preservando classes usadas nos templates JS. Uma mudança de tooling exige definir implantação e registrar decisão antes de implementar.
3. D3 inteiro é carregado em todas as páginas para três indicadores da home. Propor SVG/CSS leve ou carregamento apenas na home.
4. Imagens dos cards e galerias não usam lazy loading, srcset ou dimensões intrínsecas. Otimizar fotos por tamanho de exibição e preservar transparência dos logos.
5. Abertura do modal cria todas as imagens da galeria e miniaturas. Carregar prioritariamente a imagem ativa, adiar demais.
6. Renderização de grids usa `innerHTML +=` repetidamente; juntar markup e inserir uma vez evita reparsing acumulado. Ganho provavelmente menor que mídia/CSS.
7. Carregar somente os dados necessários por página; atualmente Sobre carrega todos os datasets.

## Design/UX — propostas a validar com o maestro

- Intenção desta fase: REVIEW. Próxima fase candidata: IMPROVE / EVOLVE, mantendo marca. Design Profile não existe; descoberta automática de design system retornou `unresolved` (confidence 0), embora Tailwind CDN esteja explícito no HTML. Confirmar manutenção da base visual ou uma nova direção antes de UI.
- Recomendar linguagem industrial sóbria: azul da marca, grafite, fundos claros, hierarquia tipográfica consistente, fotos reais e menos dependência de sombras genéricas.
- Hero com título mais direto, largura de leitura limitada e um CTA principal; definir prioridade entre WhatsApp e formulário.
- Trazer projetos reais e empresas atendidas mais cedo na home. Sequência candidata: hero, prova de confiança, soluções, projetos, diferenciais, contato.
- Padronizar cards, proporções de fotos, botões, espaçamento e aparência entre catálogo escuro e páginas claras.
- Portfólio: detalhes visíveis também no toque/teclado; atualmente overlay depende de `group-hover`. Galeria usa `object-cover`, podendo cortar fotos verticais.
- Catálogo: considerar busca/filtros e breadcrumbs conforme a necessidade de venda.
- Parceiros: alturas visuais equivalentes, `object-fit: contain`, rótulos coerentes e opção de grade ou carrossel pausável.

## Defeitos e inconsistências observados no código

- `script.js:734`: largura fixa `w-[6.25%]` pressupõe 16 itens (8 parceiros duplicados). Calcular por quantidade real ou usar layout flex/grid independente do total.
- `script.js:421-424`: serviço inexistente na URL é usado sem guarda e causa erro ao acessar `gallery`.
- `produtos-lista.html` carrega só produtos; `script.js:123-125` retorna antecipadamente do bloco de renderização pela ausência de serviços/portfólio, emitindo aviso desnecessário. Separar checagens por recurso.
- `history.back()` não garante retorno ao catálogo/serviços quando o usuário abriu diretamente o detalhe. Definir destino explícito ou fallback.
- Menu mobile não possui nome acessível nem estado `aria-expanded`; modal não possui semântica de diálogo, gerenciamento de foco ou Escape. Falta política `prefers-reduced-motion`.
- WhatsApp usa `551531912990`; texto de telefone na home informa `(15) 98816-3613`. Confirmar se são canais distintos e qual deve ser principal.
- Sobre: Paola tem texto começando com “Ana”; textos alternativos de Edmundo, Paola e Vinicius citam pessoas diferentes.
- Rodapé fixa 2025; projetos repetem “Várzea Grande, MS”. Confirmar localidades e atualização editorial.
- Indicadores 95%, 60 min e 85% não apontam fontes no site. Confirmar contexto técnico; experiência de 30 anos pode se referir ao fundador, conforme Sobre.
- Não foram encontradas descrições SEO nos heads das páginas; propor metadados, compartilhamento social, sitemap e canonical após conhecer domínio/hospedagem.

## Parceiros atuais

Better Beef; Grupo Fuga; FrigoSul; Marfrig; MBP IsoBlock; Pantanal Frigorifico; Frigorifico Rio Maria; Zanotti Refrigerações.

Pendente: quais saem, quais entram, ordem, logos e se representam clientes, fornecedores ou parceiros comerciais. Não inferir remoção de projetos do portfólio a partir de remoção de logo.

## Caminho recomendado

1. Confirmar direção visual, vídeo, objetivo comercial, parceiros e endereço público do site.
2. Implementar preview com home refinada, parceiros responsivos e correções locais; manter URLs funcionais.
3. Otimizar mídia e entrega de CSS/JS conforme hospedagem aprovada.
4. Validar desktop/mobile, navegação direta e voltar/avançar, galerias e formulário sem envio real. Medir performance antes/depois sob a mesma configuração.
5. Após avaliação do maestro, definir proprietário/nome/visibilidade do novo repositório e publicação. Push condicionado à aprovação expressa.
