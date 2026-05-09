# Diagrama de Relacionamento - Banco de Dados

## Diagrama ER (Entity-Relationship)

```
┌──────────────────────┐
│     USUARIOS         │
├──────────────────────┤
│ id (PK)              │
│ nome                 │
│ email (UNIQUE)       │
│ senha                │
│ funcao (admin/prof)  │
│ created_at           │
│ updated_at           │
└──────────┬───────────┘
           │
           │ 1 : N
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌─────────────┐  ┌──────────────────────┐
│   ALUNOS    │  │ PROFESSOR_ALUNOS     │
├─────────────┤  ├──────────────────────┤
│ id (PK)     │  │ id (PK)              │
│ nome        │  │ professor_id (FK)    │
│ matricula   │  │ aluno_id (FK)        │
│ email       │  │ created_at           │
│ telefone    │  │ updated_at           │
│ turma       │  │ UNIQUE(prof, aluno)  │
│ usuario_id  │  └──────────────────────┘
│ created_at  │           ▲
│ updated_at  │           │ N : 1
└──────┬──────┘           │
       │                  │
       │ 1 : N    ┌───────┘
       │          │
       ▼          │
   ┌──────────────┴──────┐
   │                     │
   │                     │
   ▼                     ▼
┌──────────────┐  ┌────────────────────┐
│    NOTAS     │  │      FALTAS        │
├──────────────┤  ├────────────────────┤
│ id (PK)      │  │ id (PK)            │
│ aluno_id (FK)│  │ aluno_id (FK)      │
│ disciplina   │  │ data               │
│  _id (FK)    │  │ presente (boolean) │
│ valor_nota   │  │ created_at         │
│ semestre     │  │ updated_at         │
│ created_at   │  └────────────────────┘
│ updated_at   │
└──────┬───────┘
       │
       │ N : 1
       │
       ▼
┌──────────────────┐
│   DISCIPLINAS    │
├──────────────────┤
│ id (PK)          │
│ nome             │
│ descricao        │
│ created_at       │
│ updated_at       │
└──────────────────┘
```

## Descrição das Tabelas

### USUARIOS
Armazena informações dos usuários do sistema (admin e professores).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | Identificador único |
| nome | VARCHAR | Nome completo do usuário |
| email | VARCHAR (UNIQUE) | Email único para login |
| senha | VARCHAR | Senha criptografada (bcrypt) |
| funcao | ENUM | admin ou professor |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data da última atualização |

### ALUNOS
Informações dos alunos monitorados no sistema.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | Identificador único |
| nome | VARCHAR | Nome do aluno |
| matricula | VARCHAR (UNIQUE) | Número de matrícula |
| email | VARCHAR (NULLABLE) | Email do aluno |
| telefone | VARCHAR (NULLABLE) | Telefone para contato |
| turma | VARCHAR | Identificação da turma (ex: 1A, 2B) |
| usuario_id | INT (FK) | Referência a USUARIOS (opcional) |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data da última atualização |

### DISCIPLINAS
Disciplinas disponíveis no sistema.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | Identificador único |
| nome | VARCHAR | Nome da disciplina |
| descricao | TEXT (NULLABLE) | Descrição da disciplina |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data da última atualização |

### NOTAS
Registros de notas dos alunos por disciplina.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | Identificador único |
| aluno_id | INT (FK) | Referência a ALUNOS |
| disciplina_id | INT (FK) | Referência a DISCIPLINAS |
| valor_nota | DECIMAL(5,2) | Valor da nota (0-10) |
| semestre | INT | Semestre/período da nota |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data da última atualização |

### FALTAS
Registros de frequência/assiduidade dos alunos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | Identificador único |
| aluno_id | INT (FK) | Referência a ALUNOS |
| data | DATE | Data do registro |
| presente | BOOLEAN | true = presente, false = falta |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data da última atualização |

