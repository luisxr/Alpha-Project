<?php

$connection = mysqli_connect(
  'localhost', 'root', '', 'pventa'
);

// for testing connection
#if($connection) {
#echo 'database is connected';
#}else{
 #   echo 'ubo error';
#}

?>
