import axios from "axios";

const API_KEY = "zhG4xLyywL_1NEWRrf5bEuJ5f9eqiaV3cKtGebH_wwY";
const API_URL = "https://api.unsplash.com/photos";
const PER_PAGE = 10; // 每頁顯示的圖片數量

export const fetchImagesApi = (page) =>
  axios.get(API_URL, {
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
    params: {
      per_page: PER_PAGE,
      page: page,
    },
  });
