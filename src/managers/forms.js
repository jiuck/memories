import Localbase from "localbase";
import { Form, formTypes } from "./../init_data/initForms";
import { dataFilter } from "./utils";

let db = new Localbase("memories");

const getDailyForm = async (key = "dailyForm") => {
  let dailyForm = await db
    .collection("forms")
    .doc(key)
    .get()
    .then((form) => form);
  dailyForm["questions"] = await db
    .collection("questions")
    .get({ keys: true })
    .then((result) => {
      result = dataFilter(result, ({ parent_form }) => parent_form === key);
      return result.map((props) => ({ ...props, status: "db" }));
    });
  dailyForm.questions.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });
  return dailyForm;
};

const saveDailyFormValues = (values_list) => {
  const data_dump = [];
  values_list
    .filter(({ value }) => value === true)
    .forEach(({ value, parentForm, parentQuestion }) => {
      data_dump.push(
        db.collection("values").add({
          value,
          creationDate: new Date(),
          parentForm,
          parentQuestion,
        })
      );
    });
  Promise.all(data_dump);
};

const saveDailyFormQuestions = (questions_list) => {
  if (questions_list.length < 1) return false;
  // Filter empty titles, to avoid bad behaviour
  questions_list = questions_list.filter((q) => q.title.length > 0);
  const new_questions_dump = questions_list
    .filter((q) => q.status === "new")
    .map((q) => db.collection("questions").add({ ...Form, ...q }));
  const del_questions_dump = questions_list
    .filter((q) => q.status === "del")
    .map((q) => db.collection("questions").doc(q.key).delete());
  const mod_questions_dump = questions_list
    .filter((q) => q.status === "mod")
    .map((q) =>
      db
        .collection("questions")
        .doc(q.key)
        .update({ ...q, modificationDate: new Date() })
    );
  Promise.all(new_questions_dump, del_questions_dump, mod_questions_dump);
};

const getForms = async () => {
  let forms = await db
    .collection("forms")
    .get({ keys: true })
    .then((result) =>
      dataFilter(result, ({ type }) => type !== formTypes.daily)
    );
  return forms;
};

export { getDailyForm, getForms, saveDailyFormValues, saveDailyFormQuestions };
