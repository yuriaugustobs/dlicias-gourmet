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
   O "id" liga o produto ao filtro. O "emoji" aparece no card
   enquanto a foto real não é adicionada.
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
   Para adicionar a foto de um produto:
   1. Salve a imagem em  assets/img/produtos/
   2. Ajuste o campo "img" abaixo com o nome do arquivo
   Enquanto não houver foto, o card mostra um fundo decorado
   com o emoji — o site continua bonito.
------------------------------------------------------------ */
const PRODUTOS = [
  {
    nome: 'Salgados Congelados Gourmet',
    categoria: 'salgados',
    emoji: '🥟',
    img: 'assets/img/produtos/salgados-congelados.jpg',
    desc: 'Vários tamanhos e sabores, prontos para fritar ou assar. Ideais para festas, lanchonetes e para ter sempre no freezer.',
    destaque: 'Mais pedido'
  },
  {
    nome: 'Nhoque Recheado',
    categoria: 'salgados',
    emoji: '🍝',
    img: 'assets/img/produtos/nhoque-recheado.jpg',
    desc: 'Nossa novidade: nhoque artesanal com recheio cremoso, massa macia e sabor de comida caseira.',
    destaque: 'Novidade'
  },
  {
    nome: 'Empadas',
    categoria: 'salgados',
    emoji: '🥧',
    img: 'assets/img/produtos/empadas.jpg',
    desc: 'Massa amanteigada que desmancha na boca e recheio generoso. Uma delícia clássica bem feita.'
  },
  {
    nome: 'Churros',
    categoria: 'doces',
    emoji: '🌭',
    img: 'assets/img/produtos/churros.jpg',
    desc: 'Churros crocantes por fora e macios por dentro, com recheio cremoso do jeitinho que você gosta.',
    destaque: 'Novidade'
  },
  {
    nome: 'Bentô Cake',
    categoria: 'bolos',
    emoji: '🎂',
    img: 'assets/img/produtos/bento-cake.jpg',
    desc: 'O bolinho na caixinha que virou febre: perfeito para presentear, com mensagem personalizada.',
    destaque: 'Presente'
  },
  {
    nome: 'Caseirinho com Cobertura',
    categoria: 'bolos',
    emoji: '🍰',
    img: 'assets/img/produtos/caseirinho.jpg',
    desc: 'Bolo caseiro com cobertura de porcelana ou brigadeirão gourmet. Aquele sabor de casa com acabamento fino.'
  },
  {
    nome: 'Mini Caseirinho Vulcão',
    categoria: 'bolos',
    emoji: '🌋',
    img: 'assets/img/produtos/mini-vulcao.jpg',
    desc: 'Versão mini e irresistível: recheio que escorre na hora da colherada. Impossível comer só um.'
  },
  {
    nome: 'Bolo Gelado na Marmita',
    categoria: 'bolos',
    emoji: '🍮',
    img: 'assets/img/produtos/bolo-gelado.jpg',
    desc: 'Bolo gelado, molhadinho e servido na marmita — prático para levar e ótimo para revender.'
  },
  {
    nome: 'Torta Gelada no Pote',
    categoria: 'bolos',
    emoji: '🍨',
    img: 'assets/img/produtos/torta-pote.jpg',
    desc: 'Camadas de creme, biscoito e cobertura em uma porção individual. Refrescante e cremosa.'
  },
  {
    nome: 'Brigadeiro Gourmet',
    categoria: 'doces',
    emoji: '🍫',
    img: 'assets/img/produtos/brigadeiro-gourmet.jpg',
    desc: 'Feito com chocolate nobre e ponto certinho. Diversos sabores para montar a sua caixa.'
  },
  {
    nome: 'Brigadeiro Personalizado',
    categoria: 'especiais',
    emoji: '💝',
    img: 'assets/img/produtos/brigadeiro-personalizado.jpg',
    desc: 'Nas cores e no tema da sua festa: 15 anos, chá revelação, eventos cristãos, casamentos e mais.',
    destaque: 'Sob encomenda'
  },
  {
    nome: 'Palha Italiana',
    categoria: 'doces',
    emoji: '🍬',
    img: 'assets/img/produtos/palha-italiana.jpg',
    desc: 'Brigadeiro cremoso com pedaços de biscoito, no ponto exato entre macio e crocante.'
  },
  {
    nome: 'Bala de Coco com Brigadeirão',
    categoria: 'doces',
    emoji: '🥥',
    img: 'assets/img/produtos/bala-coco.jpg',
    desc: 'Bala de coco artesanal recheada com brigadeirão. Uma combinação que conquista de primeira.'
  },
  {
    nome: 'Donuts & Cake Donuts',
    categoria: 'doces',
    emoji: '🍩',
    img: 'assets/img/produtos/donuts.jpg',
    desc: 'Donuts fofinhos e cake donuts com coberturas coloridas. Sucesso garantido com a criançada.'
  },
  {
    nome: 'Biscoitos Personalizados',
    categoria: 'especiais',
    emoji: '🍪',
    img: 'assets/img/produtos/biscoitos.jpg',
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
  'Churros',
  'Nhoque recheado'
];
