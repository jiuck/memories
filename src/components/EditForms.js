import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// import { getForms } from "../managers/forms";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "1rem",
    padding: "1rem",
  },
}));
export default function EditForms() {
  const classes = useStyles();

  const [editFormID, setEditFormID] = useState("");
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // getForms().then((data) => setForms(data));
    setForms([
      { key: "238427r98dfh9c8br20r94", title: "primer form imaginario" },
    ]);
  }, []);

  const handleChange = (e) => {
    setEditFormID(e.target.value);
  };
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column">
        <Typography variant="h4">Edit a form</Typography>
        {forms && (
          <TextField
            id="select-form-to-edit"
            select
            label="Choose one"
            value={editFormID}
            onChange={handleChange}
          >
            {forms.map(({ key, title }) => (
              <MenuItem key={key} value={title}>
                {title}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>
    </Paper>
  );
}
