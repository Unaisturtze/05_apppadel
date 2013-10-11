/*
Autor: Juan Carlos Rivera Poccomo
Web: http://starkcode.blogspot.com
*/

/* # Validando Formulario
============================================*/
$(document).ready(function(){
	$('#formulario').validate({
		errorElement: "span",
		rules: {
			txtNombre: {
				minlength: 2,
				maxlength: 30,
				required: true
			},
			txtEmail: {
				maxlength: 50,
				required: true,
				email: true
			},
			telefono: {
				minlength: 9,
				maxlength: 16,
				required: true,
				digits: true
			},
			txtPassword: {
				minlength: 6,
				required: true
			}
		},
		highlight: function(element) {
			$(element).closest('.control-group')
			.removeClass('success').addClass('error');
			validacion = false;
		},
		success: function(element) {
			element
			.html('<img src="img/ok.png" alt="ok">Correcto!').addClass('help-inline')
			.closest('.control-group')
			.removeClass('error').addClass('success');
			validacion = true;
		}
	});
	$('#formulario').submit(function(evento){
		if (validacion) {
			$('#respuesta').hide(); 
			$('#respuesta').html('<span class="label label-success"> <i class="icon-refresh"></i> Procesando registro ... </span>').fadeIn('slow');
			evento.preventDefault();    
			var info = $(this).serialize();
			var sesion = info.substring(14);
			sessionStorage.hits = sesion;
			$.ajax({
				url: 'http://skootik.com/phonegap/padel/registro.php',
                 data: info,
                 type: 'POST',
                 dataType: 'json',
                 success: function(datos){
                 	if (datos=='ok') {
                 		$('#respuesta').html("<span class='label label-success'> <i class='icon-ok'></i> Registro correcto. </span>").fadeIn('slow');
                 		window.location="activacion.html";
                 	}
					if (datos=='ko') {
                 		$('#respuesta').html("<span class='label label-important'> <i class='icon-remove'></i> El email ya está registrado. </span>").fadeIn('slow');
                 		//window.location="activacion.html";
                 	}

                 }
                 });
		}            
	});
});