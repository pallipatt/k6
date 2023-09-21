import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 20, // Virtual Users
  duration: '30s', // Duration of the test
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should complete within 500ms
    http_req_failed: ['rate<0.1'], // Request failure rate should be less than 10%
  },
};

export default function () {
  let payload = {
    email: "aaliasiuk@gazelle.com",
    password: "Pass123!"
  };

  let headers = { 'Content-Type': 'application/json' };

  let response = http.post('https://qa-us-globalauth.ecoatm.com/globalauth/api/v1/auth/login', JSON.stringify(payload), { headers: headers });

  // Assertions
  check(response, {
    'Status is 200': (res) => res.status === 200,
    // Add more assertions as needed
  });

  console.log(response.body);
  
}









// // This script tests the Passenger API of an airline company
// // import the http module and check function from the k6 library
// import http from 'k6/http';
// import { check } from 'k6';

// // Define the stages of the load test using the options variable
// export let options = {
//     stages: [
//         { duration: "1s", target: 5 }, //Stage 1: 1 second duration and target of 5 requests per second
//         //Ramp up to 15 VUs for 1 minute
//         //{ duration: "1m", target: 15 }, // Stage 2: 1 minute duration and target of 15 requests per second
//         // Decrease to 0 VUs for 20 seconds
//         { duration: "20s", target: 0 }, // Stage 3: 20 second duration and target of 0 requests per second
//       ],
// };

// // Set the base URL of the API
// const baseUrl = 'https://api.instantwebtools.net/v1';

// // The default function is exported and will be executed for each virtual user during the load test
// export default function() {
//   // Define the payload to be sent with the request
//   const data = JSON.stringify({
//     "name": "John Doe",
//     "trips": 250,
//     "airline": 5
// });

//   // Define the headers to be sent with the request
//   let headers = { 'Content-Type': 'application/json' };

//   // Make a POST request to the API endpoint with the payload and headers
//   let response = http.post(`${baseUrl}/passenger`, data, { headers: headers });

//   // Check the response for various conditions
//   check(response, {
//     'status is 200': (r) => r.status === 200, // Check if the status is 200
//   });

//   // If the status is not 201, log the error to the console
//   if (response.status !== 200){
//     console.log(response.body);
//   }
// }