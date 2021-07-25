import React, { useState, useEffect } from "react";
import { getDailyForm, saveDailyFormValues } from "../managers/forms";
import {
  Paper,
  Grid,
  Typography,
  Checkbox,
  Tooltip,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "1rem",
    padding: "1rem",
  },
  questionTitle: {
    margint: theme.spacing(1),
  },
}));
export default function DailyForm() {
  const classes = useStyles();
  const [tempDailyFormValues, setTempDailyFormValues] = useState({});
  const [dailyForm, setDailyForm] = useState([]);

  useEffect(() => {
    getDailyForm().then((data) => {
      // initialize the result values
      setTempDailyFormValues(initValuesDailyForm(data));
      setDailyForm(data);
    });
  }, []);

  const initValuesDailyForm = (form) => {
    return form.questions.map(({ title }) => {
      return { value: false, parend_id: "dailyForm", parent_question: title };
    });
  };

  const handleDailyFormChange = (e) => {
    e.preventDefault();
    if (!Array.isArray(tempDailyFormValues)) return false;
    let aux = [...tempDailyFormValues];
    console.log(aux, e);
    aux[e.target.id].value = e.target.checked;
    setTempDailyFormValues(aux);
  };

  const handleSaveDailyFormValues = () => {
    saveDailyFormValues(tempDailyFormValues);
    initValuesDailyForm(dailyForm);
  };
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" className={classes.dailyForm}>
        <Grid item container justify="space-between" alignItems="flex-start">
          <Grid item>
            <Typography variant="h4">{dailyForm.title}</Typography>
            <Typography variant="h6">{dailyForm.subtitle}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveDailyFormValues}
            >
              Save!
            </Button>
          </Grid>
        </Grid>
        <Grid item container>
          {dailyForm.questions &&
            dailyForm.questions.map(
              ({ id, title, subtitle, help, type, subtype }, i) => (
                <Tooltip
                  title={help ?? ""}
                  aria-label={subtitle}
                  key={`tt-${i}`}
                >
                  <Grid container item alignItems="center">
                    <Checkbox
                      key={i}
                      id={i.toString()}
                      onChange={handleDailyFormChange}
                      name={title}
                    />

                    <Typography variant="body1">{title}</Typography>
                  </Grid>
                </Tooltip>
              )
            )}
        </Grid>
      </Grid>
    </Paper>
  );
}
