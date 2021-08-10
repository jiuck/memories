import Localbase from "localbase";
import { Document, initDocument } from "./../init_data/initDocuments";
import { dataFilter } from "./utils";
let db = new Localbase("memories");

const getDocument = async (key = "temp") => {
  const document = db
    .collection("documents")
    .doc(key)
    .get()
    .then((document) => {
      if (!document) initDocument();
      return document;
    });
  return document;
};

const getDocuments = async () => {
  // Adds "id" prop for table-ing purpose
  return db
    .collection("documents")
    .get({ keys: true })
    .then((docs) => {
      docs = dataFilter(docs);
      return docs.map((doc, i) => ({ ...doc, id: i }));
    });
};

const updateDocument = (document, key = "temp") => {
  db.collection("documents")
    .doc(key)
    .add(
      {
        ...document,
        Document,
        creationDate: new Date(),
      },
      key
    );
};

const saveDocument = (document) => {
  db.collection("documents").add({
    ...Document,
    ...document,
    creationDate: new Date(),
  });
  db.collection("documents").doc("temp").update({ Document });
};

const deleteDocuments = (keys_list) => {
  const delete_dump = keys_list.map(({ key }) =>
    db.collection("documents").doc(key).delete()
  );
  Promise.all(delete_dump);
};

export {
  getDocument,
  getDocuments,
  saveDocument,
  updateDocument,
  deleteDocuments,
};
