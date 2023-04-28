<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Collect the form data
  $name = $_POST['name'];
  $email = $_POST['email'];
  $company = $_POST['company'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  // Set up the email message
  $to = 'alkaid.jagape@gmail.com';
  $subject = "New message from $name ($email)";
  $message = "Company: $company\n\n$message";
  $headers = "From: $email\r\nReply-To: $email\r\n";

  // Send the email
  if (mail($to, $subject, $message, $headers)) {
    echo 'Your message has been sent successfully.';
  } else {
    echo 'There was an error sending your message. Please try again later.';
  }
}
?>