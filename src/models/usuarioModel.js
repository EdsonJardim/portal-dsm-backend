const pool = require("../config/database");

async function listarUsuarios() {
  const [linhas] = await pool.query(
    "SELECT * FROM usuarios ORDER BY id"
  );

  return linhas;
}

async function buscarUsuario(id) {
  const [linhas] = await pool.query(
    "SELECT * FROM usuarios WHERE id = ?",
    [id]
  );

  return linhas[0];
}

async function adicionarUsuario(nome, email, telefone) {
  const [resultado] = await pool.query(
    "INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?)",
    [nome, email, telefone]
  );

  return resultado;
}

async function atualizarUsuario(
  id,
  nome,
  email,
  telefone
) {
  const [resultado] = await pool.query(
    `UPDATE usuarios
     SET nome = ?, email = ?, telefone = ?
     WHERE id = ?`,
    [nome, email, telefone, id]
  );

  return resultado;
}

async function excluirUsuario(id) {
  const [resultado] = await pool.query(
    "DELETE FROM usuarios WHERE id = ?",
    [id]
  );

  return resultado;
}

module.exports = {
  listarUsuarios,
  buscarUsuario,
  adicionarUsuario,
  atualizarUsuario,
  excluirUsuario
};