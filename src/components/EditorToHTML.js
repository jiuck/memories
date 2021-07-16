import React, { useState, useEffect } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Paper, TextField, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { useParams } from "react-router-dom";

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

const initTitle = () => {
  const savedTitle = `writtenMemory-${new Date().toDateString()}`;
  if (localStorage.getItem(savedTitle)) {
    const countMemories = Object.keys(localStorage).filter((name) =>
      name.includes(savedTitle)
    ).length;
    return `${new Date().toDateString()} ${countMemories}`;
  }
  return `${new Date().toDateString()}`;
};

function EditorToHTML() {
  const classes = useStyles();
  const { id } = useParams();
  // Text Memory setup
  const [memory, setMemory] = useState(() => {
    if (!localStorage.getItem("draftWrittenMemory")) {
      localStorage.setItem("draftWrittenMemory", "");
    }
    return localStorage.getItem("draftWrittenMemory");
  });
  // Text Memory Title setup
  const [title, setTitle] = useState(() => {
    if (!localStorage.getItem("draftWrittenMemoryTitle")) {
      localStorage.setItem("draftWrittenMemoryTitle", initTitle());
    }
    return localStorage.getItem("draftWrittenMemoryTitle");
  });

  // Retrieve the written Memory if editing
  useEffect(() => {
    if (id) {
      let auxMemory = localStorage.getItem(id);
      if (auxMemory) {
        setMemory(auxMemory);
        setTitle(id.replace("writtenMemory-", ""));
      }
    }
  }, [id]);

  const onChangeEditor = (e) => {
    setMemory(e.target.value);
    localStorage.setItem("draftWrittenMemory", e.target.value);
  };
  const deleteMemory = () => {
    localStorage.setItem("draftWrittenMemory", "");
    localStorage.setItem("draftWrittenMemoryTitle", title);
    setMemory("");
    setTitle(initTitle());
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
