import Localbase from "localbase";
import { formTypes, initDailyFormExample } from "./../init_data/initForms";

let db = new Localbase("memories");

const filter = (f, data) => {
  if (!data) return [{}];
  if (!Array.isArray(data)) return [data];
  let test = data.filter(f);
  console.lot(test);
  return test;
};

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
    .get()
    .then((questions) => {
      if (!questions) return [{}];
      if (!Array.isArray(questions)) return [questions];
      questions.filter((question) => question.parent_form === "dailyForm");
      return questions;
    });
  return dailyForm;
};

// Save dailyForm into a new log
const saveDailyFormValues = (values_list) => {
  const data_dump = [];

  values_list
    .filter(({ value }) => value)
    .forEach(({ value, parent_form, parent_question }) => {
      data_dump.push(
        db.collection("values").add({
          value,
          creationDate: new Date(),
          parent_form,
          parent_question,
        })
      );
    });
  Promise.all(data_dump);
};

const getForms = async () => {
  let forms = await db
    .collection("forms")
    .get()
    .then((forms) => {
      if (!forms) return [{}];
      if (!Array.isArray(forms)) return [forms];
      forms.filter(({ type }) => {
        return type !== formTypes.daily;
      });
    });
  return forms;
};

export { getDailyForm, getForms, saveDailyFormValues };
