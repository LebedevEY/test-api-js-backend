const fs = require('fs');
const path = require('path');

const db = {};

module.exports = () => {
  fs.readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) &&
             (file !== 'index.js') &&
             (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
