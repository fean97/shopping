import { createStore } from "vuex";
import router from "../router";
import Axios from "axios";
const URL = "https://61989368164fa60017c2310f.mockapi.io/api/v1";
export default createStore({
  state() {
    return {
      dataProducts: [],
      totalItem: 0,
      detailProduct: {},
    };
  },
  mutations: {
    setDataListProduct(state, payload) {
      state.dataProducts = payload;
    },
    setTotalItem(state, payload) {
      state.totalItem = payload;
    },
    setDetailProduct(state, payload) {
      state.detailProduct = payload;
    },
  },
  actions: {
    async fetchDataListProductsAction({ commit }, params) {
      let paramsUrl = "";
      if (!params.isCountTotal) {
        paramsUrl = paramsUrl + `&page=${params.page}&limit=12`;
      }
      if (params.isSearch) {
        paramsUrl = paramsUrl + `&search=${params.valueSearch}`;
      }
      try {
        const res = await Axios({
          method: "GET",
          url: `${URL}/products?${paramsUrl}`,
        });
        if (res) {
          if (params.isCountTotal || params.isSearch) {
            let formatData = res.data.slice(0, 12);
            commit("setDataListProduct", formatData);
            commit("setTotalItem", res.data.length);
          } else {
            commit("setDataListProduct", res.data);
          }
          return res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getDetailProduct({ commit }, id) {
      try {
        const res = await Axios({
          method: "GET",
          url: `${URL}/products/${id}`,
        });
        if (res) {
          commit("setDetailProduct", res.data);
          return res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async createProductAction({ commit }, params) {
      try {
        const res = await Axios({
          method: "POST",
          url: `${URL}/products`,
          data: params,
        });
        if (res) {
          return res.data;
        }
      } catch (error) {
        console.log(error);
        router.push({ path: "/error" });
      }
    },
  },
  modules: {},
  namespaced: true,
});
