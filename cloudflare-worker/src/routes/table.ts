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
    const sorterObj = JSON.parse(sorter);
    dataSource.sort((prev, next) => {
      let sortNumber = 0;
      for (const key of Object.keys(sorterObj) as Array<keyof RuleListItem>) {
        const prevVal = prev[key] as number;
        const nextVal = next[key] as number;
        if (sorterObj[key] === 'descend') {
          sortNumber += prevVal > nextVal ? -1 : 1;
        } else {
          sortNumber += prevVal > nextVal ? 1 : -1;
        }
      }
      return sortNumber;
    });
  }

  // Filter
  if (filter) {
    const filterObj = JSON.parse(filter) as Record<string, string[]>;
    if (Object.keys(filterObj).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filterObj).some((key) => {
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
  const body = await c.req.json();
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
      status: Math.floor(Math.random() * 10) % 2,
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
