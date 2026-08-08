# D'Licias Gourmet — Landing Page

Site institucional de página única (landing page) da **D'Licias Gourmet**, de Divinópolis/MG.
Feito em HTML, CSS e JavaScript puros — sem frameworks, sem build. É só abrir o `index.html`.

---

## Como abrir

Dê dois cliques em `index.html`. Para publicar, envie a pasta inteira para a
hospedagem (Hostinger, Netlify, Vercel, GitHub Pages etc.).

---

## Estrutura

```
dlicias-gourmet/
├── index.html              → todo o conteúdo do site
├── css/
│   ├── base.css            → cores, fontes, reset e utilitários
│   ├── components.css      → botões, header, cards, slider
│   ├── sections.css        → cada seção do site
│   └── responsive.css      → celular, tablet e telas grandes
├── js/
│   ├── data.js             → ⭐ contatos, horários e lista de produtos
│   └── main.js             → comportamento (menu, filtros, slider, links)
└── assets/
    ├── img/
    │   ├── sobre-1.png     → 1ª foto do slide (com os produtos)
    │   ├── sobre-2.png     → 2ª foto do slide (caixa de doces)
    │   ├── sobre-3.png     → 3ª foto do slide E foto do topo do site
    │   ├── marina-1.png    → foto principal da seção da sócia
    │   ├── marina-2.png    → foto redonda menor da seção da sócia
    │   ├── personalizado.png → foto da seção "Datas especiais"
    │   ├── logo.svg        → logo provisória (trocar por logo.png)
    │   └── produtos/       → fotos dos produtos (já instaladas)
    └── products/           → arquivos originais enviados (backup)
```

> **Falta a foto de um produto:** o **Brigadeiro Gourmet** ainda usa uma
> imagem genérica gerada por IA. Todos os outros já estão com fotos reais.
> Para trocar, salve a foto nova em `assets/img/produtos/` e ajuste a
> lista `imgs` desse produto no `js/data.js`.

---

## O que dá para mudar sem mexer no código

Quase tudo está em **`js/data.js`**:

| O que | Onde |
|---|---|
| Número do WhatsApp | `EMPRESA.whatsapp` e `EMPRESA.whatsappExibicao` |
| Telefone alternativo | `EMPRESA.telefone2` |
| Instagram | `EMPRESA.instagram` |
| Horário de funcionamento | `EMPRESA.horarios` |
| Produtos (nome, descrição, categoria, foto) | lista `PRODUTOS` |
| Frases da faixa rosa que corre | `FRASES_MARQUEE` |

O status **"Aberto agora" / "Fechado agora"** na seção de contato é calculado
sozinho a partir de `EMPRESA.horarios`.

---

## Como colocar a logo oficial

Salve a logo como **`assets/img/logo.png`** (fundo transparente, algo em torno de
400×400px). O site troca automaticamente — enquanto ela não existir, aparece a
logo provisória em SVG.

---

## Como trocar ou colocar fotos dos produtos

Para **trocar** uma foto existente, basta salvar a nova por cima, com o
mesmo nome do arquivo em `assets/img/produtos/` — não precisa mexer em código.

Para **adicionar** fotos novas:

1. Salve as fotos em `assets/img/produtos/`
2. Abra `js/data.js` e acrescente o caminho na lista `imgs` do produto:

```js
{
  nome: 'Bentô Cake',
  categoria: 'bolos',
  emoji: '🎂',
  imgs: [                                       // ← lista de fotos
    'assets/img/produtos/bento-cake-1.jpg',
    'assets/img/produtos/bento-cake-2.jpg',
    'assets/img/produtos/bento-cake-3.jpg'
  ],
  desc: '...'
}
```

**Quando o produto tem mais de uma foto**, o card vira um álbum
automaticamente: setas nas laterais, contador (`1/13`) no canto e
arrastar com o dedo no celular. Os pontinhos aparecem só quando são até
6 fotos — acima disso ficariam pequenos demais e o contador dá conta.

Se uma foto não existir ou falhar ao carregar, ela some do álbum sozinha,
sem imagem quebrada. Se nenhuma carregar, aparece o fundo decorado com o
emoji do produto.

Enquanto não houver foto, o card mostra um fundo decorado com o emoji — o site
continua bonito e sem imagem quebrada. Ideal: fotos quadradas ou 4:3, com no
máximo ~400 KB cada.

### Para adicionar um produto novo

Copie um bloco inteiro da lista `PRODUTOS`, cole no fim e troque os dados.
Os filtros e a contagem por categoria se atualizam sozinhos.

---

## Endereço

**Rua Amin José Barreto, 458 — Belvedere, Divinópolis/MG.**

Aparece em três lugares do `index.html`: no mapa (iframe da seção de
contato), no card 📍 "Onde estamos" e no rodapé. Para mudar, procure por
`Amin` no arquivo e ajuste os três — inclusive o endereço dentro da URL
do mapa, depois de `q=`.

---

## Seções do site

1. **Início (hero)** — apresentação e chamada principal
2. **Faixa corrida** — os produtos passando em destaque
3. **Sobre** — história + slide com as 3 fotos dos fundadores
4. **Nossa sócia** — apresentação da Marina Fernandes Santos
5. **Produtos** — vitrine com filtro por categoria
6. **Como funciona** — os 3 passos do pedido
7. **Encomendas** — doces personalizados para datas especiais
8. **Revenda** — parceria com revendedores
9. **Dúvidas** — perguntas frequentes
10. **Contato** — WhatsApp, Instagram, horário e mapa
11. **Rodapé** — links, contatos e créditos

> O texto da seção da Marina é uma **base para ela revisar** — foi escrito
> a partir do papel dela no negócio, sem dados pessoais. Se ela quiser
> incluir formação, tempo de casa ou uma frase própria, é só editar
> direto no `index.html`, na seção com `id="socia"`.

Todas as seções têm botão levando direto para o WhatsApp, com a mensagem já
escrita conforme o assunto da seção.

---

## Detalhes técnicos

- Responsivo: celular, tablet e desktop (menu vira hambúrguer até 900px)
- Animações de entrada ao rolar a página
- Respeita `prefers-reduced-motion` de quem tem sensibilidade a movimento
- Acessibilidade: navegação por teclado, `aria-label` e foco visível
- Sem dependências externas além das fontes do Google Fonts

---

Criado por **Yuri Augusto** — (37) 99670-7290
