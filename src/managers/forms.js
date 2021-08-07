import Localbase from "localbase";
import {
  Form,
  formTypes,
  initDailyFormExample,
} from "./../init_data/initForms";

let db = new Localbase("memories");

// const filter = (f, data) => {
//   if (!data) return [{}];
//   if (!Array.isArray(data)) return [data];
//   let test = data.filter(f);
//   console.lot(test);
//   return test;
// };

const getDailyForm = async () => {
  let dailyForm = await db
    .collection("forms")
    .doc("dailyForm")
    .get()
    .then((form) => {
      if (!form) initDailyFormExample();
      return form;
    });
  dailyForm["questions"] = await db
    .collection("questions")
    .get({ keys: true })
    .then((result) => {
      if (!result) return [{}];
      if (!Array.isArray(result)) return [{ ...result.data, key: result.key }];
      result.filter(({ key, data }) => data.parent_form === "dailyForm");
      return result.map(({ key, data }) => ({ ...data, key, status: "db" }));
    });
  dailyForm.questions.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  });
  return dailyForm;
};

// Save dailyForm into a new log
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
  const new_questions_dump = questions_list
    .filter((q) => q.status === "new")
    .map((q) =>
      db.collection("questions").add({
        ...Form,
        ...q,
      })
    );
  const del_questions_dump = questions_list
    .filter((q) => q.status === "del")
    .map((q) => db.collection("questions").doc(q.key).delete());
  const mod_questions_dump = questions_list
    .filter((q) => q.status === "mod")
    .map((q) =>
      db
        .collection("questions")
        .doc(q.key)
        .update({
          ...q,
          modificationDate: new Date(),
        })
    );
  Promise.all(new_questions_dump, del_questions_dump, mod_questions_dump);
};

const getForms = async () => {
  let forms = await db
    .collection("forms")
    .get({ keys: true })
    .then((result) => {
      if (!result) return [{}];
      if (!Array.isArray(result)) return [{ ...result.data, key: result.key }];
      result
        .filter(({ type }) => type !== formTypes.daily)
        .map(({ key, data }) => ({ ...data, key }));
    });
  return forms;
};

export { getDailyForm, getForms, saveDailyFormValues, saveDailyFormQuestions };
