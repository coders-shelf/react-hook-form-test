import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import axios from "../../postsAxios";

const ErrorButton = props => {
  const { setStatus } = props;
  // 「エラー確認用ボタン」を押したときの処理
  const submitWithError = () => {
    axios
      .get("postss")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        if (error.response) {
          setStatus({
            open: true,
            type: "error",
            message: `失敗しました。(コード：${error.response.status})`
          });
        }
      })
      .then(() => {
        // always executed
      });
  };
  return (
    <Box textAlign="center">
      <Button
        variant="outlined"
        color="inherit"
        style={{ marginTop: 30 }}
        onClick={submitWithError}
      >
        APIエラー確認用ダミーボタン
      </Button>
    </Box>
  );
};

export default ErrorButton;
