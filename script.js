async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const apiKey = "9f0142f442425084ca4aef7e4f5c0555"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            document.getElementById('cityName').innerText = `Weather in ${data.name}`;
            document.getElementById('temperature').innerText = `${data.main.temp}°C`;
            document.getElementById('condition').innerText = data.weather[0].description;

            document.getElementById('humidity').innerText = data.main.humidity;
            document.getElementById('windSpeed').innerText = data.wind.speed;
            document.getElementById('pressure').innerText = data.main.pressure;

            document.getElementById('loading').classList.remove('d-none');
            document.getElementById('loading').classList.add('d-none');

            const icon = data.weather[0].icon;
            document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            document.getElementById('weatherIcon').classList.remove('d-none');

            document.getElementById('weatherCard').classList.remove('d-none');

            changeBackground(data.weather[0].main);
        } else {
            alert(`City not found: ${city}. Please check spelling.`);
        }
    } catch (error) {
        alert("Error fetching data. Please check your internet connection.");
    }
}

function changeBackground(weather) {
    const body = document.body;

    switch (weather.toLowerCase()) {
        case "clear":
            body.style.backgroundImage = "url('images/clear.jpg')";
            break;
        case "clouds":
            body.style.backgroundImage = "url('images/cloudy.jpg')";
            break;
        case "rain":
            body.style.backgroundImage = "url('images/rain.jpg')";
            break;
        case "thunderstorm":
            body.style.backgroundImage = "url('images/thunderstorm.jpg')";
            break;
        case "snow":
            body.style.backgroundImage = "url('images/snow.jpg')";
            break;
        default:
            body.style.backgroundImage = "url('images/cloud.png')";
            break;
    }


    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
}