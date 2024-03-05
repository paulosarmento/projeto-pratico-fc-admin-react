import { render } from "@testing-library/react";
import { CastMembersList } from "./ListCastMembers";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/test-utils";

describe("ListCastMembers", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CastMembersList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
