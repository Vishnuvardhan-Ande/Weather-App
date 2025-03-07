async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const apiKey = "9f0142f442425084ca4aef7e4f5c0555"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const loadingElement = document.getElementById('loading');
    const weatherCard = document.getElementById('weatherCard');

    try {
        loadingElement.classList.remove('d-none'); // Show loading
        weatherCard.classList.add('d-none'); // Hide weather card

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            document.getElementById('cityName').innerText = `Weather in ${data.name}`;
            document.getElementById('temperature').innerText = `🌡️ ${data.main.temp}°C`;
            document.getElementById('condition').innerText = data.weather[0].description;
            document.getElementById('feelsLike').innerText = `${data.main.feels_like}°C`;

            document.getElementById('humidity').innerText = data.main.humidity;
            document.getElementById('windSpeed').innerText = data.wind.speed;
            document.getElementById('pressure').innerText = data.main.pressure;

            // Hide loading indicator after data fetch
            loadingElement.classList.add('d-none');
            weatherCard.classList.remove('d-none');

            // Weather Icon
            const icon = data.weather[0].icon;
            const weatherIcon = document.getElementById('weatherIcon');
            weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            weatherIcon.classList.remove('d-none');

            // Display emoji
            displayWeatherEmoji(data.weather[0].main);

            // Change background
            changeBackground(data.weather[0].main);
        } else {
            loadingElement.classList.add('d-none'); // Hide loading
            alert(`City not found: ${city}. Please check spelling.`);
        }
    } catch (error) {
        loadingElement.classList.add('d-none'); // Hide loading
        alert("Error fetching data. Please check your internet connection.");
    }
}

// Function to display weather emoji
function displayWeatherEmoji(weather) {
    const emojiMap = {
        "Clear": "☀️",
        "Clouds": "⛅",
        "Rain": "🌧️",
        "Thunderstorm": "⛈️",
        "Snow": "❄️",
        "Mist": "🌫️",
        "Fog": "🌫️",
        "Drizzle": "🌦️"
    };

    document.getElementById('condition').innerHTML += ` <span class="fs-3">${emojiMap[weather] || "🌎"}</span>`;
}

// Function to change background based on weather
function changeBackground(weather) {
    const body = document.body;
    const backgroundMap = {
        "Clear": "url('images/clear.jpg')",
        "Clouds": "url('images/cloudy.jpg')",
        "Rain": "url('images/rain.jpg')",
        "Thunderstorm": "url('images/thunderstorm.jpg')",
        "Snow": "url('images/snow.jpg')",
        "Mist": "url('images/mist.jpg')",
        "Fog": "url('images/mist.jpg')",
        "Drizzle": "url('images/drizzle.jpg')"
    };

    body.style.backgroundImage = backgroundMap[weather] || "url('images/default.jpg')";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
}
