function submitForm(event) {
    event.preventDefault(); // prevent default form submission behavior
  
    // send form data to server using AJAX
    $.ajax({
      type: 'POST',
      url: '/send',
      data: $('#contact-form').serialize(),
      success: function(response) {
        // display thank you message in the div element
        $('#thank-you-message').html('Thank you for your message!');
      },
      error: function(error) {
        console.log(error);
        alert('An error occurred while submitting the form. Please try again.');
      }
    });
  }
  