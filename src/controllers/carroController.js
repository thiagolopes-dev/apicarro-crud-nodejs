const CarroService = require("../services/CarroService");

module.exports = {
  buscarTodos: async (req, res) => {
    let json = { error: "", result: [] };

    try {
      let carros = await CarroService.buscarTodos();

      for (let i in carros) {
        json.result.push({
          codigo: carros[i].codigo,
          modelo: carros[i].modelo,
          placa: carros[i].placa,
        });
      }
    } catch (error) {
      json.error = "Erro ao buscar carros";
      return res.status(500).json(json);
    }
    res.json(json);
  },

  buscarPorID: async (req, res) => {
    let json = { error: "", result: {} };

    let codigo = req.params.codigo; //para pegar o parametro

    try {
      let carro = await CarroService.buscarPorID(codigo);

      if (!carro) {
        json.error = "Carro não encontrado";
        return res.status(404).json(json);
      }
      json.result = carro;
    } catch (error) {
      json.error = "Erro ao buscar carro";
      return res.status(500).json(json);
    }

    res.json(json);
  },

  inserir: async (req, res) => {
    let json = { error: "", result: {} };

    let modelo = req.body.modelo; //para pegar o parametro
    let placa = req.body.placa;

    if ((modelo && typeof modelo !== "string") || (placa && typeof placa !== "string")) {
      json.error = "Campos inválidos";
      return res.status(400).json(json);
    }

    if (modelo && placa) {
      try {
        let carroCodigo = await CarroService.inserir(modelo, placa);
        json.result = {
          codigo: carroCodigo,
          modelo,
          placa,
        };
      } catch (error) {
        json.error = "Erro ao inserir carro";
        return res.status(500).json(json);
      }
    } else {
      json.error = "Campos não enviados";
    }

    res.json(json);
  },
  alterar: async(req, res) => {
    let json = {error:'', result:{}};

    let codigo = req.params.codigo;
    let modelo = req.body.modelo;
    let placa = req.body.placa;

    if ((modelo && typeof modelo !== 'string') || (placa && typeof placa !== 'string')){
        json.error = 'Campos inválidos';
        return res.status(400).json(json);
    }

    if (codigo && modelo && placa){
        try {
            let resultado = await CarroService.alterar(codigo, modelo, placa);
            if (resultado.affectedRows === 0) {
                json.error = 'Carro não encontrado';
                return res.status(404).json(json);
            }
            json.result = {
                codigo,
                modelo,
                placa
            };
        } catch (error) {
            json.error = 'Erro ao alterar carro';
            return res.status(500).json(json);
        }
    }else{
        json.error = 'Campos não enviados';
    }
    res.json(json);
},
excluir: async(req, res) => {
  let json = {error:'', result:{}};

  try {
    let resultado = await CarroService.excluir(req.params.codigo);
    if (resultado.affectedRows === 0) {
      json.error = 'Carro não encontrado';
      return res.status(404).json(json);
    }
  } catch (error) {
    json.error = 'Erro ao excluir carro';
    return res.status(500).json(json);
  }

  res.json(json);
},
};
