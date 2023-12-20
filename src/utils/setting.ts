export const defaultTableConfig: Record<string, any> = {
  rowKey: 'id',
  tableAlertRender: false,
  search: false,
  options: {
    reload: true,
    density: false,
    setting: false,
  },
  pagination: {
    defaultPageSize: 10,
    showSizeChanger: true,
    disabled: false,
  },
  scroll: { x: 'max-content' },
  form: {
    syncToUrl: true,
  },
};

export const BASE_URL = '';

export const requiredRule = {
  required: true,
  message: '此项为必填项',
};
