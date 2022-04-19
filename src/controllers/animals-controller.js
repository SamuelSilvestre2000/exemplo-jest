const fs = require('fs');
const { nanoid } = require('nanoid');
const animalsData = require('../data/animals.json');

exports.post = (req, res, next) => {
  // Dados recebidos na URL7
  const nome = req.query.nome;
  const especie = req.query.especie;
  const idade = req.query.idade;

  // Valida os dados a serem inseridos
  if (nome.length < 3) {
    res.status(400).send({'mensagem': 'O nome deve ter pelo menos 3 caracteres.'});
    return;
  }
  if (especie.length < 3) {
    res.status(400).send({'mensagem': 'A especie deve ter pelo menos 3 caracteres.'});
    return;
  }

  // Adiciona o novo animal no JSON
  const novoAnimal = {
    'nome': nome,
    'especie': especie,
    'idade': idade,
  };
  animalsData.push(novoAnimal);
  fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));

  // Envia a resposta
  res.status(201).send(novoAnimal);
};

exports.get = (req, res, next) => {
  // Envia a resposta com todos os animais
  res.status(200).send(animalsData);
}