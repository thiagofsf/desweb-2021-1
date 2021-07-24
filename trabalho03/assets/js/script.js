
//Usando JQuery para carregar conteúdo de outras páginas dentro do template (index)

//resolver pagina de conteudo no carregamento
$(document).ready(function(){
    var pagina = $.urlParam('pagina');
    console.log(pagina);
    //Se tem pagina nos parametros, carrega na div conteudo
    if(pagina){
        $('#conteudo').load("/paginas/"+pagina+".html");
    }
    else{
        $( "#conteudo" ).load( "/paginas/inicio.html" );
    }
    
    
});


//funcao que pega o parametro a partir da url
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

//Função para mudar conteudo da categoria do catalogo

function checar_url_categoria(){
    var cat = $.urlParam('cat');
    //se tem categoria no parametro, a pagina é catalogo, carregar categoria referente na div de conteudo do catalogo
    if(cat){
        $('#categoria').load("/paginas/"+cat+".html");
        //Selecionar o radio correspondente no radio groupe
        $("#btnradio"+cat).prop("checked", true);
    }
    else{
        $('#categoria').load("paginas/hortifruti.html");
    }
    
}

function carregar_categoria($param){
    if($param){
        $('#categoria').load("/paginas/"+$param+".html");
    }
    else{
        $('#categoria').load("/paginas/hortifruti.html");
    }
}

$('#modalhorarios').on('shown.bs.modal', function () {
    $('#btnmodalhorarios').trigger('focus')
})


//Constructor Function Produto
function Produto(id, nome, preco, departamento, imagem, like, dislike){
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.departamento = departamento;
    this.imagem = imagem;
    this.like = like;
    this.dislike = dislike;
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
        resultado.push(new Produto(elemento.id, elemento.nome, elemento.preco, elemento.departamento, elemento.imagem, elemento.like, elemento.dislike));
    }
    return resultado
}

function carregar_destaques(){
    //CARREGAMENTO DINAMICO DOS DESTAQUES
    
    //Array para ser percorrido
    const arrayObjetos = [ 
        {id: 1, nome: 'Maçã Argentina', preco: 2.00, departamento: 'Hortifruti', imagem: 'maca-argentina.jpg', like: 5, dislike:2},
        {id: 2, nome: 'Alface', preco: 1.00, departamento: 'Hortifruti', imagem: 'alface.png', like: 4, dislike:1},
        {id: 3, nome: 'Tomate', preco: 2.49, departamento: 'Hortifruti', imagem: 'tomate.jpg', like: 5, dislike:0},
        {id: 4, nome: 'Banana Prata', preco: 1.99, departamento: 'Hortifruti', imagem: 'banana-prata.jpg', like: 6, dislike:2},
        {id: 5, nome: 'Morango', preco: 4.99, departamento: 'Hortifruti', imagem: 'morango.jpg', like: 3, dislike:1},
        {id: 6, nome: 'Leite Quatá', preco: 4.50, departamento: 'Mercearia', imagem: 'leite-quata.jpg', like: 7, dislike:2},
        {id: 7, nome: 'Ervilha Knorr', preco: 3.10, departamento: 'Mercearia', imagem: 'ervilhya-knnor.jpg', like: 1, dislike:2},
        {id: 8, nome: 'Azeitonas', preco: 2.00, departamento: 'Mercearia', imagem: 'azeitona-verde.jpg', like: 3, dislike:0},
        {id: 9, nome: 'Maionese', preco: 3.99, departamento: 'Mercearia', imagem: 'maionese-quero.jpg', like: 1, dislike:0},
        {id: 10, nome: 'Fermento em Pó', preco: 2.99, departamento: 'Mercearia', imagem: 'fermento-d-benta.jpg', like: 5, dislike:2},
        {id: 11, nome: 'Milho Verde', preco: 20.99, departamento: 'Hortifruti', imagem: 'milho-verde.jpg', like: 5, dislike:2},
        {id: 12, nome: 'Abacaxi', preco: 2.99, departamento: 'Hortifruti', imagem: 'abacaxi-perola.jpg', like: 5, dislike:2},
    ];
    //Varrer Array e criar array de objetos Produtos
    let produtos = criarProdutosDeLista(arrayObjetos);
    console.log(produtos);
    //Usando .map para criar cards bootstrap
    const cards = produtos.map(produto =>
        `<div class="col-md-3 mt-4">
            <div class="card">
                <img src="/assets/imagens/produtos/${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title titulo">${produto.nome}</h5>
                    <div class = "w-100 mb-2" style="display: inline-block; text-align:center">
                            <span id="like-${produto.id}" class="like badge bg-secondary" data-like="${produto.like}" data-clicked=0>${produto.like}</span>
                            <button onclick="like('${produto.id}')" class="btn btn-light mr-2" style="text-decoration: none">
                            <i id="iconlike-${produto.id}" class="far fa-thumbs-up"></i>
                            </button>
                            <button onclick="dislike('${produto.id}')" class="btn btn-light" style="text-decoration: none">
                            <i id="icondislike-${produto.id}" class="far fa-thumbs-down"></i>
                            </button>
                            <span id="dislike-${produto.id}" class="dislike badge bg-secondary" data-dislike="${produto.dislike}" data-clicked=0>${produto.dislike}</span>
                        </div>
                    <div class="preco mb-2">${produto.getPreco()}</div>
                    <button type="button" class="btn btn-success w-100"><i class="fas fa-shopping-cart" aria-hidden="true"></i> Comprar</button>
                </div>
            </div>
        </div>
        `);
    //Criando variavel com div e método join para gerar um código HTML a ser incluso no Body por jQuery
    const exibircards = `<div class="row">${cards.join('')}</div>`;
    console.log("ExibirCards: "+ exibircards);
    return exibircards;
}

