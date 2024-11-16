/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable security/detect-non-literal-require */
/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require('fs');
const path = require('path');
const { APP } = require('../constants');

const root = path.join(__dirname, '..', APP.MODULE_ROOT_DIR);

module.exports = () => {
  const modules = [];

  fs.readdirSync(root).forEach((_module) => {
    fs.readdirSync(path.join(root, _module)).forEach((file) => {
      if (file === APP.ROUTING_FILE) {
        const route = require(path.join(root, _module, file));
        const router = route.router || route;
        const base = route.base || _module;
        modules.push({ router, base });
      }
    });
  });

  return modules;
};
