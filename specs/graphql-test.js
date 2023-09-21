import http from 'k6/http';
import { check, sleep } from 'k6';

// init 
export let options = {
  stages: [
    { duration: '30s', target: 50 },   // Ramp-up to 50 virtual users over 30 seconds
    { duration: '1m', target: 50 },    // Maintain 50 virtual users for 1 minute
    { duration: '30s', target: 0 },    // Ramp-down to 0 virtual users over 30 seconds
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'], // 95% of requests should complete within 500ms
    'http_req_duration': [{ threshold: 'p(95)<1', abortOnFail: true, delayAbortEval: '1min' }],
    'http_req_duration': ['avg<1000'],  // Average response time should be less than 1000ms
    'http_req_duration': ['max<2000'],  // Maximum response time should be less than 2000ms
  },
};

let payload = {
  email: "aaliasiuk@gazelle.com",
  password: "Pass123!"
};

let headers = { 'Content-Type': 'application/json' };

// Action
export default function () {
  let response = http.post('https://qa-us-globalauth.ecoatm.com/globalauth/api/v1/auth/login', JSON.stringify(payload), { headers: headers });
  check(response, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1);
}



// import http from 'k6/http';
// import { check } from 'k6';

// export let options = {
//   vus: 10, // Number of virtual users
//   duration: '30s', // Duration of the test
//   thresholds: {
//     http_req_duration: ['p(95)<500'], // 95% of requests should complete within 500ms
//     http_req_failed: ['rate<0.1'], // Request failure rate should be less than 10%
//   },
// };

// export default function () {
//   // GraphQL query and variables
//   const query = `
//     query DeviceByID($deviceByIdId: ID!) {
//       deviceByID(id: $deviceByIdId) {
//         manufacturer
//         model
//       }
//     }
//   `;
//   const variables = {
//     deviceByIdId: '691ECB4A-8F73-4DF4-BEC2-0EC0A14B3C1A',
//   };

//   const payload = JSON.stringify({
//     query,
//     variables,
//   });

//   const headers = { 'Content-Type': 'application/json' };

//   const response = http.post('https://qov9ygad01.execute-api.us-west-2.amazonaws.com/graphql', payload, { headers });

//   // Assertions
//   check(response, {
//     'Status is 200': (res) => res.status === 200,
//     'Manufacturer is Apple': (res) => JSON.parse(res.body).data.deviceByID.manufacturer === 'Apple',
//     'Model is iPhone 13': (res) => JSON.parse(res.body).data.deviceByID.model === 'iPhone 13',
//   });
// }



// // import http from 'k6/http';
// // import { check } from 'k6';

// // export default function () {
// //   // GraphQL query and variables
// //   const query = `
// //     query DeviceByID($deviceByIdId: ID!) {
// //       deviceByID(id: $deviceByIdId) {
// //         manufacturer
// //         model
// //       }
// //     }
// //   `;
// //   const variables = {
// //     deviceByIdId: '691ECB4A-8F73-4DF4-BEC2-0EC0A14B3C1A',
// //   };

// //   const body = JSON.stringify({ query, variables });
// //   const headers = { 'Content-Type': 'application/json' };

// //   const response = http.post('https://qov9ygad01.execute-api.us-west-2.amazonaws.com/graphql', body, { headers });

// //   // Assertions
// //   check(response, {
// //     'Status is 200': (res) => res.status === 200,
// //     'Manufacturer is Apple': (res) => JSON.parse(res.body).data.deviceByID.manufacturer === 'Apple',
// //     'Model is iPhone 13': (res) => JSON.parse(res.body).data.deviceByID.model === 'iPhone 13',
// //   });
// // }
