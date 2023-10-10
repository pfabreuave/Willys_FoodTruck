document.addEventListener("DOMContentLoaded", function() {
    // Tu código JavaScript aquí
var numeroComanda = prompt("indique la comanda a imprimir: ")
//let numeroComanda = prompt("Entre un número: ");
    
while (numeroComanda == null || /\D/.test(numeroComanda) || numeroComanda == "") {
    numeroComanda = prompt("Entre un valor VÁLIDO: ");
};
// const comanda = JSON.parse(localStorage.getItem("comanda1"));


// Obtener el contenedor de los elementos de la factura y el campo del total
//var invoiceItemsContainer = document.getElementById("invoiceItems");
//var totalAmountField = document.getElementById("totalAmount");

var fechaElement = document.getElementById("fecha");

var today = new Date();
fechaElement.textContent = today.toLocaleString();


// Función para generar y mostrar los elementos de la factura
function generarFactura(comanda) {
    
    var total = 0;
    var cant_items = 0;
    // Limpiar cualquier contenido existente en el contenedor de elementos de la factura
    //invoiceItemsContainer.innerHTML = '';

    // Generar elementos de la factura para cada artículo en la comanda
    comanda = JSON.parse(localStorage.getItem("orders")) || [];
    
    const seleccion = comanda.filter((item) => item.comanda == numeroComanda);
    
    seleccion.forEach((item) => {
        const precioTotalItem = item.price * item.quantity;
        cant_items += item.quantity
        total += precioTotalItem;
        document.getElementById("tabla").innerHTML +=
					'<tr><td>'+item.quantity+'</td><td>'
					+item.name+'</td><td style="text-align: right;">'+item.price.toFixed(2)+'</td></tr>'	
        
    });
        console.log("total " + total)
        document.getElementById("tabla").innerHTML +=
                    '<tr><td>'+cant_items+'</td><td>'
                    +"TOTAL"+'</td><td style="text-align: right;">'+total.toFixed(2)+'</td></tr>'
}

// Llamar a la función para generar la factura usando la comanda obtenida del Local Storage
generarFactura(numeroComanda);
})

function imprimir() {
    window.print();
  }