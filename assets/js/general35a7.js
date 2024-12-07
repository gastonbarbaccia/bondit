$(document).ready(function(){



	$('#form_footer').attr('onsubmit','return false;');
	$('#form_contacto').attr('onsubmit','return false;');

    $("body").delegate(".form_footer_enviar", "click", armaFormFooter);
    $("body").delegate(".form_contacto_enviar", "click", armaFormContacto);



});

function enviarForm(json, campo, lang){


	url = lang == "en" || lang == "land" ? '../enviar_form.php' : 'enviar_form.php'; 

	$.post(url, json , function(data){

		var retorno = JSON.parse(data);

		if(retorno == "OK"){

			$(".form_campos").val("");


			url = lang == "land" ? '../gracias.php' : 'gracias.php'; 

			window.location.href = url;


		}else{


			$.each(retorno,function(key, value){
	        	
	        	$("#"+value+campo).show();
				
	    	});

		}

    });



}


function armaFormFooter(){

	var lang  = $(this).attr("data-lang");


	$(".form_errores").hide();

	var json = {};

	json.empresa = $("#empresa").val();
	json.nombre = $("#nombre").val();
	json.mail = $("#mail").val();
	json.tel = $("#tel").val();
	json.mensaje = $("#mensaje").val();
	json.captcha = $('textarea[id="g-recaptcha-response"]').val();


	enviarForm(json, "", lang);
}


function armaFormContacto(){


	var lang  = $(this).attr("data-lang");

	$(".form_errores").hide();

	var json = {};

	json.empresa = $("#empresa_contacto").val();
	json.nombre = $("#nombre_contacto").val();
	json.mail = $("#mail_contacto").val();
	json.mensaje = $("#mensaje_contacto").val();
	json.tel = $("#tel_contacto").val();
	json.captcha = $('textarea[id="g-recaptcha-response-1"]').val();


	enviarForm(json, "_contacto", lang);
}