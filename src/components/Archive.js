import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Grid,
  Paper,
  Button,
  ButtonGroup,
  Typography,
} from "../../node_modules/@material-ui/core";
import { makeStyles } from "../../node_modules/@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
  },
  section: {
    width: "100%",
  },
  sectionTitle: {
    padding: "1rem",
    justifyContent: "center",
  },
  sectionTable: { height: 650 },
}));

const Archive = () => {
  const classes = useStyles();
  const [selection, setSelection] = useState([]);
  const handleDeleteWrittenMemories = () => {
    let toDelete = writtenMemoriesRows().filter(({ id }) =>
      selection.includes(id)
    );
    toDelete.forEach(({ realTitle }) => localStorage.removeItem(realTitle));
    setSelection([]);
  };
  const handleSelectionChange = (newSelection) => {
    setSelection(newSelection.selectionModel);
  };
  const writtenMemoriesColumns = [
    {
      field: "id",
      headerName: "ID",
      id: 0,
      width: 100,
    },
    {
      field: "title",
      headerName: "Memory Title",
      id: 1,
      width: 300,
    },
    {
      field: "text",
      headerName: "Piece of text",
      id: 2,
      width: 300,
    },
  ];
  const writtenMemoriesRows = () => {
    const entries = Object.entries(localStorage);
    let rows = [];
    for (let [key, value] of entries) {
      if (key.includes("writtenMemory-")) {
        rows.push({
          id: rows.length,
          realTitle: key,
          title: key.replace("writtenMemory-", ""),
          text: value.slice(0, 150),
        });
      }
    }
    return rows;
  };

  return (
    <Paper>
      <Grid container className={classes.paper}>
        <Grid container item className={classes.section} direction="column">
          <Grid
            container
            item
            justifyContent="space-between"
            alignItems="center"
            className={classes.sectionTitle}
          >
            <Grid item lg={6} md={6}>
              <Typography variant="h4">Written Memories</Typography>
            </Grid>
            <Grid container item lg={6} md={6} justifyContent="flex-end">
              <ButtonGroup aria-label="delete button">
                <Button>
                  <DeleteIcon onClick={handleDeleteWrittenMemories} />
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid item className={classes.sectionTable}>
            <DataGrid
              rows={writtenMemoriesRows()}
              columns={writtenMemoriesColumns}
              pageSize={10}
              checkboxSelection
              disableSelectionOnClick
              autoheight
              onSelectionModelChange={handleSelectionChange}
              selectionModel={selection}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Archive;
