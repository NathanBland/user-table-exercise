import React from "react";
import { shallow, mount } from "enzyme";
import FormControls from "./FormControls";
import assert from "assert"

it("renders without crashing", () => {
  shallow(<FormControls page={1} />);
});

it("renders the current page", () => {
  const wrapper = shallow(<FormControls page={1} />);
  assert.equal(wrapper.find('.current-page').text(), "1")
});

it("disables the previous button on page 1", () => {
  const wrapper = shallow(<FormControls page={1} />);
  assert.equal(wrapper.find('.previous.page-button').text(), "<")
  assert.equal(wrapper.find('.previous.page-button').type(), "span")
});

it("renders the next button on page 1", () => {
  const wrapper = shallow(<FormControls page={1} />);
  assert.equal(wrapper.find('.next.page-button').text(), ">")
  assert.equal(wrapper.find('.next.page-button').type(), "button")
});

it("renders the next, and previous button on page 2", () => {
  const wrapper = shallow(<FormControls page={2} />);
  assert.equal(wrapper.find('.previous.page-button').type(), "button")
  assert.equal(wrapper.find('.next.page-button').type(), "button")
});