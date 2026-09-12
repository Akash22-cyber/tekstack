// Mock Weather API
function weatherAPI(city) {

    return new Promise((resolve, reject) => {

        // Check for missing city name
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

        // Check if city exists
        if (weatherData[city]) {
            resolve(weatherData[city]);
        } else {
            reject(new Error("City not found"));
        }
    });
}


// Asynchronous function using async/await
async function getWeather(city) {

    try {

        // Call API using await
        const temperature = await weatherAPI(city);

        console.log(`Temperature in ${city} is ${temperature}°C`);

        return `Temperature in ${city} is ${temperature}°C`;

    } catch (error) {

        console.log(`Failed to fetch weather: ${error.message}`);

        return `Failed to fetch weather: ${error.message}`;

    } finally {

        // Always executed
        console.log("Weather check completed");
    }
}


// Function called by the HTML button
async function checkWeather() {

    const city = document.getElementById("city").value;

    const result = await getWeather(city);

    document.getElementById("result").innerText = result;
    document.getElementById("completed").innerText = "Weather check completed";
}
