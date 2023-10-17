var totalComandas = 0;
var totalItems = 0;
var totalFacturado = 0;
document.addEventListener('DOMContentLoaded', function() {
    var selectedItemsTableBody = document.getElementById("selectedItemsTableBody");
  
    // Recuperar información del Local Storage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Crear un objeto para agrupar las órdenes por número de comanda
    const ordersByComanda = {};

    // Agrupar órdenes por número de comanda y sumar cantidades y precios totales
    for (const order of orders) {
      const comandaNumber = order.comanda;

      // Verificar si la comanda ya existe en el objeto ordersByComanda
      if (ordersByComanda.hasOwnProperty(comandaNumber)) {
        // Si la comanda ya existe, sumar cantidades y precios totales
        ordersByComanda[comandaNumber].cantidad += order.cantidad;
        ordersByComanda[comandaNumber].precioTotal += order.precioTotal;
        totalItems += order.cantidad;
        totalFacturado += order.precioTotal;
      } else {
        // Si la comanda no existe, crear un nuevo objeto con la comanda, cantidad y precio total
        totalComandas += 1;
        totalItems += order.cantidad;
        totalFacturado += order.precioTotal;
        ordersByComanda[comandaNumber] = {
          cantidad: order.cantidad,
          precioTotal: order.precioTotal
        };
      }

    }
    // Mostrar la información agrupada en el formato HTML
    selectedItemsTableBody = document.getElementById("selectedItemsTableBody");

    for (const comandaNumber in ordersByComanda) {
      if (ordersByComanda.hasOwnProperty(comandaNumber)) {
        const orderInfo = ordersByComanda[comandaNumber];
        
        // Crear una nueva fila en la tabla con la información agrupada
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${comandaNumber}</td>
          <td>${orderInfo.cantidad}</td>
          <td>R$${orderInfo.precioTotal.toFixed(2)}</td>
          <td class="columnAction"><button class="editaButton" title="Edita comanda"><i class="bx bxs-chevron-up-circle"></button></td>
        `;
        selectedItemsTableBody.appendChild(newRow);
      }
    }
    const totalComandasElement = document.querySelector('.TotalComandas');
    const totalItemsElement = document.querySelector('.TotalItems');
    const totalFacturadoElement = document.querySelector('.totalFacturado');
    totalComandasElement.textContent = totalComandas;
    totalItemsElement.textContent = totalItems;
    totalFacturadoElement.textContent = `R$${totalFacturado.toFixed(2)}`;

    // Agregar evento de clic a los botones de edición
    const editButtons = document.querySelectorAll('.editaButton');
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Obtener el número de comanda de la fila actual
        const comandaNumber = button.closest('tr').querySelector('td:first-child').textContent;

        // Redirigir a edit.html con el número de comanda como parámetro
        //window.location.href = `edit.html?comanda=${comandaNumber}`;
        window.open(`edit.html?comanda=${comandaNumber}`, '_blank');
      
      });
    });
});
