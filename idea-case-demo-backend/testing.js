function logAll() {
  console.log("exports:" + exports);
  console.log("require:" + require);
  console.log("module:" + module);
  console.log("filename:" + __filename);
  console.log("dirname:" + __dirname);
}

module.exports = logAll;
