# Jungle Gaming 🎮🌿

Marketplace de NFTs desenvolvido com React e TypeScript como parte de um desafio técnico de Frontend. O projeto oferece navegação por coleções digitais, gerenciamento de favoritos e carrinho, autenticação simulada e um fluxo de compra com confirmação de pedido.

## 🔗 Links do projeto

- **Aplicação publicada:** https://jungle-gaming-d3b7llekw-marcelo-6fa1.vercel.app/
- **Repositório GitHub:** https://github.com/marcelusdev/jungle-gaming
- **Servidor de tempo real (Render):** https://jungle-gaming-socket.onrender.com

## ✨ Funcionalidades

- Catálogo de NFTs com busca, filtros e ordenação.
- Navegação pelos itens do marketplace.
- Sistema de favoritos.
- Carrinho com adição, remoção e gerenciamento de itens.
- Cadastro, login e sessão simulados.
- Checkout com seleção de carteira fictícia.
- Simulação de pagamento aprovado ou recusado.
- Página de confirmação com detalhes, valores e status do pedido.
- Persistência local de dados selecionados após atualizar a página.
- Interface responsiva inspirada no layout de referência do Figma.

## 🛠️ Tecnologias utilizadas

- React e TypeScript
- Vite
- TanStack Router
- TanStack Query
- Axios
- Tailwind CSS
- Mock Service Worker (MSW)
- Socket.IO
- Lucide React

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js
- npm
- Git

### Instalação

Clone o repositório:

```bash
git clone https://github.com/marcelusdev/jungle-gaming.git
```

Entre na pasta do projeto:

```bash
cd jungle-frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o ambiente de desenvolvimento. |
| `npm run build` | Verifica os tipos do TypeScript e gera o build de produção. |
| `npm run preview` | Executa uma prévia local do build de produção. |
| `npm run lint` | Executa o ESLint. |

## ⚙️ Variáveis de ambiente

A variável abaixo configura a URL do servidor de tempo real:

```env
VITE_SOCKET_URL=https://jungle-gaming-socket.onrender.com
```

Para desenvolvimento local, crie um arquivo `.env` na raiz do projeto e configure a variável conforme necessário.

Não armazene credenciais privadas ou segredos em variáveis com o prefixo `VITE_`, pois elas podem ficar acessíveis no navegador.

## 🧪 Dados simulados e pagamentos

O projeto utiliza dados fictícios para demonstrar os fluxos do marketplace.

- O catálogo utiliza dados locais do projeto.
- Os handlers REST do MSW são ativados no ambiente de desenvolvimento.
- O cadastro, o login e a sessão utilizam armazenamento local no navegador.
- Os pedidos simulados são persistidos localmente e podem ser recuperados pela tela de confirmação no mesmo navegador.
- O checkout permite simular pagamentos aprovados e recusados.
- O servidor hospedado no Render é destinado à integração de tempo real por Socket.IO.

**Limitações:** não são realizadas transações reais de blockchain nem cobranças financeiras. A autenticação e a persistência local são utilizadas para demonstração e não devem ser consideradas mecanismos seguros para produção. Os handlers REST simulados do MSW não constituem uma API REST de produção.

## 🧭 Como testar a aplicação

1. Acesse a aplicação pelo link público.
2. Crie uma conta de demonstração.
3. Entre na conta e navegue pelo catálogo.
4. Adicione NFTs aos favoritos e ao carrinho.
5. Acesse o checkout e selecione a carteira fictícia.
6. Finalize uma compra com a simulação de pagamento aprovado.
7. Repita o fluxo com a opção de simular pagamento recusado.

Os dados armazenados localmente podem permanecer após atualizar a página. Para iniciar um novo cenário, limpe os dados do site nas configurações do navegador; isso também poderá encerrar a sessão e remover os pedidos salvos.

## 📐 Referência visual

O projeto foi desenvolvido com base no layout de referência disponibilizado no Figma:

[Frontend Challenge — NFT Marketplace](https://www.figma.com/design/Ff0SksUi7UFtPWUO8kyNtw/Frontend-Challenge?node-id=0-1)

## 👨‍💻 Objetivo

Demonstrar conhecimentos de desenvolvimento frontend, componentização, tipagem com TypeScript, gerenciamento de estado, navegação, persistência local, interfaces responsivas e simulação de fluxos de compra.

---

Desenvolvido como parte de um desafio técnico de Frontend.