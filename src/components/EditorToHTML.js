import React, { useState, useEffect } from "react";
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

function EditorToHTML({ initTitle = new Date().toDateString() }) {
  const classes = useStyles();
  // Text Memory setup
  const [memory, setMemory] = useState(() => {
    if (!localStorage.getItem("draftWrittenMemory")) {
      localStorage.setItem("draftWrittenMemory", "");
    }
    return localStorage.getItem("draftWrittenMemory");
  });
  // Title Text Memory setup
  const [title, setTitle] = useState(() => {
    if (!localStorage.getItem("draftWrittenMemoryTitle")) {
      localStorage.setItem("draftWrittenMemoryTitle", initTitle);
    }
    return localStorage.getItem("draftWrittenMemoryTitle");
  });

  const onChangeEditor = (e) => {
    setMemory(e.target.value);
    localStorage.setItem("draftWrittenMemory", e.target.value);
  };
  const deleteMemory = () => {
    localStorage.setItem("draftWrittenMemory", "");
    localStorage.setItem("draftWrittenMemoryTitle", "");
    setMemory("");
    setTitle("");
  };
  const saveMemory = () => {
    localStorage.setItem(`writtenMemory-${title}`, memory);
    deleteMemory();
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    localStorage.setItem("draftWrittenMemoryTitle", e.target.value);
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

      <DefaultEditor value={memory} onChange={onChangeEditor} />
      <div className={classes.buttons}>
        <IconButton onClick={saveMemory} color="secondary">
          <SaveIcon fontSize="large" /> Save
        </IconButton>
        <IconButton onClick={deleteMemory} color="secondary">
          <DeleteIcon fontSize="large" /> Delete
        </IconButton>
      </div>
    </Paper>
  );
}

export default EditorToHTML;
