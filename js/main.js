/* ============================================================
   D'LICIAS GOURMET — SCRIPT PRINCIPAL
   ------------------------------------------------------------
   1. Utilidades
   2. Header, menu e navegação
   3. Animação de entrada (scroll reveal)
   4. Faixa corrida (marquee)
   5. Catálogo: filtros e cards
   6. Slider da seção Sobre
   7. Horário de funcionamento
   8. Links de WhatsApp e rodapé
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     1. UTILIDADES
     ========================================================== */

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /** Monta o link do WhatsApp com a mensagem já preenchida. */
  function linkWhats(mensagem, numero = EMPRESA.whatsapp) {
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  }

  /** Escapa texto antes de injetar no HTML. */
  function esc(txt) {
    const d = document.createElement('div');
    d.textContent = txt;
    return d.innerHTML;
  }

  /* ==========================================================
     2. HEADER, MENU E NAVEGAÇÃO
     ========================================================== */

  const header     = $('#header');
  const nav        = $('#nav');
  const menuToggle = $('#menuToggle');
  const navOverlay = $('#navOverlay');
  const fabTop     = $('#fabTop');

  const secoes = $$('section[id]');
  const links  = $$('.nav__link');

  function marcarSecaoAtiva() {
    const pos = window.scrollY + (window.innerHeight * 0.3);
    let atual = '';

    secoes.forEach(sec => {
      if (pos >= sec.offsetTop) atual = sec.id;
    });

    links.forEach(l => {
      l.classList.toggle('is-active', l.getAttribute('href') === `#${atual}`);
    });
  }

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    fabTop.classList.toggle('is-visible', y > 600);
    marcarSecaoAtiva();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Menu mobile --- */
  function fecharMenu() {
    nav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    navOverlay.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
      if (!nav.classList.contains('is-open')) navOverlay.hidden = true;
    }, 400);
  }

  menuToggle.addEventListener('click', () => {
    const aberto = nav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', aberto);
    menuToggle.setAttribute('aria-expanded', String(aberto));
    menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('no-scroll', aberto);

    if (aberto) {
      navOverlay.hidden = false;
      requestAnimationFrame(() => navOverlay.classList.add('is-open'));
    } else {
      fecharMenu();
    }
  });

  // Clicar fora do painel fecha o menu
  navOverlay.addEventListener('click', fecharMenu);

  // Fecha o menu ao clicar em qualquer link ou botão dentro dele
  $$('.nav__link, .nav__cta').forEach(l => l.addEventListener('click', fecharMenu));

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && nav.classList.contains('is-open')) fecharMenu();
  });

  /* --- Voltar ao topo --- */
  fabTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==========================================================
     3. ANIMAÇÃO DE ENTRADA
     ========================================================== */

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      observador.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  function observarReveals(ctx = document) {
    $$('.reveal', ctx).forEach(el => {
      el.style.setProperty('--d', el.dataset.delay || 0);
      observador.observe(el);
    });
  }

  /* ==========================================================
     4. FAIXA CORRIDA
     ========================================================== */

  function montarMarquee() {
    const track = $('#marqueeTrack');
    if (!track) return;

    // Lista duplicada para o loop ficar contínuo
    track.innerHTML = [...FRASES_MARQUEE, ...FRASES_MARQUEE]
      .map(f => `<span class="marquee__item">${esc(f)}</span>`)
      .join('');
  }

  /* ==========================================================
     5. CATÁLOGO
     ========================================================== */

  const grade      = $('#productsGrid');
  const vazio      = $('#productsEmpty');
  const boxFiltros = $('.filters');

  /** SVG do ícone do WhatsApp reaproveitado nos cards. */
  const SVG_WHATS = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 0C7.2 0 0 7.2 0 16c0 2.8.8 5.5 2.1 7.9L0 32l8.3-2.2C10.6 31.2 13.3 32 16 32c8.8 0 16-7.2 16-16S24.8 0 16 0zm9.3 22.6c-.4 1.1-2.3 2.1-3.2 2.2-.8.1-1.8.2-2.9-.2-.7-.2-1.5-.5-2.6-1-4.6-2-7.6-6.6-7.8-6.9-.2-.3-1.8-2.4-1.8-4.6s1.1-3.3 1.6-3.7c.4-.4.9-.5 1.2-.5h.9c.3 0 .7-.1 1.1.8.4 1 1.4 3.4 1.5 3.6.1.2.2.5 0 .8-.1.3-.2.5-.4.8l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.7 1.5 1.3 2.7 1.7 3.1 1.9.4.2.6.2.8-.1.2-.3.9-1.1 1.2-1.4.2-.4.5-.3.8-.2.3.1 2.1 1 2.4 1.2.4.2.6.3.7.4.1.3.1.9-.3 2z"/></svg>';

  function contarCategoria(id) {
    return id === 'todos'
      ? PRODUTOS.length
      : PRODUTOS.filter(p => p.categoria === id).length;
  }

  function nomeCategoria(id) {
    const c = CATEGORIAS.find(c => c.id === id);
    return c ? c.nome : '';
  }

  function montarFiltros() {
    boxFiltros.innerHTML = CATEGORIAS.map((c, i) => `
      <button class="filter${i === 0 ? ' is-active' : ''}"
              data-cat="${c.id}"
              role="tab"
              aria-selected="${i === 0}">
        ${esc(c.nome)}<span class="filter__count">${contarCategoria(c.id)}</span>
      </button>
    `).join('');

    boxFiltros.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.filter');
      if (!btn) return;

      $$('.filter').forEach(f => {
        const ativo = f === btn;
        f.classList.toggle('is-active', ativo);
        f.setAttribute('aria-selected', String(ativo));
      });

      montarProdutos(btn.dataset.cat);
    });
  }

  function cardProduto(p, i) {
    const msg = `Olá! Vim pelo site e tenho interesse em: *${p.nome}*. Pode me passar mais informações?`;

    return `
      <article class="product is-entering" style="animation-delay:${i * 55}ms">
        <div class="product__media">
          ${p.destaque ? `<span class="product__badge">${esc(p.destaque)}</span>` : ''}
          <img src="${p.img}" alt="${esc(p.nome)}" class="product__img" loading="lazy"
               onerror="this.closest('.product__media').classList.add('is-empty')">
          <div class="product__ph" aria-hidden="true">
            <span class="product__ph-emoji">${p.emoji}</span>
            <span class="product__ph-text">D'Licias Gourmet</span>
          </div>
        </div>

        <div class="product__body">
          <span class="product__cat">${esc(nomeCategoria(p.categoria))}</span>
          <h3 class="product__name">${esc(p.nome)}</h3>
          <p class="product__desc">${esc(p.desc)}</p>

          <a class="product__cta" href="${linkWhats(msg)}" target="_blank" rel="noopener"
             aria-label="Pedir ${esc(p.nome)} pelo WhatsApp">
            ${SVG_WHATS}
            Pedir no WhatsApp
          </a>
        </div>
      </article>
    `;
  }

  function montarProdutos(cat = 'todos') {
    const lista = cat === 'todos'
      ? PRODUTOS
      : PRODUTOS.filter(p => p.categoria === cat);

    grade.innerHTML = lista.map(cardProduto).join('');
    vazio.hidden = lista.length > 0;
  }

  /* ==========================================================
     6. SLIDER DA SEÇÃO SOBRE
     ========================================================== */

  function iniciarSlider() {
    const slider = $('#sobreSlider');
    if (!slider) return;

    const slides = $$('.slider__slide', slider);
    const dots   = $$('.slider__dot', slider);
    const prev   = $('.slider__nav--prev', slider);
    const next   = $('.slider__nav--next', slider);

    if (slides.length < 2) return;

    const INTERVALO = 5000;
    let atual = 0;
    let timer = null;

    function ir(indice) {
      const anterior = atual;
      atual = (indice + slides.length) % slides.length;
      if (anterior === atual) return;

      slides.forEach((s, i) => {
        // A foto anterior fica opaca por baixo durante a troca
        s.classList.toggle('is-prev', i === anterior);
        s.classList.toggle('is-active', i === atual);
      });

      dots.forEach((d, i) => {
        d.classList.toggle('is-active', i === atual);
        d.setAttribute('aria-selected', String(i === atual));
      });
    }

    function reiniciarAuto() {
      clearInterval(timer);
      const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduzido) timer = setInterval(() => ir(atual + 1), INTERVALO);
    }

    prev.addEventListener('click', () => { ir(atual - 1); reiniciarAuto(); });
    next.addEventListener('click', () => { ir(atual + 1); reiniciarAuto(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { ir(i); reiniciarAuto(); }));

    // Pausa quando o mouse está sobre o slider
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', reiniciarAuto);

    // Arrastar no celular
    let x0 = null;
    slider.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { ir(atual + (dx < 0 ? 1 : -1)); reiniciarAuto(); }
      x0 = null;
    }, { passive: true });

    // O primeiro slide e o primeiro pontinho já vêm ativos do HTML
    reiniciarAuto();
  }

  /* ==========================================================
     7. HORÁRIO DE FUNCIONAMENTO
     ========================================================== */

  function atualizarStatusHorario() {
    const el = $('#hoursStatus');
    if (!el) return;

    const agora  = new Date();
    const faixa  = EMPRESA.horarios[agora.getDay()];
    const hora   = agora.getHours() + agora.getMinutes() / 60;
    const aberto = Array.isArray(faixa) && hora >= faixa[0] && hora < faixa[1];

    el.textContent = aberto ? 'Aberto agora' : 'Fechado agora';
    el.classList.toggle('is-open', aberto);
    el.classList.toggle('is-closed', !aberto);
  }

  /* ==========================================================
     8. LINKS DE WHATSAPP E RODAPÉ
     ========================================================== */

  function prepararLinksWhats() {
    // Qualquer elemento com data-whatsapp vira um link pronto
    $$('[data-whatsapp]').forEach(el => {
      el.setAttribute('href', linkWhats(el.dataset.whatsapp));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });

    // Número exibido vem do arquivo de dados
    $$('[data-phone-display]').forEach(el => { el.textContent = EMPRESA.whatsappExibicao; });

    // Link do desenvolvedor no rodapé
    const dev = $('#devLink');
    if (dev) {
      dev.href = linkWhats(
        `Olá, ${EMPRESA.devNome}! Vi o site da ${EMPRESA.nome} e gostaria de um orçamento.`,
        EMPRESA.devWhatsapp
      );
      dev.textContent = EMPRESA.devNome;
    }

    const ano = $('#year');
    if (ano) ano.textContent = new Date().getFullYear();
  }

  /* ==========================================================
     INICIALIZAÇÃO
     ========================================================== */

  function init() {
    montarMarquee();
    montarFiltros();
    montarProdutos();
    iniciarSlider();
    atualizarStatusHorario();
    prepararLinksWhats();
    observarReveals();
    onScroll();

    // Reavalia o status de aberto/fechado a cada minuto
    setInterval(atualizarStatusHorario, 60000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
