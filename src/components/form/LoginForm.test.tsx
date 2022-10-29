import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import {
  FormItem,
  LoginFormData,
  RedirectToForgotPasswordLink,
} from "./LoginForm";
import { Control, useForm } from "react-hook-form";

jest.mock("react-hook-form", () => ({
  Controller: () => <></>,
  useForm: () => ({
    control: () => ({}),
    handleSubmit: () => jest.fn(),
    formState: { errors: [] },
  }),
}));

describe("RedirectToForgotPasswordLink", () => {
  it("Renders 1 child on React tree", () => {
    const mockFn = jest.fn();
    const component = render(
      <RedirectToForgotPasswordLink redirectToForgotPassword={mockFn} />
    );
    const tree = component.toJSON();
    // @ts-ignore
    expect(tree.children.length).toBe(1);
  });
  it("Renders text element with forgot password text", () => {
    const mockFn = jest.fn();
    render(<RedirectToForgotPasswordLink redirectToForgotPassword={mockFn} />);
    const textElement = screen.getByText("Esqueci minha senha");
    expect(textElement).toBeTruthy();
  });
  it("Only by clicking the text element, executes 'redirectToForgotPassword' function", () => {
    const mockFn = jest.fn();
    render(<RedirectToForgotPasswordLink redirectToForgotPassword={mockFn} />);
    const textElement = screen.getByText("Esqueci minha senha");
    // before firing event, function may not be called
    expect(mockFn).not.toBeCalled();

    fireEvent.press(textElement);

    // after firing event, function MUST be called
    expect(mockFn).toBeCalled();
  });
});

describe("FormItem", () => {
  it("Renders", () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormData>({
      mode: "all",
      defaultValues: {
        username: "",
        password: "",
      },
    });

    const component = render(
      <FormItem
        {...{
          control,
          label: "anyLabel",
          name: "username",
          rules: [],
          errors: errors,
        }}
      />
    );
    expect(component).toBeTruthy();
  });
  it("Renders input with prop 'label' value", () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormData>({
      mode: "all",
      defaultValues: {
        username: "",
        password: "",
      },
    });

    render(
      <FormItem
        {...{
          control,
          label: "anyLabel--test",
          name: "username",
          rules: [],
          errors: errors,
        }}
      />
    );

    expect(screen.getByText("anyLabel--test")).toBeTruthy();
  });
});
