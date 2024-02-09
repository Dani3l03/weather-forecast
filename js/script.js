// 0fdec863ffd779e277e0b180aef216a2
// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=0fdec863ffd779e277e0b180aef216a2

//xTj_UGmtDAMxgobUrqhkLtjBTpn9vXZniXr7pzIbERY
//EIm06F7XRlfh5VY5TdqWO-IrPpSPTWDsUtipWCShGAM

// Variáveis e seleão de elementos

const apiKeyWeather = "0fdec863ffd779e277e0b180aef216a2"
const apiCountry = "https://flagsapi.com/flat/64.png"

const cityInput = document.getElementById("city-input")
const searchBtn = document.getElementById("buscar");

const cityElement = document.getElementById("city");
const tempElement = document.querySelector("#temperature span");
const humidityElement = document.querySelector("#umidade span");
const descElement = document.getElementById("description");
const weatherIconElement = document.getElementById("weather-icon");
const windElement = document.querySelector("#vento span");
const countryElement = document.getElementById("country");

const infoElement = document.querySelector("#weather");
const errorMsg = document.querySelector("#msg-error");

// Funções


function showInfoElement(){
        infoElement.classList.remove("hide");
    } 

function showInfoWithEnter(event){
    if(event.code === "Enter"){
        const city = event.target.value;
        showWeatherData(city);
        showInfoElement();
    }
}

 async function getWeatherData(city){
    
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units-metric&appid=${apiKeyWeather}&lang=pt_br`

    const result = await fetch(apiWeatherUrl);
    const data = await result.json(); // objeto
    
    return data;
}


 async function showWeatherData(city){
    try{
    errorMsg.classList.add("hide");
    const data = await getWeatherData(city);
    const celsius = (data.main.temp - 273.15).toFixed(0);
    const weather = data.weather[0].description;
    
    cityElement.innerText = data.name;
    tempElement.innerText = celsius;
    descElement.innerText = weather[0].toUpperCase() + weather.substring(1);
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    humidityElement.innerText = data.main.humidity + "%";
    windElement.innerText = data.wind.speed + " km/h";
}catch(e){
    errorMsg.classList.remove("hide");
    infoElement.classList.add("hide");
    }
}

function handleSendForm(event){
    event.preventDefault();
    const city = cityInput.value
    showWeatherData(city);   
    showInfoElement();
}

// Eventos

searchBtn.addEventListener("click", handleSendForm);

cityInput.addEventListener("keyup", showInfoWithEnter);

