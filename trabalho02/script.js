function Produto(nome, preco, departamento, imagem){
    this.nome = nome;
    this.preco = preco;
    this.departamento = departamento;
    this.imagem = imagem;
    //Retornar Preço Formatado - Com mascara, aparecendo o R$ e sempre com 2 casas decimais
    this.getPreco = function() {
        return 'R$'+preco.toFixed(2);
    }
}
//Função que percorre um array retornando um array de Objetos Produto
function criarProdutosDeLista(array){
    console.log(array);
    resultado = [];
    for (elemento of array){
        console.log(elemento);
        resultado.push(new Produto(elemento.nome, elemento.preco, elemento.departamento, elemento.imagem));
    }
    return resultado
}
//Array para ser percorrido
const arrayObjetos = [ 
    {nome: 'Maçã Argentina', preco: 2.00, departamento: 'Hortifruti', imagem: '/images/maca-argentina.jpg'},
    {nome: 'Alface', preco: 1.00, departamento: 'Hortifruti', imagem: '/images/alface.png'},
    {nome: 'Tomate', preco: 2.49, departamento: 'Hortifruti', imagem: '/images/tomate.jpg'},
    {nome: 'Banana Prata', preco: 1.99, departamento: 'Hortifruti', imagem: '/images/banana-prata.jpg'},
    {nome: 'Morango', preco: 4.99, departamento: 'Hortifruti', imagem: '/images/morango.jpg'},
    {nome: 'Leite Quatá', preco: 4.50, departamento: 'Mercearia', imagem: '/images/leite-quata.jpg'},
    {nome: 'Ervilha Knorr', preco: 3.10, departamento: 'Mercearia', imagem: '/images/ervilhya-knnor.jpg'},
    {nome: 'Azeitonas', preco: 2.00, departamento: 'Mercearia', imagem: '/images/azeitona-verde.jpg'},
    {nome: 'Maionese', preco: 3.99, departamento: 'Mercearia', imagem: '/images/maionese-quero.jpg'},
    {nome: 'Fermento em Pó', preco: 2.99, departamento: 'Mercearia', imagem: '/images/fermento-d-benta.jpg'},
];
//Varrer Array e criar array de objetos Produtos
let produtos = criarProdutosDeLista(arrayObjetos);
console.log(produtos);
//Usando .map para criar cards bootstrap
const cards = produtos.map(produto =>
    `<div class="col-md-2 mt-4">
        <div class="card">
            <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
            <div class="card-body">
                <h5 class="card-title titulo">${produto.nome}</h5>
                <div class="preco mb-2">${produto.getPreco()}</div>
                <button type="button" class="btn btn-success w-100"><i class="fas fa-shopping-cart" aria-hidden="true"></i> Comprar</button>
            </div>
        </div>
    </div>
    `);
//Criando variavel com div e método join para gerar um código HTML a ser incluso no Body por jQuery
const exibircards = `<div class="row">${cards.join('')}</div>`;
//Adicionando cards gerados ao body com jQuery
$("body").append(exibircards);