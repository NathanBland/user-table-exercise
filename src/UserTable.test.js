import React from "react";
import { shallow, mount } from "enzyme";
import UserTable from "./UserTable";
import assert from "assert"

it("renders without crashing", () => {
  shallow(<UserTable />);
});
it('renders the search field always', () => {
  const wrapper = shallow(<UserTable />)
  assert.equal(wrapper.exists('.user-search'), true)
})
it('renders the default table container', () => {
  const wrapper = mount(<UserTable />)
  assert.equal(wrapper.exists('.UserTable--with-headers'), true)
})
it('renders the controls for paging', () => {
  const wrapper = mount(<UserTable />)
  assert.equal(wrapper.exists('.controls'), true)
})
it("renders the loader while loading", () => {
  const wrapper = mount(<UserTable />)
  wrapper.setState({ isLoading: true })
  assert.equal(wrapper.exists('.loading'), true)
})
it("renders the error component given an error", () => {
  const wrapper = mount(<UserTable />);
  wrapper.setState({ hasError: true, isLoading: false })
  assert.equal(wrapper.exists('.hasErrors'), true)
})
