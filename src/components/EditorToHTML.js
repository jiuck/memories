import React, { useState } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Paper, TextField, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1rem",
  },
  title: {
    fontWeight: 700,
    fontSize: "3rem",
    paddingBottom: "1rem",
  },
  buttons: {
    paddingTop: "1rem",
  },
}));

function EditorToHTML() {
  const classes = useStyles();
  const [resultHTML, setResultHTML] = useState(
    localStorage.getItem("currentMemory", "")
  );
  const [title, setTitle] = useState(
    localStorage.getItem("currentTitle", new Date().toDateString())
  );

  function onChangeEditor(e) {
    setResultHTML(e.target.value);
    localStorage.setItem("currentMemory", e.target.value);
  }
  const eraseMemory = () => {
    localStorage.setItem("currentMemory", "");
    localStorage.setItem("currenTitle", "");
    setResultHTML("");
    setTitle("");
  };
  const saveMemory = () => {
    // TODO: do some analysis before to get some parameters:
    // Word repetitions, number of words, saved, edited, important words (bold), mood
    localStorage.setItem(title, resultHTML);
    eraseMemory();
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    localStorage.setItem("currentTitle", e.target.value);
  };
  return (
    <Paper elevation={3} className={classes.paper}>
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        className={classes.title}
        onChange={onChangeTitle}
        value={title ? title : ""}
        fullWidth
      />

      <DefaultEditor value={resultHTML} onChange={onChangeEditor} />

      <div className={classes.buttons}>
        <IconButton onClick={saveMemory} color="secondary">
          <SaveIcon fontSize="large" /> Save
        </IconButton>
        <IconButton onClick={eraseMemory} color="secondary">
          <DeleteIcon fontSize="large" /> Delete
        </IconButton>
      </div>
    </Paper>
  );
}

export default EditorToHTML;
