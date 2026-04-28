module.exports = function mdRawLoader(source) {
  this.cacheable?.();
  return `export default ${JSON.stringify(String(source))};`;
};