import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import * as api from '@/services/ant-design-pro/api';

// Mock ProComponents before importing component
vi.mock('@ant-design/pro-components', () => ({
  PageContainer: ({ children }: any) => (
    <div data-testid="page-container">{children}</div>
  ),
  ProTable: ({ columns, toolBarRender, request }: any) => {
    // Invoke request prop to simulate ProTable data loading
    request?.({ current: 1, pageSize: 20 }, {}, {});
    return (
      <div data-testid="pro-table">
        <div data-testid="table-columns">
          {columns?.map((col: any) => (
            <div
              key={
                typeof col.title === 'object'
                  ? col.title.props.defaultMessage
                  : col.dataIndex
              }
              data-testid={`column-${col.dataIndex}`}
            >
              {typeof col.title === 'object'
                ? col.title.props.defaultMessage
                : col.title}
            </div>
          ))}
        </div>
        {toolBarRender && <div data-testid="toolbar">{toolBarRender()}</div>}
      </div>
    );
  },
  FooterToolbar: ({ children }: any) => (
    <div data-testid="footer-toolbar">{children}</div>
  ),
  ProDescriptions: ({ title }: any) => (
    <div data-testid="pro-descriptions">{title}</div>
  ),
}));

// Mock dependencies
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    message: {
      useMessage: () => [
        {
          success: vi.fn(),
          error: vi.fn(),
        },
        null,
      ],
      success: vi.fn(),
      error: vi.fn(),
    },
    Drawer: ({ children, open }: any) =>
      open ? <div data-testid="drawer">{children}</div> : null,
    Button: ({ children, onClick }: any) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    Input: (props: any) => <input {...props} />,
  };
});

vi.mock('@umijs/max', () => ({
  useIntl: () => ({
    formatMessage: vi.fn(({ defaultMessage }) => defaultMessage),
  }),
  FormattedMessage: ({ defaultMessage }: { defaultMessage: string }) => (
    <span>{defaultMessage}</span>
  ),
}));

vi.mock('@/services/ant-design-pro/api', () => ({
  rule: vi.fn(),
  removeRule: vi.fn(),
  addRule: vi.fn(),
  updateRule: vi.fn(),
}));

vi.mock('./components/CreateForm', () => ({
  default: ({ trigger }: any) => <div data-testid="create-form">{trigger}</div>,
}));

vi.mock('./components/UpdateForm', () => ({
  default: ({ trigger }: any) => <div data-testid="update-form">{trigger}</div>,
}));

import TableList from './index';

describe('TableList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();

    // Mock rule API to return empty data
    vi.mocked(api.rule).mockResolvedValue({
      data: [],
      total: 0,
      success: true,
    });
  });

  it('should render without crashing', async () => {
    const { container } = await render(
      <QueryClientProvider client={queryClient}>
        <TableList />
      </QueryClientProvider>,
    );

    expect(container).toBeTruthy();
  });

  it('should render ProTable component', async () => {
    const view = await render(
      <QueryClientProvider client={queryClient}>
        <TableList />
      </QueryClientProvider>,
    );

    await expect.element(view.getByTestId('pro-table')).toBeInTheDocument();
  });

  it('should have correct table columns', async () => {
    const view = await render(
      <QueryClientProvider client={queryClient}>
        <TableList />
      </QueryClientProvider>,
    );

    await expect.element(view.getByText('Rule name')).toBeInTheDocument();
    await expect.element(view.getByText('Description')).toBeInTheDocument();
  });

  it('should render table after data loading', async () => {
    const mockRemoveRule = vi.mocked(api.removeRule);
    mockRemoveRule.mockResolvedValue({ success: true });

    const view = await render(
      <QueryClientProvider client={queryClient}>
        <TableList />
      </QueryClientProvider>,
    );

    await expect.element(view.getByTestId('pro-table')).toBeInTheDocument();
  });

  it('should call rule API on mount', async () => {
    vi.mocked(api.rule).mockResolvedValue({
      data: [],
      total: 0,
      success: true,
    });

    await render(
      <QueryClientProvider client={queryClient}>
        <TableList />
      </QueryClientProvider>,
    );

    await vi.waitFor(() => {
      expect(api.rule).toHaveBeenCalled();
    });
  });
});
