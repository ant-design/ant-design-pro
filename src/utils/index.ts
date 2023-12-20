import { message } from 'antd';
import dayjs from 'dayjs';
import { Key, SyntheticEvent } from 'react';
/**
 * 取消事件冒泡
 * @param e
 */
export function cancelBubble(e: SyntheticEvent) {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
}

export function renderEmpty(value: string | number | undefined) {
  return value ?? '-';
}

/**
 * Key[] 转ant option
 * @param arr Key[]
 * @returns option
 */

export const getOptions = (arr?: Key[]) => {
  if (!arr || !arr.length) return [];
  return arr.map((item) => ({
    value: item,
    label: item,
  }));
};

/**
 * 获取表格参数
 * @param 表格参数
 * @returns 分页表格所需参数
 */

export const getTableParams = (params: Record<string, any>) => {
  const { current, pageSize, restProps } = params;
  return {
    pageNum: current,
    pageSize,
    ...restProps,
  };
};

// 接口修改、新增成功 回调返回上一级
export const onSuccessAndGoBack = (res: Record<string, any>) => {
  if (res.code === 200) {
    message.success('操作成功！');
    history.go(-1);
  }
};

// 接口修改、新增成功 刷新页面
export const onSuccessAndRefresh = (
  res: Record<string, any>,
  refresh: ((delta?: number | undefined) => void) | any,
) => {
  if (res.code === 200) {
    message.success('保存成功！');
    refresh();
  }
};

// option2enum
export const option2enum = (options: { value: string; label: string }[]) => {
  const obj: Record<string, any> = {};
  options.forEach((item) => {
    const { value, label } = item;
    obj[value] = { text: label, ...item };
  });
  return obj;
};

/**
 * 字符串、int转时间
 * @param dateString、dateInt
 * @returns
 */

export const formatDate = (text: string | number) => {
  if (!text) return '-';
  return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
};

export const queryPagingTable = async <U>(
  params: { [k: string]: any },
  api?: (data: U) => Promise<Record<string, any>>,
) => {
  if (!api)
    return {
      data: [],
      success: true,
      total: 0,
    };
  const { current, pageSize, search, filter, scope, ...restProps } = params;
  const data = {
    pageNum: current,
    pageSize,
    search: {
      ...search,
      ...restProps,
    },
    filter,
    scope,
  };
  const msg = await api(data as U);
  return {
    ...msg?.data,
    data: msg?.data?.records || [],
    success: true,
    total: msg?.data?.total,
  };
};

/**
 *  获取随机id
 */
export const getRandomId = () => {
  return (Math.random() * 1000000).toFixed(0);
};

/**
 * 描述信息
 * @param value
 * @returns
 */
export function renderDescriptions(value: string | number | undefined) {
  return value ?? '-';
}

/**
 * 获取form数据
 * @param params 参数
 * @param ready 是否请求
 * @param api 接口名称
 * @returns
 */

export const queryFormData = async <U>(
  params: { [k: string]: any },
  ready: boolean,
  api?: (data: U) => Promise<Record<string, any>>,
) => {
  if (!ready) return {};
  if (!api) return {};
  const msg = await api(params as U);
  if (msg.code === 200) {
    return msg.data;
  }
  return {};
};

/**
 * 获取下拉数据
 * @param params 参数
 * @param api 接口名称
 * @returns
 */

export const queryOptions = async <U>(
  params: { [k: string]: any },
  api?: (data: U, options?: Record<string, any>) => Promise<Record<string, any>>,
  options?: { [key: string]: any },
) => {
  if (!api) return [];

  const msg = await api(params as U, options);
  if (msg.code === 200) {
    return msg?.data;
  }
  return [];
};

/**
 *  计算税率
 * @param amount 金额
 * @param rate 税率
 * @returns taxInclusiveAmount 税额  taxExclusiveAmount 不含税金额
 */
export const calcTaxRate = (amount: number, rate: number) => {
  if (!amount || !rate)
    return {
      taxInclusiveAmount: 0,
      taxExclusiveAmount: 0,
    };

  // 不含税金额 = 含税金额 / (1+税率）
  const taxExclusiveAmount = Number((amount / (1 + rate / 100)).toFixed(2));

  return {
    // 税额 = 不含税金额 * 税率
    taxInclusiveAmount: (taxExclusiveAmount * (rate / 100)).toFixed(2),
    taxExclusiveAmount,
  };
};

// 查询审批分页
export const queryApprovalTable = async <U>(
  params: AntTableParams & { [k: string]: any },
  api?: (data: U) => Promise<Record<string, any>>,
) => {
  if (!api)
    return {
      data: [],
      success: true,
      total: 0,
    };
  const { current, pageSize, ...restProps } = params;
  const data = {
    pageNum: current,
    pageSize,
    ...restProps,
  };
  const msg = await api(data as U);
  return {
    data: msg?.data?.historicProcessInstanceRespList || [],
    success: true,
    total: msg?.data?.count,
  };
};

/**
 * 数组按照指定字段分组
 * @param arr 数组
 * @param groupingFields 数据分组的特定属性或字段
 */
export const groupedData = <T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  groupingFields: K,
) => {
  return arr.reduce((result, current) => {
    const fields = current[groupingFields];
    if (!result[fields]) {
      result[fields] = [];
    }
    result[fields].push(current);
    return result;
  }, {} as Record<T[K], T[]>);
};

/**
 * 计算百分比
 * @param val 值
 * @param total 总数
 * @returns
 */
export const calculatePercentage = (val: number, total: number) => {
  if (typeof val !== 'number' || typeof total !== 'number' || total === 0) {
    return '';
  }

  // 计算百分比
  const percentage = (val * 100) / total;

  // 判断是否有小数
  const hasDecimal = percentage % 1 !== 0;

  // 根据有无小数来处理结果
  const formattedPercentage = hasDecimal ? percentage.toFixed(2) : Math.round(percentage);

  return formattedPercentage;
};
