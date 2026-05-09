# Deploy Completo - Render + NEON (Sem Vercel)

Sua aplicação (Frontend + Backend) será deployada **completamente no Render**, com o banco de dados no **NEON**.

## 🎯 Arquitetura Final

```
GitHub
  ↓
Render Web Service 1: Backend (Laravel) → NEON PostgreSQL
Render Web Service 2: Frontend (React)
                     ↓
                  https://tcc-dashboard-frontend.onrender.com
```

---

## ✅ Passo 1: Preparar GitHub

Seu código já está pronto no GitHub no branch `claude/student-monitoring-dashboard-h5DpP`.

```bash
# Confirme que tudo está commitado:
cd /home/user/TCC-DashBoard
git status
```

Deve retornar: "working tree clean"

---

## ✅ Passo 2: Deploy Backend (Render)

**Status:** ✅ Já iniciado! (deploy ID: dep-d7vni1rbc2fs73d13t40)

Acompanhe em: https://dashboard.render.com → tcc-dashboard-backend → Logs

Esperado em ~10-15 minutos:
```
✅ Cloning repository
✅ composer install --no-dev
✅ php artisan key:generate
✅ Running migrations...
✅ Database seeding...
✅ Server started on 0.0.0.0:10000
```

**Teste quando estiver pronto:**
```bash
curl -X POST https://tcc-dashboard-backend.onrender.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dashboard.com","senha":"password123"}'
```

Resposta esperada:
```json
{
  "success": true,
  "token": "123|abcXYZ...",
  "usuario": { "id": 1, "nome": "Administrador", ... }
}
```

✅ Se receber token, o backend está **PRONTO**!

---

## ✅ Passo 3: Deploy Frontend (Render)

### 3.1 Criar Novo Web Service

1. Abra https://render.com
2. Clique **"New +"** → **"Web Service"**
3. Selecione **"Connect a repository"**
4. Busque: **TCC-DashBoard**
5. Clique **"Connect"**

### 3.2 Configurar Aplicação

Preencha assim:

| Campo | Valor |
|-------|-------|
| **Name** | tcc-dashboard-frontend |
| **Environment** | Node |
| **Region** | Ohio (ou mais perto) |
| **Branch** | claude/student-monitoring-dashboard-h5DpP |
| **Root Directory** | frontend |

### 3.3 Build & Start Commands

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
node server.js
```

### 3.4 Environment Variables

Clique em **"Environment"** e adicione:

```
NODE_ENV=production
VITE_API_URL=https://tcc-dashboard-backend.onrender.com/api
```

### 3.5 Deploy!

Clique **"Create Web Service"**

⏳ Aguarde 3-5 minutos enquanto o Render:
- Instala dependências npm
- Faz build do React (Vite)
- Inicia servidor Express

✅ Você terá uma URL como:
```
https://tcc-dashboard-frontend.onrender.com
```

---

## ✅ Passo 4: Testar Aplicação Completa

Quando o frontend estiver pronto (verá "Live" no Render):

1. Abra https://tcc-dashboard-frontend.onrender.com
2. Você vê a página de login ✅
3. Faça login:
   - Email: `admin@dashboard.com`
   - Senha: `password123`
4. Você vê o dashboard com gráficos ✅
5. Clique em "Alunos" ✅
6. Veja a listagem com 8 alunos ✅

---

## 📊 Checklist de Deployment

### Backend (Render)
- [x] Deploy disparado
- [ ] Deploy concluído (5-10 min)
- [ ] Login retorna token
- [ ] API /alunos retorna dados
- [ ] Banco NEON com 8 alunos

### Frontend (Render)
- [ ] Web Service criado
- [ ] Build Command configurado
- [ ] Start Command configurado
- [ ] VITE_API_URL configurado
- [ ] Deploy concluído (3-5 min)
- [ ] Página de login carrega
- [ ] Login funciona
- [ ] Dashboard carrega com dados
- [ ] Menu de alunos funciona

---

## 🔑 Credenciais de Teste

```
Admin:
  Email: admin@dashboard.com
  Senha: password123

Professor:
  Email: joao@dashboard.com
  Senha: password123

Database (NEON):
  Host: ep-plain-sea-ac72oqv6-pooler.sa-east-1.aws.neon.tech
  User: neondb_owner
  Pass: npg_pB0T8dMWFGfK
  DB: neondb
  Port: 5432
```

---

## 🎉 Pronto!

Sua aplicação está **100% funcional na nuvem**!

### URLs Finais:

```
Backend API:   https://tcc-dashboard-backend.onrender.com/api
Frontend:      https://tcc-dashboard-frontend.onrender.com
Database:      NEON PostgreSQL (automático)
```

---

## 🔧 Troubleshooting

### Frontend não conecta ao Backend?
1. Verifique se VITE_API_URL está correto no Render
2. Abra Console do navegador (F12) para ver erro exato
3. Confirme que Backend está com "Live" no Render

### Backend retorna erro?
1. Verifique logs em Render → tcc-dashboard-backend → Logs
2. Procure por erros em VERMELHO
3. Confirme variáveis de ambiente estão todas preenchidas

### Dados não aparecem?
1. Teste com curl a API do backend (veja passo 2)
2. Confirme migrations rodaram (veja logs do backend)
3. Confirme seeders popularam dados

---

## 📝 Próximos Passos (Opcional)

- [ ] Adicionar domínio customizado
- [ ] Configurar SSL/TLS
- [ ] Backup automático do banco
- [ ] Mais usuários de teste
- [ ] Novas funcionalidades

---

**Última atualização:** 09/05/2026

Deploy com **Render + NEON apenas** ✅ 🚀
