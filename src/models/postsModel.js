import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); //conecta ao banco de dados utilizando a string de conexão como va

export async function getTodosPosts(){          //função Assincrona para buscar todos os posts do banco de dados
    const db = conexao.db("imersao-instabytes");         //Seleciona o banco de dados "imersao-instabytes"
    const colecao = db.collection("posts");              //Seleciona a coleção "posts" dentro do banco de dados
    return colecao.find().toArray();                     //Retorna um array com todos os documentos da coleção
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");       
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)                   //Rota para criar um post
    
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");       
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost}) 
}