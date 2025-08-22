import { defineStore } from "pinia";
import { ApiGetHeadphones, ApiGetSmartphones, ApiGetWatches } from "../api/filter.products.api";
import { message } from "ant-design-vue";

const useFilterProducts = defineStore("filterProducts", {
  state: () => ({
    smartPhones: [],
    watches: [],
    headphones: [],
    loader: false,
  }),

  actions: {
    getSmartphones(params = {}) {
      const { search = null, model = null } = params;
      this.loader = true;

      ApiGetSmartphones(search, model)
        .then(({ data }) => {
          this.smartPhones = data;
        })
        .catch((getErr) => {
          message.error(getErr);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getWatches(params = {}) {
      const { search = null, model = null } = params;
      this.loader = true;

      ApiGetWatches(search, model)
        .then(({ data }) => {
          this.watches = data;
        })
        .catch((getErr) => {
          message.error(getErr);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getHeadphones(params = {}) {
      const { search = null, model = null } = params;
      this.loader = true;

      ApiGetHeadphones(search, model)
        .then(({ data }) => {
          this.headphones = data;
        })
        .catch((getErr) => {
          message.error(getErr);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default useFilterProducts;
