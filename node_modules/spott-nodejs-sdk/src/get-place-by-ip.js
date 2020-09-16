const assert = require('assert');

function getPlaceByIp(fetcher, ip, options = {}) {
  assert(ip, 'Parameter "ip" is required');

  const path = `/places/ip/${ip}`;
  const query = { ...options };

  return fetcher.get({
    path,
    query
  });
}

module.exports = getPlaceByIp;
