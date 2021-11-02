function traerInformacion(){
	$.ajax({    
    url : 'http://129.151.114.161:8080/api/Room/all',
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
	        miTabla += '<td>'+ respuesta[i].hotel+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].stars+ '</td>'; 	
			miTabla += '<td>'+ respuesta[i].description+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].category.name+ '</td>'; 
			miTabla += '<td><button onclick="editarRegistro('+respuesta[i].id+' )">Editar</button>';		
			miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].id+' )">Borrar</button>';		
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
    let selected = $("#category").children(":selected").attr("value");
	if (selected.length > 0) {
		let misDatos = {
			hotel: $("#hotel").val(),
			stars: $("#stars").val(),
			category: {"id":selected},
			name: $("#name").val(),
			description: $("#description").val()
		};
		let datosJson = JSON.stringify(misDatos); 
		$.ajax(    
		'http://129.151.114.161:8080/api/Room/save',
		{data: datosJson,
		type : 'POST',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				
				alert("guardado! ");
				$("#hotel").val("");
				$("#stars").val("");
				$("#category").val("");
				$("#name").val("");
				$("#description").val("");
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

	
	

function pintarSelectCategory(id){
	$.ajax({    
    url : 'http://129.151.114.161:8080/api/Category/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#category").empty();
		miSelect='<option id="" ></option>';
		for (i=0; i<respuesta.length; i++){
                  if (respuesta[i].id == id){
                      miSelect += '<option selected value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>';
                  }   
                  else {
                        miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
                    }
		}
	    $("#category").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en la carga del select:'+ status);
    }
});
	
}	



function editarRegistro (id){
	$.ajax({    
    url : 'http://129.151.114.161:8080/api/Room/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://129.151.116.255:8080/api/Room/"+id);
        let miTabla = '<table>';
			$("#hotel").val(respuesta.hotel);
			$("#stars").val(respuesta.stars);
			$("#name").val(respuesta.name);
			$("#description").val(respuesta.description);
			$("#idhotel").val(respuesta.id);
			pintarSelectCategory(respuesta.category.id);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}


function actualizarInformacion(){
    
	let misDatos = {
	id: $("#idhotel").val(),
    hotel: $("#hotel").val(),
	name: $("#name").val(),
	stars: $("#stars").val(),
	description: $("#description").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://129.151.114.161:8080/api/Room/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Actualizado!");
			$("#idhotel").val("");
			$("#hotel").val("");
			$("#name").val("");
			$("#stars").val("");
			$("#description").val("");
        	        traerInformacion();	
			}
		}
	});
}

function eliminarRegistro(id){
	$.ajax({    
        url : 'http://129.151.114.161:8080/api/Room/'+id,
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