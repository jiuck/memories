import {
  Paper,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getForms } from "../managers/forms";
import DailyForm from "./DailyForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "1rem",
    padding: "1rem",
  },
}));

const FormsHome = () => {
  const classes = useStyles();

  const [editFormID, setEditFormID] = useState(346);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    getForms().then((data) => setForms(data));
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <DailyForm />
      <Paper className={classes.paper}>
        <Grid container direction="column" className={classes.dailyForm}>
          <Typography variant="h4">Choose a form to edit</Typography>
          <FormControl fullWidth>
            <InputLabel id="select-form">Choose a form</InputLabel>
            <Select
              labelId="select-form"
              id="select-form"
              value={editFormID}
              label="Choose a form"
              onChange={handleChange}
            >
              <MenuItem value={346}>{9999999999}</MenuItem>
              <MenuItem value={74}>{1111111111}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Paper>
    </>
  );
};

export default FormsHome;
