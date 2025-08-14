// scripts/convert-tokens-kebab.js
// Usage:
//   node scripts/convert-tokens-kebab.js input.json output.json
// Example:
//   node scripts/convert-tokens-kebab.js tokens/semantic.json tokens/semantic.kebab.json
// Optional: set prefixPath = "semantic.color" to wrap under that path.

const fs = require('fs');
const path = require('path');

// ---- config ----
const prefixPath = ""; // e.g. "semantic.color" (空字串=不加前綴)

// kebabCase: spaces/underscores -> -, camel/Pascal -> -, lowercased
const kebabCase = (s) =>
  s
    .replace(/[\s_]+/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const isPlainObject = (v) => Object.prototype.toString.call(v) === '[object Object]';

// convert alias like {{Core.Color.Gray blue.50}} -> {{core.color.gray-blue.50}}
function convertAlias(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{\{([^}]+)\}\}/g, (_, inner) => {
    const parts = inner.split('.');
    const converted = parts.map(p => kebabCase(p)).join('.');
    return `{{${converted}}}`;
  });
}

function transform(obj) {
  if (Array.isArray(obj)) return obj.map(transform);
  if (!isPlainObject(obj)) return obj;

  const out = {};
  for (const [key, val] of Object.entries(obj)) {
    // Do not rename design token meta keys
    if (key.startsWith('$')) {
      if (key === '$value') out[key] = convertAlias(val);
      else out[key] = transform(val);
      continue;
    }
    const newKey = kebabCase(key);
    out[newKey] = transform(val);
  }
  return out;
}

// Optionally wrap under prefixPath
function applyPrefix(rootObj) {
  if (!prefixPath) return rootObj;
  const holder = {};
  prefixPath.split('.').reduce((acc, seg, i, arr) => {
    const k = kebabCase(seg);
    acc[k] = (i === arr.length - 1) ? rootObj : {};
    return acc[k];
  }, holder);
  return holder;
}

function main() {
  const [,, inFile, outFile] = process.argv;
  if (!inFile || !outFile) {
    console.error('Usage: node scripts/convert-tokens-kebab.js input.json output.json');
    process.exit(1);
  }
  const raw = fs.readFileSync(inFile, 'utf8');
  const json = JSON.parse(raw);

  const converted = transform(json);
  const finalJson = applyPrefix(converted);

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(finalJson, null, 2));
  console.log(`✔ Converted -> ${outFile}`);
}

main();
