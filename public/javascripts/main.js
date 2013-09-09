$(document).ready(function() {
 // beginning upload
    status('Choose a file :)');
 
    // Check to see when a user has selected a file                                                                                                                
    var timerId;
    timerId = setInterval(function() {
	if($('#userPhotoInput').val() !== '') {
            clearInterval(timerId);
 
            $('#uploadForm').submit();
        }
    }, 500);
 
    $('#uploadForm').submit(function() {
        status('uploading the file ...');
 
        $(this).ajaxSubmit({
                                                                                                                  
    error: function(xhr) {
        status('Error: ' + xhr.status);
    },
 
    success: function(response) {
        console.log('ajax success');
        if(response.error) {
            status('Opps, something bad happened');
            return;
        }
 
        var imageUrlOnServer = response.path;
    console.log(imageUrlOnServer);
	status('Success, file uploaded to:' + imageUrlOnServer);
	$('#uploaded_image').attr('src', imageUrlOnServer);
    }

   //end upload




});
 
	// Have to stop the form from submitting and causing                                                                                                       
	// a page refresh - don't forget this                                                                                                                      
	return false;
    });
 
    function status(message) {
	$('#status').text(message);
    }


//submit form
    $('#generate').click(function(){
  /* 	$.ajax({
 	 type: "POST",
  		url: "generate_pdf",
  		data: { html: $('#pcard_window').html() }
		}).done(function( msg ) {
		  
		});

*/
		 

    var form = $('<form>', {action: 'generate_pdf', method: 'POST'});
  form.append($('<input>', {name: 'html', value: $('#pcard_window').html()}));
  form.submit();
    });
});


