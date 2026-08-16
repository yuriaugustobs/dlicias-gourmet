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

  /* Só as seções que aparecem no menu contam para o destaque. Sem esse
     filtro, ao passar por uma seção sem link (a da sócia, por exemplo)
     o menu inteiro ficava sem nenhum item marcado. */
  const idsDoMenu = new Set(
    links.map(l => (l.getAttribute('href') || '').replace('#', ''))
  );

  /* A posição de cada seção fica guardada aqui. Ler "offsetTop" a cada
     rolagem obrigava o navegador a recalcular o layout inteiro e travava
     a rolagem; agora medimos só quando a página muda de tamanho. */
  let topoSecoes = [];
  let secaoAtiva = null;

  function medirSecoes() {
    topoSecoes = secoes
      .filter(sec => idsDoMenu.has(sec.id))
      .map(sec => ({ id: sec.id, topo: sec.offsetTop }));
  }

  function marcarSecaoAtiva(y) {
    const pos = y + (window.innerHeight * 0.3);

    // Fica no primeiro item enquanto não passamos de nenhuma seção
    let atual = topoSecoes.length ? topoSecoes[0].id : '';

    topoSecoes.forEach(sec => {
      if (pos >= sec.topo) atual = sec.id;
    });

    if (atual === secaoAtiva) return;   // nada mudou: não mexe no DOM
    secaoAtiva = atual;

    links.forEach(l => {
      l.classList.toggle('is-active', l.getAttribute('href') === `#${atual}`);
    });
  }

  /* A rolagem só anota a posição. O trabalho visual acontece no quadro
     seguinte, junto com a pintura do navegador. */
  let aguardandoQuadro = false;

  function onScroll() {
    if (aguardandoQuadro) return;
    aguardandoQuadro = true;

    requestAnimationFrame(() => {
      aguardandoQuadro = false;
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 40);
      fabTop.classList.toggle('is-visible', y > 600);
      marcarSecaoAtiva(y);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Ao girar o celular ou redimensionar a janela, as posições mudam
  let timerMedida = null;
  window.addEventListener('resize', () => {
    clearTimeout(timerMedida);
    timerMedida = setTimeout(medirSecoes, 200);
  }, { passive: true });

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

  /* Basta o elemento encostar na área visível para ele aparecer.
     Antes era exigida uma fatia de 12% dele na tela, e blocos baixos
     — como o aviso no fim do cardápio — nunca chegavam a essa marca
     e ficavam invisíveis para sempre. */
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      observador.unobserve(e.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

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

  /** Monta a área da foto: uma imagem só ou um álbum navegável. */
  function galeriaProduto(p) {
    const fotos = Array.isArray(p.imgs) ? p.imgs : [];

    // Sem foto cadastrada: mostra só o fundo decorado com o emoji
    if (!fotos.length) {
      return `<div class="product__media is-empty">${placeholderProduto(p)}</div>`;
    }

    const slides = fotos.map((src, i) => `
      <img src="${src}" alt="${esc(p.nome)}${fotos.length > 1 ? ` — foto ${i + 1}` : ''}"
           class="pgal__img${i === 0 ? ' is-active' : ''}"
           loading="${i === 0 ? 'lazy' : 'lazy'}"
           onerror="this.remove()">
    `).join('');

    // Uma foto só: sem controles
    if (fotos.length === 1) {
      return `
        <div class="product__media">
          ${p.destaque ? `<span class="product__badge">${esc(p.destaque)}</span>` : ''}
          <div class="pgal">${slides}</div>
          ${placeholderProduto(p)}
        </div>`;
    }

    // Álbum: setas, contador e — se forem poucas — pontinhos
    const dots = fotos.length <= 6
      ? `<div class="pgal__dots">${fotos.map((_, i) =>
          `<button class="pgal__dot${i === 0 ? ' is-active' : ''}" data-go="${i}" aria-label="Foto ${i + 1}"></button>`
        ).join('')}</div>`
      : '';

    return `
      <div class="product__media" data-gal>
        ${p.destaque ? `<span class="product__badge">${esc(p.destaque)}</span>` : ''}
        <div class="pgal">${slides}</div>

        <button class="pgal__nav pgal__nav--prev" data-step="-1" aria-label="Foto anterior de ${esc(p.nome)}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="pgal__nav pgal__nav--next" data-step="1" aria-label="Próxima foto de ${esc(p.nome)}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>

        <span class="pgal__count"><b>1</b>/${fotos.length}</span>
        ${dots}
        ${placeholderProduto(p)}
      </div>`;
  }

  function placeholderProduto(p) {
    return `
      <div class="product__ph" aria-hidden="true">
        <span class="product__ph-emoji">${p.emoji}</span>
        <span class="product__ph-text">D'Licias Gourmet</span>
      </div>`;
  }

  function cardProduto(p, i) {
    const msg = `Olá! Vim pelo site e tenho interesse em: *${p.nome}*. Pode me passar mais informações?`;

    return `
      <article class="product is-entering" style="animation-delay:${i * 55}ms">
        ${galeriaProduto(p)}

        <div class="product__body">
          <span class="product__cat">${esc(nomeCategoria(p.categoria))}</span>
          <h3 class="product__name">${esc(p.nome)}</h3>
          <p class="product__desc">${esc(p.desc)}</p>

          <!-- O rótulo começa com o texto que aparece no botão: quem navega
               por comando de voz fala "pedir no WhatsApp" e é atendido. -->
          <a class="product__cta" href="${linkWhats(msg)}" target="_blank" rel="noopener"
             aria-label="Pedir no WhatsApp: ${esc(p.nome)}">
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

  /* ----- Álbum de fotos dentro do card ----- */

  /** Troca a foto visível de um card. */
  function irFoto(media, alvo) {
    const fotos = $$('.pgal__img', media);
    if (fotos.length < 2) return;

    const atual = fotos.findIndex(f => f.classList.contains('is-active'));
    const novo = (alvo + fotos.length) % fotos.length;
    if (novo === atual) return;

    fotos.forEach((f, i) => {
      // A foto que sai fica opaca por baixo, evitando o efeito "fantasma"
      f.classList.toggle('is-prev', i === atual);
      f.classList.toggle('is-active', i === novo);
    });

    const dots = $$('.pgal__dot', media);
    dots.forEach((d, i) => d.classList.toggle('is-active', i === novo));

    const contador = $('.pgal__count b', media);
    if (contador) contador.textContent = novo + 1;
  }

  function indiceAtual(media) {
    return $$('.pgal__img', media).findIndex(f => f.classList.contains('is-active'));
  }

  /** Cliques nas setas e nos pontinhos (delegado para a grade toda). */
  grade.addEventListener('click', (ev) => {
    const passo = ev.target.closest('[data-step]');
    const ponto = ev.target.closest('[data-go]');
    if (!passo && !ponto) return;

    ev.preventDefault();
    const media = (passo || ponto).closest('.product__media');

    if (passo) irFoto(media, indiceAtual(media) + Number(passo.dataset.step));
    else       irFoto(media, Number(ponto.dataset.go));
  });

  /** Arrastar para o lado no celular. */
  let toqueX = null;
  let toqueY = null;

  grade.addEventListener('touchstart', (ev) => {
    if (!ev.target.closest('[data-gal]')) return;
    toqueX = ev.touches[0].clientX;
    toqueY = ev.touches[0].clientY;
  }, { passive: true });

  grade.addEventListener('touchend', (ev) => {
    if (toqueX === null) return;

    const media = ev.target.closest('[data-gal]');
    const dx = ev.changedTouches[0].clientX - toqueX;
    const dy = ev.changedTouches[0].clientY - toqueY;

    // Só troca a foto se o gesto foi claramente horizontal
    if (media && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      irFoto(media, indiceAtual(media) + (dx < 0 ? 1 : -1));
    }

    toqueX = toqueY = null;
  }, { passive: true });

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

    // A medição das seções sai do caminho crítico: acontece no quadro
    // seguinte, quando a página já apareceu para quem está visitando.
    requestAnimationFrame(() => {
      medirSecoes();
      onScroll();
    });

    // As fotos entram carregando e empurram o conteúdo: remedimos ao final
    window.addEventListener('load', medirSecoes, { once: true });

    // Reavalia o status de aberto/fechado a cada minuto
    setInterval(atualizarStatusHorario, 60000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
