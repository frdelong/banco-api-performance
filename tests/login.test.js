// Import the http module to make HTTP requests. From this point, you can use `http` methods to make HTTP requests.
import http from 'k6/http'

// Import the sleep function to introduce delays. From this point, you can use the `sleep` function to introduce delays in your test script.
import { sleep, check } from 'k6'

const postLogin = JSON.parse(open('../fixtures/postLogin.json'))

export const options = {
  // Define the number of iterations for the test
  // iterations: 1,
  // vus: 10,
  // duration: '30s',
  
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 30 },
    { duration: '20s', target: 30 },
    { duration: '20s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<5000'],
    http_req_failed: ['rate<0.01']
  }
}

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
  // Make a POST request to the target URL
  const url = 'http://localhost:3000/login'
  // Prepare the login payload with username and password.
  // JSON.stringify converts the JavaScript object into a JSON string for the HTTP request body.
  
  postLogin.username = "junior.lima"
  console.log(postLogin)
  const payload = JSON.stringify(postLogin)

  // Set the request headers. 'Content-Type: application/json' tells the server to expect a JSON-formatted body.
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const res = http.post(url, payload, params)

  // console.log(resposta)

  check(res, {
    'Validar que o Status é 200': (r) => r.status === 200,
    'Validar que o Token é string': (r) => typeof(r.json().token) == 'string'
  })

  // Sleep for 1 second to simulate real-world usage
  sleep(1)
}
