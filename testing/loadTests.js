import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '3m0s',
  rps: 1
};

export default function() {
  let randomNum = Math.floor(Math.random() * (10000000 - 9000000 + 1) + 9000000);
  let res = http.get(`http://localhost:3002/api/images/${randomNum}`);
  check(res, {
    'success': (r) => r.status == 200
  });
};