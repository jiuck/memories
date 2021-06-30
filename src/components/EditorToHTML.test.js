import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import EditorToHtml from "./EditorToHTML";

test("renders content", () => {
  const component = render(<EditorToHtml />);
  console.log(component);
});
