# Deploy Rápido - Render + NEON (5 minutos)

## 🚀 Resumo Ultra-Rápido

Você terá uma aplicação funcionando na nuvem em 5 minutos!

```
GitHub → Render (Backend) → NEON (Database)
                ↓
         URLs Públicas para Testes
```

---

## ✅ Passo 1: Preparar GitHub

```bash
# Seu código já está pronto no GitHub?
# Se sim, pule para o Passo 2

# Se não, faça o seguinte:
cd /home/user/TCC-DashBoard
git push origin claude/student-monitoring-dashboard-h5DpP

# Acesse: https://github.com/SEU_USUARIO/TCC-DashBoard
# A branch aparecerá lá automaticamente
```

---

## ✅ Passo 2: Deploy no Render (Backend)

### 2.1 Criar Web Service

1. Abra https://render.com
2. Faça login (ou crie conta gratuita)
3. Clique **"New +"** → **"Web Service"**
4. Clique **"Connect a repository"**
5. Busque seu repositório: **TCC-DashBoard**
6. Clique **"Connect"**

### 2.2 Configurar Aplicação

Preencha assim:

| Campo | Valor |
|-------|-------|
| **Name** | tcc-dashboard-backend |
| **Environment** | Python (vai auto-detectar PHP) |
| **Region** | Ohio (ou mais perto de você) |
| **Branch** | claude/student-monitoring-dashboard-h5DpP |
| **Root Directory** | backend |

### 2.3 Build & Start Commands

**Build Command:**
```bash
composer install --no-dev --optimize-autoloader && php artisan key:generate && php artisan migrate --force --seed
```

**Start Command:**
```bash
vendor/bin/heroku-php-apache2 public/
```

### 2.4 Adicionar Variáveis de Ambiente

Clique em **"Environment"** e adicione:

```
APP_NAME=Dashboard
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:BWskfY9YT036Qrio94ikbH83MZbC7nAiAKxgbd0vZ+g=
APP_URL=https://tcc-dashboard-backend.onrender.com

DB_CONNECTION=pgsql
DB_HOST=ep-plain-sea-ac72oqv6-pooler.sa-east-1.aws.neon.tech
DB_PORT=5432
DB_DATABASE=neondb
DB_USERNAME=neondb_owner
DB_PASSWORD=npg_pB0T8dMWFGfK
DB_SSLMODE=require

CACHE_STORE=file
SESSION_DRIVER=cookie
LOG_LEVEL=info
```

### 2.5 Deploy!

Clique **"Create Web Service"**

⏳ **Aguarde 5-10 minutos** enquanto o Render:
- Cria a aplicação
- Instala dependências
- Roda migrations no NEON
- Popula dados de teste
- Inicia o servidor

✅ Quando terminar, você terá uma URL como:
```
https://tcc-dashboard-backend.onrender.com
```

---

## ✅ Passo 3: Testar Backend

Quando o deploy terminar, teste:

```bash
# Terminal ou Postman
curl https://tcc-dashboard-backend.onrender.com/api/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dashboard.com",
    "senha": "password123"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "token": "123|abcXYZ...",
  "usuario": {
    "id": 1,
    "nome": "Administrador",
    "email": "admin@dashboard.com",
    "funcao": "admin"
  }
}
```

✅ Se receber isso, o backend está funcionando!

---

## ✅ Passo 4: Deploy do Frontend (Vercel - Mais Fácil)

### 4.1 Vercel Setup

1. Abra https://vercel.com
2. Clique **"Create New Project"**
3. Clique **"Import Git Repository"**
4. Busque seu repositório: **TCC-DashBoard**
5. Clique **"Import"**

### 4.2 Configurar Projeto

- **Framework Preset**: Vite
- **Root Directory**: frontend
- **Build Command**: `npm run build`
- **Install Command**: `npm install`

### 4.3 Variáveis de Ambiente

Adicione:
```
VITE_API_URL=https://tcc-dashboard-backend.onrender.com/api
```

### 4.4 Deploy

Clique **"Deploy"**

⏳ **Aguarde 2-3 minutos**

✅ Você terá uma URL como:
```
https://tcc-dashboard-xxx.vercel.app
```

---

## ✅ Passo 5: Testar Aplicação Completa

1. Acesse sua URL Vercel
2. Você vê a página de login ✅
3. Faça login:
   - Email: `admin@dashboard.com`
   - Senha: `password123`
4. Você vê o dashboard com gráficos ✅
5. Clique em "Alunos" ✅
6. Veja a listagem com 8 alunos ✅

---

## 🎉 Pronto!

Sua aplicação está **100% funcional na nuvem**!

### URLs Finais:

- **Backend API**: https://tcc-dashboard-backend.onrender.com/api
- **Frontend**: https://tcc-dashboard-xxx.vercel.app
- **Database**: NEON PostgreSQL (automático)

### Credenciais de Teste:

```
Email: admin@dashboard.com
Senha: password123
```

---

## 🔗 Próximos Passos

### Se quiser parar aqui:
✅ Você tem uma aplicação funcionando que pode mostrar em apresentações!

### Se quiser melhorar:

1. **Adicionar domínio customizado**
   - Render: Configurações → Custom Domain
   - Vercel: Configurações → Domains

2. **Criar mais usuários**
   ```bash
   # Conectar ao NEON e adicionar usuários
   # Instruções no README.md
   ```

3. **Adicionar mais funcionalidades**
   - Página de detalhes do aluno
   - Formulários de lançamento de notas
   - Relatórios em PDF

4. **Configurar CI/CD automático**
   - Render faz redeploy automático ao fazer push
   - Vercel também

---

## 🆘 Troubleshooting Rápido

### Backend não inicia
- Checar logs no Render (aba "Logs")
- Verificar variáveis de ambiente estão todas preenchidas

### Frontend não carrega dados
- Abrir Console do navegador (F12)
- Ver se há erro de CORS
- Conferir VITE_API_URL está correto

### Database não conecta
- Verificar credenciais do NEON estão corretas
- Conferir DB_SSLMODE=require

---

## 📞 Support

Se tiver dúvidas:

1. Verifique os logs do Render
2. Leia `DEPLOY_RENDER.md` para mais detalhes
3. Verifique console do navegador (F12)
4. Leia `GUIA_TESTE.md` para testes manuais

---

## ✨ Resumo do que Você Fez

```
┌─────────────────────────────────────────────┐
│  Dashboard de Monitoramento de Alunos       │
│                                             │
│  ✅ Backend (Laravel) - Render              │
│  ✅ Frontend (React) - Vercel               │
│  ✅ Database (PostgreSQL) - NEON            │
│  ✅ Autenticação - JWT/Sanctum              │
│  ✅ Gráficos - Recharts                     │
│  ✅ 8 Alunos de teste - Prontos             │
│                                             │
│  🌐 Live em: https://seu-frontend.app      │
└─────────────────────────────────────────────┘
```

**Parabéns! 🎊**
