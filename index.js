const fs = require('fs');
const path = require('path');

function getValueByPath(obj, path) {
  const parts = path.split('.');
  let currentValue = obj;

  for (const part of parts) {
    const arrayMatch = part.match(/(.+)\[(\d+)\]/);
    if (arrayMatch) {
      const key = arrayMatch[1];
      const index = parseInt(arrayMatch[2], 10);
      if (!currentValue.hasOwnProperty(key) || !Array.isArray(currentValue[key])) {
        return undefined;
      }
      currentValue = currentValue[key][index];
    } else {
      if (!currentValue.hasOwnProperty(part)) {
        return undefined;
      }
      currentValue = currentValue[part];
    }
  }

  return currentValue;
}

module.exports = function jsonPlugin(pluginOptions) {
  // Set plugin defaults
  const defaultOptions = {
    encoding: 'utf8'
  };

  const userOptions = pluginOptions || {};
  const pluginConfig = Object.assign(defaultOptions, userOptions);

  // Return the transform function
  return function jsonTransform({ content, options }) {
    const { src, path: jsonPath } = options;

    if (!src) {
      throw new Error('Missing "src" attribute');
    }

    if (!jsonPath) {
      throw new Error('Missing "path" attribute');
    }

    const fileDir = path.dirname(src);
    const jsonFilePath = path.resolve(fileDir, src);

    let jsonData;
    try {
      const fileContent = fs.readFileSync(jsonFilePath, pluginConfig.encoding);
      jsonData = JSON.parse(fileContent);
    } catch (e) {
      console.log(`FILE NOT FOUND OR INVALID JSON: ${jsonFilePath}`);
      throw e;
    }

    const value = getValueByPath(jsonData, jsonPath);

    if (value === undefined) {
      throw new Error(`Invalid path: ${jsonPath}`);
    }

    return value;
  };
};
