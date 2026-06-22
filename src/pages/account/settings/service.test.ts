import { request } from '@umijs/max';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { queryCity } from './service';

vi.mock('@umijs/max', () => ({
  request: vi.fn(),
}));

describe('account settings service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(request).mockResolvedValue({ data: [] });
  });

  it('encodes province when requesting city options', async () => {
    await queryCity('33/000?x=1');

    expect(request).toHaveBeenCalledWith(
      '/api/geographic/city/33%2F000%3Fx%3D1',
    );
  });
});
