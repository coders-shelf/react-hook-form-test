import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/"
  // timeout: 2000
});

// リクエストのインターセプター
instance.interceptors.request.use(
  config => {
    // リクエストが送られる「前に」実行される
    // 例えば、トークンを設定する
    // request.headers.common["Authorization"] = "AUTH_TOKEN";
    return config;
  },
  error => {
    // then/catchの処理の「前に」実行されるエラーハンドリング
    console.log("=== Request Failed ===");
    return Promise.reject(error);
  }
);

// レスポンスのインタセプター
// then/catchの処理の「前に」実行される
instance.interceptors.response.use(
  response => {
    console.log("=== Success ===");
    return response;
  },
  error => {
    console.log("=== Response Error ===");
    return Promise.reject(error);
  }
);

export default instance;
