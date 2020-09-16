const assert = require('assert');

function getPlaceByGeonameId(fetcher, geonameId, options = {}) {
  assert(geonameId, 'Parameter "geonameId" is required');

  const path = `/places/geoname-id/${geonameId}`;
  const query = { ...options };

  return fetcher.get({
    path,
    query
  });
}

module.exports = getPlaceByGeonameId;
