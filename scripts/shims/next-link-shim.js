const R = window.React;
module.exports = function Link({ href, children, prefetch, replace, scroll, shallow, passHref, legacyBehavior, ...rest }) {
  return R.createElement("a", { href: typeof href === "string" ? href : (href && href.pathname) || "#", ...rest }, children);
};
module.exports.default = module.exports;
