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
			txtEmail: {
				maxlength: 50,
				required: true,
				email: true
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
			$('#respuesta').html('<span class="label label-success"> <i class="icon-refresh"></i> Procesando sesión ... </span>').fadeIn('slow');
			evento.preventDefault();    
			var info = $(this).serialize();
			var sesion = info.substring(14);
			var email = $("input#txtEmail").val();
			var password = $("input#txtPassword").val();
			
			localStorage.setItem("email", email);	
			localStorage.setItem("password", password);	
			localStorage.setItem("flag", "usuario_registrado");	
			sessionStorage.hits = sesion;
			$.ajax({
				//url: '../apppadelphp/sesion.php',
				url: 'http://skootik.com/phonegap/padel/sesion.php',
                 data: info,
                 type: 'POST',
                 dataType: 'json',
                 success: function(datos){
                 	if (datos!='ko') {
                 		$('#respuesta').html("<span class='label label-success'> <i class='icon-ok'></i> Sesión correcta. </span>").fadeIn('slow');
                 		$.each(datos, function(i, v) {	
 						if (i=='usuario') {
 						localStorage.setItem("nombre", v); }
 						else {	
						localStorage.setItem("telefono", v);
						}	
						});
                 		window.location="activacion.html";
                 	}
					if (datos=='ko') {
                 		$('#respuesta').html("<span class='label label-important'> <i class='icon-remove'></i> Los datos no son correctos. </span>").fadeIn('slow');
                 	}

                 }
                 });
		}            
	});
});