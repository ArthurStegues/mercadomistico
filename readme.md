Alunos: Arthur Stegues, nicole claeser
Turma:2BM

Como pré-requisito é necessário ter MYSQL instalado em seu sistema, é utilizado para executar scripts SQL, como o MYSQL Workbench ou alguma linha de comando SQL, utilizado para interagir com banco de dados, caso seja necessário.

As informações necessárias para o projeto estão nos seguintes arquivos:
Banco de dados =  mistic2/bancodedados.sql
API e Server = mistic2/src/server.js

Pacotes Node utilizados: nodemon, dotenv, cors, express, mysql2

Instruções de Instalação

Para configurar o banco de dados abra uma conexão com o servidor MYSQL, crie o banco de dados executando o seguinte comando:
CREATE DATABASE mistico;

Selecione o database(banco de dados) criado para uso com o seguinte comando:
USE mistico;

Agora vamos criar as tabelas que terão no nosso banco de dados, para fazer isso iremos usar os seguintes scripts SQL:

create table usuarios(
	idUsuario int primary key auto_increment not null,
	nome varchar(255),
       email varchar (255) not null,
       senha varchar(255) not null
);

Explicação: a tabela usuarios está armazenando os dados de nome, email e senha de quem se cadastrar no site.

create table produtos(
	idProduto int primary key auto_increment not null,
    nome VARCHAR(255) not null,
    preco DECIMAL (10, 2) not null,
    descricao VARCHAR(1000) not null,
    quantidade_estoque int not null
);

Explicação: A tabela de produtos está armazenando os dados de nome, preço, descrição e quantidade que tem em estoque dos produtos disponíveis no mercado místico.

create table carrinho(
	idCarrinho int primary key auto_increment not null,
    valor_total decimal (10, 2) not null,
    quantidade int not null,
    usuarioid int not null,
    produtoid int not null,
    foreign key (usuarioid) references usuarios(idUsuario),
    foreign key (produtoid) references produtos(idProduto)
);

Explicação: a tabela carrinho irá armazenar os produtos em que o usuário deixou em carrinho no site, as chaves estrangeiras usuarioid e produtoid fazem referencia a tabela de produtos e a tabela de usuários.


Para testar se as tabelas foram inseridas voce ira digitar os seguintes comandos no mysql workbench:

Select * from usuarios; (ira retornar a tabela usuarios e as colunas criadas)

Select * from produtos;
(ira retornar a tabela produtos e as colunas criadas)

Select * from carrinho;
(ira retornar a tabela carrinho e as colunas criadas)

APIS/ROTAS:

(É NECESSÁRIO TER INSTALADO A EXTENSÃO THUNDER CLIENT NO VSCODE PARA TESTE DAS ROTAS)
(SEMPRE QUE FOR TESTAR ROTAS, DIGITE "NPM START" NO NODE.JS)
Para instalar os pacotes necessários para aplicação utilizaremos o node.js, após abrir ele digite:

- para criar uma pasta - mkdir (nome da pasta)
- para entrar na pasta - cd (nome da pasta)
- para iniciliazar o gerenciador de pacotes da aplicação - npm init -y
- para instalar pacote express com npm - npm i express

Para linkar o banco de dados com as rotas voce vai criar um arquivo dentro do vscode chamado "db_config.js" e irá codar o seguinte:

const mysql = require('mysql2')
 
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'arthurlindao1.',
database: 'mistico'
 
});
 
connection.connect((err) => {
    if(err){
        throw err;
    } else{
        console.log('Mysql conectado');
    }
})
 
module.exports = connection;

Agora, segue abaixo as rotas utilizadas

ROTAS DE USUARIO:

app.post('/cadastro/cadastrar', (request, response) => {
    // criar um array com os dados do banco recebidos
    let params = Array(
        request.body.nome,
        request.body.email,
        request.body.senha
    );
    // criar o comando de execução de consulta no banco de dados
    let query = "INSERT INTO usuarios(nome, email, senha) VALUES(?,?,?);";
    // passar o comando e os dados do banco para a função query
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    menssage: "sem sucesso",
                    data: err
                })
        }
    })
});


