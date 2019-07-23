const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://api.darksky.net/forecast'
});

module.exports = instance;