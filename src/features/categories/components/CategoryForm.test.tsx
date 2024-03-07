import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CategoryForm from "./CategoryForm";

const props = {
  category: {
    name: "test",
    description: "test",
    is_active: true,
  },
  isDisabled: false,
  isLoading: false,
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  handleToggle: jest.fn(),
};
describe("CategoryForm", () => {
  it("should render category form correctly", () => {
    const { asFragment } = render(<CategoryForm {...props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render category form with loading state", () => {
    const { asFragment } = render(
      <CategoryForm {...props} isLoading={true} isDisabled={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
