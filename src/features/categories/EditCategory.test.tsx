import { renderWithProviders } from "../../utils/test-utils";
import CategoryEdit from "./EditCategory";

describe("CreateCastMember", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryEdit />);
    expect(asFragment()).toMatchSnapshot();
  });
});
