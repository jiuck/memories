import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Checkbox,
  Tooltip,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Save } from "@material-ui/icons";

import { saveDailyFormValues } from "../managers/forms";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "1rem",
    padding: "1rem",
  },
  questionTitle: {
    margint: theme.spacing(1),
  },
  editDailyFormQuestion: {
    marginTop: ".5rem",
    marginBottom: ".5rem",
  },
  switch: {
    marginRight: "1rem",
  },
  buttonGroup: {
    marginTop: "1rem",
  },
}));

export default function CheckDailyForm({ dailyForm }) {
  const classes = useStyles();
  const [tempDailyFormValues, setTempDailyFormValues] = useState({});

  useEffect(() => {
    if (dailyForm && dailyForm.questions) {
      setTempDailyFormValues(initValuesDailyForm(dailyForm));
    }
  }, [dailyForm]);

  if (!dailyForm) return <></>;

  let initValuesDailyForm = (form) =>
    form.questions.map(({ key }) => ({
      value: false,
      parentForm: "dailyForm",
      parentQuestion: key,
    }));

  const handleDailyFormChange = (e) => {
    e.preventDefault();
    setTempDailyFormValues((prev) =>
      prev.map((q, i) => {
        if (i === Number(e.target.id)) {
          return {
            ...q,
            value: e.target.checked,
          };
        }
        return q;
      })
    );
  };

  const handleSaveDailyFormValues = () => {
    saveDailyFormValues(tempDailyFormValues);
    setTempDailyFormValues(initValuesDailyForm(dailyForm));
  };

  if (!(dailyForm?.questions && tempDailyFormValues.length > 0))
    return <Grid></Grid>;
  return (
    <>
      <Grid item container justify="flex-end" className={classes.buttonGroup}>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            aria-label="Save the changes on the Daily Form"
            variant="contained"
            color="primary"
            onClick={handleSaveDailyFormValues}
            startIcon={<Save />}
          >
            Save!
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item container>
        {dailyForm.questions.map(({ id, title, subtitle, help }, i) => (
          <Grid container item alignItems="center">
            <Checkbox
              checked={tempDailyFormValues[i].value}
              key={i}
              id={i.toString()}
              onChange={handleDailyFormChange}
              name={title}
            />

            <Tooltip
              title={help ?? ""}
              aria-label={subtitle}
              key={`tt-${i}`}
              placement="right"
            >
              <Typography variant="body1">{title}</Typography>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
