const R = window.React;
module.exports = function Image({ src, alt, width, height, fill, priority, quality, placeholder, unoptimized, loader, ...rest }) {
  return R.createElement("img", { src: typeof src === "string" ? src : src && src.src, alt, width, height, ...rest });
};
module.exports.default = module.exports;
