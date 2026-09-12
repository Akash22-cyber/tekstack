// Mock Weather API
function weatherAPI(city) {

    return new Promise((resolve, reject) => {

        // Handle missing city name
        if (!city || city.trim() === "") {
            reject(new Error("City name is missing"));
            return;
        }

        // Predefined weather data
        const weatherData = {
            "Sydney": 28,
            "London": 15,
            "Mumbai": 32,
            "Delhi": 35,
            "New York": 20,
            "Tokyo": 25
        };

        // Remove extra spaces and make input case-insensitive
        const inputCity = city.trim();

        const matchedCity = Object.keys(weatherData).find(
            key => key.toLowerCase() === inputCity.toLowerCase()
        );

        // Check whether city exists
        if (matchedCity) {
            resolve(weatherData[matchedCity]);
        } else {
            reject(new Error("City not found"));
        }
    });
}


// Async function using async/await
async function getWeather(city) {

    try {

        const temperature = await weatherAPI(city);

        console.log(`Temperature in ${city.trim()} is ${temperature}°C`);

        return `Temperature in ${city.trim()} is ${temperature}°C`;

    } catch (error) {

        console.log(`Failed to fetch weather: ${error.message}`);

        return `Failed to fetch weather: ${error.message}`;

    } finally {

        console.log("Weather check completed");
    }
}


// Function for HTML button
async function checkWeather() {

    const city = document.getElementById("city").value;

    const result = await getWeather(city);

    document.getElementById("result").innerText = result;
    document.getElementById("completed").innerText =
        "Weather check completed";
}
