# Active Spec - visual

## Goal

- Modernizar o site mantendo logo/azul, priorizar orçamento pelo WhatsApp, preservar vídeo desktop/mobile com arquivos leves e atualizar empresas atendidas. Maestro autorizou commit e envio para TiagoRochaz/visual-isolamentos-v2 privado; deploy no domínio é etapa separada.

## In Scope

- Modernização B aprovada: hero, hierarquia, cards, empresas, catálogo, contato e navegação.
- Remover MBP IsoBlock, Zanotti e Better Beef da seção; adicionar JBS, Friboi e FriGol com logos oficiais. Manter obras existentes no portfólio.
- Texto: “Empresas que já confiaram nos nossos serviços”, sem afirmar contrato atual.
- Ajuste solicitado: restaurar carrossel contínuo como o antigo, com pausa ao passar o mouse e logos coloridos no hover.
- Vídeos derivados com poster, pausa manual, comportamento reduced-motion e imagem otimizada.
- CSS estático, gráficos SVG sem D3, dados por página, imagens WebP e carregamento adiado.
- Metadados básicos e correções locais de navegação, formulário e acessibilidade.

## Out Of Scope

- Deploy e alteração de número/endereço sem confirmação. Commit/push/criação do repositório privado autorizados expressamente nesta sessão.
- Mudança de framework, exclusão de fontes de mídia ou dos projetos existentes.

## Acceptance

- Oito empresas corretas; logos locais íntegros e responsivos.
- Carrossel em loop, pausa/retomada no hover e alternância cinza/cor verificados em quatro larguras; quantidade de empresas não altera cálculo do loop.
- Ajuste posterior: JBS/Friboi equilibrados opticamente; hover precisa funcionar no grupo original e no duplicado.
- WhatsApp como ação principal no hero, cabeçalho e detalhes; formulário secundário.
- Vídeo mobile e desktop reproduzem e podem ser pausados; reduced-motion inicia pausado e permite reprodução manual.
- Home em 390/768/1280/1440 px, demais páginas em mobile/desktop sem overflow ou recursos locais quebrados.
- Navegação direta, voltar/avançar, modal teclado, formulário simulado e geração CSS passam.
- Tamanhos de fonte/derivado registrados; não inferir Core Web Vitals de tamanhos ou medição local.

## Structural Prevention

- Change class: ajuste de entrega estática e melhorias locais; decisão em `DEV/ADR/001-static-delivery.md`.
- Structural adjustment if this is a local remediation: CSS compilado e mídia derivada sem mudança de framework/fronteiras; preflight/esclarecimento consolidados no ADR.

## Constraints

- Direção aprovada em `DEV/DESIGN_PROFILE.md`; execução solo.
- Número de WhatsApp existente preservado: 551531912990; confirmar com maestro antes da publicação.
- Destino aprovado: https://github.com/TiagoRochaz/visual-isolamentos-v2, privado, branch main.

## Verification Plan

- `npm run build`, `npm run check`, `git diff --check`.
- Browser smoke e Visual QA: `DEV/TESTS/visual/report.json` e `DEV/TESTS/qa/report.json`.
- Sem envio real do formulário; Lighthouse em produção pendente da disponibilidade do domínio.

## Status

- State: implementado e validado; repositório privado criado, primeiro envio em andamento.
- Owner: orquestrador / maestro.
- Last updated: 2026-10-06.
