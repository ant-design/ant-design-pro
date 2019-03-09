import { shallow } from 'enzyme';
import 'jest';
import React from 'react';
import Success from './Success';

it('renders with Result', () => {
  const wrapper = shallow(<Success />);
  expect(wrapper.find('Result').length).toBe(1);
  expect(wrapper.find('Result').prop('type')).toBe('success');
});
