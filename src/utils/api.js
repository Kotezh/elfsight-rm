import { URL } from "./constants";

class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  _parseResponse(res) {
    if (res.ok || res.status === 404) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getAllCharacters(page = 1, filters = "") {
    return fetch(`${this.url}/api/character/?page=${page}${filters}`, {
      headers: this.headers,
    }).then(this._parseResponse);
  }
}

const config = {
  baseUrl: URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = new Api(config);

export default api;
