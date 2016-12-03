var NodeGeocoder = require('node-geocoder');
import { config } from '../config';
// connect to google geocoding api
var geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: config.googleMaps.apiKey
});
// connect to forecast api
var Forecast = require('forecast.io');


// Forecast.io api options
var options = {
    APIKey: config.forecast.APIKey,
    units: "uk2" // use SI units, except miles
}, forecast = new Forecast(options);




var getForecastLatLong = function (lat: number, long: number, callback: Function) {
    forecast.get(lat, long, options, function (err, res, data) {
        if (err) { throw err; };
        //console.dir(data); 
        callback(data);
    });
};
var getLatLong = function (query: string, callback: (lat: number, long: number) => any) {
    geocoder.geocode(query, function (err, res) {
        if (err) { throw err; };
        callback(res.latitude, res.longitude);
    });
};
var getForecastSearch = function (query: string, callback: Function) {
    getLatLong(query, function(lat, long){
        getForecastLatLong(lat, long, function(data){
            callback(data);
        })
    });
}