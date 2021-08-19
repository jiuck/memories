import { initDailyForm } from "./../init_data/initForms";
import { initDocument } from "./../init_data/initDocuments";

import Localbase from "localbase";

const dataFilter = (result, filter, key = true) => {
  if (!result) return [{}];
  if (!Array.isArray(result)) return [{ ...result.data, key: result.key }];
  if (key) result = result.map(({ data, key }) => ({ ...data, key }));
  if (filter) {
    return result.filter(filter);
  }
  return result;
};

const isEmpty = async (tableName, key) => {
  // TODO: Replace all Localbase names with an easier import CONST
  let db = new Localbase("memories");
  const result = await db
    .collection(tableName)
    .doc(key)
    .get()
    .then((record) => (!record ? true : false));
  console.log(result);
  return false;
};

// Used to avoid any errors
const initializeDB = () => {
  console.log("entra, pero no hará nada por no poder.");
  if (isEmpty("documents", "temp")) {
    initDocument();
  }
  if (isEmpty("forms", "dailyForm")) {
    initDailyForm();
  }
};

export { dataFilter, initializeDB };
