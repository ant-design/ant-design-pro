import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

const store: Record<string, string> = {};

const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = String(value);
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    Object.keys(store).forEach((key) => {
      delete store[key];
    });
  }),
};

globalThis.localStorage = localStorageMock as unknown as Storage;

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: vi.fn(),
});

class MockWorker {
  url: string;
  onmessage: ((e: MessageEvent) => void) | null = null;
  constructor(stringUrl: string) {
    this.url = stringUrl;
  }
  postMessage(msg: unknown) {
    if (typeof this.onmessage === 'function') {
      this.onmessage({ data: msg } as MessageEvent);
    }
  }
  terminate() {}
  addEventListener() {}
  removeEventListener() {}
}

globalThis.Worker = MockWorker as unknown as typeof Worker;

if (typeof globalThis.MessageChannel === 'undefined') {
  class PolyMessageChannel {
    port1: {
      onmessage: ((e: MessageEvent) => void) | null;
      postMessage: (msg: unknown) => void;
    };
    port2: {
      onmessage: ((e: MessageEvent) => void) | null;
      postMessage: (msg: unknown) => void;
    };
    constructor() {
      const channel = this;
      this.port1 = {
        onmessage: null,
        postMessage(msg: unknown) {
          setTimeout(() => {
            if (typeof channel.port2.onmessage === 'function') {
              channel.port2.onmessage({ data: msg } as MessageEvent);
            }
          }, 0);
        },
      };
      this.port2 = {
        onmessage: null,
        postMessage(msg: unknown) {
          setTimeout(() => {
            if (typeof channel.port1.onmessage === 'function') {
              channel.port1.onmessage({ data: msg } as MessageEvent);
            }
          }, 0);
        },
      };
    }
  }
  globalThis.MessageChannel =
    PolyMessageChannel as unknown as typeof MessageChannel;
}

if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
