import { defineStore } from "pinia";
import {
  ApiGetBuyyedProduct,
  ApiGetPendingProductsBuyer,
} from "../api/history.api";
import { message } from "ant-design-vue";

const useHistory = defineStore("history", {
  state: () => ({
    pendingProducts: [],
    buyyedProducts: [],
    loader: false,
  }),

  actions: {
    getPendingProductBuyer() {
      this.loader = true;

      ApiGetPendingProductsBuyer()
        .then(({ data }) => {
          this.pendingProducts = data;
        })
        .catch((errGet) => {
          message.error("Xato" + errGet);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getDeliveryProducts() {
      this.loader = true;

      ApiGetBuyyedProduct()
        .then(({ data }) => {
          this.buyyedProducts = data.deliveries;
        })
        .catch((errorGet) => {
          message.error(errorGet);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default useHistory;
