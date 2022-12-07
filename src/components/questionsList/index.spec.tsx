import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import "@testing-library/jest-dom";
import {
  QuestionItem,
  SubjectQuestionList,
  QuestionListTabView,
} from "./index";
import { act } from "react-test-renderer";

describe("QuestionItem", () => {
  it("Displays question data", () => {
    const component = render(<QuestionItem />);
    expect(true).toBe(false); 
  });
  it("Executes `onListItemPress` callback on list item press", () => {
    const component = render(<QuestionItem />);
    expect(true).toBe(false); 
  });
});

describe("SubjectQuestionList", () => {
    // TODO extract the `refreshing` state to the parent component and receive as props
    // wich will allow to test the correct component display when `refreshing` is true
  it("Displays a QuestionItem for each question", () => {
    const component = render(<SubjectQuestionList />);
    expect(true).toBe(false); 
  });
  it("Executes `onListItemPress` callback on list item press", () => {
    const component = render(<SubjectQuestionList />);
    expect(true).toBe(false); 
  });
  it("Executes `onListRefresh` callback on `RefreshControl` `onRefresh`", () => {
    const component = render(<SubjectQuestionList />);
    expect(true).toBe(false); 
  });
});

describe("QuestionListTabView", () => {
  it("Renders a `SubjectQuestionList` for each subject in the `SubjectsList` constant", () => {
    const component = render(<QuestionListTabView />);
    expect(true).toBe(false); 
  });
  it("For each subject, displays it's questions in the corresponding tab according to subject name", () => {
    // for example, all "Math" questions are dispalyed under the "Math" tab
    const component = render(<QuestionListTabView />);
    expect(true).toBe(false); 
  });
  it("Displays current subject's questions on the screen", () => {
    // maybe it is possible to test wich questions are visible on screen or maybe that the 
    // `TabView` component receives the correct `value` prop
    const component = render(<QuestionListTabView />);
    expect(true).toBe(false); 
  });
  it("Executes `onListRefresh` callback on `SubjectQuestionList` `onListRefresh`", () => {
    const component = render(<QuestionListTabView />);
    expect(true).toBe(false); 
  });
});
