async function convertJsToSass(obj, syntax) {
  const resolved = await Promise.resolve(obj)
  const suffix = syntax === 'sass' ? '' : ';'
  const keys = Object.keys(resolved)
  const lines = keys.map(key => `$${key}: ${formatValue(resolved[key], syntax)}${suffix}`)
  return lines.join('\n')
}

function formatNestedObject(obj, syntax) {
  const keys = Object.keys(obj)
  return keys.map(key => `${key}: ${formatValue(obj[key], syntax)}`).join(', ')
}

function formatValue(value, syntax) {
  if (value instanceof Array) {
    return `(${value.map(formatValue).join(', ')})`
  }

  if (typeof value === 'object') {
    return `(${formatNestedObject(value, syntax)})`
  }

  if (typeof value === 'string') {
    return value
  }

  return JSON.stringify(value)
}

module.exports = convertJsToSass
