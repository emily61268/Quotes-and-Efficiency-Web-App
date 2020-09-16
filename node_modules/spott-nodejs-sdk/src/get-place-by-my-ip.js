function getPlaceByMyIp(fetcher, options = {}) {
  const path = '/places/ip/me';
  const query = { ...options };

  return fetcher.get({
    path,
    query
  });
}

module.exports = getPlaceByMyIp;
