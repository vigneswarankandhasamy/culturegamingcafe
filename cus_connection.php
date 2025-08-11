<?php
   $dbhost = 'localhost';
   // $dbuser = 'u518383203_culture_admin';
   // $dbpass = 'Culture_admin@123';
   // $dbname = 'u518383203_culturegaming';


   $dbuser = 'root';
   $dbpass = '';
   $dbname = 'culturegaming';

   $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);

   if(! $conn ) {
      die('Could not connect: ' . mysqli_error());
   }
?>