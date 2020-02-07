import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import PostLayout from "./PostLayout";
import SnackBar from "../Utils/SnackBar";
import PostForm from "./PostForm";
import ErrorButton from "../Utils/ErrorButton";

const useStyles = makeStyles(theme => ({
  backdrop: {
    color: "#fff"
  }
}));

const PostContainer = () => {
  const classes = useStyles();
  const [progress, setProgress] = useState(false);

  /* SnackBarの状態管理(ReduxやContextでやる方がいい) */
  const [status, setStatus] = React.useState({
    open: false,
    type: "success",
    message: "成功しました。"
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus({ ...status, open: false });
  };

  /* 通信中であれば、formを非表示にし、スピナーを表示する */
  let form = (
    <Backdrop className={classes.backdrop} open={progress}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
  if (!progress) {
    form = <PostForm setProgress={setProgress} setStatus={setStatus} />;
  }

  return (
    <React.Fragment>
      <PostLayout>
        {form}
        <ErrorButton setStatus={setStatus} />
      </PostLayout>
      <SnackBar
        open={status.open}
        handleClose={handleClose}
        type={status.type}
        message={status.message}
      />
    </React.Fragment>
  );
};

export default PostContainer;
