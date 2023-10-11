
document.addEventListener("DOMContentLoaded", function() {
// Obtén el número de comanda que se desea editar    
    var numeroComanda = prompt("indique la comanda a imprimir: ")
    
    while (numeroComanda == null || /\D/.test(numeroComanda) || numeroComanda == "") {
    numeroComanda = prompt("Entre un valor VÁLIDO: ");
    };
    const totalElement = document.querySelector(".total");
    const comandElement = document.querySelector(".comand");
    const cantItemElement = document.querySelector(".cantItems");
    comandElement.innerHTML = numeroComanda;
    var acumulador = 0
    var acumulaItems = 0

    // Limpiar la tabla de productos seleccionados en la comanda
    selectedItemsTableBody.innerHTML = '';
    totalElement.innerHTML = '';
    acumulador = 0;
    acumulaItems = 0;

    // Mostrar los productos de la comanda en la tabla

    const comanda = JSON.parse(localStorage.getItem("orders")) || [];
    
    const seleccion = comanda.filter((item) => item.comanda == numeroComanda);
    seleccion.forEach((item) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td><img src="${item.img}" alt="Imagen del artículo seleccionado" style="width: 50px; height: 50px;"></td>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>R$${item.price.toFixed(2)}</td>
        <td><button class="deleteButton"><i class="bx bxs-chevron-up-circle"></button></td> <!-- Botón de eliminar -->
      `;

      // Agregar la nueva fila a la tabla
      selectedItemsTableBody.appendChild(newRow);

      acumulador = acumulador + item.price
      acumulaItems = acumulaItems + 1
    });

    totalElement.innerHTML = acumulador.toFixed(2);
    cantItemElement.innerHTML = acumulaItems;

});