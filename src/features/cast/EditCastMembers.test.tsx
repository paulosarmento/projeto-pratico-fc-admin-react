import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CastMemberEdit } from "./EditCastMembers";
import { renderWithProviders } from "../../utils/test-utils";

describe("CastMemberEdit", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CastMemberEdit />);
    expect(asFragment()).toMatchSnapshot();
  });
});
