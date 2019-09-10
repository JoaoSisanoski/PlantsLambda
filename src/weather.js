const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const DarkSky = require('dark-sky')
const darksky = new DarkSky(process.env.DARK_SKY) 
var latitude = -39.675520
var longitude = 176.893710
var options = {
    latitude,
    longitude,
    exclude: ['minutely', 'daily', 'hourly',  'alerts', 'flags'],
    units: 'si'
  }
module.exports.weather = async (event) => {
    try {
        const forecast = await darksky.options(options).get()
        var currently = forecast.currently
        currently["latitude"] = latitude
        currently["longitude"] = longitude
        currently["location"] = "home"
        const params = {
            TableName : process.env.WEATHER_TABLE,
            Item : currently
        }
        await dynamoDb.put(params).promise()
        return { statusCode: 200, body: {"response":  "All G"}};
      } catch (err) {
        return { statusCode: 400, body: {"response":  "Could not post: " + err}};
      }
}