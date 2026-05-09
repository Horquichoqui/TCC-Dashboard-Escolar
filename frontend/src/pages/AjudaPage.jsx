import React, { useState } from 'react';
import '../styles/AjudaPage.css';

export default function AjudaPage() {
  const [secaoAberta, setSecaoAberta] = useState('inicio');

  const secoes = {
    inicio: {
      titulo: '🎓 Bem-vindo ao Dashboard',
      conteudo: (
        <div className="ajuda-content">
          <div className="card-boas-vindas">
            <h2>Olá, Professor!</h2>
            <p>Este sistema foi criado para facilitar o acompanhamento do desempenho dos seus alunos.</p>
            <p><strong>Você consegue:</strong></p>
            <ul>
              <li>📊 Ver o desempenho geral na dashboard</li>
              <li>👥 Consultar informações dos alunos</li>
              <li>📋 Registrar faltas e presenças</li>
              <li>⚠️ Acompanhar alunos em risco</li>
              <li>📈 Visualizar gráficos e relatórios</li>
            </ul>
            <p className="destaque">Navegue pelo menu lateral para acessar cada funcionalidade.</p>
          </div>
        </div>
      )
    },
    dashboard: {
      titulo: '📈 Dashboard - Visão Geral',
      conteudo: (
        <div className="ajuda-content">
          <div className="secao-ajuda">
            <h3>O que é a Dashboard?</h3>
            <p>A dashboard mostra um resumo rápido do desempenho de todos os seus alunos em um só lugar.</p>

            <h4>Você encontra:</h4>
            <div className="card-explicacao">
              <h5>📊 Números Principais</h5>
              <p>• <strong>Total de Alunos:</strong> Quantos alunos você tem</p>
              <p>• <strong>Alunos em Risco:</strong> Quantos precisam de atenção</p>
              <p>• <strong>Frequência Média:</strong> Percentual médio de presença</p>
            </div>

            <div className="card-explicacao">
              <h5>📊 Gráficos</h5>
              <p>• <strong>Gráfico de Barras:</strong> Média de notas de cada aluno</p>
              <p>• <strong>Gráfico de Pizza:</strong> Distribuição de alunos por turma</p>
            </div>

            <p className="dica">💡 <strong>Dica:</strong> Use a dashboard para ter uma visão rápida. Para detalhes, acesse as outras seções.</p>
          </div>
        </div>
      )
    },
    alunos: {
      titulo: '👥 Listagem de Alunos',
      conteudo: (
        <div className="ajuda-content">
          <div className="secao-ajuda">
            <h3>Como Encontrar Alunos?</h3>

            <div className="card-explicacao">
              <h5>🔍 Filtros Disponíveis</h5>
              <p><strong>Buscar por Nome:</strong> Digite o nome do aluno para procurar</p>
              <p><strong>Filtrar por Turma:</strong> Selecione uma turma específica</p>
              <p><strong>Combinar Filtros:</strong> Use nome E turma juntos</p>
            </div>

            <div className="card-explicacao">
              <h5>📋 Informações Exibidas</h5>
              <p>Cada aluno mostra:</p>
              <ul>
                <li>Nome completo</li>
                <li>Número de matrícula</li>
                <li>Turma/série</li>
                <li>Email (se disponível)</li>
              </ul>
            </div>

            <p className="dica">💡 <strong>Dica:</strong> Clique em um aluno para ver mais detalhes (em desenvolvimento).</p>
          </div>
        </div>
      )
    },
    faltas: {
      titulo: '📋 Registrar Faltas e Presença',
      conteudo: (
        <div className="ajuda-content">
          <div className="secao-ajuda">
            <h3>Como Registrar Faltas?</h3>

            <div className="passo">
              <h4>Passo 1: Escolha o Bimestre</h4>
              <p>Selecione qual bimestre você está registrando (1º, 2º, 3º ou 4º)</p>
            </div>

            <div className="passo">
              <h4>Passo 2: Escolha o Ano</h4>
              <p>Confirme o ano letivo correto</p>
            </div>

            <div className="passo">
              <h4>Passo 3: Selecione o Aluno</h4>
              <p>Clique no botão "Lançar Falta" do aluno que você quer registrar</p>
            </div>

            <div className="passo">
              <h4>Passo 4: Preencha a Data</h4>
              <p>Escolha a data da aula (clique no campo de data)</p>
            </div>

            <div className="passo">
              <h4>Passo 5: Marque Presente ou Falta</h4>
              <p>• <strong>✓ Presente:</strong> Aluno estava presente</p>
              <p>• <strong>✕ Falta:</strong> Aluno estava ausente</p>
            </div>

            <div className="passo">
              <h4>Passo 6: Confirme</h4>
              <p>Clique em "Confirmar Lançamento"</p>
            </div>

            <div className="card-importante">
              <h4>⚠️ O que é Dias Letivos?</h4>
              <p>É a quantidade total de aulas no bimestre. O sistema usa isso para calcular automaticamente o percentual de presença do aluno.</p>
              <p><strong>Exemplo:</strong> Se há 50 dias letivos e o aluno faltou 5 aulas, sua presença é: (50-5)/50 = 90%</p>
            </div>

            <p className="dica">💡 <strong>Dica:</strong> Registre as faltas regularmente para manter o sistema atualizado.</p>
          </div>
        </div>
      )
    },
    risco: {
      titulo: '⚠️ Alunos em Risco',
      conteudo: (
        <div className="ajuda-content">
          <div className="secao-ajuda">
            <h3>O Que Significa "Em Risco"?</h3>

            <p>Um aluno entra em <strong>"Risco"</strong> quando:</p>

            <div className="card-condicao">
              <h4>📚 Nota Baixa</h4>
              <p>Quando a média de notas fica <strong>abaixo de 5.0</strong></p>
              <p className="indicador">Ícone: 📚</p>
            </div>

            <div className="card-condicao">
              <h4>📅 Muitas Faltas</h4>
              <p>Quando a frequência fica <strong>abaixo de 75%</strong></p>
              <p className="indicador">Ícone: 📅</p>
            </div>

            <div className="card-condicao">
              <h4>🔴 Crítico</h4>
              <p>Quando o aluno tem <strong>NOTA BAIXA E MUITAS FALTAS</strong> ao mesmo tempo</p>
              <p className="indicador">Ícone: 🔴</p>
            </div>

            <div className="card-importante">
              <h4>O Que Fazer?</h4>
              <ul>
                <li>📞 Entre em contato com o aluno</li>
                <li>👥 Converse com os pais/responsáveis</li>
                <li>📝 Registre as ações tomadas</li>
                <li>📊 Acompanhe a evolução no dashboard</li>
                <li>🔄 Revise regularmente (semanalmente)</li>
              </ul>
            </div>

            <p className="dica">💡 <strong>Dica:</strong> Verifique a aba "Alunos em Risco" pelo menos uma vez por semana.</p>
          </div>
        </div>
      )
    },
    relatorios: {
      titulo: '📊 Relatórios e Gráficos',
      conteudo: (
        <div className="ajuda-content">
          <div className="secao-ajuda">
            <h3>Entendendo os Gráficos</h3>

            <div className="card-grafico">
              <h4>📊 Gráfico de Notas</h4>
              <p><strong>O que mostra:</strong> Média de notas de cada turma</p>
              <p><strong>Como ler:</strong> Quanto mais alta a barra, melhor a média de notas</p>
              <p><strong>O que fazer:</strong> Se uma turma está com média baixa, invista em aulas de reforço</p>
            </div>

            <div className="card-grafico">
              <h4>📋 Gráfico de Presença</h4>
              <p><strong>O que mostra:</strong> Percentual médio de frequência por turma</p>
              <p><strong>Como ler:</strong> Quanto mais alta a barra, melhor a frequência</p>
              <p><strong>Meta:</strong> Manter acima de 85% é o ideal</p>
            </div>

            <div className="card-grafico">
              <h4>👥 Gráfico de Distribuição</h4>
              <p><strong>O que mostra:</strong> Quantos alunos estão normais vs em risco</p>
              <p><strong>Como ler:</strong> Verde = Ok | Vermelho = Precisam de atenção</p>
            </div>

            <div className="card-grafico">
              <h4>⚖️ Comparativo</h4>
              <p><strong>O que mostra:</strong> Como andam as notas e a frequência lado a lado</p>
              <p><strong>Como ler:</strong> Veja se há correlação: alunos com faltas têm piores notas?</p>
            </div>

            <p className="dica">💡 <strong>Dica:</strong> Use os gráficos em reuniões com a direção ou pais.</p>
          </div>
        </div>
      )
    },
    duvidas: {
      titulo: '❓ Dúvidas Frequentes',
      conteudo: (
        <div className="ajuda-content">
          <div className="secao-ajuda">

            <div className="faq-item">
              <h4>P: Como mudo minha senha?</h4>
              <p>R: Clique no seu nome no canto inferior esquerdo da barra lateral.</p>
            </div>

            <div className="faq-item">
              <h4>P: Posso editar uma falta que lançei errado?</h4>
              <p>R: Sim! Volte à página de Faltas e clique novamente na data para editar.</p>
            </div>

            <div className="faq-item">
              <h4>P: O que fazer se um aluno aparece em risco mas não é?</h4>
              <p>R: Verifique as notas e faltas registradas. Se estiverem erradas, corrija-as.</p>
            </div>

            <div className="faq-item">
              <h4>P: Os dados são salvos automaticamente?</h4>
              <p>R: Sim! Assim que você clica em "Confirmar", os dados são salvos automaticamente.</p>
            </div>

            <div className="faq-item">
              <h4>P: Posso acessar de um tablet ou celular?</h4>
              <p>R: Sim! O sistema funciona em qualquer dispositivo com navegador (Chrome, Firefox, Safari, Edge).</p>
            </div>

            <div className="faq-item">
              <h4>P: Como faço backup dos dados?</h4>
              <p>R: Os dados estão seguros na nuvem. Você pode exportar relatórios em PDF.</p>
            </div>

            <div className="faq-item">
              <h4>P: Posso ver alunos de outra turma?</h4>
              <p>R: Sim! Você consegue filtrar por turma na listagem de alunos.</p>
            </div>

            <div className="card-importante">
              <h4>Não encontrou sua dúvida?</h4>
              <p>Entre em contato com o suporte técnico da escola.</p>
              <p><strong>Email:</strong> suporte@novohorizonte.edu.br</p>
              <p><strong>Telefone:</strong> (XX) XXXX-XXXX</p>
            </div>
          </div>
        </div>
      )
    }
  };

  const menuAjuda = [
    { id: 'inicio', label: '🎓 Início', emoji: '🏠' },
    { id: 'dashboard', label: '📈 Dashboard', emoji: '📊' },
    { id: 'alunos', label: '👥 Alunos', emoji: '👥' },
    { id: 'faltas', label: '📋 Faltas', emoji: '📋' },
    { id: 'risco', label: '⚠️ Em Risco', emoji: '⚠️' },
    { id: 'relatorios', label: '📊 Relatórios', emoji: '📊' },
    { id: 'duvidas', label: '❓ FAQ', emoji: '❓' }
  ];

  return (
    <div className="ajuda-container">
      <div className="ajuda-header">
        <h1>📚 Central de Ajuda</h1>
        <p>Tudo que você precisa saber para usar o sistema</p>
      </div>

      <div className="ajuda-layout">
        <aside className="ajuda-sidebar">
          <nav className="ajuda-menu">
            {menuAjuda.map(item => (
              <button
                key={item.id}
                className={`ajuda-menu-item ${secaoAberta === item.id ? 'ativo' : ''}`}
                onClick={() => setSecaoAberta(item.id)}
              >
                <span className="emoji">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="ajuda-main">
          <div className="ajuda-secao">
            <h2>{secoes[secaoAberta].titulo}</h2>
            {secoes[secaoAberta].conteudo}
          </div>
        </main>
      </div>

      <div className="ajuda-footer">
        <p>💡 <strong>Navegação:</strong> Use o menu à esquerda para explorar todos os tópicos</p>
        <p>🎯 <strong>Seu objetivo:</strong> Entender o sistema para acompanhar melhor o desempenho dos alunos</p>
      </div>
    </div>
  );
}
