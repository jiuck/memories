import Localbase from "localbase";

let db = new Localbase("memories");

const initDailyFormExample = async () => {
  // Creates a init DB for the Daily form if it doesn't already exists

  const initExists = await db.collection("forms").doc("dailyForm").get();
  if (initExists) return false;

  db.collection("forms").add(
    {
      ...Form,
      title: "Daily form",
      subtitle: "Check your quick actions",
      help: "Save your daily actions/tokens so you can make a quick track of them. You can also edit this form in order to add or delete new checks",
      type: formTypes.daily,
    },
    "dailyForm"
  );

  db.collection("questions").add({
    ...Question,
    id: 0,
    title: "Good Sleep",
    subtitle: "I slept good today",
    help: undefined,
    parent_form: "dailyForm",
  });

  db.collection("questions").add({
    ...Question,
    id: 2,
    title: "Happy cat",
    subtitle: "My cat wanted me to pet him",
    help: undefined, //optional
    parent_form: "dailyForm",
  });
  db.collection("questions").add({
    ...Question,
    id: 3,
    title: "Overworked",
    subtitle: "Today I overworked",
    help: undefined, //optional
    parent_form: "dailyForm",
  });
  db.collection("questions").add({
    ...Question,
    id: 4,
    title: "Morning exercises",
    subtitle: "I did my morning exercises routine",
    help: undefined, //optional
    parent_form: "dailyForm",
  });
  db.collection("questions").add({
    ...Question,
    id: 5,
    title: "Had breakfast",
    subtitle: "Had breakfast",
    help: undefined, //optional
    parent_form: "dailyForm",
  });
  db.collection("questions").add({
    ...Question,
    id: 6,
    title: "Had lunch",
    subtitle: "Had lunch",
    help: undefined, //optional
    parent_form: "dailyForm",
  });
  db.collection("questions").add({
    ...Question,
    id: 7,
    title: "Had dinner",
    subtitle: "Had dinner",
    help: undefined, //optional
    parent_form: "dailyForm",
  });
};

/***************************************************************************/
/***********************************Forms***********************************/
/***************************************************************************/

const formTypes = {
  daily: "daily",
  simple: "simple",
};

const Form = {
  title: "Your Title",
  subtitle: "Your Subtitle",
  help: "This field should be of help to remember the reason of this form. Sometimes we need more help to remember or understand",
  creationDate: new Date(),
  modificationDate: new Date(),
  type: formTypes.simple,
};

/***************************************************************************/
/********************************Questions**********************************/
/***************************************************************************/

const questionTypes = {
  check: "check",
};

const questionSubtypes = {
  square: "square",
};

const Question = {
  id: 0, // This is not the real ID, but we will use it as an order field
  title: "Your Title",
  subtitle: "Your Subtitle",
  help: "This field should be of help to remember the reason of this form. Sometimes we need more help to remember or understand",
  creationDate: new Date(),
  modificationDate: new Date(),
  type: questionTypes.simple,
  subType: questionSubtypes.square,
  parent_form: undefined,
};

/***************************************************************************/
/**********************************Values***********************************/
/***************************************************************************/

const Value = {
  value: undefined,
  creationDate: new Date(),
  parent_form: undefined,
  parent_question: undefined,
};

export {
  initDailyFormExample,
  Form,
  formTypes,
  questionTypes,
  questionSubtypes,
  Question,
  Value,
};
