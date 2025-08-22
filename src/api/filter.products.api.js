import { api } from "../utils/api/api.js";

export function ApiGetSmartphones(search, model) {
  return api({
    url: "/get/all/products?type=smartfon",
    method: "GET",
    params: {
      search,
      model,
    },
  });
}

export function ApiGetWatches(search, model) {
  return api({
    url: "/get/all/products?type=smartwatch",
    method: "GET",
    params: {
      search,
      model,
    },
  });
}


export function ApiGetHeadphones(search, model) {
  return api({
    url: "/get/all/products?type=headphones",
    method: "GET",
    params: {
      search,
      model,
    },
  });
}
