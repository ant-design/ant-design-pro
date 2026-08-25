import { startMock } from '@@/requestRecordMock';
import { TestBrowser } from '@@/testBrowser';
import React, { act } from 'react';
import { expect } from 'vitest';
import { render } from 'vitest-browser-react';

let server: {
  close: () => void;
};

describe('Login Page', () => {
  beforeAll(async () => {
    server = await startMock({
      port: 8000,
      scene: 'login',
    });
  });

  afterAll(() => {
    server?.close();
  });

  it('should show login form', async () => {
    const historyRef = React.createRef<any>();
    const rootContainer = await render(
      <TestBrowser
        historyRef={historyRef}
        location={{
          pathname: '/user/login',
        }}
      />,
    );

    await expect
      .element(rootContainer.getByText('Ant Design'))
      .toBeInTheDocument();

    act(() => {
      historyRef.current?.push('/user/login');
    });

    expect(
      rootContainer.baseElement?.querySelector('.ant-pro-form-login-desc')
        ?.textContent,
    ).toBe(
      'Ant Design is the most influential web design specification in Xihu district',
    );

    expect(rootContainer.asFragment()).toMatchSnapshot();

    await rootContainer.unmount();
  });

  it('should login success', async () => {
    const historyRef = React.createRef<any>();
    const rootContainer = await render(
      <TestBrowser
        historyRef={historyRef}
        location={{
          pathname: '/user/login',
        }}
      />,
    );

    await expect
      .element(rootContainer.getByText('Ant Design'))
      .toBeInTheDocument();

    const userNameInput = rootContainer.getByPlaceholder(
      'Username: admin or user',
    );
    await userNameInput.fill('admin');

    const passwordInput = rootContainer.getByPlaceholder(
      'Password: ant.design',
    );
    await passwordInput.fill('ant.design');

    await rootContainer.getByText('Login').click();

    // Wait for login to succeed and navigate to home page
    await expect
      .element(rootContainer.getByText(/Ant Design Pro/))
      .toBeInTheDocument();

    expect(rootContainer.asFragment()).toMatchSnapshot();

    await rootContainer.unmount();
  });
});
