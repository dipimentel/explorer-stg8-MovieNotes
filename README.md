# API Node (Movie Notes)

![Schema da API](https://raw.githubusercontent.com/dipimentel/explorer-stg8-MovieNotes/main/img/schema-movie-notes.png)

## 💻 Sobre o projeto
Este foi um desafio proposto ao final do stage 8, no curso de Desenvolvimento Web [**Explorer**](https://www.rocketseat.com.br/explorer), da **Rocketseat**, com o objetivo de colocar em prática os conceitos aprendidos sobre o densenvolvimento de uma aplicação backend utilizando o Node.JS, como APIs, utilização de rotas, métodos HTTP, Route, Query e Body Params, Status Codes, middlewares, banco de dados, consultas SQL, comandos DML e DDL, querie builder, migrations e criptografia de senhas.

O projeto consiste em uma aplicação onde o usuário cadastra um filme, preenche com algumas informações (nome, descrição, nota) e cria tags relacionadas a ele.

No desenvolvimento da API foi utilizado o framework Express, o Nodemon, o banco de dados SQLite com o Beekeeper Studio, o Querie Builder Knex, o bcrypt para a criptografia das senhas e o Insominia para realizar as requisições.


&nbsp;
## 🛠 Tecnologias
- JavaScript
- [Node](https://nodejs.org/en)
- [Express](https://expressjs.com/pt-br/)
- [Knex](https://knexjs.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Nodemon](https://nodemon.io/)
- [Insomnia](https://insomnia.rest/)
- [Beekeeper Studio](https://www.beekeeperstudio.io/)

&nbsp;
## 📄 Recursos da API

### Usuários
  - **Cadastrar usuário**<br>
  Para cadastrar um usuário é necessário fazer uma requisição POST e enviar um json contendo *name*, *email* e *password* para a rota:<br>
  `http://localhost:3333/users`
  
  - **Atualizar cadastro de usuário**<br>
  É possível atualizar o cadastro de um usuário com uma requisição PUT informando o ID do usuário na rota e enviando um json contendo um ou mais dados que serão alterados para a rota:<br>
  `http://localhost:3333/users/UserID`<br>
  Caso o dado alterado seja a senha, também será necessário enviar a senha antiga (*oldPassword*) no json.

### Notas
  - **Cadastrar nota**<br>
  Para cadastrar uma nota é necessário fazer uma requisiçnao POST, informando na rota o ID do usuário que está criando a nota, e enviar um json contendo *title*, *description*, *rating (1 a 5)* e *tags (array)* para a rota:<br>
  `http://localhost:3333/notes/UserID`
  
  - **Deletar nota**<br>
  Para deletar uma nota, basta fazer uma requisição DELETE e informar o ID da nota que deseja delatar na rota:<br>
  `http://localhost:3333/notes/NoteID`
  
  - **Mostrar uma nota específica**<br>
  Para acessar uma nota, é necessário fazer uma requisição GET e informar o ID da nota na rota:<br>
  `http://localhost:3333/notes/NoteID`
  
  - **Listar todas as notas do usuário ou realizar uma pesquisa**<br>
  Para visualizar uma lista com todas as notas criadas por um determinado usuário, basta fazer uma requisição GET e inviar o ID do usuário como uma query na rota:<br>
  `http://localhost:3333/notes?user_id=1&title&tags`
  <br><br>
  Também é possível utilizar os parâmetros *title* e *tags* para realizar uma busca por título e/ou por tags:<br>
  `http://localhost:3333/notes?user_id=1&title=dinossauros&tags=aventura`
  

### Tags
  - **Listar todas as tags do usuário**<br>
  Para obter uma lista com todas as tags criadas por um usuário, basta fazer uma requisição GET informando o ID do usuário na rota:<br>
  `http://localhost:3333/tags/UserID`



