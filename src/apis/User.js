import Api from "./Api";
import Csrf from "./Csrf";

export default {
   register(form) {
     Csrf.getCookie();

    return Api.post("/#/Authorization", form);
  }
};