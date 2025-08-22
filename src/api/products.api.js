import { api } from "../utils/api/api.js";

export function ApiGetProducts(search) {
  return api({
    url: "/get/all/products",
    method: "GET",
    params: {
      search,
    },
  });
}

export function ApiBasketProduct(productId) {
  return api({
    url: "/basket/add",
    method: "POST",
    data: productId,
  });
}

export function ApiGetBasketProduct(search) {
  return api({
    url: "/basket",
    method: "GET",
    params: {
      search,
    },
  });
}

export function ApiDeleteProduct(id) {
  return api({
    url: `basket/delete?ids=${id}`,
    method: "DELETE",
  });
}

export function ApiGetBanners() {
  return api({
    url: "/banner",
    method: "GET",
  });
}

export function ApiGetProductInformation(id) {
  return api({
    url: `/get/all/products/${id}`,
    method: "GET",
  });
}

export function ApiPostConfirmationProduct(information) {
  return api({
    url: "/pending/products/add",
    method: "POST",
    data: information,
  });
}
