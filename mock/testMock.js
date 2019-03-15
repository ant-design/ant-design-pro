const list = (req, res) =>
  res.json([
    {
      userId: 1,
      id: 1,
      title: 'quidem molestiae enim',
    },
    {
      userId: 2,
      id: 2,
      title: 'sunt qui excepturi placeat culpa',
    },
    {
      userId: 1,
      id: 3,
      title: 'omnis laborum odio',
    },
  ]);
const detail = (req, res) =>
  res.json({
    userId: 1,
    id: 1,
    title: 'quidem molestiae enim',
  });
export default {
  'GET /test/test2list': list,
  'GET /test/test2detail': detail,
};

// export const ProxyUrl='http://jsonplaceholder.typicode.com/albums';
// export default {
//   'GET /test/test2list': ProxyUrl,
//   'GET /test/test2detail': ProxyUrl,
// };
