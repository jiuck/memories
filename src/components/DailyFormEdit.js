import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, ButtonGroup } from "@material-ui/core";
import { AddCircle, Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { saveDailyFormQuestions } from "../managers/forms";
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
  buttonGroup: {
    marginTop: "1rem",
  },
}));

export default function DailyFormEdit({ dailyForm, setUpdate }) {
  const classes = useStyles();
  const [editDailyFormQuestions, setEditDailyFormQuestions] = useState([]);

  useEffect(() => {
    if (dailyForm?.questions) {
      setEditDailyFormQuestions(dailyForm);
    }
  }, [dailyForm]);

  if (!dailyForm?.questions) {
    <Grid></Grid>;
  }

  const handleSaveDailyFormQuestions = () => {
    saveDailyFormQuestions(editDailyFormQuestions.questions);
    setEditDailyFormQuestions(dailyForm);
    setUpdate(true);
  };

  const handleEditQuestionDailyForm = (e) => {
    const [id, name, key] = e.target.id.split("-");
    setEditDailyFormQuestions((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id === Number(id)) {
          let editedQuestion = { ...question, status: "mod" };
          editedQuestion[name] = e.target.value;
          return editedQuestion;
        }
        return { ...question };
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
              status: prevQuestion.status === "del" ? "del" : "mod",
            };
          }
          return { ...prevQuestion };
        }
      );
      return { ...prevEditQuestions };
    });
  };

  if (!(dailyForm?.questions && editDailyFormQuestions?.questions?.length))
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
            aria-label="Add new Daily Form"
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
            startIcon={<AddCircle />}
          >
            ADD
          </Button>
          <Button
            aria-label="Reset the Daily Form"
            variant="contained"
            color="primary"
            onClick={handleResetEditDailyForm}
          >
            Reset
          </Button>
          <Button
            aria-label="Save the changes on the Daily Form"
            variant="contained"
            color="primary"
            onClick={handleSaveDailyFormQuestions}
          >
            Save!
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item container>
        {editDailyFormQuestions.questions.map(
          ({ id, title, subtitle, help, key, status }, i) => {
            const deleted = status === "del";
            return (
              <Grid
                container
                item
                key={`edit-${key}`}
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
        )}
      </Grid>
    </>
  );
}
