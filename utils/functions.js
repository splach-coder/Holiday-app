function normalizeKeys(obj) {
    const normalized = {};
    for (let key in obj) {
      const newKey = key.replace(/\s+/g, '_'); // Replace spaces with underscores
      normalized[newKey] = obj[key];
    }
    return normalized;
}


module.exports = {normalizeKeys};