import { render } from "@testing-library/react";
import { CastMemberCreate } from "./CreateCastMember";
import { renderWithProviders } from "../../utils/test-utils";

describe("CreateCastMember", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CastMemberCreate />);
    expect(asFragment()).toMatchSnapshot();
  });
});
