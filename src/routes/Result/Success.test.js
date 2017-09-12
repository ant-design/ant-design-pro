import React from 'react';
import { shallow } from 'enzyme';
import Success from './Success';

it('renders with Result', () => {
  const wrapper = shallow(<Success />);
  expect(wrapper.find('Result').length).toBe(1);
  expect(wrapper.find('Result').prop('type')).toBe('success');
});
