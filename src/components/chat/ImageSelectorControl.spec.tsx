import { fireEvent } from "@testing-library/react-native";
import React from "react";
import TestRenderer from "react-test-renderer";
import { SelectedImagesManagingActions } from "./ImageSelectorControl";

describe("SelectedImagesManagingActions", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it("Renders 'Cancel', and 'Delete' action buttons '", () => {
    const component = TestRenderer.create(
      <SelectedImagesManagingActions
        onCancelClick={jest.fn()}
        onDeleteClick={jest.fn()}
      />
    );
    expect(component.root.findByProps({ testID: "Cancel" })).toBeTruthy();
    expect(component.root.findByProps({ testID: "Delete" })).toBeTruthy();
  });
  it("On an button click, executes corresponding prop function '", () => {
    const onCancelClick = jest.fn();
    const onDeleteClick = jest.fn();

    const component = TestRenderer.create(
      <SelectedImagesManagingActions {...{ onCancelClick, onDeleteClick }} />
    );

    expect(onCancelClick).not.toBeCalled();
    expect(onDeleteClick).not.toBeCalled();

    fireEvent.press(component.root.findByProps({ testID: "Cancel" }));
    fireEvent.press(component.root.findByProps({ testID: "Delete" }));

    expect(onCancelClick).toBeCalled();
    expect(onDeleteClick).toBeCalled();
  });
});
