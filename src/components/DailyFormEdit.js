import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Grid,
  TextField,
  Button,
  ButtonGroup,
  IconButton,
} from "@material-ui/core";
import {
  AddCircle,
  Delete,
  Replay,
  Save,
  DragIndicator,
} from "@material-ui/icons";
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
  editDailyFormQuestionField: {
    width: "30%",
  },
  switch: {
    marginRight: "1rem",
  },
  buttonGroup: {
    marginTop: "1rem",
  },
  iconButton: {
    width: "5%",
  },
}));

export default function DailyFormEdit({ dailyForm, setUpdate }) {
  const classes = useStyles();
  const [editDailyFormQuestions, setEditDailyFormQuestions] = useState([]);

  useEffect(() => {
    if (dailyForm?.questions) {
      setEditDailyFormQuestions(dailyForm.questions);
    }
  }, [dailyForm]);

  if (!dailyForm?.questions) {
    return <Grid></Grid>;
  }

  const handleSaveDailyFormQuestions = () => {
    saveDailyFormQuestions(editDailyFormQuestions);
    setEditDailyFormQuestions(dailyForm.questions);
    setUpdate(true);
  };

  const handleEditQuestionDailyForm = (e) => {
    const [questionID, questionName, key] = e.target.id.split("-");
    setEditDailyFormQuestions((prevQuestions) =>
      prevQuestions.map(({ id, status, ...other }) => {
        if (id === Number(questionID)) {
          return {
            ...other,
            status: status === "db" ? "mod" : status,
            [questionName]: e.target.value,
          };
        }
        return { ...other, status, id };
      })
    );
  };

  const handleResetEditDailyForm = () => {
    setEditDailyFormQuestions(dailyForm.questions);
  };

  const handleAddQuestion = () => {
    setEditDailyFormQuestions((prevEditQuestions) => [
      ...prevEditQuestions,
      {
        key: `tempKey${Math.random() * 100000000}`,
        id: prevEditQuestions.length + 1,
        title: "",
        subtitle: "",
        help: "",
        creationDate: new Date(),
        modificationDate: new Date(),
        type: questionTypes.simple,
        subType: questionSubtypes.square,
        parent_form: "dailyForm",
        status: "new",
      },
    ]);
  };

  const handleDeleteDailyQuestion = (key) => {
    setEditDailyFormQuestions((prevEditQuestions) =>
      prevEditQuestions.map((prevQuestion) => {
        if (prevQuestion.key === key) {
          return {
            ...prevQuestion,
            status: prevQuestion.status === "del" ? "mod" : "del",
          };
        }
        return { ...prevQuestion };
      })
    );
  };

  const handleDrag = (e) => {
    const source = e.source.index;
    const destination = e.destination.index;
    if (source === destination) return true;
    setEditDailyFormQuestions((prevEditQuestions) => {
      let questions = [...prevEditQuestions];
      let auxQuestion = { ...questions[source] };
      questions.splice(source, 1);
      questions.splice(destination, 0, auxQuestion);
      return [
        ...questions.map((question, i) => ({
          ...question,
          id: i,
          status: question.status === "db" ? "mod" : question.status,
        })),
      ];
    });
  };

  if (!(dailyForm?.questions && editDailyFormQuestions?.length))
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
            startIcon={<Replay />}
          >
            Reset
          </Button>
          <Button
            aria-label="Save the changes on the Daily Form"
            variant="contained"
            color="primary"
            onClick={handleSaveDailyFormQuestions}
            startIcon={<Save />}
          >
            Save!
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item container>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="editDailyFormDND">
            {(provided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {editDailyFormQuestions.map(
                    ({ id, title, subtitle, help, key, status }, i) => {
                      const deleted = status === "del";
                      return (
                        <Draggable
                          draggableId={key}
                          index={i}
                          key={`draggableElem-${key}`}
                        >
                          {(provided) => (
                            <Grid
                              container
                              item
                              key={`edit-${key}`}
                              alignItems="center"
                              className={classes.editDailyFormQuestion}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <DragIndicator fontSize="large" />
                              <TextField
                                key={`${id}-0-${key}`}
                                onChange={handleEditQuestionDailyForm}
                                defaultValue={title}
                                variant="outlined"
                                label="title"
                                id={`${id}-title-${key}`}
                                disabled={deleted}
                                className={classes.editDailyFormQuestionField}
                              />
                              <TextField
                                key={`${id}-1-${key}`}
                                onChange={handleEditQuestionDailyForm}
                                defaultValue={subtitle}
                                variant="outlined"
                                label="subtitle"
                                id={`${id}-subtitle-${key}`}
                                disabled={deleted}
                                className={classes.editDailyFormQuestionField}
                              />
                              <TextField
                                key={`${id}-2-${key}`}
                                onChange={handleEditQuestionDailyForm}
                                defaultValue={help}
                                variant="outlined"
                                label="help"
                                id={`${id}-help-${key}`}
                                disabled={deleted}
                                className={classes.editDailyFormQuestionField}
                              />
                              <IconButton
                                className={classes.iconButton}
                                aria-label={`Deletes question ${title} from the dailyForm`}
                                onClick={() => handleDeleteDailyQuestion(key)}
                              >
                                <Delete
                                  color={deleted ? "primary" : "secondary"}
                                  fontSize="large"
                                />
                              </IconButton>
                            </Grid>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </Grid>
    </>
  );
}
