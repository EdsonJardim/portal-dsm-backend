const cursoModel = require("../models/cursoModel");

async function listarCursos(req, res) {
  try {
    const cursos = await cursoModel.listarCursos();

    res.json(cursos);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      mensagem: "Erro ao listar cursos."
    });
  }
}

async function buscarCurso(req, res) {
  try {
    const { id } = req.params;

    const curso = await cursoModel.buscarCurso(id);

    if (!curso) {
      return res.status(404).json({
        mensagem: "Curso não encontrado."
      });
    }

    res.json(curso);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      mensagem: "Erro ao buscar curso."
    });
  }
}

async function cadastrarCurso(req, res) {
  try {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
      return res.status(400).json({
        mensagem: "Nome e descrição são obrigatórios."
      });
    }

    const resultado = await cursoModel.adicionarCurso(
      nome,
      descricao
    );

    res.status(201).json({
      mensagem: "Curso cadastrado com sucesso.",
      id: resultado.insertId
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      mensagem: "Erro ao cadastrar curso."
    });
  }
}

async function atualizarCurso(req, res) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
      return res.status(400).json({
        mensagem: "Nome e descrição são obrigatórios."
      });
    }

    const resultado = await cursoModel.atualizarCurso(
      id,
      nome,
      descricao
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Curso não encontrado."
      });
    }

    res.json({
      mensagem: "Curso atualizado com sucesso."
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      mensagem: "Erro ao atualizar curso."
    });
  }
}

async function excluirCurso(req, res) {
  try {
    const { id } = req.params;

    const resultado = await cursoModel.excluirCurso(id);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Curso não encontrado."
      });
    }

    res.json({
      mensagem: "Curso excluído com sucesso."
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      mensagem: "Erro ao excluir curso."
    });
  }
}

module.exports = {
  listarCursos,
  buscarCurso,
  cadastrarCurso,
  atualizarCurso,
  excluirCurso
};