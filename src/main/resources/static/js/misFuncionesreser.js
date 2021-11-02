function traerInformacion(){
	$.ajax({    
    url : 'http://129.151.114.161:8080/api/Reservation/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultado").empty();
        let miTabla = '<table>';
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';		
			miTabla += '<td>'+ respuesta[i].idReservation+ '</td>';
	        miTabla += '<td>'+ respuesta[i].startDate+ '</td>'; 	
			miTabla += '<td>'+ respuesta[i].devolutionDate+ '</td>'; 	
			miTabla += '<td>'+ respuesta[i].status+ '</td>'; 	
	        miTabla += '<td>'+ respuesta[i].room.name+ '</td>'; 	
			miTabla += '<td>'+ respuesta[i].client.idClient+ '</td>'; 	
			miTabla += '<td>'+ respuesta[i].client.name+ '</td>'; 
			miTabla += '<td>'+ respuesta[i].client.email+ '</td>'; 
			miTabla += '<td>'+ respuesta[i].score+ '</td>'; 
			miTabla += '<td><button onclick="editarRegistro('+respuesta[i].idReservation+' )">Editar</button>';
			miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].idReservation+' )">Borrar</button>';		
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
			startDate: $("#startDate").val(),
			devolutionDate: $("#devolutionDate").val(),
	        room: {"id":selected},
			client: {"idClient":selected2}
		};
		let datosJson = JSON.stringify(misDatos); 
		$.ajax(    
		'http://129.151.114.161:8080/api/Reservation/save',
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
	
function pintarSelectStatus(ID){
	$.ajax({    
    url : 'http://129.151.114.161:8080/api/Reservation/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#status").empty();
		miSelect='<option id="" ></option>';

		if (ID == 'created'){
			miSelect += '<option selected value='+'created' + '>'+'created'+'</option>';
			miSelect += '<option value='+'programmed' + '>'+'programmed'+'</option>'; 
			miSelect += '<option value='+ 'cancelled'+ '>'+'cancelled'+'</option>'; 
			miSelect += '<option value='+ 'completed'+ '>'+'completed'+'</option>'; 
		}  
		if (ID == 'programmed'){
			miSelect += '<option value='+'created' + '>'+'created'+'</option>';
			miSelect += '<option selected value='+'programmed' + '>'+'programmed'+'</option>'; 
			miSelect += '<option value='+ 'cancelled'+ '>'+'cancelled'+'</option>'; 
			miSelect += '<option value='+ 'completed'+ '>'+'completed'+'</option>'; 
		}  
		if (ID == 'cancelled'){
			miSelect += '<option value='+'created' + '>'+'created'+'</option>';
			miSelect += '<option value='+'programmed' + '>'+'programmed'+'</option>'; 
			miSelect += '<option selected value='+ 'cancelled'+ '>'+'cancelled'+'</option>'; 
			miSelect += '<option value='+ 'completed'+ '>'+'completed'+'</option>'; 
		}  
		if (ID == 'completed'){
			miSelect += '<option value='+'created' + '>'+'created'+'</option>';
			miSelect += '<option value='+'programmed' + '>'+'programmed'+'</option>'; 
			miSelect += '<option value='+ 'cancelled'+ '>'+'cancelled'+'</option>'; 
			miSelect += '<option selected value='+ 'completed'+ '>'+'completed'+'</option>'; 
		}  
                  

     
                    
		
	    $("#status").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en la carga del select:'+ status);
    }
});
	
}	

function actualizarInformacion(){
    let selected = $("#status").children(":selected").attr("value");
	let misDatos = {
	idReservation: $("#idreservation").val(),
    startDate: $("#startDate").val(),
	devolutionDate: $("#devolutionDate").val(),
	status: selected
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://129.151.114.161:8080/api/Reservation/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Actualizado!");
			$("#idreservation").val("");
			$("#startDate").val("");
			$("#devolutionDate").val("");
			
        	        traerInformacion();	
			}
		}
	});
}


function editarRegistro (id){
	$.ajax({    
    url : 'http://129.151.114.161:8080/api/Reservation/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://129.151.114.161:8080/api/Reservation/"+id);
        let miTabla = '<table>';
			$("#startDate").val(respuesta.startDate);
			$("#devolutionDate").val(respuesta.devolutionDate);
			$("#idreservation").val(respuesta.idReservation);
			pintarSelectStatus(respuesta.status)
			pintarSelectClient(respuesta.client.idClient);
			pintarSelectRoom(respuesta.room.id);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}




function eliminarRegistro(id){
	$.ajax({    
        url : 'http://129.151.114.161:8080/api/Reservation/'+id,
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