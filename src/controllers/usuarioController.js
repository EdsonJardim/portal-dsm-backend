const usuarioModel = require("../models/usuarioModel");

async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioModel.listarUsuarios();

    res.json(usuarios);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      mensagem: "Erro ao listar usuários."
    });
  }
}

async function buscarUsuario(req, res) {
  try {
    const { id } = req.params;

    const usuario = await usuarioModel.buscarUsuario(id);

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado."
      });
    }

    res.json(usuario);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      mensagem: "Erro ao buscar usuário."
    });
  }
}

async function cadastrarUsuario(req, res) {
  try {
    const { nome, email, telefone } = req.body;

    if (!nome || !email) {
      return res.status(400).json({
        mensagem: "Nome e e-mail são obrigatórios."
      });
    }

    const resultado = await usuarioModel.adicionarUsuario(
      nome,
      email,
      telefone
    );

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso.",
      id: resultado.insertId
    });
  } catch (erro) {
    console.error(erro);

    if (erro.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        mensagem: "E-mail já cadastrado."
      });
    }

    res.status(500).json({
      mensagem: "Erro ao cadastrar usuário."
    });
  }
}

async function atualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    if (!nome || !email) {
      return res.status(400).json({
        mensagem: "Nome e e-mail são obrigatórios."
      });
    }

    const resultado = await usuarioModel.atualizarUsuario(
      id,
      nome,
      email,
      telefone
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado."
      });
    }

    res.json({
      mensagem: "Usuário atualizado com sucesso."
    });
  } catch (erro) {
    console.error(erro);

    if (erro.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        mensagem: "E-mail já cadastrado."
      });
    }

    res.status(500).json({
      mensagem: "Erro ao atualizar usuário."
    });
  }
}

async function excluirUsuario(req, res) {
  try {
    const { id } = req.params;

    const resultado = await usuarioModel.excluirUsuario(id);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado."
      });
    }

    res.json({
      mensagem: "Usuário excluído com sucesso."
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      mensagem: "Erro ao excluir usuário."
    });
  }
}

module.exports = {
  listarUsuarios,
  buscarUsuario,
  cadastrarUsuario,
  atualizarUsuario,
  excluirUsuario
};