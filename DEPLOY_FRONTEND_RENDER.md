# Deploy Frontend no Render (Agora!)

Seu backend está deploying no Render. Enquanto aguarda, vamos fazer o deploy do frontend também no Render (não Vercel).

## ⚡ Setup Rápido (5 minutos)

### Passo 1: Acessar Render

Abra: https://dashboard.render.com

Faça login com sua conta (ou crie uma se não tiver).

---

### Passo 2: Criar Novo Web Service

1. Clique no **botão "New +"** (canto superior direito)
2. Selecione **"Web Service"**
3. Clique **"Connect a repository"**

---

### Passo 3: Conectar GitHub

1. Busque seu repositório: **TCC-DashBoard**
2. Clique **"Connect"**

Você será levado à página de configuração.

---

### Passo 4: Configurar (Copie e Cole!)

Preencha com os valores abaixo:

```
Name:              tcc-dashboard-frontend
Environment:       Node
Region:            Ohio
Branch:            claude/student-monitoring-dashboard-h5DpP
Root Directory:    frontend
```

---

### Passo 5: Build & Start Commands

Cole exatamente assim:

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
node server.js
```

---

### Passo 6: Environment Variables

Clique em **"Environment"** (abaixo do Start Command)

Adicione estas duas variáveis:

| Key | Value |
|-----|-------|
| NODE_ENV | production |
| VITE_API_URL | https://tcc-dashboard-backend.onrender.com/api |

**IMPORTANTE:** Depois que o backend ficar pronto (em ~10 min), a URL acima estará funcional. Se quiser, pode deixar e depois editar quando o backend tiver pronto.

---

### Passo 7: Deploy!

Clique no botão **"Create Web Service"**

⏳ Aguarde 3-5 minutos...

Você verá:
1. "Creating" (Render criando o serviço)
2. "Building" (npm install + npm run build)
3. "Deploying" (iniciando o servidor)
4. **"Live"** (Pronto!) ✅

---

### Passo 8: Acessar o Frontend

Quando mudar para **"Live"**, você terá uma URL:

```
https://tcc-dashboard-frontend.onrender.com
```

Abra no navegador e teste:

1. Você vê a página de login ✅
2. Email: `admin@dashboard.com`
3. Senha: `password123`
4. Clique "Entrar"
5. Você vê o dashboard com gráficos ✅

---

## ✅ Checklist

- [ ] Render Web Service criado com nome "tcc-dashboard-frontend"
- [ ] Root Directory: frontend
- [ ] Build Command: npm install && npm run build
- [ ] Start Command: node server.js
- [ ] VITE_API_URL: https://tcc-dashboard-backend.onrender.com/api
- [ ] NODE_ENV: production
- [ ] Deploy iniciado (botão "Create Web Service" clicado)
- [ ] Status mudou para "Live" (3-5 min)
- [ ] Acessei a URL e vi a página de login
- [ ] Login funcionou e vi o dashboard

---

## 🔗 Seus URLs Finais

Quando tudo estiver pronto:

```
Backend:  https://tcc-dashboard-backend.onrender.com/api
Frontend: https://tcc-dashboard-frontend.onrender.com
Database: Automático no NEON
```

---

## 🆘 Se Algo Deu Errado

### Frontend não carrega?
- Clique em "Logs" e procure por erros vermelhos
- Confirme que VITE_API_URL está correto
- Aguarde alguns minutos (às vezes demora)

### Frontend carrega mas dados não aparecem?
- Abra Console do navegador (F12)
- Veja se há erro de CORS ou conexão
- Confirme que o backend está "Live" no Render

### Build falhou?
- Clique em "Logs"
- Procure por erro em "npm install" ou "npm run build"
- Verify se package.json está correto

---

**Pronto?** Vá para o Render e clique "New +" → "Web Service"! 🚀
