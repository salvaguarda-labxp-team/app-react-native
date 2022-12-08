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
import { IQuestion } from "../../definitions";

let mockQuestion: IQuestion = {
  _id: "",
  createdAt: new Date(),
  creatorId: "1",
  description: "test-description-123",
  lm: new Date(),
  rid: "test-rid-123",
  status: "closed",
  subject: "Hist",
  title: "test-title-123",
};
let mockOnListItemPress = jest.fn();

describe("QuestionItem", () => {
  beforeEach(() => {
    mockOnListItemPress = jest.fn();
    mockQuestion = {
      _id: "",
      createdAt: new Date(),
      creatorId: "1",
      description: "test-description-123",
      lm: new Date(),
      rid: "test-rid-123",
      status: "closed",
      subject: "Hist",
      title: "test-title-123",
    };
  });
  it("Displays question data", () => {
    const component = render(
      <QuestionItem
        question={mockQuestion}
        onListItemPress={mockOnListItemPress}
      />
    );
    // description
    expect(component.getByText(mockQuestion.description)).toBeTruthy();
    // lm
    expect(
      component.getByText(
        mockQuestion.lm.toLocaleDateString() +
          " - " +
          mockQuestion.lm.toLocaleTimeString()
      )
    ).toBeTruthy();
    // title
    expect(component.getByText(mockQuestion.title)).toBeTruthy();
  });
  it("Executes `onListItemPress` callback on list item press", () => {
    render(
      <QuestionItem
        question={mockQuestion}
        onListItemPress={mockOnListItemPress}
      />
    );
    const listItem = screen.getByTestId("test-list-item");
    fireEvent.press(listItem);
    expect(mockOnListItemPress).toBeCalled();
    expect(mockOnListItemPress).toBeCalledWith(mockQuestion);
  });
});

