module.exports = async function(files) {
  return files.reduce(async (vars, filepath) => {
    const accumulator = await vars;
    if (!filepath.endsWith('.js')) {
      return vars
    }
    return Promise.resolve(require(filepath)).then(file => {
      const obj = Object.assign(accumulator, file)
      delete require.cache[filepath]
      return obj;
    });
  }, Promise.resolve({}))
}
