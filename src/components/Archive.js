import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Grid,
  Paper,
  Button,
  IconButton,
  Typography,
  ButtonGroup,
} from "../../node_modules/@material-ui/core";
import { makeStyles } from "../../node_modules/@material-ui/core/styles";
import { getDocuments, deleteDocuments } from "../managers/documents";

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
  const [documents, setDocuments] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getDocuments().then((documents) => {
      // clear Draft document
      setDocuments(documents.filter(({ key }) => key !== "temp"));
    });
  }, []);
  const handleDeleteWrittenMemories = () => {
    deleteDocuments(selection);
    setSelection([]);
  };
  const handleSelectionChange = (newSelection) => {
    setSelection(
      (prevSelection) => prevSelection + newSelection.selectionModel
    );
  };
  const writtenMemoriesColumns = [
    {
      field: "id",
      headerName: t("archive.editorSection.columns.id"),
      id: 0,
      width: 100,
      render: (rowData) => rowData.tableData.id + 1,
    },
    {
      field: "title",
      headerName: t("archive.editorSection.columns.title"),
      id: 1,
      width: 300,
    },
    {
      field: "content",
      headerName: t("archive.editorSection.columns.content"),
      id: 2,
      width: 300,
    },
    {
      field: "edit",
      headerName: t("archive.editorSection.columns.edit"),
      id: 3,
      width: 110,
      renderCell: (params) => (
        <Link
          to={`/editor/${encodeURIComponent(params.row.key)}`}
          className={classes.editButton}
        >
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="Button Group"
          >
            <Button
              aria-label="Add new Daily Form"
              variant="contained"
              color="primary"
              startIcon={<EditIcon fontSize="large" />}
            >
              {t("archive.editorSection.editButton")}
            </Button>
          </ButtonGroup>
        </Link>
      ),
    },
  ];

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
            <Typography variant="h4">
              {t("archive.editorSection.title")}
            </Typography>
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
              rows={documents}
              columns={writtenMemoriesColumns}
              rowsPerPageOptions={[10, 25, 50, 100]}
              pageSize={10}
              checkboxSelection
              disableSelectionOnClick
              autoheight
              onSelectionModelChange={(e) => handleSelectionChange(e)}
              selectionModel={selection}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Archive;
