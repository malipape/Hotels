function traerInformacion(){
	$.ajax({    
    url : 'http://129.151.114.161:8080/api/Category/all',
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
	        miTabla += '<td>'+ respuesta[i].description+ '</td>'; 
			miTabla += '<td><button onclick="editarRegistro('+respuesta[i].id+' )">Editar</button>';	
			miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].id+' )">Borrar</button>';
			miTabla += '</tr>';
	
		}
        miTabla += '</table>';
	    $("#resultado").append(miTabla);    
       
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function guardarInformacion(){

		let misDatos = {
			name: $("#name").val(),
			description: $("#description").val()
		};
		let datosJson = JSON.stringify(misDatos); 
		$.ajax(    
		'http://129.151.114.161:8080/api/Category/save',
		{data: datosJson,
		type : 'POST',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				
				alert("guardado! ");
				$("#name").val("");
				$("#description").val("");
				traerInformacion();	
				}
			}
		});

}


function actualizarInformacion(){
   
	let misDatos = {
     id: $("#idcate").val(),
	name: $("#name").val(),
    description: $("#description").val()
	

	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://129.151.114.161:8080/api/Category/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Actualizado!");
			$("#name").val("");
			$("#description").val("");
			$("#idcate").val("");
        	        traerInformacion();	
			}
		}
	});
}


function eliminarRegistro(id){
	$.ajax({    
        url : 'http://129.151.114.161:8080/api/Category/'+id,
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
    url : 'http://129.151.114.161:8080/api/Category/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://129.151.114.161:8080/api/Category/"+id);
        let miTabla = '<table>';
			$("#name").val(respuesta.name);
			$("#description").val(respuesta.description);
			$("#idcate").val(respuesta.id);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}