import axios from "axios";
import decode from "jwt-decode";

function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

class ApiService {
  constructor() {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        localStorage.removeItem("token");
        location.reload();
      }
    );
  }
  async login(email, password) {
    const results = axios.post("http://localhost:3000/users/login", {
      email,
      password,
    });
    return results;
  }

  async register(email, username, password) {
    const results = axios.post("http://localhost:3000/users/register", {
      email,
      username,
      password,
    });
    return results;
  }

  async getChips() {
    const token = getToken();
    const results = (
      await axios.get("http://localhost:3000/users/chips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    return results;
  }
  async postChips(num) {
    const token = getToken();
    // const { user_id } = decode(token);
    const results = (
      await axios.post(
        `http://localhost:3000/users/chips`,
        {
          chips: num,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;
    return results;
  }
  async getDailyGame() {
    const token = getToken();
    const { user_id } = decode(token);
    const results = (
      await axios.get(`http://localhost:3000/users/dailygame/${user_id}`)
    ).data;
    return results;
  }
  async postDailyGame(num) {
    const token = getToken();
    const { user_id } = decode(token);
    const results = (
      await axios.post(`http://localhost:3000/users/dailygame/${user_id}`, {
        daily_game: num,
      })
    ).data;
    return results;
  }
}

export const apiService = new ApiService();
