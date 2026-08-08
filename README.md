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
    │   ├── sobre-1.png     → foto usada no topo e no slide
    │   ├── sobre-2.png     → segunda foto do slide
    │   ├── personalizado.png → foto da seção "Datas especiais"
    │   ├── logo.svg        → logo provisória (trocar por logo.png)
    │   └── produtos/       → fotos dos produtos (já instaladas)
    └── products/           → arquivos originais enviados (backup)
```

> **Atenção às fotos atuais dos produtos:** várias das imagens em
> `assets/img/produtos/` têm **texto em inglês visível** (placas com
> "PARTY SNACKS", "FROZEN & FABULOUS", rótulos como "TRUFFLE ARANCINI",
> "MINI QUICHES" e até preço em dólar na foto do bolo gelado). Algumas
> também **não mostram o produto certo** — a de "Bala de Coco com
> Brigadeirão" e a de "Palha Italiana" mostram bolos de chocolate.
> O ideal é substituí-las por fotos reais dos produtos da D'Licias.
> Basta salvar por cima, com o mesmo nome de arquivo.

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

Para **adicionar** uma foto nova:

1. Salve a foto em `assets/img/produtos/`
2. Abra `js/data.js` e ajuste o campo `img` do produto:

```js
{
  nome: 'Bentô Cake',
  categoria: 'bolos',
  emoji: '🎂',
  img: 'assets/img/produtos/bento-cake.jpg',   // ← nome do arquivo aqui
  desc: '...'
}
```

Enquanto não houver foto, o card mostra um fundo decorado com o emoji — o site
continua bonito e sem imagem quebrada. Ideal: fotos quadradas ou 4:3, com no
máximo ~400 KB cada.

### Para adicionar um produto novo

Copie um bloco inteiro da lista `PRODUTOS`, cole no fim e troque os dados.
Os filtros e a contagem por categoria se atualizam sozinhos.

---

## Como colocar o endereço no mapa

No `index.html`, procure por `<!-- TROQUE o "q=" abaixo` (seção de contato) e
substitua o endereço na URL do iframe:

```html
src="https://www.google.com/maps?q=Rua+Exemplo,+123,+Divinopolis+MG&output=embed"
```

Depois atualize também os textos "Endereço completo em breve" logo abaixo do mapa
e no card 📍 "Onde estamos".

---

## Seções do site

1. **Início (hero)** — apresentação e chamada principal
2. **Faixa corrida** — os produtos passando em destaque
3. **Sobre** — história + slide com as fotos dos fundadores
4. **Produtos** — vitrine com filtro por categoria
5. **Como funciona** — os 3 passos do pedido
6. **Encomendas** — doces personalizados para datas especiais
7. **Revenda** — parceria com revendedores
8. **Dúvidas** — perguntas frequentes
9. **Contato** — WhatsApp, Instagram, horário e mapa
10. **Rodapé** — links, contatos e créditos

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
