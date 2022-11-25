import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import "@testing-library/jest-dom";
import QuestionsListScreen from "./QuestionsListScreen";
import { act } from "react-test-renderer";

describe("CreateQuestions", () => {
  // TODO remove this test?
  it("Renders 4 children on React tree", () => {
    const component = render(<QuestionsListScreen />);
    const tree = component.toJSON();
    expect(tree.children.length).toBe(4);
  });
  it("Does not show modal before press", () => {
    render(<QuestionsListScreen />);
    const modal = screen.getByTestId("question-modal");
    expect(modal.props.visible).toBe(false);
  });
  it("Shows modal after press", () => {
    render(<QuestionsListScreen />);
    const button = screen.getByTestId("add-question");
    fireEvent.press(button);

    const modal = screen.getByTestId("question-modal");
    expect(modal.props.visible).toBe(true);
  });
});
