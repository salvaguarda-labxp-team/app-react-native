import React from "react";
import { render, screen, fireEvent } from '@testing-library/react-native';

import { RedirectToForgotPasswordLink } from "./LoginForm";

describe("RedirectToForgotPasswordLink", () => {
  it("Renders 1 child on React tree", () => {
    const mockFn = jest.fn()
    const component = render(<RedirectToForgotPasswordLink redirectToForgotPassword={mockFn} />)
    const tree = component.toJSON();
    // @ts-ignore
    expect(tree.children.length).toBe(1);
  });
  it("Renders text element with forgot password text", () => {
    const mockFn = jest.fn()
    render(<RedirectToForgotPasswordLink redirectToForgotPassword={mockFn} />)
    const textElement =  screen.getByText('Esqueci minha senha')
    expect(textElement).toBeTruthy()
  });
  it("Only by clicking the text element, executes 'redirectToForgotPassword' function", () => {
    const mockFn = jest.fn()
    render(<RedirectToForgotPasswordLink redirectToForgotPassword={mockFn} />)
    const textElement =  screen.getByText('Esqueci minha senha')
    // before firing event, function may not be called
    expect(mockFn).not.toBeCalled()
    
    fireEvent.press(textElement)
    
    // after firing event, function MUST be called
    expect(mockFn).toBeCalled()
  });
  
});

