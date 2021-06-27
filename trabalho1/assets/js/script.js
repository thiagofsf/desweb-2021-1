
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
