const forecast = (zipCode) => {
    let geoLocationEndPoint = 'https://se-weather-api.herokuapp.com/api/v1/geo';

    let weatherEndPoint =
        'https://se-weather-api.herokuapp.com/api/v1/forecast';

    // TODO: Logic for multidate

    fetch(geoLocationEndPoint + '?zip_code=' + zipCode)
        .then((response) => {
            if (response.status !== 200) {
                console.log(
                    'Looks like there was a problem. Status Code: ' +
                        response.status
                );
            }

            response.json().then(function (data) {
                if (Object.keys(data).length !== 0) {
                    console.log(data);
                    let getCurrentDate = new Date();
                    let currentYear = getCurrentDate.getFullYear();
                    const currentMonth = getCurrentDate.getDate();
                    const currentDay = getCurrentDate.getMonth() + 1;

                    // Date format with forwardslashes
                    const dateFormat =
                        currentDay + '/' + currentMonth + '/' + currentYear;

                    const weatherForcastParams = {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        date: dateFormat,
                    };

                    // Request weather forcast for with response
                    weatherForecast(
                        data,
                        new URLSearchParams(weatherForcastParams).toString()
                    );
                }
            });
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

    // Get weather forecast
    const weatherForecast = (locationData, geolocation) => {
        fetch(weatherEndPoint + '?' + geolocation)
            .then((response) => {
                if (response.status !== 200) {
                    console.log(
                        'Looks like there was a problem. Status Code: ' +
                            response.status
                    );
                }

                response.json().then(function (data) {
                    if (Object.keys(data).length !== 0) {
                        console.log(data);

                        // Plain html test template
                        let template =
                            'Weather forcast for ' + locationData.city + '';
                        document.body.append(template);
                    }
                });
            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    };
};

export default forecast;
