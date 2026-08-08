/* ============================================================
   D'LICIAS GOURMET — DADOS DO SITE
   ------------------------------------------------------------
   Centraliza contatos e catálogo. Para atualizar o site,
   basta editar este arquivo — nada de mexer no HTML.
   ============================================================ */

/* ------------------------------------------------------------
   CONTATOS E INFORMAÇÕES DA EMPRESA
------------------------------------------------------------ */
const EMPRESA = {
  nome: "D'Licias Gourmet",

  // Número principal do WhatsApp (formato internacional, só dígitos)
  whatsapp: '5537999061013',
  whatsappExibicao: '(37) 99906-1013',

  // Número alternativo
  telefone2: '5533991373692',
  telefone2Exibicao: '(33) 99137-3692',

  instagram: 'liciagourmet',
  cidade: 'Divinópolis · MG',

  // Desenvolvedor do site (rodapé)
  devNome: 'Yuri Augusto',
  devWhatsapp: '5537996707290',

  // Horário de funcionamento — 0 = domingo … 6 = sábado
  // null = fechado | [abre, fecha] em horas decimais (8.5 = 08h30)
  horarios: {
    0: null,        // domingo
    1: [8, 18],     // segunda
    2: [8, 18],     // terça
    3: [8, 18],     // quarta
    4: [8, 18],     // quinta
    5: [8, 18],     // sexta
    6: [8, 14]      // sábado
  }
};

/* ------------------------------------------------------------
   CATEGORIAS
   O "id" liga o produto ao filtro.
------------------------------------------------------------ */
const CATEGORIAS = [
  { id: 'todos',    nome: 'Ver tudo' },
  { id: 'salgados', nome: 'Salgados' },
  { id: 'bolos',    nome: 'Bolos & Tortas' },
  { id: 'doces',    nome: 'Doces' },
  { id: 'especiais',nome: 'Personalizados' }
];