function like(id){
    //Encontra o objeto com id e recupera dados
    let like = $("#like-"+id).data('like');
    let clicked = $("#like-"+id).data('clicked');
    //se clicked for 0 ainda não clicou, incrementar like e atribuir
    if(clicked==0){
        like++;
        clicked = 1;
        $("#like-"+id).data('like', like);
        $("#like-"+id).data('clicked', clicked);
        $("#like-"+id).text(like);
        $("#iconlike-"+id).removeClass('far').addClass('fas');
        //checkar o outro lado, se tem dislike, precisa ser removido
        if($("#dislike-"+id).data('clicked')==1){
            dislike(id);
        }
    }
    //senao, remover o like dado
    else{
        like--;
        clicked = 0;
        $("#like-"+id).data('like', like);
        $("#like-"+id).data('clicked', clicked);
        $("#like-"+id).text(like);
        $("#iconlike-"+id).removeClass('fas').addClass('far');
    }
}
function dislike(id){
    //Encontra o objeto com id e recupera dados
    let dislike = $("#dislike-"+id).data('dislike');
    let clicked = $("#dislike-"+id).data('clicked');
    //se clicked for 0 ainda não clicou, incrementar dislike e atribuir
    if(clicked==0){
        dislike++;
        clicked = 1;
        $("#dislike-"+id).data('dislike', dislike);
        $("#dislike-"+id).data('clicked', clicked);
        $("#dislike-"+id).text(dislike);
        $("#icondislike-"+id).removeClass('far').addClass('fas');
        //checkar o outro lado, se tem like, precisa ser removido
        if($("#like-"+id).data('clicked')==1){
            like(id);
        }

    }
    //senao, remover o dislike dado
    else{
        dislike--;
        clicked = 0;
        $("#dislike-"+id).data('dislike', dislike);
        $("#dislike-"+id).data('clicked', clicked);
        $("#dislike-"+id).text(dislike);
        $("#icondislike-"+id).removeClass('fas').addClass('far');
    }
}