const assert = require('assert');

function getPlaceById(fetcher, id, options = {}) {
  assert(id, 'Parameter "id" is required');

  const path = `/places/${id}`;
  const query = { ...options };

  return fetcher.get({
    path,
    query
  });
}

module.exports = getPlaceById;
