
let edit = false;
listacomboidproveerdor();//inica la funciones para llenar los select
listacomboproducto();//inica la funciones para llenar los select

$('#comp_from').submit(function (e) {//este va a ser para insertar los datos a la base
    const postdata = {
        id_prod: $('#id_prod').val(), id_provee: $('#id_prov').val(),
        fecha: $('#fech').val(), npz: $('#npz').val(),compraId: $('comprasId')
    };
   const url = edit === false ? 'task-add.php' : 'task-edit.php';//aqui le pones las paginas para insertar o actualizar como en el video
    console.log(postdata, url);
    $.post('php/insertcomp.php', postdata, function (response) {//cambiar la localizacion de la pagina
        console.log(response);
        listacompras();
    });
    e.preventDefault();
});


function listacompras() {//este crea la tabla principal de compras
    $.ajax({
        url: 'ejemplo.php',//cambiar la localizacion de la pagina
        type: 'GET',
        success: function (response) {
            const compra = JSON.parse(response);
            let template = '';
            compra.forEach(compra => {
                template += `
                  <tr compraId="${compra.id}">
                  <td>${compra.id_compra}</td>
                  <td>${compra.id_producto}</td>
                  <td>${compra.fecha}</td>
                  <td>${compra.id_proveedor}</td>
                  <td>${compra.cantidad}</td>
                  <td>
                  <td> <button class="compras_update btn waves-effect green accent-4 " type="submit" name="action"><iclass="material-icons">edit</i></button></td>
                  <td><button class="compras-delete btn waves-effect red" type="submit" name="action"><i class="material-icons">delete_forever</i></button></td>
                  </td>
                  </tr>
                `
            });
            $('#tcompras').html(template);
        }
    });
}


function listacomboidproveerdor() {//este llena el select del proveedor ya funciona
    $.ajax({
        url: 'php/listprovee.php',//este no lo cambies ya viene en la caprte php ya funciona
        type: 'GET',
        success: function (response) {
            const provee = JSON.parse(response);
            let templates = '';
            console.log(provee);
            provee.forEach(provee => {
                templates += `
                  <option value="${provee.id_proveedor}">${provee.proveedor}</option>                
                `
            });
            $('#id_prov').html(templates);
        }
    });
}

function listacomboproducto() {//este llena el select del producto ya funciona
    $.ajax({
        url: 'php/listproducto.php',
        type: 'GET',
        success: function (response) {
            const product = JSON.parse(response);
            let templates = '';
            console.log(product);
            product.forEach(product => {
                templates += `
                  <option value="${product.id_producto}">${product.producto}</option>                
                `
            });
            $('#id_prod').html(templates);
        }
    });
}


$(document).on('click', '.compras-delete', (e) => {//este te permite eliminar con el botton de la tabla
    
    if(confirm('Estas seguro de eliminar esta compra')) {
      const element = $(this)[0].activeElement.parentElement.parentElement;
      const id = $(element).attr('compraId');
      $.post('task-delete.php', {id}, (response) => {//cambiar la localizacion de la pagina
       listacompras();//llama de nuevo toda la lista de compras 
      });
    }
  });

  $(document).on('click', '.compras_update', (e) => {
    const element = $(this)[0].activeElement.parentElement.parentElement;
    const id = $(element).attr('compraId');
    $.post('task-single.php', {id}, (response) => {//cambiar la localizacion de la pagina
      const compra = JSON.parse(response);
      $('#comprasId').val(compra.id_compra);
      $('#id_prod').val(compra.id_producto);
      $('#fech').val(compra.fecha);
      $('#id_prov').val(compra.id_proveedor);
      $('#npz').val(compra.cantidad);
      edit = true;
    });
    e.preventDefault();
  });
  