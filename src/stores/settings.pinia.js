import { defineStore } from "pinia";
import {
  ApiGetAvatar,
  ApiPostAvatar,
  ApiPutUserInfo,
} from "../api/settings.api";
import { message } from "ant-design-vue";

const useSetting = defineStore("setting", {
  state: () => ({
    avatar: [],
    loaderButton: false,
    avatarLoading: false,
  }),

  actions: {
    async getUserAvatar() {
      this.avatarLoading = true;

      return ApiGetAvatar()
        .then(({ data }) => {
          this.avatar = data.avatar;
        })
        .catch((error) => {
          console.log("Profil olishda xato" + error);
        })
        .finally(() => {
          this.avatarLoading = false;
        });
    },

    async putUserInfo(form) {
      this.loaderButton = true;

      return ApiPutUserInfo(form)
        .then(() => {
          message.success("Ma'lumotlar Yangilandi");
        })
        .catch((putError) => {
          message.error(putError);
        })
        .finally(() => {
          this.loaderButton = false;
        });
    },

    async postUserAvatar(image) {
      this.avatarLoading = true;

      return ApiPostAvatar(image)
        .then(() => {
          message.success("Rasm yangilandi");
          this.getUserAvatar();
        })
        .catch((error) => {
          message.error("xato" + error);
        })
        .finally(() => {
          this.avatarLoading = false;
        });
    },
  },
});

export default useSetting;