/* ------------------------------------------------------------
   PRODUTOS
   ------------------------------------------------------------
   O campo "imgs" é uma LISTA de fotos. Quando tem mais de uma,
   o card vira um álbum com setas, contador e arrastar no celular.

   Para adicionar fotos a um produto:
   1. Salve as imagens em  assets/img/produtos/
   2. Acrescente o caminho na lista "imgs" do produto

   Enquanto não houver foto, o card mostra um fundo decorado
   com o emoji — o site continua bonito.
------------------------------------------------------------ */
const PRODUTOS = [
  {
    nome: 'Salgados Congelados Gourmet',
    categoria: 'salgados',
    emoji: '🥟',
    imgs: [
      'assets/img/produtos/salgados-congelados-1.jpg',
      'assets/img/produtos/salgados-congelados-2.jpg'
    ],
    desc: 'Vários tamanhos e sabores, prontos para fritar ou assar. Ideais para festas, lanchonetes e para ter sempre no freezer.',
    destaque: 'Mais pedido'
  },
  {
    nome: 'Coxinhas',
    categoria: 'salgados',
    emoji: '🍗',
    imgs: [
      'assets/img/produtos/coxinhas-1.jpg',
      'assets/img/produtos/coxinhas-2.jpg'
    ],
    desc: 'Massa leve, empanado crocante e recheio caprichado. A queridinha de toda festa, do jeito que todo mundo espera.'
  },
  {
    nome: 'Nhoque Recheado',
    categoria: 'salgados',
    emoji: '🍝',
    imgs: [
      'assets/img/produtos/nhoque-recheado-1.jpg',
      'assets/img/produtos/nhoque-recheado-2.jpg'
    ],
    desc: 'Nossa novidade: nhoque artesanal com recheio cremoso, massa macia e sabor de comida caseira.',
    destaque: 'Novidade'
  },
  {
    nome: 'Empadas',
    categoria: 'salgados',
    emoji: '🥧',
    imgs: [
      'assets/img/produtos/empadas-1.jpg',
      'assets/img/produtos/empadas-2.jpg'
    ],
    desc: 'Massa amanteigada que desmancha na boca e recheio generoso. Uma delícia clássica bem feita.'
  },
  {
    nome: 'Mini Churros',
    categoria: 'doces',
    emoji: '🌭',
    imgs: [
      'assets/img/produtos/churros-1.jpg',
      'assets/img/produtos/churros-2.jpg',
      'assets/img/produtos/churros-3.jpg'
    ],
    desc: 'Churros crocantes por fora e macios por dentro, com recheio cremoso do jeitinho que você gosta.',
    destaque: 'Novidade'
  },
  {
    nome: 'Bentô Cake',
    categoria: 'bolos',
    emoji: '🎂',
    imgs: [
      'assets/img/produtos/bento-cake-1.jpg',
      'assets/img/produtos/bento-cake-2.jpg',
      'assets/img/produtos/bento-cake-3.jpg',
      'assets/img/produtos/bento-cake-4.jpg',
      'assets/img/produtos/bento-cake-5.jpg',
      'assets/img/produtos/bento-cake-6.jpg',
      'assets/img/produtos/bento-cake-7.jpg',
      'assets/img/produtos/bento-cake-8.jpg',
      'assets/img/produtos/bento-cake-9.jpg',
      'assets/img/produtos/bento-cake-10.jpg',
      'assets/img/produtos/bento-cake-11.jpg',
      'assets/img/produtos/bento-cake-12.jpg'
    ],
    desc: 'O bolinho na caixinha que virou febre: perfeito para presentear, com a mensagem que você quiser.',
    destaque: 'Presente'
  },
  {
    nome: 'Caseirinho com Cobertura',
    categoria: 'bolos',
    emoji: '🍰',
    imgs: [
      'assets/img/produtos/caseirinho-1.jpg',
      'assets/img/produtos/caseirinho-2.jpg',
      'assets/img/produtos/caseirinho-3.jpg'
    ],
    desc: 'Bolo caseiro com cobertura de porcelana ou brigadeirão gourmet. Aquele sabor de casa com acabamento fino.'
  },
  {
    nome: 'Mini Caseirinho Vulcão',
    categoria: 'bolos',
    emoji: '🌋',
    imgs: [
      'assets/img/produtos/mini-vulcao-1.jpg',
      'assets/img/produtos/mini-vulcao-2.jpg'
    ],
    desc: 'Versão mini e irresistível: recheio que escorre na hora da colherada. Impossível comer só um.'
  },
  {
    nome: 'Bolo Gelado na Marmita',
    categoria: 'bolos',
    emoji: '🍮',
    imgs: [
      'assets/img/produtos/bolo-gelado-1.jpg'
    ],
    desc: 'Bolo gelado, molhadinho e servido na marmita. Prático para levar e ótimo para revender.'
  },
  {
    nome: 'Torta Gelada no Pote',
    categoria: 'bolos',
    emoji: '🍨',
    imgs: [
      'assets/img/produtos/torta-pote-1.jpg',
      'assets/img/produtos/torta-pote-2.jpg'
    ],
    desc: 'Camadas de creme, biscoito e cobertura em uma porção individual. Refrescante e cremosa.'
  },
  {
    nome: 'Donuts & Cake Donuts',
    categoria: 'doces',
    emoji: '🍩',
    imgs: [
      'assets/img/produtos/donuts-1.jpg',
      'assets/img/produtos/donuts-2.jpg',
      'assets/img/produtos/donuts-3.jpg',
      'assets/img/produtos/donuts-4.jpg',
      'assets/img/produtos/donuts-5.jpg',
      'assets/img/produtos/donuts-6.jpg',
      'assets/img/produtos/donuts-7.jpg'
    ],
    desc: 'Donuts fofinhos e cake donuts com coberturas coloridas. Sucesso garantido com a criançada.'
  },
  {
    nome: 'Brigadeiro Gourmet',
    categoria: 'doces',
    emoji: '🍫',
    imgs: [
      'assets/img/produtos/brigadeiro-gourmet.jpg'
    ],
    desc: 'Feito com chocolate nobre e ponto certinho. Diversos sabores para montar a sua caixa.'
  },
  {
    nome: 'Brigadeiro Personalizado',
    categoria: 'especiais',
    emoji: '💝',
    imgs: [
      'assets/img/produtos/brigadeiro-personalizado-1.jpg',
      'assets/img/produtos/brigadeiro-personalizado-2.jpg',
      'assets/img/produtos/brigadeiro-personalizado-3.jpg',
      'assets/img/produtos/brigadeiro-personalizado-4.jpg',
      'assets/img/produtos/brigadeiro-personalizado-5.jpg',
      'assets/img/produtos/brigadeiro-personalizado-6.jpg'
    ],
    desc: 'Nas cores e no tema da sua festa: 15 anos, chá revelação, eventos cristãos, casamentos e mais.',
    destaque: 'Sob encomenda'
  },
  {
    nome: 'Palha Italiana',
    categoria: 'doces',
    emoji: '🍬',
    imgs: [
      'assets/img/produtos/palha-italiana-1.jpg',
      'assets/img/produtos/palha-italiana-2.jpg',
      'assets/img/produtos/palha-italiana-3.jpg'
    ],
    desc: 'Brigadeiro cremoso com pedaços de biscoito, no ponto exato entre macio e crocante.'
  },
  {
    nome: 'Bala de Coco com Brigadeirão',
    categoria: 'doces',
    emoji: '🥥',
    imgs: [
      'assets/img/produtos/bala-coco-1.jpg',
      'assets/img/produtos/bala-coco-2.jpg',
      'assets/img/produtos/bala-coco-3.jpg',
      'assets/img/produtos/bala-coco-4.jpg'
    ],
    desc: 'Bala de coco artesanal recheada com brigadeirão. Uma combinação que conquista de primeira.'
  },
  {
    nome: 'Biscoitos Personalizados',
    categoria: 'especiais',
    emoji: '🍪',
    imgs: [
      'assets/img/produtos/biscoitos-1.jpg',
      'assets/img/produtos/biscoitos-2.jpg',
      'assets/img/produtos/biscoitos-3.jpg',
      'assets/img/produtos/biscoitos-4.jpg',
      'assets/img/produtos/biscoitos-5.jpg',
      'assets/img/produtos/biscoitos-6.jpg',
      'assets/img/produtos/biscoitos-7.jpg',
      'assets/img/produtos/biscoitos-8.jpg',
      'assets/img/produtos/biscoitos-9.jpg',
      'assets/img/produtos/biscoitos-10.jpg',
      'assets/img/produtos/biscoitos-11.jpg',
      'assets/img/produtos/biscoitos-12.jpg',
      'assets/img/produtos/biscoitos-13.jpg',
      'assets/img/produtos/biscoitos-14.jpg'
    ],
    desc: 'Biscoitos decorados à mão com o tema do seu evento. Viram lembrancinha e enfeite de mesa.',
    destaque: 'Sob encomenda'
  }
];

/* ------------------------------------------------------------
   FRASES DA FAIXA CORRIDA (marquee)
------------------------------------------------------------ */
const FRASES_MARQUEE = [
  'Salgados congelados gourmet',
  'Bentô cake',
  'Brigadeiro gourmet',
  'Caseirinho vulcão',
  'Donuts',
  'Palha italiana',
  'Torta gelada no pote',
  'Biscoitos personalizados',
  'Mini churros',
  'Nhoque recheado'
];
