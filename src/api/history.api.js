import { api } from "../utils/api/api.js";

export function ApiGetPendingProductsBuyer() {
  return api({
    url: "/pending/products/my-pending/buyer",
    method: "GET",
  });
}

export function ApiGetBuyyedProduct() {
  return api({
    url: "/delivery/products/my-deliveries",
    method: "GET",
  });
}
