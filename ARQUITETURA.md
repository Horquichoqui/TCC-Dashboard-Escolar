# Arquitetura do Dashboard de Monitoramento de Alunos

## Arquitetura Geral

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Navegador)                          │
└────────────────────────────┬──────────────────────────────────────┘
                             │
                    HTTP/HTTPS Request/Response
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
        ▼                                         ▼
┌─────────────────────┐              ┌─────────────────────┐
│  SERVIDOR FRONTEND  │              │  SERVIDOR BACKEND   │
│   (React + Vite)    │              │    (Laravel 11)     │
│  Port: 5173/3000    │              │   Port: 8000        │
└─────────┬───────────┘              └─────────┬───────────┘
          │                                    │
          │ • SPA (Single Page App)            │ • API REST
          │ • Routing com React Router         │ • JWT Tokens
          │ • State com Context API            │ • Sanctum Auth
          │ • HTTP Client: Axios               │ • ORM: Eloquent
          │ • Gráficos: Recharts               │ • Migrations
          │                                    │
          └────────────────┬────────────────┘
                           │
                    PostgreSQL/SQLite
                           │
                    ┌──────▼───────┐
                    │  DATABASE    │
                    │              │
                    │ • usuarios   │
                    │ • alunos     │
                    │ • disciplinas│
                    │ • notas      │
                    │ • faltas     │
                    └──────────────┘
```

## Fluxo de Autenticação

```
1. User acessa /login
                │
                ▼
2. Submete email + senha
                │
                ▼
3. Frontend → POST /api/login
                │
                ▼
4. Laravel valida credenciais
                │
                ▼
5. Se válido: Gera JWT Token
                │
                ▼
6. Retorna token + dados do usuário
                │
                ▼
7. Frontend armazena token em localStorage
                │
                ▼
8. Headers: Authorization: Bearer {token}
                │
                ▼
9. Acesso às páginas protegidas
```

## Estrutura Frontend (React)

```
frontend/
├── public/
│   └── favicon.svg
│
├── src/
│   ├── main.jsx                 # Entrada da aplicação
│   ├── App.jsx                  # Componente raiz com rotas
│   ├── App.css                  # Estilos globais
│   │
│   ├── pages/                   # Páginas da aplicação
│   │   ├── LoginPage.jsx        # Autenticação
│   │   ├── DashboardPage.jsx    # Dashboard com gráficos
│   │   └── AlunosPage.jsx       # Listagem de alunos
│   │
│   ├── components/              # Componentes reutilizáveis
│   │   └── Layout.jsx           # Menu lateral + main
│   │
│   ├── context/                 # Context API
│   │   └── AuthContext.jsx      # Gerenciamento de auth
│   │
│   ├── services/                # Serviços de API
│   │   └── api.js               # Configuração Axios
│   │
│   └── styles/                  # Arquivos CSS
│       ├── LoginPage.css
│       ├── DashboardPage.css
│       ├── AlunosPage.css
│       └── Layout.css
│
├── package.json
├── vite.config.js
└── index.html
```

## Estrutura Backend (Laravel)

```
backend/
├── app/
│   ├── Models/                  # Modelos Eloquent
│   │   ├── Usuario.php
│   │   ├── Aluno.php
│   │   ├── Disciplina.php
│   │   ├── Nota.php
│   │   ├── Falta.php
│   │   └── ProfessorAluno.php
│   │
│   └── Http/
│       ├── Controllers/         # Controllers REST
│       │   ├── AuthController.php
│       │   ├── AlunoController.php
│       │   ├── NotaController.php
│       │   ├── FaltaController.php
│       │   └── DisciplinaController.php
│       │
│       └── Middleware/          # Middleware de auth
│           └── Authenticate.php
│
├── database/
│   ├── migrations/              # Schema das tabelas
│   │   ├── create_usuarios_table.php
│   │   ├── create_alunos_table.php
│   │   ├── create_disciplinas_table.php
│   │   ├── create_notas_table.php
│   │   ├── create_faltas_table.php
│   │   ├── create_professor_alunos_table.php
│   │   └── create_personal_access_tokens_table.php
│   │
│   └── seeders/                 # Dados iniciais
│       ├── DatabaseSeeder.php
│       ├── UsuarioSeeder.php
│       ├── AlunoSeeder.php
│       ├── DisciplinaSeeder.php
│       └── NotaSeeder.php
│
├── routes/
│   ├── api.php                  # Rotas da API
│   ├── web.php
│   └── console.php
│
├── bootstrap/
│   └── app.php                  # Configuração da app
│
├── config/
│   ├── app.php
│   ├── database.php
│   └── ...
│
├── .env                         # Variáveis de ambiente
├── .env.example
├── composer.json
└── artisan
```

## Fluxo de Requisição

```
1. Frontend faz requisição HTTP
   GET /api/alunos
   Headers: Authorization: Bearer {token}
            Content-Type: application/json
                     │
                     ▼
2. Laravel recebe requisição
   → Middleware de autenticação (Sanctum)
   → Valida token JWT
                     │
       ┌─────────────┴─────────────┐
       │                           │
   Token válido?            Token inválido?
       │                           │
       ▼                           ▼
   Continua                  Retorna 401
       │                      Unauthorized
       ▼
3. Router match route
   GET /api/alunos → AlunoController@index
                     │
                     ▼
4. Controller processa
   - Valida query parameters
   - Carrega dados do banco
   - Formata resposta JSON
                     │
                     ▼
