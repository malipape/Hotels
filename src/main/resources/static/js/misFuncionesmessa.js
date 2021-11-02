function traerInformacion(){
	$.ajax({    
    url : 'http://129.151.114.161:8080/api/Message/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultado").empty();
        let miTabla = '<table>';
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';		
	        miTabla += '<td>'+ respuesta[i].messageText+ '</td>'; 			
	        miTabla += '<td>'+ respuesta[i].room.name+ '</td>'; 	
			miTabla += '<td>'+ respuesta[i].client.name+ '</td>'; 
			miTabla += '<td><button onclick="editarRegistro('+respuesta[i].idMessage+' )">Editar</button>';	
			miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].idMessage+' )">Borrar</button>';			
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
    let selected = $("#room").children(":selected").attr("value");
	let selected2 = $("#client").children(":selected").attr("value");
	if (selected.length > 0) {
		let misDatos = {
			messageText: $("#messageText").val(),
	        room: {"id":selected},
			client: {"idClient":selected2}
		};
		let datosJson = JSON.stringify(misDatos); 
		$.ajax(    
		'http://129.151.114.161:8080/api/Message/save',
		{data: datosJson,
		type : 'POST',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				
				alert("guardado! ");
				$("#messageText").val("");
				$("#room").val("");
				$("#client").val("");
				traerInformacion();	
				}
			},
			error : function(xhr, status) {
				alert('ha sucedido un problema: '+ status);
			}

		
		});
	}
	else
	{
		alert('Debe escoger categoria');
    }
}


function pintarSelectRoom(id){
	$.ajax({    
    url : 'http://129.151.114.161:8080/api/Room/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#room").empty();
		miSelect='<option id="" ></option>';
		for (i=0; i<respuesta.length; i++){
                  if (respuesta[i].id == id){
                      miSelect += '<option selected value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>';
                  }   
                  else {
                        miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
                    }
		}
	    $("#room").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en la carga del select:'+ status);
    }
});
	
}	


function pintarSelectClient(id){
	$.ajax({    
    url : 'http://129.151.114.161:8080/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#client").empty();
		miSelect='<option id="" ></option>';
		for (i=0; i<respuesta.length; i++){
                  if (respuesta[i].idClient == id){
                      miSelect += '<option selected value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>';
                  }   
                  else {
                        miSelect += '<option value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>'; 		
                    }
		}
	    $("#client").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en la carga del select:'+ status);
    }
});
	
}	
	



function eliminarRegistro(id){
	$.ajax({    
        url : 'http://129.151.114.161:8080/api/Message/'+id,
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
    url : 'http://129.151.114.161:8080/api/Message/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://129.151.114.161:8080/api/Message/"+id);
        let miTabla = '<table>';
			$("#messageText").val(respuesta.messageText);
			$("#idmessage").val(respuesta.idMessage);
			pintarSelectClient(respuesta.client.idClient);
			pintarSelectRoom(respuesta.room.id);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function actualizarInformacion(){
    
	let misDatos = {
	idMessage: $("#idmessage").val(),
        messageText: $("#messageText").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://129.151.114.161:8080/api/Message/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Actualizado!");
			$("#idmessage").val("");
			$("#messageText").val("");
        	        traerInformacion();	
			}
		}
	});
}
