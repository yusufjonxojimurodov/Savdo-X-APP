import { api } from "../utils/api/api.js";

export function ApiGetAvatar() {
  return api({
    url: "/api/users/get/avatar",
    method: "GET",
  });
}

export function ApiPutUserInfo(form) {
  return api({
    url: "/api/update-profile",
    method: "PUT",
    data: form,
  });
}

export function ApiPostAvatar(image) {
  const formData = new FormData();
  if (image) formData.append("avatar", image);

  return api({
    url: "/api/users/avatar",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
}