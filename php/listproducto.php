<?php

  include('coneccion.php');

  $query = "select id_producto,producto from t_producto";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id_producto' => $row['id_producto'],
      'producto' => $row['producto']
      
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>