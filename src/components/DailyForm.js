import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  Checkbox,
  Switch,
  TextField,
  Tooltip,
  Button,
  ButtonGroup,
  FormControlLabel,
} from "@material-ui/core";
import { AddCircle, Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import {
  getDailyForm,
  saveDailyFormValues,
  saveDailyFormQuestions,
} from "../managers/forms";
import { questionTypes, questionSubtypes } from "./../init_data/initForms";

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
  const classes = useStyles();
  const [tempDailyFormValues, setTempDailyFormValues] = useState({});
  const [editDailyFormQuestions, setEditDailyFormQuestions] = useState([]);
  const [dailyForm, setDailyForm] = useState([]);
  const [edit, setEdit] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getDailyForm().then((data) => {
      setTempDailyFormValues(initValuesDailyForm(data));
      setEditDailyFormQuestions(data);
      setDailyForm(data);
      setUpdate(false);
    });
  }, [update]);

  const initValuesDailyForm = (form) => {
    return form.questions.map(({ title, key }) => ({
      value: false,
      parend_id: "dailyForm",
      parent_question: title,
      parent_question_key: key,
    }));
  };

  const handleDailyFormChange = (e) => {
    e.preventDefault();
    if (!Array.isArray(tempDailyFormValues)) return false;
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
    initValuesDailyForm(dailyForm);
  };

  const handleSaveDailyFormQuestions = () => {
    saveDailyFormQuestions(editDailyFormQuestions.questions);
    handleResetEditDailyForm(dailyForm);
    setUpdate(true);
  };

  const onEditChange = (e) => {
    setEdit(e.target.checked);
  };

  const handleEditQuestionDailyForm = (e) => {
    const [id, name, key] = e.target.id.split("-");
    setEditDailyFormQuestions((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === Number(id)) {
          let newQuestion = Object.assign(q);
          newQuestion[name] = e.target.value;
          newQuestion.status = "mod";
          return newQuestion;
        }
        return q;
      }),
    }));
  };

  const handleResetEditDailyForm = () => {
    setEditDailyFormQuestions(dailyForm);
  };
  const handleAddQuestion = () => {
    setEditDailyFormQuestions((prevEditQuestions) => {
      const diff =
        prevEditQuestions.questions.length - dailyForm.questions.length + 1;
      return {
        ...prevEditQuestions,
        questions: [
          ...prevEditQuestions.questions,
          {
            key: `tempKey${Math.random() * 100000000}`,
            id: prevEditQuestions.questions.length + 1,
            title: `Your Title ${diff}`,
            subtitle: `Your Subtitle ${diff}`,
            help: `Your help ${diff}`,
            creationDate: new Date(),
            modificationDate: new Date(),
            type: questionTypes.simple,
            subType: questionSubtypes.square,
            parent_form: "dailyForm",
            status: "new",
          },
        ],
      };
    });
  };

  const handleDeleteDailyQuestion = (key) => {
    setEditDailyFormQuestions((prevEditQuestions) => {
      prevEditQuestions.questions = prevEditQuestions.questions.map(
        (prevQuestion) => {
          if (prevQuestion.key === key) {
            return {
              ...prevQuestion,
              status: prevQuestion.status === "del" ? "mod" : "del",
            };
          }
          return { ...prevQuestion };
        }
      );
      return { ...prevEditQuestions };
    });
  };

  const writeDailyForm = () => {
    if (!(dailyForm && dailyForm.questions)) return <Grid></Grid>;
    return dailyForm.questions.map(({ id, title, subtitle, help }, i) => (
      <Tooltip title={help ?? ""} aria-label={subtitle} key={`tt-${i}`}>
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
    ));
  };

  const editDailyForm = () => {
    if (!(editDailyFormQuestions && editDailyFormQuestions.questions))
      return <Grid></Grid>;
    return editDailyFormQuestions.questions.map(
      ({ id, title, subtitle, help, key, status }, i) => {
        const deleted = status === "del";
        return (
          <Grid
            container
            item
            key={`edit-${id}`}
            alignItems="center"
            className={classes.editDailyFormQuestion}
          >
            <TextField
              key={`${id}-0-${key}`}
              onChange={handleEditQuestionDailyForm}
              defaultValue={title}
              variant="outlined"
              label="title"
              id={`${id}-title-${key}`}
              disabled={deleted}
            />
            <TextField
              key={`${id}-1-${key}`}
              onChange={handleEditQuestionDailyForm}
              defaultValue={subtitle}
              variant="outlined"
              label="subtitle"
              id={`${id}-subtitle-${key}`}
              disabled={deleted}
            />
            <TextField
              key={`${id}-2-${key}`}
              onChange={handleEditQuestionDailyForm}
              defaultValue={help}
              variant="outlined"
              label="help"
              id={`${id}-help-${key}`}
              disabled={deleted}
            />
            <Delete
              onClick={() => handleDeleteDailyQuestion(key)}
              color={deleted ? "primary" : "secondary"}
            />
          </Grid>
        );
      }
    );
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
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              {edit && (
                <Button
                  aria-label="Add new Daily Form"
                  variant="contained"
                  color="primary"
                  onClick={handleAddQuestion}
                  startIcon={<AddCircle />}
                >
                  ADD
                </Button>
              )}
              {edit && (
                <Button
                  aria-label="Reset the Daily Form"
                  variant="contained"
                  color="primary"
                  onClick={handleResetEditDailyForm}
                >
                  Reset
                </Button>
              )}
              <Button
                aria-label="Save the changes on the Daily Form"
                variant="contained"
                color="primary"
                onClick={
                  edit
                    ? handleSaveDailyFormQuestions
                    : handleSaveDailyFormValues
                }
              >
                Save!
              </Button>
              <FormControlLabel
                control={
                  <Switch
                    aria-label="Change to editor mode for the Daily Form"
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
        <Grid item container>
          {edit ? editDailyForm() : writeDailyForm()}
        </Grid>
      </Grid>
    </Paper>
  );
}
