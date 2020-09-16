# Location by IP
![](https://img.shields.io/badge/build-passing-green?style=flat)
![](https://img.shields.io/dub/l/vibe-d?color=blue?style=flat)

This module returns the location of a given IP address (v4 or v6).

Data comes from [Spott](https://spott.dev), which is a geographical API.

## Usage

1. Install:

```bash
npm install --save location-by-ip
```

2. Get a Spott API Key [here](https://rapidapi.com/Spott/api/spott).

3. Use it in your project:

```js
const GetLocation = require('location-by-ip');
const SPOTT_API_KEY = 'PUT_YOUR_API_KEY_HERE';

const getLocation = new GetLocation(SPOTT_API_KEY);

// Start using the client. For Example:
// const location = await getLocation.byMyIp();
```

## Data

This module will try to return the most precise location available, which is a CITY. If there's no enough information it will return a COUNTRY.

The properties returned for both responses are:

| Property | Type | Description |
| ---------- | ------ | ------------- |
|`id`| String | Unique identifier given by [Spott](https://spott.dev). |
|`geonameId`| Integer | Unique identifier given by [GeoNames](https://www.geonames.org). |
|`type`| String | The classification of the place. Possible values are: `CITY` and `COUNTRY` |
|`name`| String | Default name of the place (usually in English). This property always has a value. |
|`localizedName`| String | Localized name of the place in the requested language. This property is only present when option `language` is specified. It's `null` when the translation is not available. |
|`population`| Integer | The approximate population living in the place. |
|`elevation`| Float | The approximate elevation from sea level. Value is expressed in meters. |
|`coordinates`| Object | The geographic coordinates where the place is located. |
|`coordinates.latitude`| Float | Latitude component from the geographic coordinates of the place. |
|`coordinates.longitude`| Float | Longitude component from the geographic coordinates of the place. |
|`timezoneId`| String | [Time zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) associated to the place. This property is `null` for countries since they may have multiple. |
|`adminDivision2`| Object | A minimal version of the Administrative Division level 2 where the place is located. This property is only present for places of type: `CITY`. The object contain the properties: `id`, `geonameId`, `name` and `localizedName`. |
|`adminDivision1`| Object | A minimal version of the Administrative Division level 1 where the place is located. This property is only present for places of type: `CITY`. The object contain the properties: `id`, `geonameId`, `name` and `localizedName`. |
|`country`| Object | A minimal version of the Country where the place is located. This property is only present for places of type: `CITY`. The object contain the properties: `id`, `geonameId`, `name` and `localizedName`. |

## API

### .byIp(ip, options)

Returns the location of a given IP Address, or `null` when the location is not available.


**Parameters**

| Paramter | Type | Description |
| -------- | ---- | ----------- |
|`ip`|String|IP Address (v4 and v6 are supported).|
|`options`|Object|Optional object with modifiers for the call.|
|`options.language`|String|Specifies a language [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to get the localized name of the place. If the translation is not available, "localizedName" property will be null.|


**Example**

```js
const options = {
  language: 'ru' // Russian
};

const location = await getLocation.byIp('200.194.51.97', options);

/*
console.log(location);
Prints:

{
  "id": "4005539",
  "geonameId": 4005539,
  "type": "CITY",
  "name": "Guadalajara",
  "localizedName": "Гвадалахара",
  "population": 1495182,
  "elevation": 1598,
  "timezoneId": "America/Mexico_City",
  "country": {
    "id": "MX",
    "geonameId": 3996063,
    "name": "Mexico",
    "localizedName": "Мексика"
  },
  "adminDivision1": {
    "id": "MX.14",
    "geonameId": 4004156,
    "name": "Jalisco",
    "localizedName": null
  },
  "adminDivision2": {
    "id": "MX.14.039",
    "geonameId": 8582140,
    "name": "Guadalajara",
    "localizedName": null
  },
  "coordinates": {
    "latitude": 20.6668,
    "longitude": -103.392
  }
}

*/
```

### .byMyIp(options)

Returns the location related to the IP where the request comes from, or `null` when the location is not available.


**Parameters**

| Paramter | Type | Description |
| -------- | ---- | ----------- |
|`options`|Object|Optional object with modifiers for the call.|
|`options.language`|String|Specifies a language [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to get the localized name of the place. If the translation is not available, "localizedName" property will be null.|


**Example**

```js
const options = {
  language: 'fr' // French
};

const location = await getLocation.byMyIp(options);

/*
console.log(location);
Prints:

{
  "id": "5391959",
  "geonameId": 5391959,
  "type": "CITY",
  "name": "San Francisco",
  "localizedName": "San Francisco",
  "population": 864816,
  "elevation": 16,
  "timezoneId": "America/Los_Angeles",
  "coordinates": {
    "latitude": 37.7749,
    "longitude": -122.419
  },
  "country": {
    "id": "US",
    "geonameId": 6252001,
    "name": "United States of America",
    "localizedName": "États-Unis"
  },
  "adminDivision1": {
    "id": "US.CA",
    "geonameId": 5332921,
    "name": "California",
    "localizedName": "Californie"
  },
  "adminDivision2": {
    "id": "US.CA.075",
    "geonameId": 5391997,
    "name": "San Francisco County",
    "localizedName": "Comté de San Francisco"
  }
}

*/
```

## Related projects

* [countries-and-timezones](https://www.npmjs.com/package/countries-and-timezones)
* [countries-db](https://www.npmjs.com/package/countries-db)


## License

MIT
