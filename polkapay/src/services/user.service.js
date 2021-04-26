import http from "../http-common";

class UserDataService {
  async getAll() {
    return http.get("/users");
  }

  async get(id) {
    return http.get(`/users/${id}`);
  }

  async login(data) {
    return http.post("/users/login", data);
  }

  async logout(data) {
    return http.post("/users/logout", data);
  }

  async register(data) {
    return http.post("/users", data)
  }

  async publish(data) {
    return http.post("/users/publish", data)
  }

  async purchase(data) {
    return http.post("/users/purchase", data)
  }

  async register(data) {
    return http.post("/users", data)
  }

  async update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  async delete(id) {
    return http.delete(`/users/${id}`);
  }

  async deleteAll() {
    return http.delete(`/users`);
  }

  async findByTitle(title) {
    return http.get(`/users?title=${title}`);
  }
}

export default new UserDataService();