import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Grid,
  Paper,
  Button,
  IconButton,
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
    justifyContent: "space-between",
  },
  sectionTable: { height: 650 },
  editButton: { textDecoration: "none" },
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
    {
      field: "edit",
      headerName: "Edit",
      id: 3,
      width: 110,
      renderCell: (params) => (
        <Link
          to={`/editor/${encodeURIComponent(params.row.realTitle)}`}
          className={classes.editButton}
        >
          <Button variant="contained" color="primary" size="small">
            Edit
          </Button>
        </Link>
      ),
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
            alignItems="center"
            className={classes.sectionTitle}
          >
            <Typography variant="h4">Written Memories</Typography>
            <IconButton
              variant="contained"
              size="small"
              onClick={handleDeleteWrittenMemories}
            >
              <DeleteIcon style={{ color: "FF0000" }} />
            </IconButton>
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
