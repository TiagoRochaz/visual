# ADR 001 — Preservar site estático e entregar CSS/mídia otimizados

- Status: adotado para implementação local, publicação pendente da avaliação do maestro.
- Data: 2026-10-06.
- Contexto: seis páginas HTML, Tailwind CDN, três indicadores D3 e vídeo desktop de 32,8 MB. Maestro escolheu modernização mantendo azul/logo, vídeo inclusive mobile e WhatsApp prioritário.
- Decisão: manter HTML/JS e URLs atuais; gerar CSS Tailwind estático versionado, substituir gráficos D3 por SVG local e criar derivados de imagens/vídeos. Adicionar somente comando de geração CSS; hospedagem continua aceitando arquivos estáticos.
- Drivers: reduzir trabalho no navegador/dependências remotas, preservar implantação simples, permitir rollback e evitar migração de framework.
- Alternativas: manter Tailwind CDN (menor delta mas custo runtime); migrar a framework (complexidade desnecessária para escopo).
- Consequências: futuras classes Tailwind exigem `npm run build`; artefato CSS deve ser regenerado. Originais de mídia preservados, aumentando arquivos no repo mas reduzindo os arquivos usados pelo site.
- Riscos: classes dos templates JS ausentes na compilação; vídeo com compressão excessiva; regressões de query strings e histórico.
- Verificação: scan HTML/JS no Tailwind, node --check, desktop/mobile em navegador, links diretos/back e galeria, tamanhos e reprodução dos vídeos; nenhum envio real de formulário.
- Limites: não mudar contatos sem confirmação, projetos existentes ou publicar. Remover logo de empresa não implica remover obras do portfólio. Não afirmar relação comercial atual.

## Preflight e esclarecimento

- Fonte de requisitos: cinco perguntas/respostas do maestro nesta sessão, consolidadas em `DEV/SPECS/ACTIVE.md`.
- Pressão da suposição inicial: “parceiros” não significa contrato atual; maestro esclareceu que a seção deve refletir confiança histórica. Vídeo mobile deve ser mantido apesar do custo de transferência, resolvido por transcodificação.
- Intenção/resultado/escopo claros: modernização B com preservação de marca, lista explícita de empresas, prioridade WhatsApp e vídeo responsivo. Fronteiras: implementação local e geração de assets permitidas; publicação e mudança de número pendentes.
- Baseline: cinco arquivos JS passam node --check; nenhuma ferramenta build/lint inicial; somente DEV não rastreado.
- Ownership: execução solo, arquivos HTML/CSS/JS, assets derivados e documentação.
- GO: implementação e preview local. Hospedagem e destino do novo repositório não bloqueiam a geração estática local.
