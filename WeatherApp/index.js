const apiKey = "f2bcbeefcc36da98c3cc2df96ad9a58a";

const weatherDataEl = document.getElementById("weather-data");
const noDataBlokc =  document.getElementById("no-data");

const cityInputEl = document.getElementById("city-input");

const formEl  = document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
   event.preventDefault();
   const  txt_city =  cityInputEl.value;
   getWeatherData(txt_city);

});


async function getWeatherData(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if(!response.ok){
            // throw new Error("Api peftch error ");
            noDataBlokc.style.display ='block';
            weatherDataEl.style.display ='none';
        }else{
            noDataBlokc.style.display ='none';
            weatherDataEl.style.display ='block';
        }

        const data = await response.json();
        console.log(data);

        const weatherIcon = data.weather[0].icon;
        const weatherDesc =  data.weather[0].main;
        const temprature =  data.main.temp;
        // const humudity = data.main.humidity;
        // const windspeed=  data.wind.speed;
        const details =  [
            `<div> Feels like : ${Math.round(data.main.feels_like)} Celcius </div>`,
            `<div> Humidity : ${Math.round(data.main.humidity)} % </div>`,
            `<div> Wind: ${Math.round(data.wind.speed)} m/s </div>`, 
        ];

        weatherDataEl.querySelector('.icon').innerHTML=`<img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon" srcset="">`
        weatherDataEl.querySelector('.temprature').textContent = temprature
        weatherDataEl.querySelector('.description').textContent = weatherDesc
        weatherDataEl.querySelector('.details').innerHTML = 
        `${details[0]}
         ${details[1]}
         ${details[2]}
        `;       
    
    }catch(error){
        console.error(error);
    }
}
