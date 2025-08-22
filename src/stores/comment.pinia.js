import { defineStore } from "pinia";
import { ApiCreateComment, ApiGetComments } from "../api/comment.api";
import { message } from "ant-design-vue";

const useComments = defineStore("comments", {
  state: () => ({
    comments: [],
    loader: false,
    createLoader: false,
  }),

  actions: {
    getComments(id) {
      this.loader = false;

      ApiGetComments(id)
        .then(({ data }) => {
          this.comments = data;
          this.loader = true;
        })
        .catch((getErr) => {
          const errorMessage =
            getErr.data?.response?.message || "Server xatosi";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    async createComment(form) {
      this.createLoader = true;

      return ApiCreateComment(form)
        .then(() => {
          message.success("Mahsulotimiz haqida fikringiz uchun raxmat !");
        })
        .catch((createErr) => {
          const errorMessage =
            createErr.data?.response?.message || "Server xatosi";
          message.error(errorMessage);
        })
        .finally(() => {
          this.createLoader = false;
        });
    },
  },
});

export default useComments;
