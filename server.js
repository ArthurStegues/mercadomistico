const express = require('express');
const cors = require('cors');
const multer = require('./src/multer.js')
const upload = require('./multer')
//definir a porta
const porta = 3000;
const app = express();
//habilitar o cors e utilizar json
app.use(cors());
app.use(express.json());
//testar
app.listen(porta, () => console.log(`rodando na porta` + porta));
 
 
const connection = require('./db_config.js');
 
 //para cadastrar um usuario
app.post('/cadastro/cadastrar', (request, response) => {
    // criar um array com os dados do banco recebidos
    let params = Array(
        request.body.nome,
        request.body.email,
        request.body.senha
    );

    console.log(params)
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
            console.log(err)
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
 
 //para editar um usuario do banco
app.put('/usuarios/editar/:idUsuario', (request, response) => {
 
    let params = [
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.params.idUsuario
    ];
 
 //ciar o comando de execução para editar infos de um usuario
    let query = "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE idUsuario = ?;";
 
 
    connection.query(query, params, (err, results) => {
        if (err) {
 
            return response.status(400).json({
                success: false,
                message: "Erro na atualização dos dados",
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
 //para deletar um usuario do banco
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
 
 
//PRODUTOS

 //para cadastrar um produto
 app.post('/produto/cadastrar', upload.single('image'), (request, response) => {
    let params = [
        request.body.nome,
        request.body.preco,
        request.body.descricao,
        request.file.filename
    ];
    //comando de execução para adicionar um produto na tabela produtos do banco
    let query = "INSERT INTO produtos(nome, preco, descricao, image) VALUES (?, ?, ?, ?);";
  
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