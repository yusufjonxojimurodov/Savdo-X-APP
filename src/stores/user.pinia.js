import { defineStore } from "pinia";
import { ApiGetUserInfo, ApiLoginUser, ApiRegisterUser } from "../api/user.api";
import { message } from "ant-design-vue";

const useUser = defineStore("user", {
  state: () => ({
    user: "",
    loader: false,
  }),

  actions: {
    async registerUser(form) {
      this.loader = true;
      try {
        const { data } = await ApiRegisterUser(form);
        localStorage.setItem("access_token", data.token);
        message.success("Ro'yxatdan muvaffaqiyatli o'tildi", 5);
        return true;
      } catch (error) {
        const status = error.response?.status;
        const errorMessage =
          error.response?.data?.message ||
          "Ro'yxatdan o'tishda xatolik yuz berdi !";
        message.error(errorMessage);

        if (status === 400) {
        }
        return false;
      } finally {
        this.loader = false;
      }
    },

    async loginUser(form) {
      this.loader = true;
      try {
        const { data } = await ApiLoginUser(form);
        localStorage.setItem("access_token", data.token);
        message.success("Tizimga Kirish muvaffaqiyatli bajarildi");
        return true;
      } catch (error) {
        const errorMessage =
          error.response?.data.message ||
          "Tizimga kirishda xatolik yuz berdi !";
        message.error(errorMessage);
        return false;
      } finally {
        this.loader = false;
      }
    },

    async userInfo() {
      this.loader = true;
      try {
        const { data } = await ApiGetUserInfo();
        this.user = data;
        return true;
      } catch (errorGet) {
        return false;
      } finally {
        this.loader = false;
      }
    },
  },
});

export default useUser;
