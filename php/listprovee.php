<?php

  include('coneccion.php');

  $query = "select id_proveedor,proveedor from t_proveedor";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id_proveedor' => $row['id_proveedor'],
      'proveedor' => $row['proveedor']
      
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
