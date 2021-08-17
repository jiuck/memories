import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  Switch,
  ButtonGroup,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getDailyForm } from "../managers/forms";
import DailyFormCheck from "./DailyFormCheck";
import DailyFormEdit from "./DailyFormEdit";

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
}));

export default function DailyForm() {
  // There is a warining because of the GroupButton having a lack of the Paper or button properties. The following ones are to blame:
  //    disableElevation={false}
  //    disableFocusRipple={false}
  //    disableRipple={false}
  //    fullWidth = { false}
  // Seen here some possible explanation: https://stackoverflow.com/questions/66570397/react-material-ui-warning-react-does-not-recognize-the-attribute-prop-on-a
  // TODO: Fix it

  const classes = useStyles();
  const [dailyForm, setDailyForm] = useState([]);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getDailyForm().then((data) => {
      setDailyForm(data);
      setUpdate(false);
    });
  }, [update]);

  const onEditChange = (e) => setEdit(e.target.checked);

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" className={classes.dailyForm}>
        <Grid item container justify="space-between" alignItems="flex-end">
          <Grid item>
            <Typography variant="h4">{dailyForm.title}</Typography>
            <Typography variant="h6">{dailyForm.subtitle}</Typography>
          </Grid>
          <Grid item>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <FormControlLabel
                control={
                  <Switch
                    inputProps={{
                      "aria-label": "Change to editor mode for the Daily Form",
                    }}
                    checked={edit}
                    onChange={onEditChange}
                    color="primary"
                  />
                }
                label="Edit"
                labelPlacement="start"
                className={classes.switch}
              />
            </ButtonGroup>
          </Grid>
        </Grid>
        {edit ? (
          <DailyFormEdit dailyForm={dailyForm} setUpdate={setUpdate} />
        ) : (
          <DailyFormCheck dailyForm={dailyForm} />
        )}
      </Grid>
    </Paper>
  );
}
