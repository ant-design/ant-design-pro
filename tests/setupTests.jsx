import { defaultConfig } from 'antd/lib/theme/internal';

defaultConfig.hashed = false;

const store = {};

const localStorageMock = {
  getItem: jest.fn((key) => store[key] ?? null),
  setItem: jest.fn((key, value) => {
    store[key] = String(value);
  }),
  removeItem: jest.fn((key) => {
    delete store[key];
  }),
  clear: jest.fn(() => {
    Object.keys(store).forEach((key) => delete store[key]);
  }),
};

globalThis.localStorage = localStorageMock;

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn(),
});

class MockWorker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = null;
  }

  postMessage(msg) {
    if (typeof this.onmessage === 'function') {
      this.onmessage({ data: msg });
    }
  }

  terminate() {}
  addEventListener() {}
  removeEventListener() {}
}

globalThis.Worker = MockWorker;

if (typeof globalThis.MessageChannel === 'undefined') {
  class PolyMessageChannel {
    constructor() {
      const channel = this;

      this.port1 = {
        onmessage: null,
        postMessage(msg) {
          setTimeout(() => {
            if (typeof channel.port2.onmessage === 'function') {
              channel.port2.onmessage({ data: msg });
            }
          }, 0);
        },
      };

      this.port2 = {
        onmessage: null,
        postMessage(msg) {
          setTimeout(() => {
            if (typeof channel.port1.onmessage === 'function') {
              channel.port1.onmessage({ data: msg });
            }
          }, 0);
        },
      };
    }
  }

  globalThis.MessageChannel = PolyMessageChannel;
}

if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

const originalError = console.error;
Object.defineProperty(window.console, 'error', {
  writable: true,
  configurable: true,
  value: (...rest) => {
    const logStr = rest.join('');
    if (
      logStr.includes(
        'Warning: An update to %s inside a test was not wrapped in act(...)',
      )
    ) {
      return;
    }
    originalError(...rest);
  },
});

globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
