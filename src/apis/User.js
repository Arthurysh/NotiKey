import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async register(form) {
    await Csrf.getCookie();

    return Api.post("/Registration", form);
  },

  async login(loginform) {
    await Csrf.getCookie();

    return Api.post("/Login", loginform)
  }
};