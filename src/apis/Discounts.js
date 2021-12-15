import Api from "./Api";


export default {

    getDiscounts() {
        return Api.get(`/getDiscounts`);
    },
    getDiscountManager(SaleObj) {
        return Api.get(`/getDiscount?stationId=${SaleObj}`);
    },
    addDiscount(addObj) {
        return Api.post(`/addDiscount`, addObj);
    },
    deleteDiscount(delObj) {
        return Api.post(`/deleteDiscount`, delObj);
    }
};