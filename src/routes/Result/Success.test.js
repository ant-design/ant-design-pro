import React from 'react';
import { mount } from 'enzyme';
import Success from './Success';

it('renders with Result', () => {
  const wrapper = mount(<Success />);
  expect(wrapper.find('Result').length).toBe(1);
  expect(wrapper.find('Result').prop('type')).toBe('success');
});
