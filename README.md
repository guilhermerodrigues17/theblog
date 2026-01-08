# The Blog

Uma aplicação web moderna de blog desenvolvida com **Next.js 15**, focada em
performance e experiência do usuário.

## 📝 Sobre o Projeto

Este projeto é um front-end robusto para consumo de conteúdo, conectando-se a
uma API externa (`TheBlogAPI`) que opera com PostgreSQL para produção. Para o
ambiente de desenvolvimento local, o projeto utiliza **SQLite** gerenciado pelo
**Drizzle ORM**, garantindo um setup rápido e isolado.

> **Importante:** A autenticação de usuários foi migrada integralmente para o
> backend externo (`TheBlogAPI`). Implementações antigas de autenticação local
> presentes no código estão depreciadas.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem:** TypeScript
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Banco de Dados (Dev):** SQLite (via `better-sqlite3`)
- **Ícones:** Lucide React
- **Markdown:** `react-markdown` & `rehype-sanitize`
- **Notificações:** React Toastify

## ✨ Funcionalidades

- **Integração com API Externa:** Conexão agnóstica com o backend `TheBlogAPI`.
- **Gestão de Posts:** Interface para criação, edição e leitura de artigos.
- **Suporte a Markdown:** Editor e renderizador de conteúdo rico.
- **Upload de Arquivos:** Gerenciamento de mídia.
- **Autenticação:** Integração segura com sistema de login externo.

## 📂 Estrutura do Projeto

Os diretórios principais estão localizados em `src/`:

- `src/app`: Rotas e páginas da aplicação (Next.js App Router).
- `src/actions`: Server Actions para mutações de dados e interação com APIs.
- `src/components`: Componentes React reutilizáveis (UI, formulários, etc.).
- `src/lib`: Configurações de bibliotecas (Drizzle, etc.).
- `src/db`: Schemas e scripts de banco de dados.

## 🛠️ Começando (Getting Started)

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos

- Node.js (versão LTS recomendada)
- NPM ou gerenciador de pacotes de sua preferência.

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/the-blog.git
cd the-blog
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente: Crie um arquivo `.env` na raiz baseado no
   `.env-example` e preencha as chaves necessárias (URL da API, chaves de
   upload, etc).

4. Configuração do Banco de Dados (Dev): Como o ambiente de desenvolvimento usa
   SQLite, rode as migrações e o seed:

```bash
npm run migrate
npm run seed
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará rodando em [http://localhost:3000](http://localhost:3000).

## 📄 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com Turbopack.
- `npm run build`: Cria a build de produção.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Executa o linter.
- `npm run migrate`: Aplica migrações do Drizzle.
- `npm run seed`: Popula o banco de dados de desenvolvimento.
