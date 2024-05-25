const CarroService = require("../services/CarroService");

module.exports = {
  buscarTodos: async (req, res) => {
    let json = { error: "", result: [] };

    let carros = await CarroService.buscarTodos();

    for (let i in carros) {
      json.result.push({
        codigo: carros[i].codigo,
        descricao: carros[i].modelo,
      });
    }
    res.json(json);
  },

  buscarPorID: async (req, res) => {
    let json = { error: "", result: {} };

    let codigo = req.params.codigo; //para pegar o parametro
    let carro = await CarroService.buscarPorID(codigo);

    if (carro) {
      json.result = carro; //se tiver nota ele joga no json
    }

    res.json(json);
  },

  inserir: async (req, res) => {
    let json = { error: "", result: {} };

    let modelo = req.body.modelo; //para pegar o parametro
    let placa = req.body.placa;

    if (modelo && placa) {
      let carroCodigo = await CarroService.inserir(modelo, placa);
      json.result = {
        codigo: carroCodigo,
        modelo,
        placa,
      };
    } else {
      json.error = "Campos não enviados";
    }

    res.json(json);
  },
};
