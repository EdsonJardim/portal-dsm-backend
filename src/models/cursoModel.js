const pool = require("../config/database");

async function listarCursos() {
  const [linhas] = await pool.query(
    "SELECT * FROM cursos ORDER BY id"
  );

  return linhas;
}

async function buscarCurso(id) {
  const [linhas] = await pool.query(
    "SELECT * FROM cursos WHERE id = ?",
    [id]
  );

  return linhas[0];
}

async function adicionarCurso(nome, descricao) {
  const [resultado] = await pool.query(
    "INSERT INTO cursos (nome, descricao) VALUES (?, ?)",
    [nome, descricao]
  );

  return resultado;
}

async function atualizarCurso(id, nome, descricao) {
  const [resultado] = await pool.query(
    `UPDATE cursos
     SET nome = ?, descricao = ?
     WHERE id = ?`,
    [nome, descricao, id]
  );

  return resultado;
}

async function excluirCurso(id) {
  const [resultado] = await pool.query(
    "DELETE FROM cursos WHERE id = ?",
    [id]
  );

  return resultado;
}

module.exports = {
  listarCursos,
  buscarCurso,
  adicionarCurso,
  atualizarCurso,
  excluirCurso
};