import axios from "axios";

function getToken(){
    const token = localStorage.getItem('token');
    return token
}

class ApiService {
  async login(email, password) {
    const results = axios.post("http://localhost:3000/users/login", { email, password });
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

  async getChips(){
    const token = getToken()
    const results = (await axios.get('http://localhost:3000/users/chips',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })).data
    return results
  }
}

export const apiService = new ApiService();
