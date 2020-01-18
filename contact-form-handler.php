<?php
    $name = $_POST['name'];
    $visitor_email = $_POST['email'];
    $message = $_POST['message'];

    $email_from = 'jochensarrazyn@gmail.com';

    $email_subject = "test";

    $email_body = "User Name: $name.\n".
		    "User Email: $visitor_email.\n".
		      "User Message: $message.\n";

    $to = "jochensarrazyn@gmail.com";

    $headers = "From: $email_from \r\n";

    $headers .= "Reply-To: $visitor_email \r\n";

    mail($to,$email_subject,$email_body,$headers);

    header("Location: test.html");


?>