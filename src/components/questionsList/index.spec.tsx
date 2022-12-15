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
import { mockQuestion, mockQuestionsList } from "./testData";
import TestRenderer, { act } from "react-test-renderer";
import { IQuestion, SubjectsList, subjectsMap } from "../../definitions";
import { RefreshControl } from "react-native";

jest.useFakeTimers();

let mockOnListItemPress = jest.fn();
let mockOnListRefresh = jest.fn();
let mockSetCurrentSubject = jest.fn();

describe("QuestionItem", () => {
  beforeEach(() => {
    mockOnListItemPress = jest.fn();
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
    const listItem = screen.getByTestId("question-item." + mockQuestion._id);
    fireEvent.press(listItem);
    expect(mockOnListItemPress).toBeCalled();
    expect(mockOnListItemPress).toBeCalledWith(mockQuestion);
  });
});

describe("SubjectQuestionList", () => {
  beforeEach(() => {
    mockOnListRefresh = jest.fn();
    mockOnListItemPress = jest.fn();
  });
  // TODO extract the `refreshing` state to the parent component and receive as props
  // wich will allow to test the correct component display when `refreshing` is true
  it("Displays a `QuestionItem` for each question", () => {
    const component = TestRenderer.create(
      <SubjectQuestionList
        questions={mockQuestionsList}
        onListItemPress={mockOnListItemPress}
        onListRefresh={mockOnListRefresh}
      />
    );
    mockQuestionsList.forEach((question) => {
      const questionRenderer = component.root.findByProps({ question });
      expect(questionRenderer.type).toBe(QuestionItem);
    });
  });
  it("Executes `onListItemPress` callback on list item press", () => {
    const component = render(
      <SubjectQuestionList
        questions={mockQuestionsList}
        onListItemPress={mockOnListItemPress}
        onListRefresh={mockOnListRefresh}
      />
    );
    const firstQuestion = mockQuestionsList[0];
    const firstQuestionComponent = component.getByText(
      firstQuestion.description
    );
    expect(firstQuestionComponent).toBeTruthy();
    fireEvent(firstQuestionComponent, "press");
    expect(mockOnListItemPress).toBeCalled();
    expect(mockOnListItemPress).toBeCalledWith(firstQuestion);
  });
  it("Executes `onListRefresh` callback on `RefreshControl` `onRefresh`", () => {
    const component = render(
      <SubjectQuestionList
        questions={mockQuestionsList}
        onListItemPress={mockOnListItemPress}
        onListRefresh={mockOnListRefresh}
      />
    );
    const refreshControl = component.UNSAFE_getByType(RefreshControl);
    expect(refreshControl).toBeTruthy();

    fireEvent(refreshControl, "onRefresh");
    expect(mockOnListRefresh).toBeCalled();
  });
});

describe("QuestionListTabView", () => {
  beforeEach(() => {
    mockSetCurrentSubject = jest.fn();
    jest.useFakeTimers();
  });
  it("Renders a `SubjectQuestionList` for each subject in the `SubjectsList` constant", () => {
    const component = TestRenderer.create(
      <QuestionListTabView
        currentSubject={0}
        onListItemPress={mockOnListItemPress}
        onListRefresh={mockOnListRefresh}
        setCurrentSubject={mockSetCurrentSubject}
        questions={mockQuestionsList}
      />
    );
    expect(component.root.findAllByType(SubjectQuestionList).length).toBe(
      SubjectsList.length
    );
  });
  it("For each subject, displays it's questions in the corresponding tab according to subject name", () => {
    // for example, all "Math" questions are dispalyed under the "Math" tab
    const component = render(
      <QuestionListTabView
        currentSubject={0}
        onListItemPress={mockOnListItemPress}
        onListRefresh={mockOnListRefresh}
        setCurrentSubject={mockSetCurrentSubject}
        questions={mockQuestionsList}
      />
    );
    SubjectsList.forEach((subject) => {
      const subjectQuestions = mockQuestionsList.filter(
        (question) =>
          subjectsMap[question.subject].displayName === subject.displayName
      );
      const subjectQuestionsComponent = component.getByTestId(
        `subject-question-list.${subject.displayName}.root`
      );
      expect(subjectQuestionsComponent).toBeTruthy();
      subjectQuestions.forEach((question) => {
        expect(
          subjectQuestionsComponent.find(
            (node) => node.props?.question?._id === question._id
          )
        ).toBeTruthy();
      });
    });
  });
  // it("Displays current subject's questions on the screen", () => {
  //   // maybe it is possible to test wich questions are visible on screen or maybe that the
  //   // `TabView` component receives the correct `value` prop
  //   const component = render(<QuestionListTabView />);
  //   expect(true).toBe(false);
  // });
  // it("Executes `onListRefresh` callback on `SubjectQuestionList` `onListRefresh`", () => {
  //   const component = render(<QuestionListTabView />);
  //   expect(true).toBe(false);
  // });
});
