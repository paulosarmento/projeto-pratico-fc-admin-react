import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Header />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
