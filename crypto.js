
async function onRequestAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur')
        const usersJson = await response.json()

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        printData(usersJson)
    } catch (error) {
        console.log(error)
    }
}



function printData(dataJSON) {
    const lista = document.getElementById("lista")
    for (const cryptoInfo of dataJSON) {
        const a = document.createElement("a")
        const p = document.createElement("p")
        const img = document.createElement("img")

        a.href = `crypto_detail.html?id=${cryptoInfo.id}`

        a.classList.add("column")
        img.classList.add("img-crypto")

        p.textContent = cryptoInfo.symbol
        img.src = cryptoInfo.image

        a.appendChild(p)
        a.appendChild(img)

        lista.appendChild(a)
    }
}


onRequestAwait()