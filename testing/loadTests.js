import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 20,
  duration: '3m30s',
  rps: 100
};

export default function() {
  // test GET
  let randomNum = Math.floor(Math.random() * (10000000 - 9000000 + 1) + 9000000);
  let res = http.get(`http://localhost:3002/api/images/${randomNum}`);
  check(res, {
    'success': (r) => r.status == 200
  });

  // test POST
  let gameData = {
    gameName:'testPost'
    // images: {
    //   "image1": "http://lorempixel.com/600/337/animals/1",
    //   "image2": "http://lorempixel.com/600/337/animals/2",
    //   "image3": "http://lorempixel.com/600/337/animals/3",
    //   "image4": "http://lorempixel.com/600/337/animals/4",
    //   "image5": "http://lorempixel.com/600/337/animals/5",
    //   "image6": "http://lorempixel.com/600/337/animals/6",
    //   "image7": "http://lorempixel.com/600/337/animals/7",
    //   "image8": "http://lorempixel.com/600/337/animals/8",
    //   "image9": "http://lorempixel.com/600/337/animals/9",
    //   "image10": "http://lorempixel.com/600/337/animals/10"
    // }
  };

  // let res = http.post(`http://localhost:3002/api/images`, gameData);
  // check(res, {
  //   'success': (r) => r.status == 200
  // });
};