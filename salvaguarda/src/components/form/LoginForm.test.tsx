import React from "react";
import renderer from "react-test-renderer";

import { RedirectToForgotPasswordLink } from "./LoginForm";

describe("RedirectToForgotPasswordLink", () => {
  it("Renders 1 child on React tree", () => {
    const mockFn = jest.fn()
    const component = renderer.create(<RedirectToForgotPasswordLink redirectToForgotPassword={mockFn} />)
    const tree = component.toJSON();
    // @ts-ignore
    expect(tree.children.length).toBe(1);
  });
});

