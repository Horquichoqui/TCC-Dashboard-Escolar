// Script de seed: insere dados de demonstração para o TCC
// Verifica se dados já existem antes de inserir (evita duplicação)
import "dotenv/config";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";

async function seed() {
  console.log("🌱 Iniciando inserção de dados de demonstração...");

  try {
    // --- USUÁRIO INICIAL ---
    const userExists = await pool.query("SELECT id FROM usuarios WHERE email = $1", ["coordenacao@coopen.com"]);
    if (userExists.rows.length === 0) {
      const senhaHash = await bcrypt.hash("123456", 10);
      await pool.query(
        "INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES ($1, $2, $3, $4)",
        ["Coordenação Pedagógica", "coordenacao@coopen.com", senhaHash, "coordenacao"]
      );
      console.log("✅ Usuário criado: coordenacao@coopen.com / 123456");
    } else {
      console.log("ℹ️  Usuário já existe, pulando.");
    }

    // --- TURMAS ---
    const turmasExist = await pool.query("SELECT id FROM turmas LIMIT 1");
    let turmaIds = [];
    if (turmasExist.rows.length === 0) {
      const turmas = [
        { nome: "1º Ano A", ano_letivo: 2024, turno: "Manhã" },
        { nome: "2º Ano B", ano_letivo: 2024, turno: "Tarde" },
        { nome: "3º Ano C", ano_letivo: 2024, turno: "Manhã" },
      ];
      for (const t of turmas) {
        const r = await pool.query(
          "INSERT INTO turmas (nome, ano_letivo, turno) VALUES ($1, $2, $3) RETURNING id",
          [t.nome, t.ano_letivo, t.turno]
        );
        turmaIds.push(r.rows[0].id);
      }
      console.log("✅ Turmas criadas.");
    } else {
      const r = await pool.query("SELECT id FROM turmas ORDER BY id");
      turmaIds = r.rows.map((t) => t.id);
      console.log("ℹ️  Turmas já existem, pulando.");
    }

    // --- DISCIPLINAS ---
    const discExist = await pool.query("SELECT id FROM disciplinas LIMIT 1");
    let discIds = [];
    if (discExist.rows.length === 0) {
      const disciplinas = ["Matemática", "Português", "Ciências", "História"];
      for (const nome of disciplinas) {
        const r = await pool.query("INSERT INTO disciplinas (nome) VALUES ($1) RETURNING id", [nome]);
        discIds.push(r.rows[0].id);
      }
      console.log("✅ Disciplinas criadas.");
    } else {
      const r = await pool.query("SELECT id FROM disciplinas ORDER BY id");
      discIds = r.rows.map((d) => d.id);
      console.log("ℹ️  Disciplinas já existem, pulando.");
    }

    // --- PERÍODOS LETIVOS ---
    const perExist = await pool.query("SELECT id FROM periodos_letivos LIMIT 1");
    let perIds = [];
    if (perExist.rows.length === 0) {
      const periodos = [
        { nome: "1º Bimestre", ano_letivo: 2024, data_inicio: "2024-02-01", data_fim: "2024-04-30" },
        { nome: "2º Bimestre", ano_letivo: 2024, data_inicio: "2024-05-01", data_fim: "2024-07-15" },
        { nome: "3º Bimestre", ano_letivo: 2024, data_inicio: "2024-08-01", data_fim: "2024-10-15" },
        { nome: "4º Bimestre", ano_letivo: 2024, data_inicio: "2024-10-16", data_fim: "2024-12-15" },
      ];
      for (const p of periodos) {
        const r = await pool.query(
          "INSERT INTO periodos_letivos (nome, ano_letivo, data_inicio, data_fim) VALUES ($1, $2, $3, $4) RETURNING id",
          [p.nome, p.ano_letivo, p.data_inicio, p.data_fim]
        );
        perIds.push(r.rows[0].id);
      }
      console.log("✅ Períodos letivos criados.");
    } else {
      const r = await pool.query("SELECT id FROM periodos_letivos ORDER BY id");
      perIds = r.rows.map((p) => p.id);
      console.log("ℹ️  Períodos já existem, pulando.");
    }

    // --- ALUNOS ---
    const alunosExist = await pool.query("SELECT id FROM alunos LIMIT 1");
    if (alunosExist.rows.length === 0) {
      // Alunos com diferentes situações para demonstração
      const alunos = [
        // Turma 1 - mix de situações
        { nome: "Ana Paula Silva", matricula: "2024001", turma_id: turmaIds[0] },
        { nome: "Bruno Costa Santos", matricula: "2024002", turma_id: turmaIds[0] },
        { nome: "Carlos Eduardo Lima", matricula: "2024003", turma_id: turmaIds[0] },
        { nome: "Daniela Ferreira", matricula: "2024004", turma_id: turmaIds[0] },
        { nome: "Eduardo Martins", matricula: "2024005", turma_id: turmaIds[0] },
        // Turma 2
        { nome: "Fernanda Oliveira", matricula: "2024006", turma_id: turmaIds[1] },
        { nome: "Gabriel Souza", matricula: "2024007", turma_id: turmaIds[1] },
        { nome: "Helena Rodrigues", matricula: "2024008", turma_id: turmaIds[1] },
        { nome: "Igor Pereira", matricula: "2024009", turma_id: turmaIds[1] },
        { nome: "Julia Almeida", matricula: "2024010", turma_id: turmaIds[1] },
        // Turma 3
        { nome: "Kevin Nascimento", matricula: "2024011", turma_id: turmaIds[2] },
        { nome: "Larissa Cunha", matricula: "2024012", turma_id: turmaIds[2] },
        { nome: "Marcos Vieira", matricula: "2024013", turma_id: turmaIds[2] },
        { nome: "Natalia Barbosa", matricula: "2024014", turma_id: turmaIds[2] },
        { nome: "Otávio Gomes", matricula: "2024015", turma_id: turmaIds[2] },
      ];

      const alunoIds = [];
      for (const a of alunos) {
        const r = await pool.query(
          "INSERT INTO alunos (nome, matricula, turma_id) VALUES ($1, $2, $3) RETURNING id",
          [a.nome, a.matricula, a.turma_id]
        );
        alunoIds.push(r.rows[0].id);
      }
      console.log("✅ Alunos criados.");

      // --- NOTAS e FREQUÊNCIAS ---
      // Definir perfis de desempenho para cada aluno
      // Regular: média >= 7 e frequência > 80
      // Atenção: média entre 6 e 7, ou frequência entre 75 e 80
      // Risco: média < 6 ou frequência < 75
      const perfis = [
        { media: 8.5, freq: 92 }, // Regular
        { media: 7.2, freq: 88 }, // Regular
        { media: 6.3, freq: 78 }, // Atenção
        { media: 5.1, freq: 65 }, // Risco
        { media: 4.0, freq: 72 }, // Risco
        { media: 9.0, freq: 95 }, // Regular
        { media: 7.8, freq: 85 }, // Regular
        { media: 6.5, freq: 79 }, // Atenção
        { media: 5.8, freq: 80 }, // Atenção
        { media: 3.5, freq: 60 }, // Risco
        { media: 8.0, freq: 90 }, // Regular
        { media: 7.5, freq: 82 }, // Regular
        { media: 6.1, freq: 76 }, // Atenção
        { media: 5.0, freq: 70 }, // Risco
        { media: 8.8, freq: 93 }, // Regular
      ];

      for (let i = 0; i < alunoIds.length; i++) {
        const alunoId = alunoIds[i];
        const perfil = perfis[i];

        // Inserir notas por disciplina e período com variação em torno da média do perfil
        for (const discId of discIds) {
          for (const perId of perIds) {
            const variacao = (Math.random() - 0.5) * 2;
            const nota = Math.min(10, Math.max(0, perfil.media + variacao));
            await pool.query(
              "INSERT INTO notas (aluno_id, disciplina_id, periodo_id, nota) VALUES ($1, $2, $3, $4)",
              [alunoId, discId, perId, nota.toFixed(2)]
            );
          }

          // Inserir frequência por disciplina
          const totalAulas = 40;
          const totalPresencas = Math.round((perfil.freq / 100) * totalAulas);
          const percentual = (totalPresencas / totalAulas) * 100;
          await pool.query(
            "INSERT INTO frequencias (aluno_id, disciplina_id, periodo_id, total_aulas, total_presencas, percentual_frequencia) VALUES ($1, $2, $3, $4, $5, $6)",
            [alunoId, discId, perIds[perIds.length - 1], totalAulas, totalPresencas, percentual.toFixed(2)]
          );
        }
      }

      console.log("✅ Notas e frequências inseridas.");
    } else {
      console.log("ℹ️  Alunos já existem, pulando notas e frequências.");
    }

    // --- INTEGRAÇÃO SPONTE ---
    const integExist = await pool.query("SELECT id FROM integracoes_sponte LIMIT 1");
    if (integExist.rows.length === 0) {
      await pool.query(
        "INSERT INTO integracoes_sponte (origem, status, mensagem) VALUES ($1, $2, $3)",
        ["neon", "ativo", "Dados carregados via banco Neon. Integração com API Sponte prevista para versão futura."]
      );
      console.log("✅ Registro de integração criado.");
    }

    console.log("\n🎉 Seed concluído! Sistema pronto para demonstração.");
    console.log("   Login: coordenacao@coopen.com | Senha: 123456");
  } catch (error) {
    console.error("❌ Erro no seed:", error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
