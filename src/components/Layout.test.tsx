import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";

describe("Layout", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Layout children={<div>test</div>} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
