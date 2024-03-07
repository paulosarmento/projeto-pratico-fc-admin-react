import { render } from "@testing-library/react";
import CastMemberForm from "./CastMembersForm";
import { BrowserRouter } from "react-router-dom";
import { GridFilterModel } from "@mui/x-data-grid";
import { CastMembersTable } from "./CastMembersTable";

const props = {
  data: {
    data: [
      {
        id: "123",
        type: 1,
        name: "test",
        created_at: "2022-01-01T00:00:00.000Z",
      },
    ],
    meta: {
      current_page: 1,
      per_page: 10,
      last_page: 1,
      total: 1,
    },
  },

  isFetching: false,
  rowsPerPage: [4, 10, 20, 30],
  perPage: 10,

  handleOnPageChange: (page: number) => {},
  handleFilterChange: (filterModel: GridFilterModel) => {},
  handleOnPageSizeChange: (perPage: number) => {},
  handleDelete: (id: string) => {},
};

describe("CastMemberForm", () => {
  it("should render castMember table correctly", () => {
    const { asFragment } = render(<CastMembersTable {...props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember table with loading state", () => {
    const { asFragment } = render(<CastMembersTable {...props} isFetching />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember table with error state", () => {
    const { asFragment } = render(
      <CastMembersTable {...props} data={undefined} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember table with data", () => {
    const { asFragment } = render(
      <CastMembersTable {...props} data={props.data} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember table with empty data", () => {
    const { asFragment } = render(
      <CastMembersTable {...props} data={{ data: [], meta: {} as any }} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render corret type", () => {
    const { asFragment } = render(
      <CastMembersTable
        {...props}
        data={{
          data: [{ ...props.data.data[0], type: 2 }],
          meta: { ...props.data.meta },
        }}
      />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
