import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = { 
    ext: {
        loadimpact: {
          // Project: test 1
          projectID: 3658577,
          // Test runs with the same name groups test runs together
          name: 'test 1'
        }
      },

    // stages: [
    //     { duration: '30s', target: 50 },   // Ramp-up to 50 virtual users over 30 seconds
    //     { duration: '1m', target: 50 },    // Maintain 50 virtual users for 1 minute
    //     { duration: '30s', target: 0 },    // Ramp-down to 0 virtual users over 30 seconds
    //   ]

    // (`stages`) and `scenarios` simultaneously is not allowed 
    //     shared-iterations shares iterations between VUs.
    //     per-vu-iterations has each VU run the configured iterations.


  scenarios: {
    shared_iter_scenario: {
      executor: "shared-iterations",
      vus: 10,
      iterations: 100,
      startTime: "0s",
    },
    per_vu_scenario: {
      executor: "per-vu-iterations",
      vus: 10,
      iterations: 10,
      startTime: "10s",
    },
  },

    thresholds: {
        http_req_duration: [{
           threshold: 'p(95)<500',// 95% of requests should complete within 500ms
           threshold:'max<2000',   // Max should be below 2000 ms 
           abortOnFail: true
        }], 
        http_req_failed: [{
            threshold:'rate<0.1', // Request failure rate should be less than 10%
            abortOnFail: true
        }], 
    http_req_blocked: [{
        threshold:'max < 800', // max of req_blocked should be less than 800 ms 
        abortOnFail: true
        }],
        checks: [{
            threshold:'rate=1',
            abortOnFail: true
        }]
    }
}

export default function () {
    const res = http.get('https://test.k6.io');
    
    check(res, {
        // 'is Status 200': r => r.status === 200
        'is Status 200': res.status === 200
    })
    //After each itteration 
    sleep(1);
} 

// $LASTEXITCODE  //0 Pass // 99 for Fail 