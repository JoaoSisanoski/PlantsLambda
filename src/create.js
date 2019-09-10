const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.create = async (event, context) => {
    try {
        const timestamp = new Date().getTime();
        const data = event;
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            // Temp (C)	Humidity %	hum_1%	hum_2%	hum_3%	
            Item: {
                air_temp: data.air_temp,
                air_hum: data.air_hum,
                soil_moisture_1: data.soil_moisture_1,
                soil_moisture_2: data.soil_moisture_2,
                soil_moisture_3: data.soil_moisture_3,
                plant_name : data.plant_name,
                timestamp: timestamp
            },
        };
        const results = await dynamoDb.put(params).promise()
        return { statusCode: 200, body: JSON.stringify({ params, results }) };
    } catch (error) {
        return {
            statusCode: 400,
            error: "Could not post: " + error
        };
    }
};