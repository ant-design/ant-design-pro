import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as service from './service';

// Mock ProComponents
vi.mock('@ant-design/pro-components', () => ({
  PageContainer: ({ children, content }: any) => (
    <div data-testid="page-container">
      {content && <div data-testid="page-content">{content}</div>}
      {children}
    </div>
  ),
  ProForm: ({ children, onFinish }: any) => (
    <form
      data-testid="pro-form"
      onSubmit={(e) => {
        e.preventDefault();
        onFinish?.();
      }}
    >
      {children}
      <button type="submit">提交</button>
    </form>
  ),
  ProFormText: ({ label, name }: any) => (
    <div data-testid={`form-text-${name}`}>{label}</div>
  ),
  ProFormTextArea: ({ label, name }: any) => (
    <div data-testid={`form-textarea-${name}`}>{label}</div>
  ),
  ProFormDateRangePicker: ({ label, name }: any) => (
    <div data-testid={`form-daterange-${name}`}>{label}</div>
  ),
  ProFormDigit: ({ label, name }: any) => (
    <div data-testid={`form-digit-${name}`}>
      {typeof label === 'object' ? label.props.children[0] : label}
    </div>
  ),
  ProFormRadio: {
    Group: ({ label }: any) => (
      <div data-testid="form-radio-group">{label}</div>
    ),
  },
  ProFormSelect: ({ name }: any) => (
    <div data-testid={`form-select-${name}`}>Select</div>
  ),
  ProFormDependency: ({ children }: any) => (
    <div data-testid="form-dependency">{children({ publicType: '2' })}</div>
  ),
}));

// Mock dependencies
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
    Card: ({ children }: any) => <div data-testid="card">{children}</div>,
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

vi.mock('./service', () => ({
  fakeSubmitForm: vi.fn(),
}));

vi.mock('./style.style', () => ({
  default: () => ({
    styles: {
      optional: 'optional-class',
    },
  }),
}));

import BasicForm from './index';

describe('BasicForm', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BasicForm />
      </QueryClientProvider>,
    );

    expect(container).toBeTruthy();
  });

  it('should render form fields', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BasicForm />
      </QueryClientProvider>,
    );

    expect(screen.getByText('标题')).toBeInTheDocument();
    expect(screen.getByText('起止日期')).toBeInTheDocument();
    expect(screen.getByText('目标描述')).toBeInTheDocument();
  });

  it('should have submit button', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BasicForm />
      </QueryClientProvider>,
    );

    expect(screen.getByRole('button', { name: /提交/i })).toBeInTheDocument();
  });

  it('should call fakeSubmitForm on successful submission', async () => {
    const mockSubmit = vi.mocked(service.fakeSubmitForm);
    mockSubmit.mockResolvedValue({ success: true });

    render(
      <QueryClientProvider client={queryClient}>
        <BasicForm />
      </QueryClientProvider>,
    );

    const submitButton = screen.getByRole('button', { name: /提交/i });
    submitButton.click();

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  it('should render within PageContainer', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BasicForm />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('page-container')).toBeInTheDocument();
  });
});
