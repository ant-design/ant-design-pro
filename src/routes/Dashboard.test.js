import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';

it('renders Dashboard', () => {
  const wrapper = shallow(
    <Dashboard.WrappedComponent user={{ list: [] }} />
  );
  expect(wrapper.find('Table').props().dataSource).toEqual([]);
});
