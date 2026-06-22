import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as service from '../service';
import BaseView from './base';

const mocks = vi.hoisted(() => ({
  initialValues: undefined as Record<string, any> | undefined,
  requestResults: {} as Record<string, any>,
}));

vi.mock('@ant-design/pro-components', async () => {
  const React = await import('react');

  const ProForm = ({ children, initialValues }: any) => {
    mocks.initialValues = initialValues;
    return <form>{children}</form>;
  };

  ProForm.Group = ({ children }: any) => <div>{children}</div>;

  return {
    ProForm,
    ProFormDependency: ({ children }: any) => (
      <div>{children({ province: { label: '浙江省', value: '330000' } })}</div>
    ),
    ProFormFieldSet: ({ children }: any) => <div>{children}</div>,
    ProFormSelect: ({ name, request }: any) => {
      React.useEffect(() => {
        request?.().then((result: any) => {
          mocks.requestResults[name] = result;
        });
      }, [name, request]);
      return <div />;
    },
    ProFormText: () => <div />,
    ProFormTextArea: () => <div />,
  };
});

vi.mock('antd', () => ({
  Button: ({ children }: any) => <button type="button">{children}</button>,
  Input: (props: any) => <input {...props} />,
  Upload: ({ children }: any) => <div>{children}</div>,
  message: {
    success: vi.fn(),
  },
}));

vi.mock('@ant-design/icons', () => ({
  UploadOutlined: () => <span />,
}));

vi.mock('./index.style', () => ({
  default: () => ({
    styles: {
      area_code: 'area-code',
      avatar: 'avatar',
      avatar_title: 'avatar-title',
      baseView: 'base-view',
      button_view: 'button-view',
      left: 'left',
      phone_number: 'phone-number',
      right: 'right',
    },
  }),
}));

vi.mock('../service', () => ({
  queryCity: vi.fn(),
  queryCurrent: vi.fn(),
  queryProvince: vi.fn(),
}));

describe('BaseView geographic selects', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    mocks.initialValues = undefined;
    mocks.requestResults = {};
    vi.clearAllMocks();

    vi.mocked(service.queryCurrent).mockResolvedValue({
      data: {
        address: '西湖区工专路 77 号',
        avatar: '',
        country: 'China',
        email: 'antdesign@alipay.com',
        geographic: {
          province: { label: '浙江省', key: '330000' },
          city: { label: '杭州市', key: '330100' },
        },
        group: '',
        name: 'Ant Design',
        notice: [],
        notifyCount: 0,
        phone: '0752-268888888',
        signature: '',
        tags: [],
        title: '',
        unreadCount: 0,
        userid: '00000001',
      },
    });
    vi.mocked(service.queryProvince).mockResolvedValue([
      { id: '330000', name: '浙江省' },
    ]);
    vi.mocked(service.queryCity).mockResolvedValue([
      { id: '330100', name: '杭州市' },
    ]);
  });

  it('normalizes geographic initial values for labelInValue selects', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(mocks.initialValues?.province).toEqual({
        label: '浙江省',
        value: '330000',
      });
      expect(mocks.initialValues?.city).toEqual({
        label: '杭州市',
        value: '330100',
      });
    });
  });

  it('loads cities with the selected province value', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(service.queryCity).toHaveBeenCalledWith('330000');
    });
  });

  it('returns label/value option arrays for geographic selects', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(mocks.requestResults.province).toEqual([
        { label: '浙江省', value: '330000' },
      ]);
      expect(mocks.requestResults.city).toEqual([
        { label: '杭州市', value: '330100' },
      ]);
    });
  });
});
