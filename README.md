# Dashboard de Monitoramento de Alunos - TCC

Sistema simples para monitoramento de alunos com controle de notas e frequência.

## Stack Tecnológico

- **Frontend**: React.js + Vite
- **Backend**: Laravel 11 + PHP
- **Banco de Dados**: PostgreSQL (NEON) ou SQLite (desenvolvimento local)
- **Autenticação**: Laravel Sanctum (JWT Tokens)
- **Gráficos**: Recharts

## Estrutura do Projeto

```
TCC-DashBoard/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── context/          # Context API (autenticação)
│   │   ├── services/         # Serviços de API
│   │   └── styles/           # Arquivos CSS
│   ├── package.json
│   └── vite.config.js
│
└── backend/                  # API Laravel
    ├── app/
    │   ├── Models/           # Modelos do banco
    │   ├── Http/Controllers/ # Controllers REST
    │   └── Middleware/       # Middleware de autenticação
    ├── database/
    │   ├── migrations/       # Migrations do banco
    │   └── seeders/          # Dados iniciais
    ├── routes/
    │   └── api.php           # Rotas da API
    └── .env                  # Variáveis de ambiente
```

## Funcionalidades Implementadas

### Fase 1 - Setup & Autenticação ✅
- ✅ Estrutura React com Vite
- ✅ Projeto Laravel com migrations
- ✅ Autenticação com JWT (Sanctum)
- ✅ Layout com menu lateral
- ✅ Models e relacionamentos das tabelas

### Fase 2 - API & Listagem ✅
- ✅ API RESTful para CRUD de alunos
- ✅ Página de login
- ✅ Listagem de alunos com filtros
- ✅ Dashboard com gráficos
- ✅ Dados de teste com seeders

### Fase 3 - Notas & Frequência ✅
- ✅ API para lançar notas
- ✅ API para registrar frequência
- ✅ Models de Nota e Falta

### Próximas Fases
- ⏳ Página de detalhes do aluno
- ⏳ Formulários para lançar notas e frequência
- ⏳ Relatórios avançados
- ⏳ Exportação de dados (CSV/PDF)
- ⏳ Deploy em Render + NEON

## Instalação & Setup

### Backend (Laravel)

```bash
cd backend

# Instalar dependências
composer install

# Configurar variáveis de ambiente
cp .env.example .env
php artisan key:generate

# Rodar migrations
php artisan migrate

# Popular banco com dados de teste
php artisan db:seed

# Iniciar servidor
php artisan serve
```

O servidor Laravel será executado em `http://localhost:8000`

### Frontend (React)

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor React será executado em `http://localhost:5173`

## Credenciais de Teste

### Admin
- Email: `admin@dashboard.com`
- Senha: `password123`

### Professor
- Email: `joao@dashboard.com`
- Senha: `password123`

## Banco de Dados

### Tabelas Principais

1. **usuarios** - Usuários (admin/professor)
   - id, nome, email, senha, funcao

2. **alunos** - Informações dos alunos
   - id, nome, matricula, email, telefone, turma

3. **disciplinas** - Disciplinas ofertadas
   - id, nome, descricao

4. **notas** - Registros de notas
   - id, aluno_id, disciplina_id, valor_nota, semestre

5. **faltas** - Registros de frequência
   - id, aluno_id, data, presente

6. **professor_alunos** - Relacionamento professor-aluno
   - id, professor_id, aluno_id

## Rotas da API

### Autenticação
- `POST /api/login` - Fazer login
- `POST /api/logout` - Fazer logout
- `GET /api/me` - Dados do usuário autenticado

### Alunos
- `GET /api/alunos` - Listar alunos
- `POST /api/alunos` - Criar aluno
- `GET /api/alunos/{id}` - Detalhes do aluno
- `PUT /api/alunos/{id}` - Atualizar aluno
- `DELETE /api/alunos/{id}` - Deletar aluno

### Notas
- `GET /api/notas` - Listar notas
- `POST /api/notas` - Lançar nota
- `PUT /api/notas/{id}` - Atualizar nota
- `DELETE /api/notas/{id}` - Deletar nota

### Frequência
- `GET /api/faltas` - Listar faltas
- `POST /api/faltas` - Registrar frequência
- `PUT /api/faltas/{id}` - Atualizar frequência
- `DELETE /api/faltas/{id}` - Deletar frequência

### Disciplinas
- `GET /api/disciplinas` - Listar disciplinas
- `POST /api/disciplinas` - Criar disciplina
- `PUT /api/disciplinas/{id}` - Atualizar disciplina
- `DELETE /api/disciplinas/{id}` - Deletar disciplina

## Perfis de Acesso

### Admin
- Acesso total ao sistema
- Gerenciar usuários
- Gerenciar disciplinas
- Visualizar todos os alunos

### Professor
- Visualizar seus alunos
- Lançar notas
- Registrar frequência
- Visualizar relatórios de seus alunos

## Deploy

### Backend (Render)
Deploy URL: https://api.render.com/deploy/srv-d7vm8udb910c73d5g3i0?key=zB8slE00RrM

### Banco de Dados (NEON)
Connection: `postgresql://neondb_owner:npg_pB0T8dMWFGfK@ep-plain-sea-ac72oqv6-pooler.sa-east-1.aws.neon.tech/neondb`

## Desenvolvimento

### Padrões de Código
- Componentes funcionais com Hooks
- Context API para gerenciamento de estado
- Axios para requisições HTTP
- CSS Modules ou CSS global
- Models Eloquent no Laravel
- Controllers RESTful

### Extensões Recomendadas
- ES7+ React/Redux/React-Native snippets
- Laravel Extension Pack
- PostgreSQL extension

## Próximos Passos

1. Página de detalhes do aluno com histórico completo
2. Formulário para edição de alunos
3. Lançamento de notas (admin/professor)
4. Lançamento de frequência (admin/professor)
5. Relatórios avançados por aluno
6. Exportação de dados em CSV
7. Validações adicionais no frontend
8. Testes automatizados
9. Deploy em Render + NEON
10. Diagramas de arquitetura para documentação

## Suporte

Para dúvidas ou problemas, verifique:
1. Se o servidor Laravel está rodando em `localhost:8000`
2. Se o banco de dados está acessível
3. Os logs do servidor: `php artisan tinker` ou `tail -f storage/logs/laravel.log`
4. O console do navegador para erros de frontend

## Licença

Projeto desenvolvido como TCC - Dashboard de Monitoramento de Alunos
