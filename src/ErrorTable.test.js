import React from "react";
import { shallow, mount } from "enzyme";
import ErrorTable from "./ErrorTable";
import assert from "assert"

it("renders without crashing", () => {
  shallow(<ErrorTable limit={5} />);
});

it("renders the error message", () => {
  const wrapper = shallow(<ErrorTable limit={5} />);
  assert.equal(wrapper.exists('.error-message'), true)
});

it("renders the retry button", () => {
  const wrapper = shallow(<ErrorTable limit={5} />);
  assert.equal(wrapper.exists('.button--error'), true)
})