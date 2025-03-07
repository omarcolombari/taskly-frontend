# Taskly - Frontend

Taskly é uma aplicação web para gerenciamento de tarefas. Os usuários podem se cadastrar, criar, editar e excluir tarefas de forma intuitiva. O projeto foi desenvolvido como parte de um teste técnico.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Vite](https://vitejs.dev/) - Build rápido e otimizado para React
- [React](https://react.dev/) - Biblioteca para construção de interfaces
- [TailwindCSS](https://tailwindcss.com/) - Estilização com classes utilitárias
- [ShadCN UI](https://ui.shadcn.com/) - Componentes de UI acessíveis e estilizados
- [Orval](https://orval.dev/) - Geração automática de hooks a partir da OpenAPI
- [React Query](https://tanstack.com/query/latest) - Gerenciamento de estado assíncrono

## 📋 Pré-requisitos

Antes de iniciar, você precisará ter instalado:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- O backend da aplicação, disponível em: [Taskly Backend](https://github.com/omarcolombari/taskly-backend)

## 🔧 Instalação e Execução

1. Clone o repositório:

   ```sh
   git clone https://github.com/omarcolombari/taskly-frontend.git
   cd taskly-frontend
   ```

2. Instale as dependências:

   ```sh
   pnpm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e adicione:

   ```sh
   VITE_API_URL='http://localhost:3333'
   ```

4. Inicie o projeto:

   ```sh
   pnpm dev
   ```

## 📌 Funcionalidades

- Cadastro e autenticação de usuários
- Criação, edição e exclusão de tarefas
- Listagem dinâmica de tarefas utilizando React Query
- UI moderna e responsiva com ShadCN UI e TailwindCSS
- Conexão com API documentada via OpenAPI (Orval)

## 📼 Conexão com a API

A API já está documentada e o Orval gera automaticamente os hooks para requisições baseadas no OpenAPI.
