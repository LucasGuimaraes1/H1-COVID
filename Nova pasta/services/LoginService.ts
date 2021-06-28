const axios = require("axios");

const url = "https://aula-humberto.herokuapp.com/";

export default {
  Login: async (email: string, senha: string) => {
    let res = await axios.post(
      `${url}users/login`,
      {
        email: email,
        senha: senha,
      }
    );
    
    return res.data.login;
  },
  Cadastrar: async (
    email: string,
    senha: string,
    confirmarSenha: string,
    nome: string,
    dataNascimento: string
  ) => {
    if (senha != confirmarSenha) return false;

    let res = await axios.post(
      `${url}users/cadastrar`,
      {
        nome,
        email,
        senha,
        dataNascimento
      }
    );

    return res.data.cadastro;
  },
};
