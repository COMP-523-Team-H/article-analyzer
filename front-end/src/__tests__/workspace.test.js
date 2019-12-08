import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CreateButton from "../components/CreateButton";
import Workspace from "../components/Workspace";
import Share from "../components/Share";
import Home from "../components/Home";
import ErrorPage from "../components/ErrorPage";
import ScreenSizeWarning from "../components/ScreenSizeWarning";
import About from "../components/About";
import PendingAnnotation from "../components/PendingAnnotation";



let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(<CreateButton/>, container);
  });

  act(() => {
    render(<Workspace match = {{params: {id: "5497757b-fc22-434f-a56b-d11cce5151be"}}}/>, container);
  });

  act(() => {
    render(<About/>, container);
  });

  act(() => {
    render(<ErrorPage/>, container);
  });

  act(() => {
    render(<Home/>, container);
  });

  act(() => {
    render(<Share/>, container);
  });

  act(() => {
    render(<ScreenSizeWarning/>, container);
  });
  act(() => {
    render(<PendingAnnotation name="Yu Ji" content = "Pending Annotation"/>, container);
  });

  





});