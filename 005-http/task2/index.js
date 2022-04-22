const http = require('http');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const config = require('./config.js');

const args = yargs(hideBin(process.argv)).argv;
const city = args.c || args.city;
if (!city) {
    console.log('Необходимо ввести название города (-c или --city)');
    process.exit(1);
}

const url = `${config.api}/${config.apiPath.current}?access_key=${process.env.APIAccessKey || config.APIAccessKey}&query=${city}`;

http.get(url, (res) => {
    let responseData = '';
    res.on('data', (chunk) => responseData += chunk);
    res.on('end', () => {
        try {
            const { current, location } = JSON.parse(responseData);
            console.log(`В ${location?.name}:\r\nТемпература - ${current?.temperature} ℃\r\nПогода - ${current?.weather_descriptions}\r\nСкорость ветра - ${current.wind_speed} м/с`);
        } catch (error) {
            console.error(error);
        }
    })
    res.on('error', (error) => {
        console.error(error);
    })
}).on('error', (error) => {
    console.error(error);
})
