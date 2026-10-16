const R = window.React;
function mk(type, props, key, spread) {
  const { children, ...rest } = props || {};
  if (key !== undefined) rest.key = key;
  if (children === undefined) return R.createElement(type, rest);
  if (spread && Array.isArray(children)) return R.createElement(type, rest, ...children);
  return R.createElement(type, rest, children);
}
exports.jsx = (t, p, k) => mk(t, p, k, false);
exports.jsxs = (t, p, k) => mk(t, p, k, true);
exports.jsxDEV = (t, p, k) => mk(t, p, k, false);
exports.Fragment = R.Fragment;
