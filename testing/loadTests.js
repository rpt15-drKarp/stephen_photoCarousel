import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '60s'
};

export default function() {
  let res = http.get('http://localhost.com:3000/api/overview');
  check(res, {
    'success': (r) => r.status == 200
  });
};