module.exports = env => {
  return require(`./webpack/${env}.conf.js`);
};