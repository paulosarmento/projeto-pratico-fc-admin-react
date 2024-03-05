import { renderWithProviders } from "../../utils/test-utils";
import CategoryList from "./ListCategory";

describe("CreateCastMember", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
