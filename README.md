# Dashboard Pedagógico Coopen

Sistema de Dashboard Pedagógico para Monitoramento de Desempenho Escolar.
TCC/Projeto Integrador — UNIVESP.

---

## Objetivo

Ajudar a coordenação pedagógica da Escola Cooperativa Coopen a visualizar rapidamente alunos com baixo desempenho, risco de reprovação ou risco de evasão, por meio de dashboards, gráficos e filtros.

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React + Vite + Tailwind CSS + Recharts |
| Roteamento | React Router DOM |
| HTTP | Axios |
| Backend | Node.js + Express |
| Banco | PostgreSQL no Neon |
| Autenticação | JWT + bcryptjs |
| Deploy | Render (uma única instância) |

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta no [Neon](https://neon.tech) com banco PostgreSQL criado

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd projeto-dashboard-coopen
```

### 2. Configurar variáveis de ambiente

```bash
cp backend/.env.example backend/.env
```

Abra `backend/.env` e preencha:

```
DATABASE_URL="postgresql://usuario:senha@host/neondb?sslmode=require&channel_binding=require"
JWT_SECRET="uma_chave"
PORT=3000
NODE_ENV=development
USE_MOCK_DATA=false
FRONTEND_URL=http://localhost:5173
```

### 3. Instalar dependências

```bash
npm run install:all
```

### 4. Criar as tabelas no banco

```bash
npm run db:init
```

### 5. Inserir dados de demonstração

```bash
npm run db:seed
```

### 6. Rodar em desenvolvimento

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Health check: http://localhost:3000/api/health

---

## Banco de dados Neon

O sistema usa PostgreSQL hospedado no [Neon](https://neon.tech).

### Tabelas (nomes em português brasileiro)

| Tabela | Descrição |
|--------|-----------|
| `usuarios` | Usuários do sistema (coordenação para conferência) |
| `turmas` | Turmas e anos letivos |
| `alunos` | Alunos matriculados |
| `disciplinas` | Disciplinas |
| `periodos_letivos` | Bimestres/semestres |
| `notas` | Notas por aluno, disciplina e período |
| `frequencias` | Frequência por aluno e disciplina |
| `integracoes_sponte` | Registro de integração com Sponte |

### Criar as tabelas

```bash
npm run db:init
```

### Inserir dados de demonstração

```bash
npm run db:seed
```

### Testar conexão

Acesse: `http://localhost:3000/api/health`

Resposta esperada:
```json
{ "status": "ok", "database": "connected", "message": "Backend conectado ao Neon" }
```

---

## Login inicial

```
E-mail: coordenacao@coopen.com
Senha:  123456
```

---

## Deploy no Render

### Uma única instância Web Service

1. Acesse [render.com](https://render.com) e crie um **Web Service**
2. Conecte o repositório GitHub
3. Configure:

| Campo | Valor |
|-------|-------|
| Build Command | `npm run install:all && npm run build` |
| Start Command | `npm start` |
| Root Directory | (deixar vazio) |

4. Adicione as **Environment Variables**:

```
DATABASE_URL=<url-real-do-neon>
JWT_SECRET=<chave-secreta-forte>
NODE_ENV=production
USE_MOCK_DATA=false
```

5. Clique em **Deploy**

Após o deploy, rode o seed uma vez via shell do Render:
```bash
npm run db:init
npm run db:seed
```

O sistema estará disponível em:
```
https://seu-app.onrender.com/login
https://seu-app.onrender.com/dashboard
https://seu-app.onrender.com/alunos-risco
https://seu-app.onrender.com/api/health
```

> **Importante:** Não criar Static Site separado. O Express serve o React compilado em produção.

---

## Estrutura do projeto

```
/
├── package.json           # Scripts raiz (install, build, start, dev)
├── render.yaml            # Configuração do Render
├── .gitignore
├── README.md
├── backend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── server.js          # Express principal
│       ├── db.js              # Conexão com Neon
│       ├── config/            # Regras de risco pedagógico
│       ├── controllers/       # Lógica das rotas
│       ├── repositories/      # Queries SQL
│       ├── routes/            # Definição das rotas /api
│       ├── middlewares/       # JWT, erros
│       ├── services/          # Integração Sponte (futura)
│       ├── utils/             # Calculadora de risco, CSV
│       └── database/          # schema.sql, init, seed
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── pages/             # Login, Dashboard, AlunosRisco, Turmas, ...
        ├── components/        # Sidebar, Header, StatCard, RiskBadge, ...
        ├── services/api.js    # Axios configurado
        └── utils/formatters.js
```

---

## Como funciona a arquitetura

```
Usuário
  ↓
Render (único Web Service)
  ↓
Express (Node.js)
  ├── /api/*  → controllers → repositories → PostgreSQL Neon
  └── /*      → frontend/dist (React compilado)
```

Em produção, o Express serve o `frontend/dist` gerado pelo `vite build`.  
Qualquer rota não-API é redirecionada para `index.html` (SPA).

---

## Como explicar o sistema na apresentação

1. O usuário acessa o sistema pelo Render.
2. O backend Express entrega o frontend React.
3. O login gera um token JWT.
4. As telas protegidas usam esse token em cada requisição.
5. O backend consulta o banco Neon com queries SQL simples.
6. Os dados são transformados em indicadores pedagógicos.
7. O dashboard mostra gráficos (Recharts) e cards de resumo.
8. A tela de alunos em risco aplica as regras de média (≥6) e frequência (≥75%).
9. A coordenação pode filtrar dados e exportar CSV.
10. O sistema está preparado para futura integração com a API Sponte.

---

## Roteiro rápido para demonstração

1. Abrir o sistema publicado no Render
2. Fazer login (`coordenacao@coopen.com` / `123456`)
3. Mostrar o **Dashboard** — cards de indicadores e 4 gráficos
4. Explicar os cards: total de alunos, alunos em risco, média geral, frequência
5. Mostrar os gráficos: risco por turma, evolução de média, distribuição, frequência
6. Abrir **Alunos em Risco** — tabela com situação colorida
7. Aplicar filtros por turma e situação
8. Exportar **CSV**
9. Abrir o detalhe de um aluno em risco
10. Mostrar a página **Integração Sponte**
11. Explicar que os dados vêm do Neon e o sistema está preparado para integração futura com API Sponte

---

## Checklist final

- [ ] `npm run db:init` executado com sucesso
- [ ] `npm run db:seed` executado com sucesso
- [ ] `/api/health` retorna `"database": "connected"`
- [ ] Login funciona com `coordenacao@coopen.com` / `123456`
- [ ] Dashboard carrega cards e gráficos
- [ ] Alunos em risco aparecem na listagem
- [ ] Filtros funcionam
- [ ] Exportação CSV funciona
- [ ] Detalhe do aluno carrega notas e frequências
- [ ] Página de integração Sponte carrega
- [ ] `.env` não está versionado
- [ ] `DATABASE_URL` real não aparece no código
- [ ] Recarregar `/dashboard` não gera 404 em produção

---

---

## Aviso sobre rotas de banco

As rotas `/api/database/*` são para inspeção em desenvolvimento.  
**Remover ou proteger com autenticação antes de tornar o sistema público.**
