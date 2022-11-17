import { fireEvent } from "@testing-library/react-native";
import React from "react";
import TestRenderer from "react-test-renderer";
import { MediaInput } from "./MediaInput";

describe("MediaInput", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it("Renders 'Camera', 'Gallery' and 'VoiceNote' action icons '", () => {
    const component = TestRenderer.create(
      <MediaInput
        onAddClick={jest.fn()}
        onCameraClick={jest.fn()}
        onMicClick={jest.fn()}
      />
    );
    expect(component.root.findByProps({ testID: "Camera" })).toBeTruthy();
    expect(component.root.findByProps({ testID: "Gallery" })).toBeTruthy();
    expect(component.root.findByProps({ testID: "VoiceNote" })).toBeTruthy();
  });
  it("On an icon click, executes corresponding prop function '", () => {
    const onAddClick = jest.fn();
    const onCameraClick = jest.fn();
    const onMicClick = jest.fn();

    const component = TestRenderer.create(
      <MediaInput {...{ onAddClick, onCameraClick, onMicClick }} />
    );

    expect(onCameraClick).not.toBeCalled();
    expect(onAddClick).not.toBeCalled();
    expect(onMicClick).not.toBeCalled();

    fireEvent.press(component.root.findByProps({ testID: "Camera" }));
    fireEvent.press(component.root.findByProps({ testID: "Gallery" }));
    fireEvent.press(component.root.findByProps({ testID: "VoiceNote" }));

    expect(onCameraClick).toBeCalled();
    expect(onMicClick).toBeCalled();
    expect(onAddClick).toBeCalled();
  });
});