5. Retorna resposta HTTP
   Status: 200 OK
   Body: { "success": true, "alunos": [...] }
                     │
                     ▼
6. Frontend recebe resposta
   - Atualiza estado React
   - Re-renderiza componentes
   - Exibe dados ao usuário
```

## Componentes React - Hierarquia

```
App
├── AuthProvider
│   └── AppContent
│       └── BrowserRouter
│           ├── Routes
│           │   ├── Route /login
│           │   │   └── LoginPage
│           │   │
│           │   └── PrivateRoutes (autenticadas)
│           │       ├── Route /dashboard
│           │       │   └── Layout
│           │       │       └── DashboardPage
│           │       │           ├── StatsCards
│           │       │           ├── ChartsContainer
│           │       │           │   ├── BarChart (Notas)
│           │       │           │   └── PieChart (Turmas)
│           │       │           │
│           │       ├── Route /alunos
│           │       │   └── Layout
│           │       │       └── AlunosPage
│           │       │           ├── FilterSection
│           │       │           └── AlunosGrid
│           │       │               └── AlunoCard[]
│           │       │
│           │       └── Layout
│           │           ├── Sidebar
│           │           │   ├── Logo
│           │           │   ├── Menu
│           │           │   └── UserInfo
│           │           │
│           │           └── MainContent
```

## Fluxo de Estado (Context API)

```
AuthContext
│
├── provider (AuthProvider)
│   └── children
│
├── state:
│   ├── usuario (null ou objeto)
│   ├── token (null ou string)
│   ├── loading (boolean)
│   └── isAuthenticated (boolean)
│
└── actions:
    ├── login(email, senha) → Promise
    │   └── Faz POST /api/login
    │       └── Salva token em localStorage
    │
    ├── logout() → Promise
    │   └── Faz POST /api/logout
    │       └── Remove token de localStorage
    │
    └── useAuth() hook
        └── Retorna contexto para componentes
```

## Fluxo de Requisições de API

```
┌──────────────────────────────────────────────────────────────┐
│                   API Service (api.js)                       │
│                                                              │
│  const api = axios.create({                                 │
│    baseURL: '/api',                                         │
│    headers: { 'Content-Type': 'application/json' }         │
│  })                                                          │
│                                                              │
│  Interceptor: Authorization Bearer Token                    │
└──────────────────────────────────────────────────────────────┘
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
        ▼                                         ▼
   GET /api/alunos                        POST /api/login
   GET /api/alunos/{id}                   POST /api/logout
   POST /api/alunos                       GET /api/me
   PUT /api/alunos/{id}
   DELETE /api/alunos/{id}
        │
        ├──── GET /api/notas
        ├──── POST /api/notas
        ├──── PUT /api/notas/{id}
        ├──── DELETE /api/notas/{id}
        │
        ├──── GET /api/faltas
        ├──── POST /api/faltas
        ├──── PUT /api/faltas/{id}
        ├──── DELETE /api/faltas/{id}
        │
        └──── GET /api/disciplinas
              POST /api/disciplinas
              PUT /api/disciplinas/{id}
              DELETE /api/disciplinas/{id}
```

## Segurança

### Frontend
- ✅ LocalStorage para token (HttpOnly cookies seria melhor em produção)
- ✅ Validação de rotas privadas
- ✅ Requisições incluem token no header
- ⚠️ Considerar CSRF tokens para production

### Backend
- ✅ Laravel Sanctum para JWT tokens
- ✅ Password hashing com bcrypt
- ✅ CORS configurado
- ✅ Validação de entrada em todos os endpoints
- ✅ Controle de acesso (admin vs professor)
- ✅ Soft deletes para dados sensíveis

## Performance

### Frontend Otimizações
- Vite com hot module replacement
- Code splitting automático
- Tree shaking de dependências
- Lazy loading de páginas

### Backend Otimizações
- Índices no banco de dados
- Eager loading com ->with()
- Query caching com Redis (future)
- API responses JSON otimizados

## Escalabilidade Futura

### Frontend
- Redux para state management mais complexo
- Testes com Vitest + React Testing Library
- PWA com service workers
- Responsividade aprimorada

### Backend
- Filas de jobs para processamento async
- WebSockets para real-time updates
- Rate limiting
- Pagination para grandes datasets
- Soft deletes em todas as tabelas

## Deploy

### Desenvolvimento Local
```bash
# Terminal 1 - Backend
cd backend && php artisan serve

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Production (Render + NEON)
```bash
# Backend deployment
- Environment: PHP 8.x
- Build: composer install
- Start: php artisan serve --host=0.0.0.0

# Database: NEON PostgreSQL
- Connection pooling automático
- Backups diários

# Frontend
- Build: npm run build
- Deploy em CDN ou app server
```

## Monitoramento

### Logs
- Laravel: `storage/logs/laravel.log`
- Frontend: Console do navegador
- Render: Dashboard de logs

### Métricas
- Taxa de erro de API
- Tempo de resposta
- Uso de banco de dados
- Performance do frontend

## Troubleshooting

### CORS Error
```javascript
// Verificar backend/app/Providers/RouteServiceProvider.php
// Adicionar allowed_origins se necessário
```

### Token Inválido
```javascript
// Verificar localStorage no DevTools
// Limpar e fazer login novamente
```

### Database Connection Error
```bash
# Verificar .env
# Testar conexão: php artisan tinker
```
