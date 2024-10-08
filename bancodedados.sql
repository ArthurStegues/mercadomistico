CREATE DATABASE mistico;

use mistico;

create table usuarios(
	idUsuario int primary key auto_increment not null,
	nome varchar(255),
    email varchar (255) not null,
    senha varchar(255) not null
);

create table produtos(
	idProduto int primary key auto_increment not null,
    nome VARCHAR(255) not null,
    preco DECIMAL (10, 2) not null,
    descricao VARCHAR(1000) not null,
    quantidade_estoque int not null
);

create table carrinho(
	idCarrinho int primary key auto_increment not null,
    valor_total decimal (10, 2) not null,
    quantidade int not null,
    usuarioid int not null,
    produtoid int not null,
    foreign key (usuarioid) references usuarios(idUsuario),
    foreign key (produtoid) references produtos(idProduto)
);
