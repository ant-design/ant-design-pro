import { Hono } from 'hono';
import { type RuleListItem, tableListDataSource } from '../data/table';

const app = new Hono();

app.get('/rule', (c) => {
  const {
    current = '1',
    pageSize = '10',
    name,
    sorter,
    filter,
  } = c.req.query();

  let dataSource = [...tableListDataSource];
  const currentNum = parseInt(current, 10);
  const pageSizeNum = parseInt(pageSize, 10);

  // Filter by name
  if (name) {
    dataSource = dataSource.filter((item) => item.name.includes(name));
  }

  // Sort
  if (sorter) {
    let sorterObj: Record<string, 'ascend' | 'descend'>;
    try {
      sorterObj = JSON.parse(sorter);
    } catch {
      return c.json({ success: false, error: 'Invalid sorter format' }, 400);
    }
    dataSource.sort((prev, next) => {
      for (const key of Object.keys(sorterObj) as Array<keyof RuleListItem>) {
        const prevVal = prev[key];
        const nextVal = next[key];
        const isDescend = sorterObj[key] === 'descend';
        // Handle both string and number values
        let comparison = 0;
        if (typeof prevVal === 'string' && typeof nextVal === 'string') {
          comparison = prevVal.localeCompare(nextVal);
        } else if (typeof prevVal === 'number' && typeof nextVal === 'number') {
          comparison = prevVal - nextVal;
        }
        if (comparison !== 0) {
          return isDescend ? -comparison : comparison;
        }
      }
      return 0;
    });
  }

  // Filter
  if (filter) {
    let filterObj: Record<string, string[]>;
    try {
      filterObj = JSON.parse(filter);
    } catch {
      return c.json({ success: false, error: 'Invalid filter format' }, 400);
    }
    if (Object.keys(filterObj).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filterObj).every((key) => {
          const filterValues = filterObj[key];
          if (!filterValues || filterValues.length === 0) return true;
          return filterValues.includes(`${item[key as keyof RuleListItem]}`);
        });
      });
    }
  }

  // Pagination
  const start = (currentNum - 1) * pageSizeNum;
  const end = currentNum * pageSizeNum;
  const paginatedData = dataSource.slice(start, end);

  return c.json({
    data: paginatedData,
    total: dataSource.length,
    success: true,
    pageSize: pageSizeNum,
    current: currentNum,
  });
});

app.post('/rule', async (c) => {
  let body: {
    method?: string;
    name?: string;
    desc?: string;
    key?: number | number[];
  } = {};
  try {
    body = await c.req.json();
  } catch {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }
  const { method, name, desc, key } = body;

  if (method === 'delete' && Array.isArray(key)) {
    // Return success for delete
    return c.json({
      list: tableListDataSource.filter((item) => !key.includes(item.key)),
      pagination: { total: tableListDataSource.length },
    });
  }

  if (method === 'post') {
    const newItem: RuleListItem = {
      key: tableListDataSource.length,
      href: 'https://ant.design',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      name,
      owner: '曲丽丽',
      desc,
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 2),
      updatedAt: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      progress: Math.ceil(Math.random() * 100),
    };
    return c.json(newItem);
  }

  if (method === 'update') {
    return c.json({ key, name, desc });
  }

  return c.json({ success: true });
});

export default app;
