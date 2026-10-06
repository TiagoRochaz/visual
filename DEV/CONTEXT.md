# Current Context

## State

- Project: `visual` — site institucional da Visual Isolamentos, HTML/CSS/JS estático.
- Active handoff: `HANDOFF.md`
- Active spec: `SPECS/ACTIVE.md`
- Update this file when commands, architecture, environment, risks, or active decisions change.

## Commands

- Install: `npm ci` em checkout físico; Tailwind 3.4.19 é dependência de preparação, não runtime.
- Development: `python -m http.server 4173 --bind 127.0.0.1`; preview desta sessão em http://127.0.0.1:4173.
- Tests: `npm run check`; `node DEV/TESTS/browser-smoke.cjs` com Playwright disponível (ou `PLAYWRIGHT_MODULE` apontando ao módulo externo). Usa Edge local.
- Build: `npm run build` gera `assets/tailwind.css`; `TAILWIND_CLI` aceita caminho para CLI externa em volumes virtualizados.

## Constraints And Risks

- Origem: `https://github.com/TiagoRochaz/visual.git`; upstream: `https://github.com/Kamolese/visual.git`.
- Novo destino autorizado: `https://github.com/TiagoRochaz/visual-isolamentos-v2.git`, privado, remote v2 e branch main. Site enviado no commit 79f6481 e hash confirmado na API do GitHub.
- Maestro autorizou novo repositório privado e envio da versão atual após os ajustes de logos/carrossel.
- Design Profile B aprovado; site atualizado e validado localmente.
- Domínio informado: visualizo.com.br. Fetch nesta sessão falhou; provedor de hospedagem não confirmado.
- Empresas históricas: JBS, Friboi, FriGol, Grupo Fuga, FrigoSul, Marfrig, Pantanal e Rio Maria.
- Maestro pediu carrossel como o antigo: loop 40s, seis logos desktop e 1,5 mobile, pausa no hover, grayscale que remove no hover. Dois grupos iguais; segundo aria-hidden (sem inert, que bloqueava hover). JBS/Friboi têm ajuste óptico de largura para 112px.
- Vídeos usados: desktop 3,92 MB e mobile 1,39 MB; originais preservados. Imagens derivadas somam 11,05 MB para 45,60 MB de fontes (inventário total, não carga por visita).
- Instalação npm no volume Drive produziu arquivos inválidos; build validado usando CLI externa oficial por `TAILWIND_CLI`. Em checkout físico, seguir npm ci/build.
- Número principal, localidades e contexto técnico dos indicadores antigos ainda precisam de confirmação editorial antes de publicar.

## Next Context

- Repositório v2 pronto; confirmar número WhatsApp e definir hospedagem para eventual deploy no domínio.
