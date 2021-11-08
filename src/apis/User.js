import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async register(form) {
    await Csrf.getCookie();

    return Api.post("/Registration", form);
  },

  async login(loginform) {
    await Csrf.getCookie();

    return Api.post("/Login", loginform);
  },

  async logout() {
    await Csrf.getCookie();

    return Api.post("/Logout");
  },

  auth() {
    return Api.get("/user");
  },
  
  async updateUser(UserUpdate) {
    await Csrf.getCookie();

    return Api.post("/UpdateUser", UserUpdate);
  },
  getUserList() {
  return Api.get("/getUserList");
  },
};
