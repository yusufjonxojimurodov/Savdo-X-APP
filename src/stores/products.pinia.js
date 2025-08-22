import { defineStore } from "pinia";
import {
  ApiBasketProduct,
  ApiDeleteProduct,
  ApiGetBanners,
  ApiGetBasketProduct,
  ApiGetProductInformation,
  ApiGetProducts,
  ApiPostConfirmationProduct,
} from "../api/products.api";
import { message } from "ant-design-vue";

const useProducts = defineStore("producst", {
  state: () => ({
    products: [],
    basketProducts: [],
    banners: [],
    product: {},
    loader: false,
  }),

  actions: {
    async getProducts(params = {}) {
      const { search = null } = params;
      this.loader = true;

      return ApiGetProducts(search)
        .then(({ data }) => {
          this.products = data;
        })
        .catch((getError) => {
          message.warn("Internetga ulanmagan");
          console.error(getError);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    async basketProduct(productId) {
      try {
        await ApiBasketProduct(productId);
        message.success("Mahsulot savatchaga qoshildi");
      } catch (errorBasket) {
        const errorMessage =
          errorBasket.data?.response?.message ||
          "Mahsulotni savatchaga qo'shib bo'lmadi";
        message.error(errorMessage);
      }
    },

    async basketProductGet(params = {}) {
      const { search = null } = params;
      this.loader = true;

      try {
        const { data } = await ApiGetBasketProduct(search);
        this.basketProducts = data;

        console.log("Basket:", this.basketProducts);
      } catch (errorGet) {
        const errorMessage =
          errorGet.data?.response?.message || "Mahsulot topilmadi";
        message.error(errorMessage);
      } finally {
        this.loader = false;
      }
    },

    async deleteBasketProduct(id) {
      return ApiDeleteProduct(id)
        .then(() => {
          this.basketProducts = this.basketProducts.filter(
            (item) => !id.includes(item._id)
          );

          this.basketProductGet();
        })
        .catch((errorDelete) => {
          const errorDeleteMessage =
            errorDelete.data?.response?.message ||
            "Mahsulotni savatchadan o'chirib bo'lmadi";
          message.error(errorDeleteMessage);
          throw errorDelete;
        });
    },

    getBanenrs() {
      this.loader = true;
      ApiGetBanners()
        .then(({ data }) => {
          this.banners = data;
        })
        .catch((getErr) => {
          message.error(getErr);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getProductInfo(id) {
      this.loader = true;

      ApiGetProductInformation(id)
        .then(({ data }) => {
          this.product = data;
        })
        .catch((getErr) => {
          const errorMessage =
            getErr.data?.response?.message || "Server Xatosi";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    async ApiPostPendingProduct(information) {
      this.loader = true;

      return ApiPostConfirmationProduct(information)
        .then(() => {
          message.success(
            "Sizga aloqaga chiqib mahsulotni tasdiqlaymiz. 24 soatgacha vaqt olishi mumkin"
          );
        })
        .catch((errPost) => {
          message.error("Xato" + errPost);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default useProducts;
