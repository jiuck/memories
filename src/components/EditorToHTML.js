import React, { useState, useEffect } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Paper, TextField, Grid, ButtonGroup, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { useParams, useHistory } from "react-router-dom";

import {
  getDocument,
  saveDocument,
  updateDocument,
} from "../managers/documents";
import { Document } from "../init_data/initDocuments";

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

function EditorToHTML() {
  const classes = useStyles();
  const { key = "temp" } = useParams();
  let history = useHistory();
  const [document, setDocument] = useState({});

  useEffect(() => {
    getDocument(key).then((data) => {
      setDocument(data);
    });
  }, [key]);

  const onChangeEditor = (e) => {
    setDocument((other) => ({ ...other, content: e.target.value }));
    updateDocument(document, key);
  };
  const onChangeTitle = (e) => {
    setDocument((other) => ({ ...other, title: e.target.value }));
    updateDocument(document, key);
  };

  const handleSaveDocument = () => {
    if (key !== "temp") {
      updateDocument(document, key);
    } else {
      saveDocument(document);
    }
    setDocument({ ...Document });
  };

  const handleResetDocument = (history) => {
    setDocument({ ...Document });
    if (key !== "temp") {
      history.push("/");
    }
  };

  if (!document) return <Grid></Grid>;

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
            value={document?.title ?? ""}
            fullWidth
          />
        </Grid>

        <Grid item>
          <DefaultEditor value={document.content} onChange={onChangeEditor} />
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
              onClick={handleSaveDocument}
              startIcon={<SaveIcon fontSize="large" />}
            >
              Save
            </Button>
            <Button
              aria-label="Reset the Daily Form"
              variant="contained"
              color="primary"
              onClick={() => handleResetDocument(history)}
              startIcon={<DeleteIcon fontSize="large" />}
            >
              Reset
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default EditorToHTML;
