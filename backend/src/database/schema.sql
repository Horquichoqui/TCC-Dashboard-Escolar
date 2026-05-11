-- Schema do banco de dados do Dashboard Pedagógico Coopen
-- Tabelas com nomes em português brasileiro (snake_case, sem acentos)

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  perfil VARCHAR(30) NOT NULL DEFAULT 'coordenacao',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS turmas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  ano_letivo INT NOT NULL,
  turno VARCHAR(30),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alunos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  matricula VARCHAR(50) UNIQUE,
  turma_id INT REFERENCES turmas(id) ON DELETE SET NULL,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS disciplinas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS periodos_letivos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  ano_letivo INT NOT NULL,
  data_inicio DATE,
  data_fim DATE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notas (
  id SERIAL PRIMARY KEY,
  aluno_id INT NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
  disciplina_id INT NOT NULL REFERENCES disciplinas(id) ON DELETE CASCADE,
  periodo_id INT REFERENCES periodos_letivos(id) ON DELETE SET NULL,
  nota NUMERIC(5,2) NOT NULL CHECK (nota >= 0 AND nota <= 10),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS frequencias (
  id SERIAL PRIMARY KEY,
  aluno_id INT NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
  disciplina_id INT REFERENCES disciplinas(id) ON DELETE SET NULL,
  periodo_id INT REFERENCES periodos_letivos(id) ON DELETE SET NULL,
  total_aulas INT NOT NULL DEFAULT 0,
  total_presencas INT NOT NULL DEFAULT 0,
  percentual_frequencia NUMERIC(5,2),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS integracoes_sponte (
  id SERIAL PRIMARY KEY,
  origem VARCHAR(50) NOT NULL DEFAULT 'sponte',
  status VARCHAR(50) NOT NULL DEFAULT 'pendente',
  ultima_sincronizacao TIMESTAMP,
  mensagem TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_alunos_turma_id ON alunos(turma_id);
CREATE INDEX IF NOT EXISTS idx_turmas_ano_letivo ON turmas(ano_letivo);
CREATE INDEX IF NOT EXISTS idx_notas_aluno_id ON notas(aluno_id);
CREATE INDEX IF NOT EXISTS idx_notas_disciplina_id ON notas(disciplina_id);
CREATE INDEX IF NOT EXISTS idx_frequencias_aluno_id ON frequencias(aluno_id);
