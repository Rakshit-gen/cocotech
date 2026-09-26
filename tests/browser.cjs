try {
  module.exports = require("playwright");
} catch {
  module.exports = require("../../polyglot/web/node_modules/playwright");
}
