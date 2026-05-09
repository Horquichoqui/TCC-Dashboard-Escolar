# Checklist de Deploy - Render + NEON

## 📋 Antes do Deploy

- [ ] Código está commitado e pusheado para GitHub
- [ ] Branch: `claude/student-monitoring-dashboard-h5DpP`
- [ ] Todos os arquivos `.env` estão configurados
- [ ] Backend/package.json existe
- [ ] Frontend/package.json existe
- [ ] Database seeders estão prontos

## 🚀 Deploy Backend (Render)

### GitHub Setup
- [ ] Fork ou clone do repositório
- [ ] Conectado ao Render via GitHub

### Render Web Service
- [ ] Criar novo "Web Service"
- [ ] Conectar repositório GitHub
- [ ] Branch: `claude/student-monitoring-dashboard-h5DpP`
- [ ] Root Directory: `backend`
- [ ] Runtime: PHP
- [ ] Plan: Free

### Build Configuration
- [ ] **Build Command:**
  ```bash
  composer install --no-dev --optimize-autoloader && \
  php artisan key:generate && \
  php artisan migrate --force --seed
  ```

- [ ] **Start Command:**
  ```bash
  vendor/bin/heroku-php-apache2 public/
  ```

### Environment Variables
- [ ] `APP_NAME=Dashboard`
- [ ] `APP_ENV=production`
- [ ] `APP_DEBUG=false`
- [ ] `APP_KEY=base64:BWskfY9YT036Qrio94ikbH83MZbC7nAiAKxgbd0vZ+g=`
- [ ] `APP_URL=https://tcc-dashboard-backend.onrender.com`
- [ ] `DB_CONNECTION=pgsql`
- [ ] `DB_HOST=ep-plain-sea-ac72oqv6-pooler.sa-east-1.aws.neon.tech`
- [ ] `DB_PORT=5432`
- [ ] `DB_DATABASE=neondb`
- [ ] `DB_USERNAME=neondb_owner`
- [ ] `DB_PASSWORD=npg_pB0T8dMWFGfK`
- [ ] `DB_SSLMODE=require`
- [ ] `CACHE_STORE=file`
- [ ] `SESSION_DRIVER=cookie`
- [ ] `LOG_LEVEL=info`

### Deploy
- [ ] Clicado em "Create Web Service"
- [ ] Aguardou 5-10 minutos
- [ ] Deploy concluído (aba "Deploys" mostra status)
- [ ] **Copiar URL do backend** (para o frontend usar)

### Teste Backend
- [ ] Acessar https://seu-backend-url/api/login
- [ ] POST com email/senha retorna token ✅

---

## 🌐 Deploy Frontend (Vercel)

### Vercel Setup
- [ ] Conta Vercel criada
- [ ] Conectado ao repositório GitHub

### Criar Projeto
- [ ] "Import Git Repository"
- [ ] Selecionar TCC-DashBoard
- [ ] Framework: Vite
- [ ] Root Directory: `frontend`

### Build Configuration
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install` (default)

### Environment Variables
- [ ] `VITE_API_URL=https://seu-backend-url/api`
  - (Substituir `seu-backend-url` pela URL real do Render)

### Deploy
- [ ] Clicado em "Deploy"
- [ ] Aguardou 2-3 minutos
- [ ] Status: Success ✅
- [ ] **Copiar URL do frontend**

### Teste Frontend
- [ ] Acessar https://seu-frontend-url
- [ ] Página de login aparece ✅
- [ ] Fazer login com admin@dashboard.com / password123 ✅
- [ ] Dashboard carrega com gráficos ✅

---

## 🔐 Banco de Dados (NEON)

### Credenciais (Já Configuradas)
- [ ] Host: `ep-plain-sea-ac72oqv6-pooler.sa-east-1.aws.neon.tech`
- [ ] Port: `5432`
- [ ] Database: `neondb`
- [ ] User: `neondb_owner`
- [ ] Password: `npg_pB0T8dMWFGfK`

### Verificação
- [ ] Migrations rodaram automaticamente no Render ✅
- [ ] Seeders popularam dados ✅
- [ ] 8 alunos no banco ✅
- [ ] 3 usuários de teste ✅
- [ ] 6 disciplinas ✅
- [ ] 12 notas ✅

