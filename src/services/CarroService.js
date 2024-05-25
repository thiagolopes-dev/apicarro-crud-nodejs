const { buscarPorID } = require("../controllers/CarroController");
const db = require("../db");
module.exports = {
  buscarTodos: () => {
    return new Promise((aceito, rejeitado) => {
      db.query("Select *from carros", (error, results) => {
        if (error) {
          rejeitado(error);
          return;
        }
        aceito(results);
      });
    });
  },

  buscarPorID: (codigo) => {
    return new Promise((aceito, rejeitado)=>{

        db.query('SELECT * FROM carros WHERE codigo = ?', [codigo], (error, results) => {
            if(error) { rejeitado(error); return; }
            if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                aceito(results[0]);
            }else {
                aceito(false);
            }
        });
    });
},
};
