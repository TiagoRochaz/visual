# Verify

## Latest Verification

- Date: 2026-10-06.
- Scope: modernização visual, empresas, mídia, entrega estática e navegação.

## Commands

- `git status --short`: limpo antes da documentação.
- `git remote -v`: origin TiagoRochaz/visual; upstream Kamolese/visual.
- `git ls-tree -rl HEAD assets`: inventário e tamanhos rastreados.
- `node --check script.js` e `node --check` para `data-partners.js`, `data-products.js`, `data-services.js`, `data-portfolio.js`: todos passaram.
- Discovery inicial unresolved; maestro aprovou preservar/evoluir base local, conforme `DESIGN_PROFILE.md`.
- `npm run build` com `TAILWIND_CLI` externa: passou, CSS 17.921 bytes. Instalação local no Drive apresentou TAR_ENTRY_ERROR e package config inválido; não usar resultado silencioso do shim local como evidência.
- `npm run check`: passou.
- `git diff --check`: passou após remoção de whitespace.
- `check-dev-gates.js --strict`: passou, duas entradas de worklog. A versão instalada não aceita `--architectural`; decisão/preflight estão explicitamente registrados no ADR.
- Visual QA harness com Playwright/Edge: PASS em 390/768/1280/1440; sem overflow, controles sem nome, falhas de contraste amostradas ou erros de console/página. `DEV/TESTS/qa/report.json`.
- Browser smoke: PASS em home/quatro larguras, demais cinco páginas em 390/1440, serviço/produto direto, erros de URL, back/forward, menu Escape, modal/foco, vídeo desktop/mobile/reduced-motion, formulário com resposta interceptada. `DEV/TESTS/visual/report.json`.
- Mídia: 152 derivados WebP abertos/verificados pela preparação, transparência preservada; 45.601.365 -> 11.050.464 bytes no inventário. Vídeo desktop 32.799.496 -> 3.921.649; mobile 6.390.243 -> 1.394.546 bytes.
- `npm audit --omit=dev`: zero vulnerabilidades de runtime. Audit completo indicou sete achados transitivos do tooling Tailwind 3; não entram nos assets servidos. Atualização major não integra esta entrega.

## Outcome

- Passed: sintaxe, geração CSS, navegação, mídia, responsividade e Visual QA final.
- Failed: primeira rodada QA apontou link logo sem aria-label explícito e favicon 404, ambos corrigidos; teste próprio inicialmente tinha espera insuficiente após navegar, corrigida. Testes browser simultâneos apresentaram timeout; execução sequencial final passou.
- Pending: avaliação humana do visual, confirmação do telefone, Lighthouse/Core Web Vitals sob rede/hospedagem reais. Nenhum formulário real enviado.

## Revisão visual

- Correção posterior JBS/Friboi: grupo duplicado estava inert e bloqueava hover; removido inert mantendo aria-hidden. Largura de ambos ajustada para 112px. Build/sintaxe PASS; oito cenários focados (dois logos × dois grupos × 390/1440) confirmaram grayscale(1)/grayscale(0), tamanho e ausência de overflow. Capturas `logo-jbs-group1-1440.png` e `logo-friboi-group1-1440.png` abertas confirmaram azul/verde da JBS e vermelho da Friboi, com proporção equilibrada.

- Atualização posterior — carrossel: geração CSS/sintaxe e browser smoke passaram novamente. Em 390/768/1280/1440, animationPlayState running fora/paused no hover, filter grayscale(0) ao entrar e grayscale(1) ao sair, pausa manual e layout sem overflow. Relatório atualizado em `TESTS/visual/report.json`; `TESTS/qa/report.json` refere-se à modernização anterior ao retorno do carrossel.

- UI-001, mobile/desktop, cabeçalho: nome acessível explícito e favicon adicionados; QA final sem falha.
- UI-002, mobile, galeria: fotografias verticais preservadas com contain, fechar com área de 44px e foco/Escape testados.
- UI-003, mobile, contato dos detalhes: CTA WhatsApp primário e formulário secundário para evitar dois botões com a mesma ação.
- Screenshots de home, catálogo, sobre, portfólio e modal abertos e inspecionados; cores/ritmo coerentes e fotos carregadas. Smoke não é auditoria WCAG completa.
