# 🧪 Como Testar o Deploy em Progresso

## ⏳ Backend Render - EM PROGRESSO

**Status:** Deploy foi disparado há poucos minutos
**Tempo esperado:** 10-15 minutos total

---

## 🔍 Acompanhar o Progresso

### Opção 1: Logs em Tempo Real (Melhor)

```bash
# Acesse o Render Dashboard:
https://dashboard.render.com

# Procure por:
- Nome: "tcc-dashboard-backend"
- Clique em "Logs"
- Você verá o progresso ao vivo
```

Procure por estas mensagens:

```
✅ Primeiro passo: Cloning repository
✅ composer install --no-dev
✅ php artisan key:generate
✅ Running migrations...
✅ Database seeding...
✅ Server started on 0.0.0.0:10000
```

### Opção 2: Testar a API (Quando Estiver Pronto)

```bash
# Test 1: Login
curl https://tcc-dashboard-backend.onrender.com/api/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dashboard.com",
    "senha": "password123"
  }'

# Resposta esperada:
# {
#   "success": true,
#   "token": "ABC123...",
#   "usuario": { ... }
# }
```

Se receber um token ➜ **BACKEND ESTÁ PRONTO** ✅

---

## 🧪 Testes a Fazer Quando Backend Ficar Pronto

### Teste 1: Login Básico

```bash
TOKEN=$(curl -s https://tcc-dashboard-backend.onrender.com/api/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dashboard.com",
    "senha": "password123"
  }' | jq -r '.token')

echo "Token obtido: $TOKEN"
```

✅ Se retornar um token, login funciona!

### Teste 2: Listar Alunos

```bash
curl https://tcc-dashboard-backend.onrender.com/api/alunos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"

# Deve retornar:
# {
#   "success": true,
#   "alunos": [
#     { "id": 1, "nome": "Carlos Silva", "matricula": "001", ... },
#     { "id": 2, "nome": "Ana Paula", "matricula": "002", ... },
#     ...
#   ]
# }
```

✅ Se retornar 8 alunos, banco funciona!

### Teste 3: Listar Notas

```bash
curl https://tcc-dashboard-backend.onrender.com/api/notas \
  -H "Authorization: Bearer $TOKEN"

# Deve retornar 12 notas de teste
```

✅ Se retornar 12 notas, tudo ok!

### Teste 4: Listar Disciplinas

```bash
curl https://tcc-dashboard-backend.onrender.com/api/disciplinas \
  -H "Authorization: Bearer $TOKEN"

# Deve retornar 6 disciplinas
```

✅ Se retornar 6 disciplinas, dados ok!

---

## 📊 Checklist de Testes

```
API Backend:
[ ] GET    /api/login          - Login funciona?
[ ] GET    /api/alunos         - 8 alunos retornam?
[ ] GET    /api/notas          - 12 notas retornam?
[ ] GET    /api/faltas         - Faltas retornam?
[ ] GET    /api/disciplinas    - 6 disciplinas retornam?
[ ] GET    /api/me             - Dados do usuário?

Performance:
[ ] Resposta < 1 segundo?
[ ] Sem erros de CORS?
[ ] Sem 500 errors?

Banco de Dados:
[ ] 8 alunos cadastrados?
[ ] 3 usuários cadastrados?
[ ] 6 disciplinas cadastradas?
[ ] 12 notas cadastradas?
```

---

## 🚨 Se Demorar Muito (> 15 minutos)

1. **Verifique os logs:**
   - Render Dashboard → Logs
   - Procure por erros em VERMELHO

2. **Erros comuns:**
   - `Composer install failed` → Dependências
   - `Migration failed` → Banco de dados
   - `Connection refused` → NEON não acessível

3. **Solução:**
   - Veja `DEPLOY_RENDER.md` (troubleshooting)
   - Pode precisar redeplorar

---

## 🎯 Próximo Passo: Frontend

Quando backend estiver pronto ✅:

1. **Acesse Vercel:**
   https://vercel.com

2. **Importar Projeto:**
   - "Import Project"
   - Selecione seu repositório GitHub
   - Root: `frontend`
   - Build: `npm run build`

3. **Variáveis de Ambiente:**
   ```
   VITE_API_URL=https://tcc-dashboard-backend.onrender.com/api
   ```

4. **Deploy:**
   - Clique "Deploy"
   - Aguarde 2-3 minutos

---

## 🎉 Teste Completo

Quando ambos estiverem prontos:

1. **Acesse Frontend:**
   ```
   https://tcc-dashboard-xxx.vercel.app
   ```

2. **Faça Login:**
   - Email: `admin@dashboard.com`
   - Senha: `password123`

3. **Verifique:**
   - Dashboard carrega ✓
   - Gráficos aparecem ✓
   - Menu funciona ✓
   - Listagem de alunos ✓
   - Logout funciona ✓

---

## 📞 Suporte Rápido

| Problema | Solução |
|----------|---------|
| Backend não responde | Aguarde 15 min, check logs |
| CORS error | Verifique VITE_API_URL |
| Banco vazio | Verifique migrations nos logs |
| Login falha | Credenciais: admin@/password123 |
| Token inválido | Faça login novamente |

---

## 📱 URLs para Copiar

**Backend API:**
```
https://tcc-dashboard-backend.onrender.com/api
```

**Frontend (após deploy):**
```
https://tcc-dashboard-frontend.vercel.app
```

**Health Check:**
```
https://tcc-dashboard-backend.onrender.com/up
```

---

**Última atualização:** Deploy disparado há poucos minutos

Volte aqui em 15 minutos para testar! 🚀
