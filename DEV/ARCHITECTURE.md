# Architecture

- Seis páginas HTML públicas preservadas, conteúdo em quatro arquivos data-*.js e comportamento compartilhado em script.js.
- Tailwind 3 gera assets/tailwind.css; style.css define acabamento local e responsividade. Nenhum CDN de Tailwind/D3 em runtime.
- Imagens originais preservadas e derivados *.webp servidos. Vídeo escolhe hero-mobile.mp4/hero-desktop.mp4 por breakpoint, com posters e pausa manual.
- Formspree continua sendo integração de formulário; WhatsApp principal via link; sem backend próprio.
- Hospedagem só precisa servir HTML/CSS/JS/assets; npm necessário apenas quando mudar utilitários CSS.
