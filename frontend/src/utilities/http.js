const { API_KEY } = require('../utilities/contants');

class Http {
  get = (path) => fetch(path, {
      headers: {
        'api_key': API_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 400) {
          return res;
        }
        throw res;
      })
      .then((res) => {
        if (res.clone().json()) {
          return res.clone().json();
        }
        return res;
      });
}

export default new Http();
