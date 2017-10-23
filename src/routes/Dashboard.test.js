import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';

it('renders Dashboard', () => {
  const fetchFn = jest.fn();
  const wrapper = shallow(
    <Dashboard.WrappedComponent user={{ list: [] }} dispatch={fetchFn} />
  );
  expect(wrapper.find('Table').props().dataSource).toEqual([]);
  expect(fetchFn).toBeCalled();
});
