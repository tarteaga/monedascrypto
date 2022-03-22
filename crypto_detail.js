const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
async function onRequestAwait() {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    const usersJson = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    detail(usersJson);
  } catch (error) {
    console.log(error);
  } finally {
    document.getElementById("loader").style.display = "none";
  }
}
onRequestAwait();
function detail(usersJson) {
  const nombre = document.getElementById("nombre");
  nombre.textContent = usersJson.name;
  const imagen = document.getElementById("imagen");
  imagen.src = usersJson.image.large;
  imagen.style.display = "block";
  const precio = document.getElementById("precio");
  precio.textContent = usersJson.market_data.current_price.eur + " €";
  const porcentaje = document.getElementById("porcentaje");
  porcentaje.textContent =
    usersJson.market_data.market_cap_change_percentage_24h;
  const subidaybajada = document.getElementById("subidaybajada");

  if (usersJson.market_data.market_cap_change_percentage_24h > 0) {
    console.log("SUBIDO!");
    subidaybajada.src =
      "https://upload.wikimedia.org/wikipedia/commons/5/50/Green_Arrow_Up.svg";
    subidaybajada.style.display = "block";
  } else if (usersJson.market_data.market_cap_change_percentage_24h == 0) {
    console.log("Se mantiene");
  } else {
    console.log("BAJADO!");
    subidaybajada.src =
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Red_Arrow_Down.svg";
    subidaybajada.style.display = "block";
  }
}
