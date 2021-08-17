import Localbase from "localbase";

let db = new Localbase("memories");

const initDocument = async () => {
  // Creates a init DB for the Daily form if it doesn't already exists

  const initExists = await db.collection("documents").doc("temp").get();
  if (initExists) return false;

  db.collection("documents")
    .doc("temp")
    .add(
      {
        ...Document,
        title: "Written memory",
        content: "This is the first document written here",
        type: documentTypes.written,
      },
      "temp"
    );
};

/***************************************************************************/
/********************************Documents**********************************/
/***************************************************************************/

const documentTypes = { written: "written" };

const Document = {
  title: new Date().toDateString(),
  content: "Write here what you need",
  creationDate: new Date(),
  modificationDate: new Date(),
  type: documentTypes.written,
};

export { Document, initDocument, documentTypes };
