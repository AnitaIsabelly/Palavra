
let arquivo = require('fs');
let dicionario = arquivo.readFileSync("dicionario.txt", "utf-8");

const palavraDicio = dicionario.split("\r\n"); //vetor que separa as palavras
const PORT = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(process.env.PORT || 5000, () => console.log('Servidor está rodando na porta ' + PORT));
app.use('/static', express.static(__dirname + '/static'));
app.get('/', function (require, response) {
    response.sendFile(__dirname + '/static/index.html'); //Envia um arquivo html para o cliente
});

app.get('/getPalavraSorteada', function (require, response) {
    let elemento = palavraDicio[Math.floor(Math.random() * palavraDicio.length)];
    //console.log(elemento);
    response.send(elemento);
});




