import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as service from '../service';
import BaseView from './base';

const mocks = vi.hoisted(() => ({
  form: {
    setFieldValue: vi.fn(),
  },
  initialValues: undefined as Record<string, any> | undefined,
  onValuesChange: undefined as
    | ((changedValues: Record<string, unknown>) => void)
    | undefined,
  dependencyProvince: { label: '浙江省', value: '330000' },
  requestResults: {} as Record<string, any>,
}));

vi.mock('@ant-design/pro-components', async () => {
  const React = await import('react');

  const ProForm = ({
    children,
    formRef,
    initialValues,
    onValuesChange,
  }: any) => {
    if (formRef) {
      formRef.current = mocks.form;
    }
    mocks.initialValues = initialValues;
    mocks.onValuesChange = onValuesChange;
    return <form>{children}</form>;
  };

  ProForm.Group = ({ children }: any) => <div>{children}</div>;

  return {
    ProForm,
    ProFormDependency: ({ children }: any) => (
      <div>{children({ province: mocks.dependencyProvince })}</div>
    ),
    ProFormFieldSet: ({ children }: any) => <div>{children}</div>,
    ProFormSelect: ({ name, params, request }: any) => {
      React.useEffect(() => {
        request?.(params).then((result: any) => {
          mocks.requestResults[name] = result;
        });
      }, [name, params, request]);
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
    mocks.onValuesChange = undefined;
    mocks.dependencyProvince = { label: '浙江省', value: '330000' };
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
      { key: '330000', label: '浙江省' },
    ]);
    vi.mocked(service.queryCity).mockResolvedValue([
      { key: '330100', label: '杭州市' },
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

  it('does not set incomplete geographic initial values', async () => {
    vi.mocked(service.queryCurrent).mockResolvedValue({
      data: {
        address: '西湖区工专路 77 号',
        avatar: '',
        country: 'China',
        email: 'antdesign@alipay.com',
        geographic: {
          province: { label: '浙江省' },
          city: { label: '杭州市' },
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
      } as any,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(mocks.initialValues?.name).toBe('Ant Design');
      expect(mocks.initialValues?.province).toBeUndefined();
      expect(mocks.initialValues?.city).toBeUndefined();
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

  it('clears city when province changes', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(mocks.onValuesChange).toBeTypeOf('function');
    });

    mocks.onValuesChange?.({
      province: { label: '河北省', value: '130000' },
    });

    expect(mocks.form.setFieldValue).toHaveBeenCalledWith('city', undefined);
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

  it('supports local mock name/id geographic responses', async () => {
    vi.mocked(service.queryProvince).mockResolvedValue([
      { id: '440000', name: '广东省' },
    ]);
    vi.mocked(service.queryCity).mockResolvedValue([
      { id: '440300', name: '深圳市' },
    ]);

    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(mocks.requestResults.province).toEqual([
        { label: '广东省', value: '440000' },
      ]);
      expect(mocks.requestResults.city).toEqual([
        { label: '深圳市', value: '440300' },
      ]);
    });
  });

  it('falls back to local city options when remote city data is empty', async () => {
    mocks.dependencyProvince = { label: '江苏省', value: '320000' };
    vi.mocked(service.queryCity).mockResolvedValue([]);

    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(service.queryCity).toHaveBeenCalledWith('320000');
      expect(mocks.requestResults.city).toContainEqual({
        label: '南京市',
        value: '320100',
      });
    });
  });
});
