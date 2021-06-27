
//Usando JQuery para carregar conteúdo de outras páginas dentro do template (index)


$(document).ready(function(){
    var parameter = $.urlParam('pagina');
    console.log(parameter);
    if(parameter){
        $('#conteudo').load("/paginas/"+parameter+".html");
    }
    else{
        $( "#conteudo" ).load( "/paginas/inicio.html" );
    }
});


$('a').each(function(b,c){     //loop through each a element
    $(c).on('click',function(){   //add click event listener
        var link = $(this).attr('data-target');  //get the link from attribute
        $('#conteudo').load(link);    //load the link's content into container
    });
});


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};