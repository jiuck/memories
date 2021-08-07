import React, { useState, useEffect } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Paper, TextField, Grid, ButtonGroup, Button } from "@material-ui/core";
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
  buttonGroup: {
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
      <Grid container direction="column">
        <Grid item>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            className={classes.title}
            onChange={onChangeTitle}
            value={title ? title : ""}
            fullWidth
          />
        </Grid>

        <Grid item>
          <DefaultEditor value={memory} onChange={onChangeEditor} />
        </Grid>

        <Grid item container justify="flex-end" className={classes.buttonGroup}>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="Button Group"
          >
            <Button
              aria-label="Add new Daily Form"
              variant="contained"
              color="primary"
              onClick={saveMemory}
              startIcon={<SaveIcon fontSize="large" />}
            >
              Save
            </Button>
            <Button
              aria-label="Reset the Daily Form"
              variant="contained"
              color="primary"
              onClick={deleteMemory}
              startIcon={<DeleteIcon fontSize="large" />}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default EditorToHTML;
