import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PostLayout from "./PostLayout";

export default function PostForm() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
    <PostLayout>
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
    </PostLayout>
  );
}
