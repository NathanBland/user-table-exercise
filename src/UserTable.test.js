import React from "react";
import { shallow } from "enzyme";
import UserTable from "./UserTable";

it("renders without crashing", () => {
  shallow(<UserTable />);
});
it("renders the error component given an error", () => {
  shallow(<UserTable />, { hasError: true });
  // expect
})
