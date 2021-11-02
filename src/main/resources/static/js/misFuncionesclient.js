function traerInformacion(){
	$.ajax({    
    url : 'http://129.151.114.161:8080/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultado").empty();
        let miTabla = '<table>';
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';		
	        miTabla += '<td>'+ respuesta[i].name+ '</td>'; 			
	        miTabla += '<td>'+ respuesta[i].email+ '</td>'; 	
			miTabla += '<td>'+ respuesta[i].age+ '</td>'; 	
			miTabla += '<td><button onclick="editarRegistro('+respuesta[i].idClient+' )">Editar</button>';	
			miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].idClient+' )">Borrar</button>';		
			miTabla += '</tr>';
	
		}
        miTabla += '</table>';
	    $("#resultado").append(miTabla);    
       //pintarSelect();
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema: '+ status);
    }
});
}

function guardarInformacion(){
   
	
		let misDatos = {
			name: $("#name").val(),
			email: $("#email").val(),
			age: $("#age").val(),
			password: $("#password").val()

		};
		let datosJson = JSON.stringify(misDatos); 
		$.ajax(    
		'http://129.151.114.161:8080/api/Client/save',
		{data: datosJson,
		type : 'POST',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				
				alert("guardado! ");
				$("#name").val("");
				$("#email").val("");
				$("#age").val("");
				$("#password").val("");
				traerInformacion();	
				}
			},
			error : function(xhr, status) {
				alert('ha sucedido un problema: '+ status);
			}

		
		});
	}
	
	function actualizarInformacion(){
   
		let misDatos = {
		 idClient: $("#idclient").val(),
		email: $("#email").val(),
		name: $("#name").val(),
		age: $("#age").val(),
		password: $("#password").val()
		};
		let datosJson = JSON.stringify(misDatos); 
		$.ajax(    
		'http://129.151.114.161:8080/api/Client/update',
		{data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				alert("Actualizado!");
				$("#name").val("");
				$("#email").val("");
				$("#idclient").val("");
				$("#age").val("");
				$("#password").val("");
						traerInformacion();	
				}
			}
		});
	}

	function eliminarRegistro(id){
		$.ajax({    
			url : 'http://129.151.114.161:8080/api/Client/'+id,
			type : 'DELETE',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			204 :  function() {
				alert("Eliminado el registro No:"+id);
						traerInformacion();	
				}
			}
		});
		
	}



	function editarRegistro (id){
		$.ajax({    
		url : 'http://129.151.114.161:8080/api/Client/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {
			console.log(respuesta+ "url" + "http://129.151.114.161:8080/api/Client/"+id);
			let miTabla = '<table>';
				$("#name").val(respuesta.name);
				$("#email").val(respuesta.email);
				$("#age").val(respuesta.age);
				$("#password").val(respuesta.password);
				$("#idclient").val(respuesta.idClient);
		},
		error : function(xhr, status) {
			alert('ha sucedido un problema:'+ status);
		}
	});
	}
