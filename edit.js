var numeroComanda2 = 0;
var numeroComanda = 0;
var comanda
document.addEventListener("DOMContentLoaded", function() {

  var numeroComandaInput = document.querySelector(".numeroComandaInput");
  var submitButton = document.querySelector(".button-74");

  const urlParams = new URLSearchParams(window.location.search);
  var paramComanda = urlParams.get('comanda');
  if (paramComanda > 0){
    numeroComanda = paramComanda;
    procesaComanda()
  }

  submitButton.addEventListener("click", function() {
    
      numeroComanda = numeroComandaInput.value;
      while (numeroComanda == null || /\D/.test(numeroComanda) || numeroComanda == "") {
        numeroComanda = prompt("Entre un valor VÁLIDO: ");
      };
      procesaComanda()
    
    });
    // Resto de tu código para procesar la comanda
    // ...

      function procesaComanda() {
            const totalElement = document.querySelector(".total");
            const comandElement = document.querySelector(".comand");
            const cantItemElement = document.querySelector(".cantItems");
            comandElement.innerHTML = numeroComanda;
            numeroComanda2 =  numeroComanda;
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
                <td>${item.cantidad}</td>
                <td><img src="${item.img}" alt="Imagen del artículo seleccionado" style="width: 50px; height: 50px;"></td>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>R$${item.precioTotal.toFixed(2)}</td>
                <td><button class="cambiosButton" title="!-- Botón de eliminar --"><i class="bx bxs-chevron-up-circle"></button></td> <!-- Botón de eliminar -->
              `;
        
              // Agregar la nueva fila a la tabla
              selectedItemsTableBody.appendChild(newRow);
        
              acumulador = acumulador + item.precioTotal
              acumulaItems = acumulaItems + item.cantidad
            });
            totalElement.innerHTML = acumulador.toFixed(2);
            cantItemElement.innerHTML = acumulaItems;

            numeroComandaInput.value = "";
            numeroComandaInput.focus();
      }
});
