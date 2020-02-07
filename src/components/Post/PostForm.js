import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "../../postsAxios";

const PostForm = props => {
  const { setProgress, setStatus } = props;
  const { register, handleSubmit, errors } = useForm();

  // Submitボタンを押したときの処理
  const onSubmit = data => {
    console.log(data); // 送信するデータ
    setProgress(true);
    axios
      .post("posts", data)
      .then(response => {
        console.log(response);
        setStatus({
          open: true,
          type: "success",
          message: "データの作成に成功しました。"
        });
      })
      .catch(error => {
        console.log(error);
        // エラーハンドリング
        if (error.response) {
          setStatus({
            open: true,
            type: "error",
            message: `失敗しました。(コード：${error.response.status})`
          });
        }
      })
      .then(() => {
        // 常に実行される
        setProgress(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="タイトル(必須)"
        type="text"
        name="title"
        fullWidth
        margin="normal"
        inputRef={register({ required: true, maxLength: 20 })}
        error={Boolean(errors.title)}
        helperText={errors.title && "タイトルは20文字以内にして下さい。"}
      />
      <TextField
        label="本文(必須)"
        type="text"
        name="body"
        fullWidth
        margin="normal"
        inputRef={register({ required: true })}
        error={Boolean(errors.body)}
        helperText={errors.body && "本文を入力して下さい。"}
        multiline
        rows="4"
      />
      <TextField
        label="日付け(必須)"
        type="date"
        name="date"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        error={Boolean(errors.date)}
        helperText={errors.date && "日付けを入力して下さい。"}
        inputRef={register({ required: true })}
      />
      <Grid container justify="center">
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          style={{ marginTop: 10 }}
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default PostForm;
