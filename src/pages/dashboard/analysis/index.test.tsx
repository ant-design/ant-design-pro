import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { AnalysisData } from './data.d';
import * as service from './service';

// Mock ProComponents
vi.mock('@ant-design/pro-components', () => ({
  GridContent: ({ children }: any) => (
    <div data-testid="grid-content">{children}</div>
  ),
}));

// Mock dependencies
vi.mock('@umijs/max', () => ({
  useIntl: () => ({
    formatMessage: vi.fn(({ defaultMessage }) => defaultMessage),
  }),
  FormattedMessage: ({ defaultMessage }: { defaultMessage: string }) => (
    <span>{defaultMessage}</span>
  ),
}));

vi.mock('./service', () => ({
  fakeChartData: vi.fn(),
}));

vi.mock('./style.style', () => ({
  default: () => ({
    styles: {
      iconGroup: 'icon-group',
      currentDate: 'current-date',
    },
  }),
}));

// Mock child components to avoid heavy rendering
vi.mock('./components/IntroduceRow', () => ({
  default: ({ loading, visitData }: any) => (
    <div data-testid="introduce-row">
      IntroduceRow - {loading ? 'loading' : `${visitData.length} items`}
    </div>
  ),
}));

vi.mock('./components/SalesCard', () => ({
  default: ({ loading, salesData }: any) => (
    <div data-testid="sales-card">
      SalesCard - {loading ? 'loading' : `${salesData.length} items`}
    </div>
  ),
}));

vi.mock('./components/TopSearch', () => ({
  default: ({ loading, searchData }: any) => (
    <div data-testid="top-search">
      TopSearch - {loading ? 'loading' : `${searchData.length} items`}
    </div>
  ),
}));

vi.mock('./components/ProportionSales', () => ({
  default: ({ loading, salesPieData }: any) => (
    <div data-testid="proportion-sales">
      ProportionSales -{' '}
      {loading ? 'loading' : `${salesPieData?.length || 0} items`}
    </div>
  ),
}));

vi.mock('./components/OfflineData', () => ({
  default: ({ loading, offlineData }: any) => (
    <div data-testid="offline-data">
      OfflineData - {loading ? 'loading' : `${offlineData.length} items`}
    </div>
  ),
}));

vi.mock('./components/PageLoading', () => ({
  default: () => <div data-testid="page-loading">Loading...</div>,
}));

import Analysis from './index';

const mockAnalysisData: AnalysisData = {
  visitData: [
    { x: '2024-01-01', y: 100 },
    { x: '2024-01-02', y: 200 },
  ],
  visitData2: [
    { x: '2024-01-01', y: 50 },
    { x: '2024-01-02', y: 150 },
  ],
  salesData: [
    { x: '2024-01', y: 1000 },
    { x: '2024-02', y: 2000 },
  ],
  searchData: [
    { index: 1, keyword: 'test', count: 100, range: 10, status: 0 },
    { index: 2, keyword: 'search', count: 200, range: 20, status: 1 },
  ],
  offlineData: [
    {
      name: 'Store 1',
      cvr: 0.85,
    },
    {
      name: 'Store 2',
      cvr: 0.92,
    },
  ],
  offlineChartData: [
    { x: '00:00', y1: 10, y2: 20 },
    { x: '01:00', y1: 15, y2: 25 },
  ],
  salesTypeData: [
    { x: 'Category A', y: 1000 },
    { x: 'Category B', y: 2000 },
  ],
  salesTypeDataOnline: [
    { x: 'Online A', y: 500 },
    { x: 'Online B', y: 1500 },
  ],
  salesTypeDataOffline: [
    { x: 'Offline A', y: 500 },
    { x: 'Offline B', y: 500 },
  ],
  radarData: [
    { name: 'Personal', label: 'Quote', value: 10 },
    { name: 'Team', label: 'Quote', value: 30 },
  ],
};

describe('Analysis Dashboard', () => {
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
    vi.mocked(service.fakeChartData).mockResolvedValue({
      data: mockAnalysisData,
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Analysis loading={false} dashboardAndanalysis={mockAnalysisData} />
      </QueryClientProvider>,
    );

    expect(container).toBeTruthy();
  });

  it('should render all dashboard components', async () => {
    vi.mocked(service.fakeChartData).mockResolvedValue({
      data: mockAnalysisData,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Analysis loading={false} dashboardAndanalysis={mockAnalysisData} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('introduce-row')).toBeInTheDocument();
      expect(screen.getByTestId('sales-card')).toBeInTheDocument();
      expect(screen.getByTestId('top-search')).toBeInTheDocument();
      expect(screen.getByTestId('proportion-sales')).toBeInTheDocument();
      expect(screen.getByTestId('offline-data')).toBeInTheDocument();
    });
  });

  it('should fetch chart data on mount', async () => {
    vi.mocked(service.fakeChartData).mockResolvedValue({
      data: mockAnalysisData,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Analysis loading={false} dashboardAndanalysis={mockAnalysisData} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(service.fakeChartData).toHaveBeenCalled();
    });
  });

  it('should pass correct data to child components', async () => {
    vi.mocked(service.fakeChartData).mockResolvedValue({
      data: mockAnalysisData,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Analysis loading={false} dashboardAndanalysis={mockAnalysisData} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('introduce-row')).toHaveTextContent('2 items');
      expect(screen.getByTestId('sales-card')).toHaveTextContent('2 items');
    });
  });

  it('should handle empty data gracefully', async () => {
    vi.mocked(service.fakeChartData).mockResolvedValue({
      data: {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Analysis loading={false} dashboardAndanalysis={mockAnalysisData} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('introduce-row')).toHaveTextContent('0 items');
    });
  });
});
