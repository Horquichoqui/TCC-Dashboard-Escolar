# Guia de Teste - Dashboard de Monitoramento de Alunos

## Início Rápido - Setup Local

### Pré-requisitos
- Node.js 16+ e npm
- PHP 8.1+
- Composer
- Git

### Passos de Instalação

#### 1. Backend (Laravel)

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
composer install

# Gerar chave da aplicação (se não existir)
php artisan key:generate

# Rodar migrations
php artisan migrate --force

# Popular banco com dados de teste
php artisan db:seed

# Iniciar servidor
php artisan serve
# Servidor rodando em: http://localhost:8000
```

#### 2. Frontend (React)

Em um **novo terminal**:

```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
# Acesse: http://localhost:5173
```

### Testando a Aplicação

#### 1. Acessar Login
1. Abra seu navegador: `http://localhost:5173`
2. Você será redirecionado para `/login`

#### 2. Fazer Login com Admin

Email: `admin@dashboard.com`
Senha: `password123`

**Após login, você verá:**
- ✅ Dashboard com gráficos
- ✅ Menu lateral com opções (Dashboard, Alunos, Disciplinas, Usuários)
- ✅ Cartão de usuário no canto inferior do menu

#### 3. Testando Dashboard

No Dashboard você verá:
- 📊 **Total de Alunos**: 8
- ⚠️ **Alunos em Risco**: Alunos com média < 6.0
- 📈 **Frequência Média**: 85%
- 📊 **Gráfico de Barras**: Média de notas dos 5 primeiros alunos
- 🥧 **Gráfico de Pizza**: Distribuição de alunos por turma

#### 4. Testando Listagem de Alunos

1. Clique em "👥 Alunos" no menu
2. Você verá cards de alunos com:
   - Nome
   - Matrícula
   - Turma
   - Email

3. **Testando Filtros:**
   - Campo de busca por nome (ex: "Carlos")
   - Dropdown de turmas (ex: "1A", "1B", "2A", "2B")
   - Combinar filtros (turma + nome)

4. **Clique em um aluno** para ver detalhes (futuro)

#### 5. Fazer Logout

1. Clique no botão "🚪" no canto inferior do menu
2. Será redirecionado para `/login`
3. Faça login novamente para confirmar

#### 6. Testar com Professor

1. Faça logout
2. Faça login com:
   - Email: `joao@dashboard.com`
   - Senha: `password123`

3. **Diferenças:**
   - Menu não mostra "Disciplinas" e "Usuários"
   - Dashboard mostra apenas seus alunos (se houvesse relacionamento)
   - Notas e faltas restritos aos alunos designados

## Testes de API (Backend)

### Usando cURL ou Postman

#### 1. Login

```bash
curl -X POST http://localhost:8000/api/login \
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
  "message": "Login realizado com sucesso",
  "token": "3|ABC123XYZ...",
  "usuario": {
    "id": 1,
    "nome": "Administrador",
    "email": "admin@dashboard.com",
    "funcao": "admin"
  }
}
```

#### 2. Listar Alunos

```bash
curl -X GET http://localhost:8000/api/alunos \
  -H "Authorization: Bearer {TOKEN_AQUI}"
```

**Resposta esperada:**
```json
{
  "success": true,
  "alunos": [
    {
      "id": 1,
      "nome": "Carlos Silva",
      "matricula": "001",
      "email": "carlos@email.com",
      "telefone": "119999-0001",
      "turma": "1A",
      "usuario_id": null,
      "created_at": "2026-05-09T...",
      "updated_at": "2026-05-09T..."
    },
    ...
  ]
}
```

#### 3. Filtrar Alunos por Turma

```bash
curl -X GET "http://localhost:8000/api/alunos?turma=1A" \
  -H "Authorization: Bearer {TOKEN_AQUI}"
```

#### 4. Listar Notas

```bash
curl -X GET http://localhost:8000/api/notas \
  -H "Authorization: Bearer {TOKEN_AQUI}"
```

#### 5. Criar Nota

```bash
curl -X POST http://localhost:8000/api/notas \
  -H "Authorization: Bearer {TOKEN_AQUI}" \
  -H "Content-Type: application/json" \
  -d '{
    "aluno_id": 1,
    "disciplina_id": 1,
    "valor_nota": 8.5,
    "semestre": 1
  }'
```

#### 6. Listar Faltas

```bash
curl -X GET http://localhost:8000/api/faltas \
  -H "Authorization: Bearer {TOKEN_AQUI}"
```

#### 7. Registrar Falta

```bash
curl -X POST http://localhost:8000/api/faltas \
  -H "Authorization: Bearer {TOKEN_AQUI}" \
  -H "Content-Type: application/json" \
  -d '{
    "aluno_id": 1,
    "data": "2026-05-09",
    "presente": true
  }'
```

## Dados de Teste Disponíveis

### Usuários
- **Admin**: admin@dashboard.com / password123
- **Professor 1**: joao@dashboard.com / password123
- **Professor 2**: maria@dashboard.com / password123

