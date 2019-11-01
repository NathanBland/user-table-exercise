import React from "react";
import { shallow, mount } from "enzyme";
import BasicLoader from "./BasicLoader";
import assert from "assert"

it("renders without crashing", () => {
  shallow(<BasicLoader limit={5} />);
});

it("renders the table with loading bars", () => {
  const wrapper = shallow(<BasicLoader limit={5} />);
  assert.equal(wrapper.exists('.loading-bar'), true)
});