- EXPLICAÇÃO: Rota para criar um novo usuário, recebendo as informações nome, email e senha no body, caso conseguir inserir o usuário retornara uma mensagem escrita “sucesso”, caso de erro retornara uma mensagem escrito “sem sucesso”


Código dentro do body-
{
  "nome": "Stegues",
  "email": "arthurguiadopordeus@gmail.com ",
  "senha": "Arthurlindo1"
}

//para listar os usuarios do banco
app.get('/usuarios/listar', (request, response) => {
  //comando de execução de consulta no banco de dados  
    const query = "SELECT * FROM usuarios";
 
    connection.query(query, (err, results) => {
        if (results) {
            response
               .status(200)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })
        }
    })
});

- EXPLICAÇÃO: Rota para listar os usuarios presentes no banco de dados, caso a consulta seja realizada corretamente retornara a mensagem “sucesso”, e caso não aconteçaa isso retornara a mensagem “sem sucesso”



//para editar um usuario do banco
app.put('/usuarios/editar/:idUsuario', (request, response) => {
 
    let params = [
        request.body.nome,
        request.body.senha,
  	request.body.email,
        request.params.idUsuario
    ];
 
 //ciar o comando de execução para editar infos de um usuario
    let query = "UPDATE usuarios SET email = ?, senha = ? WHERE idUsuario = ?;";
 
 
    connection.query(query, params, (err, results) => {
        if (err) {
 
            return response.status(400).json({
                success: false,
                message: "Erro na atualização dos daods",
                data: err
            });
        }
 
 
        response.status(200).json({
            success: true,
            message: "Dados atualizados com sucesso",
            data: results
        });
    });
});

- EXPLICAÇÃO: Rota para editar um usuario já presente no banco, no body deverá escrever o nome, email, senha e o ID do usuário que voce deseja alterar os dados, caso consiga editar os dados corretamente irá aparecer a mensagem “Dados atualizados com sucesso”, e caso não consiga realizar o processo devidamente irá aparecer a mensagem “Erro na atualização de dados”


Código dentro do body-
 {
      "nome": "Guilherme",
      "email": "guilherme@yahoo.com.com ",
      "senha": "guilherme12."
    }

app.delete('/usuarios/deletar/:idUsuario', (request, response) => {
    let id = request.params.id;
 //criar comando de execução para deletar um usuario
    let query = "DELETE FROM usuarios WHERE idUsuario = ?;"
 
    connection.query(query, [id], (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })
        }
    })
});

- EXPLICAÇÃO: Rota para deletar um usuário do banco de dados, deverá escrever o id do usuário que voce deseja remover, caso voce consiga remover aparecerá a mensagem “sucesso”, caso não consiga irá aparecer a mensagem “sem sucesso”



- ROTAS DE PRODUTOS

//para cadastrar um produto
 app.post('/produto/cadastrar', (request, response) => {
    let params = [
        request.body.nome,
        request.body.preco,
        request.body.descricao,
        request.body.quantidade_estoque
    ];
    //comando de execução para adicionar um produto na tabela produtos do banco
    let query = "INSERT INTO produtos(nome, preco, descricao, quantidade_estoque) VALUES (?, ?, ?, ?);";
  
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Produto cadastrado com sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao cadastrar produto",
                    data: err
                });
        }
    });
  });

- EXPLICAÇÃO: Esta rota lhe permitira que cadastrar um produto no banco de dados na tabela produtos, deverá colocar no body as informações de nome, preço, descrição e quantidade_estoque (quantidade em estoque), caso voce consiga cadastrar o produto corretamente irá aparecer a mensagem “Produto cadastrado com sucesso”, e caso não consiga irá aparecer a mensagem “Erro ao cadastrar o produto”

Código dentro do body-
{
      "nome": "Poção da paz",
      "preco": 950.00,
      "descricao": "Permite que o usuario fique em paz",
      "quantidade_estoque": 1.000
    }