---

## ✅ Testes de Funcionalidade

### Login
- [ ] Admin login funciona
- [ ] Token é retornado
- [ ] Token pode ser usado em requisições

### Dashboard
- [ ] Página carrega rápido
- [ ] Gráficos aparecem
- [ ] Estatísticas mostram números corretos
- [ ] Menu lateral aparece

### Alunos
- [ ] Lista de alunos carrega
- [ ] Filtro por turma funciona
- [ ] Filtro por nome funciona
- [ ] Combinar filtros funciona
- [ ] Cards de alunos aparecem

### API
- [ ] GET /api/alunos retorna dados ✅
- [ ] GET /api/notas retorna dados ✅
- [ ] GET /api/faltas retorna dados ✅
- [ ] GET /api/disciplinas retorna dados ✅
- [ ] Autenticação com token funciona ✅

---

## 🔧 Monitoramento & Logs

### Render Logs
- [ ] Acessar https://dashboard.render.com
- [ ] Web Service → Logs
- [ ] Nenhum erro visível
- [ ] Health checks passando

### Frontend Logs
- [ ] Abrir DevTools (F12) no navegador
- [ ] Console sem erros vermelhos
- [ ] Network tab mostra requisições para a API

### NEON Logs
- [ ] Acessar https://console.neon.tech
- [ ] Database está online ✅
- [ ] Sem queries com erro

---

## 📊 Performance

- [ ] Backend responde em < 1s
- [ ] Frontend carrega em < 3s
- [ ] Gráficos renderizam rápido
- [ ] Sem erros de timeout

---

## 🎓 Documentação

- [ ] README.md atualizado ✅
- [ ] DEPLOY_RAPIDO.md criado ✅
- [ ] DEPLOY_RENDER.md criado ✅
- [ ] GUIA_TESTE.md criado ✅
- [ ] DIAGRAMA_BANCO_DADOS.md criado ✅
- [ ] ARQUITETURA.md criado ✅

---

## 🚨 Troubleshooting Checklist

Se algo não funcionar:

### Backend não inicia
- [ ] Verificar logs do Render
- [ ] Confirmar variáveis de ambiente
- [ ] Confirmar DB_SSLMODE=require
- [ ] Testar comandos artisan localmente

### Frontend não conecta API
- [ ] Verificar VITE_API_URL está correto
- [ ] Verificar CORS no backend
- [ ] Abrir DevTools e ver erro exato
- [ ] Testar API com cURL/Postman

### Migrations não rodaram
- [ ] Verificar build command no Render
- [ ] Ver logs completos do build
- [ ] Testar migration localmente antes

### Dados não aparecem
- [ ] Verificar seeders rodaram
- [ ] Conectar ao NEON e verificar tabelas
- [ ] Verificar se API retorna dados

---

## 📝 Credenciais para Testes

```
ADMIN:
Email: admin@dashboard.com
Senha: password123

PROFESSOR:
Email: joao@dashboard.com
Senha: password123

DATABASE:
Host: ep-plain-sea-ac72oqv6-pooler.sa-east-1.aws.neon.tech
User: neondb_owner
Pass: npg_pB0T8dMWFGfK
Port: 5432
```

---

## 🎉 Finalização

- [ ] Backend respondendo em produção ✅
- [ ] Frontend acessível e funcionando ✅
- [ ] Login funciona ✅
- [ ] Dashboard carrega com dados ✅
- [ ] Dados aparecem corretamente ✅
- [ ] Sem erros em logs ✅

**Projeto pronto para demonstração e apresentação!** 🚀

---

## 📞 Próximos Passos (Opcional)

- [ ] Adicionar domínio customizado
- [ ] Configurar SSL/TLS
- [ ] Backup automático do banco
- [ ] Mais usuários de teste
- [ ] Novas funcionalidades
- [ ] Relatórios em PDF

---

**Data do Deploy:** _________________

**URLs Finais:**
- Backend: ___________________________________
- Frontend: __________________________________
- Database: Automático no NEON

**Status:** ☐ Em desenvolvimento | ☐ Pronto | ☐ Em produção
