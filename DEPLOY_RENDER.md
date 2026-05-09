# Guia de Deploy no Render + NEON

## Arquitetura do Deploy

```
┌─────────────────────────┐
│   Render (Web Service)  │
│  - Laravel Backend      │
│  - PHP 8.x              │
│  - Node.js (Build)      │
└────────────┬────────────┘
             │ HTTPS
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌─────────────┐  ┌──────────────┐
│  NEON DB    │  │  Frontend    │
│ PostgreSQL  │  │  (Vercel)    │
└─────────────┘  └──────────────┘
```

## Pré-requisitos

1. Conta no Render (https://render.com)
2. Repositório Git com o código
3. Credenciais do NEON:
   - Host: `ep-plain-sea-ac72oqv6-pooler.sa-east-1.aws.neon.tech`
   - Database: `neondb`
   - User: `neondb_owner`
   - Password: `npg_pB0T8dMWFGfK`
   - Port: `5432`

## Passo 1: Deploy no Render (Backend)

### 1.1 Criar novo Web Service

1. Faça login em https://render.com
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub
4. Selecione o repositório **TCC-DashBoard**

### 1.2 Configurar Aplicação

**Build Command:**
```bash
cd backend && composer install --no-dev --optimize-autoloader && php artisan key:generate && php artisan migrate --force --seed
```

**Start Command:**
```bash
cd backend && php -S 0.0.0.0:10000 -t public/
```

**Ou use o Apache (melhor):**
```bash
cd backend && vendor/bin/heroku-php-apache2 public/
```

### 1.3 Variáveis de Ambiente

Adicione no painel do Render:

```
APP_NAME=Dashboard
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:BWskfY9YT036Qrio94ikbH83MZbC7nAiAKxgbd0vZ+g=
APP_URL=<SEU_RENDER_URL>

DB_CONNECTION=pgsql
DB_HOST=ep-plain-sea-ac72oqv6-pooler.sa-east-1.aws.neon.tech
DB_PORT=5432
DB_DATABASE=neondb
DB_USERNAME=neondb_owner
DB_PASSWORD=npg_pB0T8dMWFGfK
DB_SSLMODE=require

CACHE_STORE=file
SESSION_DRIVER=cookie
QUEUE_CONNECTION=database
MAIL_MAILER=log
```

### 1.4 Deploy Automático

Clique em **"Deploy"**. O Render será:
1. Clonar o repositório
2. Instalar dependências com Composer
3. Gerar chave da app
4. Rodar migrations e seeders
5. Iniciar o servidor

**Tempo de deploy:** ~5-10 minutos

## Passo 2: Configurar CORS no Backend

Depois que o Render fornecer a URL (ex: `https://tcc-dashboard-backend.onrender.com`), configure CORS:

### 2.1 Atualizar config/cors.php

```php
'allowed_origins' => [
    'https://tcc-dashboard-frontend.vercel.app',  // SEU FRONTEND
    'http://localhost:3000',                       // LOCAL
    'http://localhost:5173',                       // LOCAL VITE
],
```

### 2.2 Middlewares no bootstrap/app.php

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->api(prepend: [
        \Illuminate\Http\Middleware\HandleCors::class,
    ]);
})
```

## Passo 3: Deploy do Frontend

### Opção A: Vercel (Recomendado)

1. Faça push do código para GitHub
2. Acesse https://vercel.com
3. Clique em "Import Project"
4. Selecione o repositório
5. Configure root directory: `frontend`
6. Build Command: `npm run build`
7. Deploy

**Variáveis de Ambiente (Vercel):**
```
VITE_API_URL=https://tcc-dashboard-backend.onrender.com/api
```

### Opção B: Render (Static Site)

1. No Render, crie novo "Static Site"
2. Conecte o repositório
3. Publish directory: `frontend/dist`
4. Build command: `cd frontend && npm install && npm run build`
5. Deploy

## Passo 4: Atualizar Frontend API URL

Edite `frontend/src/services/api.js`:

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 
                'https://tcc-dashboard-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

Também adicione no `.env.production`:
```
VITE_API_URL=https://tcc-dashboard-backend.onrender.com/api
```

## Passo 5: Testes

### 5.1 Testar Backend

```bash
curl https://tcc-dashboard-backend.onrender.com/api/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dashboard.com",
    "senha": "password123"
  }'
```

Resposta esperada:
```json
{
  "success": true,
  "token": "...",
  "usuario": { ... }
}
```

### 5.2 Testar Frontend

1. Acesse sua URL do frontend no Vercel/Render
2. Faça login com credenciais de teste
3. Navegue pelo dashboard
4. Verifique os gráficos

## Passo 6: Health Check

Render fará health check automático em `/up` (Laravel default).

Se quiser customizar:

```php
// routes/web.php
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
```

## URLs Finais

Após deploy, você terá:

- **Backend API**: `https://tcc-dashboard-backend.onrender.com/api`
- **Frontend**: `https://tcc-dashboard-frontend.vercel.app`

## Monitoramento

### Logs do Render
1. Vá para seu Web Service no Render
2. Clique em "Logs"
3. Veja output em tempo real

### Banco de Dados
```bash
# Conectar ao NEON para verificar dados
psql postgresql://neondb_owner:npg_pB0T8dMWFGfK@ep-plain-sea-ac72oqv6-pooler.sa-east-1.aws.neon.tech:5432/neondb

# Listar tabelas
\dt

# Ver dados
SELECT * FROM usuarios;
```

## Troubleshooting

### Build falha com "composer not found"

Certifique-se que no Render:
- Runtime: **PHP 8.2** ou superior
- Build Command inclui `cd backend`

### Erro de conexão NEON

1. Verifique credenciais no .env
2. Confirme IP whitelist (NEON permite todos por padrão)
3. Verifique `DB_SSLMODE=require`

### Frontend não conecta com API

1. Verificar CORS no backend
2. Verificar URL da API no frontend (.env)
3. Checar console do navegador (F12)

### Migrations não rodaram

1. Verificar logs do build no Render
2. Testar migration manualmente:
   ```bash
   curl https://tcc-dashboard-backend.onrender.com/api/alunos \
     -H "Authorization: Bearer {token}"
   ```

## Rollback

Se precisar reverter uma versão:

1. No Render dashboard, vá em "Deploys"
2. Selecione um deploy anterior
3. Clique "Redeploy"

## Atualizações Futuras

Quando fizer mudanças:

```bash
# Atualizar código
git add .
git commit -m "feat: novo recurso"
git push origin main

# Render fará redeploy automático
# Migrations rodamautomaticamente se houver novas
```

## Resumo de Credenciais

**Admin Login:**
- Email: `admin@dashboard.com`
- Senha: `password123`

**Database (NEON):**
- Host: `ep-plain-sea-ac72oqv6-pooler.sa-east-1.aws.neon.tech`
- User: `neondb_owner`
- Password: `npg_pB0T8dMWFGfK`
- Database: `neondb`
- Port: `5432`

## Próximos Passos

1. ✅ Deploy Backend no Render
2. ✅ Deploy Frontend no Vercel/Render
3. ✅ Configurar CORS
4. ✅ Testar fluxo completo
5. ⏳ Adicionar domain customizado
6. ⏳ Configurar SSL/TLS
7. ⏳ Setup de backups automáticos
