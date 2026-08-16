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
├── .htaccess               → cache e segurança (hospedagens Apache)
├── css/
│   └── estilo.css          → todo o visual: cores, componentes,
│                             seções e responsivo, em um arquivo só
├── js/
│   ├── data.js             → ⭐ contatos, horários e lista de produtos
│   └── main.js             → comportamento (menu, filtros, slider, links)
└── assets/
    ├── img/
    │   ├── sobre-1.jpg     → foto do topo do site e do compartilhamento
    │   ├── sobre-2.jpg     → 1ª do slide (com os produtos)
    │   ├── sobre-3.jpg     → 2ª do slide (caixa de doces)
    │   ├── sobre-4.jpg     → 3ª do slide (uniforme)
    │   ├── marina-1.jpg    → foto principal da seção da sócia
    │   ├── marina-2.jpg    → foto redonda menor da seção da sócia
    │   ├── personalizado.jpg → foto da seção "Datas especiais"
    │   ├── logo.svg        → logo do site
    │   └── produtos/       → fotos dos produtos (já instaladas)
    │                         cada foto tem .jpg e .webp com o mesmo nome
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

A logo em uso é a **`assets/img/logo.svg`**. Para trocar por uma imagem nova,
salve o arquivo em `assets/img/` e ajuste os caminhos no `index.html`: procure
por `logo.svg` — aparece em quatro lugares (o ícone da aba, o ícone do celular,
a logo do topo e a do rodapé).

Se for usar PNG, prefira fundo transparente e algo em torno de 400×400px.

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
continua bonito e sem imagem quebrada.

> ⚠️ **Tamanho das fotos importa muito.** As fotos do site já foram reduzidas
> para o tamanho em que realmente aparecem na tela — as fotos de produto têm
> no máximo 900px de largura e as fotos grandes das seções, 1000px. Foto que
> sai do celular costuma ter 4000px e pesa vários megabytes: no 4G, isso faz
> o cliente esperar e desistir. Antes de subir uma foto nova, **reduza a
> largura para ~900px e salve em JPEG com qualidade 75-80** (o site
> [squoosh.app](https://squoosh.app) faz isso no navegador, de graça).
> Cada foto deve ficar abaixo de ~150 KB.

### Toda foto precisa de uma versão `.webp` ao lado

O site entrega as fotos em **WebP** — um formato mais novo, que ocupa cerca
de um terço a menos que o JPEG com a mesma aparência. Quem usa navegador
antigo recebe o JPEG automaticamente, sem perceber diferença.

Para isso funcionar, **cada `foto.jpg` precisa ter uma `foto.webp` do lado**,
com exatamente o mesmo nome. O site monta o caminho do WebP trocando a
extensão — não existe lista de exceções em lugar nenhum.

Ao adicionar uma foto nova:

1. Salve a `.jpg` em `assets/img/produtos/` (como sempre)
2. Gere a `.webp` a partir dela — o [squoosh.app](https://squoosh.app) exporta
   nos dois formatos; escolha "WebP", qualidade 80
3. Salve as duas no mesmo lugar, com o mesmo nome

Se esquecer o `.webp`, a foto **continua aparecendo** (o navegador cai no
JPEG), só perde a economia. Nada quebra.

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

### Cuidados com a velocidade

O que já está feito para o site abrir rápido — vale manter ao mexer no código:

- **Fotos no tamanho certo e em WebP.** A página inteira pesa ~4 MB (antes
  eram 18,5 MB). Veja o aviso na seção de fotos dos produtos.
- **Um arquivo de estilo só.** Cada arquivo a mais no `<head>` atrasa o
  momento em que a página aparece.
- **As fontes não travam a exibição.** O texto aparece na hora com a fonte do
  sistema e troca sozinho quando a fonte do Google chega.
- **Toda foto tem `width` e `height` no HTML.** É o que impede o conteúdo de
  "pular" enquanto as imagens carregam. Ao trocar uma foto por outra de
  proporção diferente, atualize esses números.
- **A rolagem não recalcula o layout.** As posições das seções ficam guardadas
  em memória e só são medidas de novo quando a janela muda de tamanho.

### Cache e segurança (`.htaccess`)

O arquivo `.htaccess` liga compressão, cache longo das imagens e os cabeçalhos
de segurança. Ele **só funciona em hospedagem Apache** (Hostinger, cPanel e
parecidas). Em Netlify, Vercel ou GitHub Pages o arquivo é ignorado — nessas
plataformas o cache já vem configurado, mas os cabeçalhos de segurança
precisam ser declarados no painel ou no arquivo de configuração de cada uma.

---

Criado por **Yuri Augusto** — (37) 99670-7290
