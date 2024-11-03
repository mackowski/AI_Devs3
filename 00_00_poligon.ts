/*
# Sending a response

The API accepts data sent via POST in JSON format in the following structure:

{
"task": "task id",
"apikey": "Your API key",
"answer": "your answer here"
}

# Returned values

The API also responds in JSON format in the structure below.

{
"code": 0,
"message": "Return message",
}
A code of 0 (zero) means that the response has been accepted by the central.

All negative codes inform you that the central does not accept the data sent and asks you to correct it. A note about why this is happening will be included in the "message" field.

# Task

There are two strings of characters at the address below (note! They change from time to time, so do not hardcode them in your code!).

https://poligon.aidevs.pl/dane.txt

Your task is to download them and send them as an array of strings to the API endpoint:

https://poligon.aidevs.pl/verify

Necessary information:

Task name: POLIGON
Your API key: 2a453010-0b6d-4967-beb4-222732ffe128
*/

import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration constants
const API_CONFIG = {
    BASE_URL: 'https://poligon.aidevs.pl',
    TASK_NAME: 'POLIGON',
    API_KEY: process.env.API_KEY
} as const;

// Validate API key
if (!API_CONFIG.API_KEY) {
    throw new Error('API_KEY environment variable is not set');
}

interface ApiResponse {
    code: number;
    message: string;
}

async function solvePoligonTask() {
    try {
        // Fetch the strings from the data endpoint
        const dataResponse = await axios.get(`${API_CONFIG.BASE_URL}/dane.txt`);
        const strings = dataResponse.data.trim().split('\n');

        // Prepare the payload for verification
        const payload = {
            task: API_CONFIG.TASK_NAME,
            apikey: API_CONFIG.API_KEY,
            answer: strings
        };

        // Send the answer to the verification endpoint
        const verifyResponse = await axios.post<ApiResponse>(
            `${API_CONFIG.BASE_URL}/verify`,
            payload
        );

        console.log('Response:', verifyResponse.data);
        return verifyResponse.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Execute the task
solvePoligonTask();

