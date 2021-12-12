import Api from "./Api";


export default {

    getDiscounts() {
        return Api.get(`/getDiscounts`);
    }
};