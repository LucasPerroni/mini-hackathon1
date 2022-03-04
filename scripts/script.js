let latitude = 0
let longitude = 0

pegarLocalizacaoAtual()

function pegarLocalizacaoAtual() {
    navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        pegarAPI()
    }, 
    function(error) {
        document.querySelector('main').innerHTML = `
        <div class="input">
            <h1>Informe a sua localização:</h1>
            <div>
                <label for="input-latitude">Latitude:</label>
                <input type="text" placeholder="-35.324" id="input-latitude">
            </div>
            <div>
                <label for="input-latitude">Longitude:</label>
                <input type="text" placeholder="-121.651" id="input-longitude">
            </div>
            <button onclick="informarLocalizacao()">Confirmar</button>
        </div>
        `
    })
}

function informarLocalizacao() {
    latitude = parseFloat(document.getElementById("input-latitude").value)
    longitude = parseFloat(document.getElementById("input-longitude").value)
    if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
        document.querySelector('main').innerHTML = `
        <div class="cidade-clima">
            <h1 id="cidade">---</h1>
            <img src="" alt="icone do clima">
        </div>
        <h1 id="temperatura">---</h1>
        <hr>
        <div class="condicoes-clima">
            <p id="sensacaoTermica">Sensação térmica:<span></span></p>
            <p id="tempMin">Temperatura mínima:<span></span></p>
            <p id="tempMax">Temperatura máxima:<span></span></p>
            <p id="humidade">Humidade:<span></span></p>
            <p id="pressao">Pressão:<span></span></p>
        </div>
        `
        pegarAPI()
    } else {
        alert('ERROR')
    }
}

function pegarAPI() {
    let promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8ca7f91913b5e93d208f4b86f7143807`)
    promise.then(modificarHTML)
    promise.catch(error => {console.log(error.response)})
}

function modificarHTML(response) {
    let API = response.data

    document.getElementById("cidade").innerHTML = API.name
    document.querySelector("img").setAttribute("src", `http://openweathermap.org/img/w/${API.weather[0].icon}.png`)
    document.getElementById("temperatura").innerHTML = `${(parseInt(API.main.temp) - 273)}°C`
    document.querySelector("#sensacaoTermica span").innerHTML = `${(parseInt(API.main.feels_like) - 273)}°C`
    document.querySelector("#tempMin span").innerHTML = `${(parseInt(API.main.temp_min) - 273)}°C`
    document.querySelector("#tempMax span").innerHTML = `${(parseInt(API.main.temp_max) - 273)}°C`
    document.querySelector("#humidade span").innerHTML = `${API.main.humidity}%`
    document.querySelector("#pressao span").innerHTML = `${API.main.pressure} hPa`
}
