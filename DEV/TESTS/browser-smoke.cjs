// Verificação real de navegação, mídia, conteúdo e responsividade. Sem envio externo.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const BASE = process.env.SITE_URL || 'http://127.0.0.1:4173';
const OUT = path.join(__dirname, 'visual');

(async () => {
    fs.mkdirSync(OUT, { recursive: true });
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const results = [];
    const errors = [];
    const context = await browser.newContext({ locale: 'pt-BR' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
        if (response.status() >= 400 && response.url().startsWith(BASE)) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.route('https://formspree.io/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
    const inspect = async name => {
        const state = await page.evaluate(() => ({
            width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
            unnamed: [...document.querySelectorAll('button, a[href]')].filter(el =>
                el.getClientRects().length && !el.textContent.trim() && !el.getAttribute('aria-label') && !el.querySelector('img[alt]')).map(el => el.outerHTML.slice(0, 160)),
            broken: [...document.images].filter(img => img.getAttribute('src') && img.complete && img.naturalWidth === 0).map(img => img.src),
        }));
        assert.ok(state.scrollWidth <= state.width + 1, `${name}: overflow ${JSON.stringify(state)}`);
        assert.deepEqual(state.unnamed, [], `${name}: controles sem nome`);
        assert.deepEqual(state.broken, [], `${name}: imagens quebradas`);
        results.push({ name, ...state });
    };
    const capture = async name => {
        // Full-page screenshots alone do not activate offscreen lazy images.
        await page.evaluate(async () => {
            const images = [...document.images].filter(img => img.getAttribute('src'));
            images.forEach(img => { img.loading = 'eager'; });
            await Promise.all(images.map(img => img.decode().catch(() => {})));
            window.scrollTo({ top: 0, behavior: 'instant' });
        });
        await page.waitForTimeout(200);
        await inspect(name);
        await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
    };
    try {
        for (const width of [390, 768, 1280, 1440]) {
            await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
            await page.goto(BASE, { waitUntil: 'domcontentloaded' });
            await page.waitForFunction(() => document.querySelectorAll('.partners-group:not([aria-hidden]) .partner-item').length === 8);
            await page.waitForFunction(() => document.querySelector('#hero-video').currentTime > 0, { timeout: 20000 });
            assert.ok(await page.locator('#hero-video').evaluate(el => el.currentSrc.includes(innerWidth < 768 ? 'hero-mobile.mp4' : 'hero-desktop.mp4')));
            await page.locator('#video-toggle').click();
            assert.equal(await page.locator('#hero-video').evaluate(el => el.paused), true);
            const companies = await page.locator('.partners-group:not([aria-hidden]) .partner-item p').allTextContents();
            for (const name of ['JBS', 'Friboi', 'FriGol']) assert.ok(companies.includes(name));
            for (const name of ['MBP IsoBlock', 'Zanotti Refrigerações', 'Better Beef']) assert.ok(!companies.includes(name));
            await page.locator('#parceiros').scrollIntoViewIfNeeded();
            await page.mouse.move(0, 0);
            assert.equal(await page.locator('#partners-track').evaluate(el => getComputedStyle(el).animationPlayState), 'running');
            // A faixa está em movimento: entrar no viewport primeiro pausa a animação.
            await page.locator('#partners-carousel').hover();
            const visiblePartner = await page.evaluate(() => {
                const viewport = document.querySelector('#partners-carousel').getBoundingClientRect();
                return [...document.querySelectorAll('.partner-item')].findIndex(item => {
                    const rect = item.getBoundingClientRect();
                    const center = rect.left + rect.width / 2;
                    return center > viewport.left + 5 && center < viewport.right - 5;
                });
            });
            const hoveredLogo = page.locator('.partner-item').nth(visiblePartner).locator('img');
            await page.locator('.partner-item').nth(visiblePartner).hover();
            await page.waitForTimeout(350);
            assert.equal(await page.locator('#partners-track').evaluate(el => getComputedStyle(el).animationPlayState), 'paused');
            assert.equal(await hoveredLogo.evaluate(el => getComputedStyle(el).filter), 'grayscale(0)');
            await page.mouse.move(0, 0);
            await page.waitForTimeout(350);
            assert.equal(await hoveredLogo.evaluate(el => getComputedStyle(el).filter), 'grayscale(1)');
            await page.locator('#partners-toggle').click();
            assert.equal(await page.locator('#partners-toggle').getAttribute('aria-pressed'), 'true');
            await page.locator('#partners-toggle').click();
            await page.waitForTimeout(300);
            await capture(`home-${width}`);
            if (width === 390) {
                await page.locator('#mobile-menu-button').click();
                assert.equal(await page.locator('#mobile-menu-button').getAttribute('aria-expanded'), 'true');
                await page.keyboard.press('Escape');
                assert.equal(await page.locator('#mobile-menu-button').getAttribute('aria-expanded'), 'false');
            }
        }
        for (const route of ['servicos.html', 'produtos.html', 'portfolio.html', 'sobre.html', 'produtos-lista.html?category=isopaineis&subcategory=portas']) {
            for (const width of [390, 1440]) {
                await page.setViewportSize({ width, height: 900 });
                await page.goto(`${BASE}/${route}`, { waitUntil: 'domcontentloaded' });
                await page.waitForTimeout(400);
                await capture(`${route.split('.')[0]}-${width}`);
            }
        }
        await page.goto(`${BASE}/portfolio.html`);
        await page.setViewportSize({ width: 390, height: 844 });
        const trigger = page.locator('.open-modal-button').first();
        await trigger.click();
        await page.locator('#nextBtn').click();
        await page.waitForTimeout(500);
        assert.ok(await page.locator('.carousel-slide').nth(1).locator('img').getAttribute('src'));
        await inspect('modal-mobile');
        await page.screenshot({ path: path.join(OUT, 'modal.png') });
        await page.keyboard.press('Shift+Tab');
        assert.ok(await page.evaluate(() => document.querySelector('#portfolio-modal').contains(document.activeElement)));
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#portfolio-modal').getAttribute('aria-hidden'), 'true');
        assert.ok(await trigger.evaluate(el => el === document.activeElement));
        await page.goto(`${BASE}/servicos.html?service=paineis-isotermicos`);
        await inspect('servico-detalhe-mobile');
        await page.getByRole('link', { name: 'Voltar aos Serviços' }).click();
        assert.ok(page.url().endsWith('servicos.html'));
        await page.goto(`${BASE}/servicos.html?service=inexistente`);
        await page.getByRole('heading', { name: 'Serviço não encontrado' }).waitFor();
        await page.goto(`${BASE}/produtos.html?category=isolantes-termicos`);
        await page.locator('.view-product-detail-page').first().waitFor();
        {
            await page.locator('.view-product-detail-page').first().click();
            await page.waitForTimeout(150);
            assert.ok(page.url().includes('product='));
            await page.goBack();
            await page.waitForTimeout(150);
            assert.ok(await page.locator('.view-product-detail-page').count());
        }
        await page.goto(`${BASE}/produtos-lista.html?category=isopaineis&subcategory=portas`);
        await page.locator('.view-product-detail-page').first().click();
        await page.locator('#product-detail-page h1').waitFor();
        await inspect('produto-detalhe');
        await page.screenshot({ path: path.join(OUT, 'produto-detalhe-mobile.png'), fullPage: true });
        await page.locator('#product-detail-page a').filter({ hasText: 'Voltar para' }).click();
        await page.locator('.view-product-detail-page').first().waitFor();
        assert.ok(await page.locator('.view-product-detail-page').count());
        await page.goBack();
        await page.locator('#product-detail-page h1').waitFor();
        await page.goBack();
        await page.locator('.view-product-detail-page').first().waitFor();
        await page.goto(`${BASE}/produtos-lista.html?category=erro&subcategory=erro&product=erro`);
        await page.getByRole('heading', { name: 'Produto não encontrado' }).waitFor();
        await page.goto(BASE);
        await page.locator('#name').fill('Teste local');
        await page.locator('#email').fill('teste@example.com');
        await page.locator('#message').fill('Teste interceptado, sem envio externo.');
        await page.locator('#contact-form button').click();
        await page.getByRole('status').filter({ hasText: 'sucesso' }).waitFor();
        const motionPage = await context.newPage();
        await motionPage.emulateMedia({ reducedMotion: 'reduce' });
        await motionPage.goto(BASE);
        assert.equal(await motionPage.locator('#hero-video').evaluate(el => el.paused), true);
        await motionPage.locator('#video-toggle').click();
        await motionPage.waitForFunction(() => document.querySelector('#hero-video').currentTime > 0);
        results.push({ name: 'reduced-motion', manualPlayback: true });
        await motionPage.close();
        assert.deepEqual(errors, [], 'Erros de página/recursos locais');
        console.log(JSON.stringify({ status: 'passed', results }, null, 2));
        fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify({ status: 'passed', results, errors }, null, 2));
    } finally {
        await browser.close();
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
