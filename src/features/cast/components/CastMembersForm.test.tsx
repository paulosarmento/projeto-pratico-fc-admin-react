import { render } from "@testing-library/react";
import CastMemberForm from "./CastMembersForm";
import { BrowserRouter } from "react-router-dom";

const props = {
  castMember: {
    id: "1",
    name: "test",
    type: 1,
    created_at: "2022-01-01T00:00:00.000Z",
  },
  isLoading: false,
  isDisabled: false,
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
};
describe("CastMemberForm", () => {
  it("should render castMember form correctly", () => {
    const { asFragment } = render(<CastMemberForm {...props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember form with loading state", () => {
    const { asFragment } = render(<CastMemberForm {...props} isLoading />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render castMember form with disabled state", () => {
    const { asFragment } = render(
      <CastMemberForm {...props} isLoading={true} isDisabled={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