//para listar os produtos
  app.get('/produtos/listar', (request, response) => {
    //comando de execução para consultar os produtos da tabela produtos do banco
    const query = "SELECT * FROM Produtos";
  
    connection.query(query, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Produtos listados com sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao listar produtos",
                    data: err
                });
        }
    });
  });

- EXPLICAÇÃO: Essa rota irá servir para voce listar os produtos já cadastrados no banco de dados, ou seja, irá lhe retornar todos produtos já presentes na tabela produtos, caso consiga realizar o processo da maneira correta irá aparecer a mensagem “Produtos listados com sucesso” e caso não consiga irá aparecer a mensagem “Erro ao listar produto”

//para editar um produto
  app.put('/produto/editar/:idProduto', (request, response) => {
    let params = [
        request.body.nome,
        request.body.preco,
        request.body.descricao,
        request.body.quantidade_estoque,
        request.params.idProduto
    ];
  //comando de execução para editar um produto da tabela produtos do banco
    let query = "UPDATE produtos SET nome = ?, preco = ?, descricao = ?, quantidade_estoque = ? WHERE idProduto = ?";
  
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Produto atualizado com sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao atualizar produto",
                    data: err
                });
        }
    });
  });
  

- EXPLICAÇÃO: Rota usada para editar um produto já existente no banco de dados, no body voce digitará o ID do produto que deseja editar, e irá colocar o nome, preco, descricao e quantidade_estoque que voce deseja, para que o produto fique com os valores que voce escolher:

Código dentro do body -  
{
    "nome": "Poção da paz",
    "preco": 850.00,
    "descricao": "Poção que lhe dará paz por 24 horas",
    "quantidade_estoque": 1000
}

//para deletar um produto
app.delete('/produto/deletar/:idProduto', (request, response) => {
    let params = [
        request.params.idProduto
    ];
  //comando de execução para deletar um produto da tabela produtos do banco
    let query = "DELETE FROM produtos WHERE idProduto = ?";
  
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Produto deletado com sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao deletar produto",
                    data: err
                });
        }
    });
  });



- EXPLICAÇÃO: Rota para que voce delete um produto do banco, basta colocar o ID dele no http.

// Endpoint para login
  app.post('/login', (request, response) => {
      const { email, senha } = request.body;
    
      // Validação básica
      if (!email || !senha) {
          return response.status(400).json({
              success: false,
              message: "Email e senha são obrigatórios."
          });
      }
  
      // Consultar o usuário pelo email
      const query = "SELECT * FROM usuarios WHERE email = ?;";
      connection.query(query, [email], (err, results) => {
          if (err) {
              console.error("Erro ao consultar usuário:", err);
              return response.status(500).json({
                  success: false,
                  message: "Erro ao realizar login.",
                  error: err.code
              });
          }
  
          // Verificar se o usuário foi encontrado
          if (results.length === 0) {
              return response.status(401).json({
                  success: false,
                  message: "Email ou senha inválidos."
              });
          }
          const usuario = results[0]
          
              // Login bem-sucedido
              return response.status(200).json({
                  success: true,
                  message: "Login realizado com sucesso.",
                  perfil: usuario.perfil 
             });
          });
      });

 EXPLICAÇÃO: Esta rota verifica se o email e senha foram preenchidos, se algum estiver ausente ela retorna com um status 400 (bad request)
 Faz uma consulta para buscar um usuario no banco de dados (usuarios) sujo email corresponda ao fornecido
 se o usuario foi encontrado e as verificações foram bem sucedidas, a rota responde com um status 200 (OK) e uma mensagem indicando que o login foi realizado com sucesso, a resposta inclui também o perfil do usuario, se é admin ou usuario

 CONSIDERAÇÕES FINAIS: Trabalho que serviu muito para aprendizado principalmente do conceito de rotas, como elas funcionam no site e etc, os videos disponibilizados no teams serviram de grande ajuda também para a realização do trabalho.