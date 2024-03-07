import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoryTable } from "./CategoryTable";
const props = {
  data: undefined,
  isFetching: false,
  rowsPerPage: [4, 10, 20, 30],
  perPage: 10,
  handleOnPageChange: jest.fn(),
  handleFilterChange: jest.fn(),
  handleOnPageSizeChange: jest.fn(),
  handleDelete: jest.fn(),
};

const mockData = {
  data: [
    {
      id: "1",
      name: "test",
      description: "test",
      is_active: true,
      created_at: "2022-01-01T00:00:00.000Z",
    },
  ],
  meta: {
    to: 1,
    from: 1,
    path: "http://localhost:3000/categories",
    total: 1,
    per_page: 1,
    last_page: 1,
    current_page: 1,
  },
};

describe("CategoryTable", () => {
  it("should render", () => {
    const { asFragment } = render(<CategoryTable {...props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with loading state", () => {
    const { asFragment } = render(
      <CategoryTable {...props} isFetching={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render with data", () => {
    const { asFragment } = render(
      <CategoryTable {...props} data={mockData} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CategoryTable with Inactive value", () => {
    const { asFragment } = render(
      <CategoryTable
        {...props}
        data={{
          data: [{ ...mockData.data[0], is_active: false }],
          meta: { ...mockData.meta },
        }}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
