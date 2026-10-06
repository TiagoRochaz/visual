# Testing And Verification

## Commands

- `npm run check`: sintaxe dos JS públicos.
- `npm run build`: CSS estático; se volume virtualizado falhar na instalação, apontar `TAILWIND_CLI` à CLI Tailwind instalada fora do volume.
- `python -m http.server 4173 --bind 127.0.0.1`: preview.
- `node DEV/TESTS/browser-smoke.cjs`: Playwright com Edge instalado; se módulo externo, definir `PLAYWRIGHT_MODULE`.

## Strategy

- Home quatro larguras e demais páginas mobile/desktop; mídia, query strings, back/forward, modal e menu por teclado.
- Formulário interceptado no navegador, sem envio externo.
- Capturas full-page forçam decode das imagens antes da captura para não confundir lazy loading com recurso quebrado.
- Executar navegadores sequencialmente, evitando contenção do volume Drive.
- Resultados atuais em `TESTS/visual/report.json`, `TESTS/qa/report.json` e `VERIFY.md`.
