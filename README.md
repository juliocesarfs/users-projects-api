# API Nodejs - Users and Projects

### Descrição:
Essa é uma API que realiza o CRUD de usuários e de projetos, somente um usuário autenticado consegue realizar as operações de CRUD com projetos e usuários.

### Manual de utilização:
Execute: 
```
yarn install
```
Para rodar o projeto:
```
yarn dev
```

- Crie um arquivo **.env** baseado no **.env.example** e atribua algum valor ao **SECRET**
- Utilize o arquivo **api-grupfy-juliocesar.json**, esse arquivo serve para que você possa importar o Workspace nescessário para o POSTMAN ou Insomnia (Eu utilizei o Insomnia e a importação funciona perfeitamente)
---
- Certifique-se que faça a criação e o login do usuário antes de tentar qualquer outra ação.

- A API retornará um token JWT após o login, copie-o e cole no Header de cada requisição para que você seja autorizado.