### PROFESSOR_ALUNOS
Relacionamento entre professores e seus alunos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | Identificador único |
| professor_id | INT (FK) | Referência a USUARIOS (role=professor) |
| aluno_id | INT (FK) | Referência a ALUNOS |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data da última atualização |
| UNIQUE | (professor_id, aluno_id) | Garante relacionamento único |

## Relacionamentos

### 1. USUARIOS → ALUNOS (1:N)
- Um usuário pode ter múltiplos alunos
- ON DELETE SET NULL (se usuário deletado, alunos não são afetados)

### 2. USUARIOS → PROFESSOR_ALUNOS (1:N)
- Um professor pode estar relacionado a múltiplos alunos
- ON DELETE CASCADE (se professor deletado, relacionamento removido)

### 3. ALUNOS → PROFESSOR_ALUNOS (1:N)
- Um aluno pode estar relacionado a múltiplos professores
- ON DELETE CASCADE (se aluno deletado, relacionamento removido)

### 4. ALUNOS → NOTAS (1:N)
- Um aluno pode ter múltiplas notas
- ON DELETE CASCADE (se aluno deletado, notas removidas)

### 5. ALUNOS → FALTAS (1:N)
- Um aluno pode ter múltiplos registros de faltas
- ON DELETE CASCADE (se aluno deletado, faltas removidas)

### 6. DISCIPLINAS → NOTAS (1:N)
- Uma disciplina pode ter múltiplas notas registradas
- ON DELETE CASCADE (se disciplina deletada, notas removidas)

## Índices Sugeridos

```sql
-- Para buscas frequentes
CREATE INDEX idx_alunos_turma ON alunos(turma);
CREATE INDEX idx_alunos_matricula ON alunos(matricula);
CREATE INDEX idx_notas_aluno ON notas(aluno_id);
CREATE INDEX idx_notas_disciplina ON notas(disciplina_id);
CREATE INDEX idx_faltas_aluno ON faltas(aluno_id);
CREATE INDEX idx_faltas_data ON faltas(data);
CREATE INDEX idx_professor_alunos_professor ON professor_alunos(professor_id);
```

## Consultas Comuns

### Média de notas de um aluno
```sql
SELECT 
  AVG(valor_nota) as media,
  d.nome as disciplina
FROM notas n
JOIN alunos a ON n.aluno_id = a.id
JOIN disciplinas d ON n.disciplina_id = d.id
WHERE a.id = ?
GROUP BY d.id;
```

### Frequência de um aluno
```sql
SELECT 
  COUNT(*) as total_dias,
  SUM(CASE WHEN presente = true THEN 1 ELSE 0 END) as presentes,
  ROUND(SUM(CASE WHEN presente = true THEN 1 ELSE 0 END)::NUMERIC / 
        COUNT(*) * 100, 2) as percentual_presenca
FROM faltas
WHERE aluno_id = ?;
```

### Alunos em risco (média < 6.0)
```sql
SELECT 
  a.id,
  a.nome,
  a.matricula,
  AVG(n.valor_nota) as media
FROM alunos a
LEFT JOIN notas n ON a.id = n.aluno_id
GROUP BY a.id
HAVING AVG(n.valor_nota) < 6.0
ORDER BY media ASC;
```

### Alunos de um professor
```sql
SELECT DISTINCT
  a.id,
  a.nome,
  a.matricula,
  a.turma
FROM alunos a
JOIN professor_alunos pa ON a.id = pa.aluno_id
WHERE pa.professor_id = ?
ORDER BY a.nome;
```

## Integridade Referencial

- ON DELETE CASCADE: Notas e faltas são deletadas se aluno for deletado
- ON DELETE SET NULL: Relacionamento usuario_id em alunos pode ser nulo
- FOREIGN KEYS garantem consistência dos dados
- UNIQUE constraints previnem duplicatas

## Backup & Restauração

```bash
# Backup do banco (PostgreSQL)
pg_dump -U usuario -h localhost database > backup.sql

# Restaurar backup
psql -U usuario -h localhost database < backup.sql
```
