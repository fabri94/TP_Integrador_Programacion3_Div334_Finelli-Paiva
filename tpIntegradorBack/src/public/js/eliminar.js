let formProductosPorId = document.getElementById("input");

let url = "http://localhost:3000/api/products";

formProductosPorId.addEventListener("submit", (event) => {
    event.preventDefault();
    //alert("Formulario no enviado");

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    let idProd = data.id;
    console.log(data)
    console.log(idProd)
    eliminarPorId(idProd);
})

async function eliminarPorId(id){
    try {
        let response = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "DELETE"
        });

        let result = await response.json();

        if(response.ok) {
            alert(result.message);
        }

    } catch(error) {
            console.error("Error en la solicitud DELETE: ", error);
            alert("Ocurrio un error al eliminar un producto");
    }
}