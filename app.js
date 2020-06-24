window.addEventListener('load', () => {
    let long
    let lat
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let temperatureDescription = document.querySelector('.temperature-description')
    let degreeSection = document.querySelector('.degree-section')
    let degreeSpan = document.querySelector('.degree-section span')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=48766d9509a04924c8049a4063754907`

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const timeZone = data.sys.country + ' / ' + data.name
                const temp = Math.round(parseFloat(data.main.temp) - 273.15)
                const description = data.weather[0].description
                const icon = data.weather[0].icon
                const tempFahrenheit = (temp * (9 / 5)) + 32

                //Set Dom Elements From The API. 
                locationTimezone.textContent = timeZone
                temperatureDegree.textContent = temp
                temperatureDescription.textContent = description

                //Set Icon
                setIcons(icon, document.querySelector('.icon'))

                //Change Temperature To Celsius/Fahrenheit
                degreeSection.addEventListener('click', () => {
                    if (degreeSpan.textContent === 'C') {
                        degreeSpan.textContent = 'F'
                        temperatureDegree.textContent = tempFahrenheit.toFixed(1)
                    }
                    else {
                        degreeSpan.textContent = 'C'
                        temperatureDegree.textContent = temp
                    }
                })
            })
        })

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({'color':'white'})
        let currentIcon = ''
        if (icon === '04d' || icon === '02d') currentIcon = 'PARTLY_CLOUDY_DAY'
        else if (icon === '04n' || icon === '02n') currentIcon = 'PARTLY_CLOUDY_NIGHT'
        else if (icon === '01d') currentIcon = 'CLEAR_DAY'
        else if (icon === '01n') currentIcon = 'CLEAR_NIGHT'
        else if (icon === '03d' || icon === '03n') currentIcon = 'CLOUDY'
        else if (icon === '09d' || icon === '09n') currentIcon = 'RAIN'
        else if (icon === '10d' || icon === '10n' || icon === '11d' || icon === '11n') currentIcon = 'SLEET'
        else if (icon === '13d' || icon === '13n') currentIcon = 'SNOW'
        else if (icon === '50d' || icon === '50n') currentIcon = 'FOG'
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }

})