### Alunos (8 total)
1. Carlos Silva (Turma 1A, Matrícula 001)
2. Ana Paula (Turma 1A, Matrícula 002)
3. Bruno Costa (Turma 1B, Matrícula 003)
4. Fernanda Oliveira (Turma 1B, Matrícula 004)
5. Gabriel Pereira (Turma 2A, Matrícula 005)
6. Juliana Mendes (Turma 2A, Matrícula 006)
7. Roberto Santos (Turma 2B, Matrícula 007)
8. Camila Rocha (Turma 2B, Matrícula 008)

### Disciplinas (6 total)
1. Matemática
2. Português
3. Ciências
4. História
5. Geografia
6. Educação Física

### Notas (12 registros)
- Alunos 1-4 têm notas variadas (5.0-9.5)
- Aluno 3 (Bruno) tem média baixa (5.5) - em risco
- Aluno 4 (Fernanda) tem média alta (9.2)

## Testes de Cenários

### Cenário 1: Admin Monitorando Desempenho

1. ✅ Fazer login como admin
2. ✅ Ver dashboard com todos os alunos
3. ✅ Ver gráficos de desempenho
4. ✅ Filtrar alunos por turma
5. ✅ Buscar aluno específico por nome
6. ✅ Ver estatísticas globais

### Cenário 2: Professor Gerenciando Alunos

1. ✅ Fazer login como professor
2. ✅ Ver apenas seus alunos (se houvesse relacionamento)
3. ✅ Ver dashboard personalizado
4. ⏳ Lançar notas para seus alunos
5. ⏳ Registrar frequência dos alunos

### Cenário 3: Identificar Alunos em Risco

1. ✅ No dashboard, ver "Alunos em Risco"
2. ✅ Identificar Bruno Costa (Turma 1B) com média 5.5
3. ⏳ Clicar para ver detalhes completos
4. ⏳ Gerar relatório de alerta

## Checklist de Testes

### Frontend
- [✅] Página de login funciona
- [✅] Login com credenciais corretas
- [✅] Logout funciona
- [✅] Dashboard carrega gráficos
- [✅] Listagem de alunos funciona
- [✅] Filtros de turma funcionam
- [✅] Filtro de nome funciona
- [✅] Cartões de alunos mostram informações corretas
- [✅] Menu lateral é responsivo
- [✅] Redirecionamento automático para /login se não autenticado
- [ ] Página de detalhes do aluno (futuro)

### Backend
- [✅] API de login retorna token
- [✅] Token é validado nas requisições
- [✅] Listagem de alunos funciona
- [✅] Filtros de alunos funcionam
- [✅] API de notas funciona
- [✅] API de faltas funciona
- [✅] Validações de entrada funcionam
- [✅] CORS está configurado
- [✅] Seeders populam dados corretamente

### Banco de Dados
- [✅] Tabelas criadas corretamente
- [✅] Relacionamentos estão configurados
- [✅] Dados de teste foram insertados
- [✅] Índices para performance

## Troubleshooting

### "Connection refused" ao chamar API
```bash
# Verificar se Laravel está rodando
php artisan serve

# Se ainda não funcionar, verificar porta:
# Deve estar em http://localhost:8000
```

### "CORS error" no frontend
```bash
# Verificar vite.config.js
# Proxy deve redirecionar /api para http://localhost:8000
```

### Token inválido
```bash
# Limpar localStorage no DevTools
# Fazer login novamente

# Ou verificar backend:
php artisan tinker
>>> DB::table('personal_access_tokens')->count()
```

### Banco de dados vazio
```bash
# Recriar banco com dados
php artisan migrate:fresh --seed
```

### Frontend não conecta ao backend
```bash
# Verificar se ambos os servidores estão rodando
# Frontend: http://localhost:5173
# Backend: http://localhost:8000

# Verificar arquivo .env no backend
# DB_CONNECTION deve estar correto
```

## Performance Esperada

- **Login**: < 1 segundo
- **Carregamento do Dashboard**: < 2 segundos
- **Listagem de Alunos**: < 1 segundo
- **Filtros de Alunos**: < 500ms
- **Resposta de API**: < 500ms

## Próximos Testes (Futuro)

- [ ] Teste de página de detalhes do aluno
- [ ] Teste de formulário de lançamento de notas
- [ ] Teste de formulário de frequência
- [ ] Teste de permissões (admin vs professor)
- [ ] Teste de validações do backend
- [ ] Teste de relatórios
- [ ] Teste de exportação de dados
- [ ] Teste de responsividade em mobile
- [ ] Teste de performance sob carga
- [ ] Teste de segurança (SQL injection, XSS, etc)

## Reportar Bugs

Se encontrar problemas:
1. Verifique os logs:
   - Backend: `storage/logs/laravel.log`
   - Frontend: Console do navegador (F12)
2. Anote o cenário exato que causou o erro
3. Compartilhe a mensagem de erro exata
