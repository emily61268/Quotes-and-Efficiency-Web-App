# NodeJS SDK for Spott
![](https://img.shields.io/badge/build-passing-green?style=flat)
![](https://img.shields.io/dub/l/vibe-d?color=blue?style=flat)

This is the official NodeJS SDK for [Spott API](https://spott.dev).

With Spott API you can:
* **Search places** by full query or autocompletion across more than 240,000 records from all the world.
* **Filter them** by country, type and location.
* Find places and get their localized names in more than **20 languages**.
* Get the place given an **IP** address.

[![Spott API for cities, countries and administrative divisions](https://spott-assets.s3.amazonaws.com/marketing/banner-720px.png)](https://spott.dev)

## Usage

1. Install the SDK:

```bash
npm install --save spott-nodejs-sdk
```

2. Get a Spott API Key [here](https://rapidapi.com/Spott/api/spott).

3. Use it in your project:

```js
const SpottSDK = require('spott-nodejs-sdk');
const API_KEY = 'PUT_YOUR_API_KEY_HERE';

const spott = new SpottSDK(API_KEY);

// Start using the Spott client. For Example:
// const country = await spott.getPlaceById('US');
```

## API


### .searchPlaces(query, options)

Returns a list of places (either countries, cities or administrative divisions) matching a query and filtered by properties.

It's an abstraction of Spott endpoint: `GET /places`.


**Parameters**

| Paramter | Type | Description |
| -------- | ---- | ----------- |
|`query`|String|Query string to find places with a similar name.|
|`options`|Object|Object with modifiers for the call.|


Where `options` is an object that accepts the following parameters:

| Option | Type | Description |
| ------ | ---- | ----------- |
|`types`|Array[String]|Filters places by their "type". Valid types are `CITY`, `ADMIN_DIVISION_1`, `ADMIN_DIVISION_2` and `COUNTRY`.|
|`countries`|Array[String]|Filters places by their country "id".|
|`adminDivisions1`|Array[String]|Filters places by their adminDivision1 "id".|
|`adminDivisions2`|Array[String]|Filters places by their adminDivision2 "id".|
|`latitude`|Number|Latitude component of a coordinates set to filter places by their location. This parameter is ignored if "longitude" is not specified.|
|`longitude`|Number|Longitude component of a coordinates set to filter places by their location. This parameter is ignored if "latitude" is not specified.|
|`accuracyRadiusKm`|Number|Maximum radius from the point specified by "latitude" and "longitude" to filter places located within the area. The value must be expressed in Kilometers.|
|`language`|String|Specifies a language [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to get the localized name of the place. If the translation is not available, "localizedName" property will be null.|
|`skip`|Number|Amount of places to ignore before beginning to return results. Used together with "limit" to paginate results.|
|`limit`|Number|Maximum number of places to return. Used together with "skip" to paginate results.|


**Example**

```js
const options = {
  types: ['CITY'],
  countries: ['US', 'CA']
};

const places = await spott.searchPlaces('Toronto', options);

/*
console.log(places);
Prints:

[
  {
    "id": "6167865",
    "geonameId": 6167865,
    "type": "CITY",
    "name": "Toronto",
    "population": 2600000,
    "elevation": 175,
    "timezoneId": "America/Toronto",
    "coordinates": {
      "latitude": 43.7001,
      "longitude": -79.4163
    },
    "country": {
      "id": "CA",
      "geonameId": 6251999,
      "name": "Canada"
    },
    "adminDivision1": {
      "id": "CA.08",
      "geonameId": 6093943,
      "name": "Ontario"
    },
    "score": 179.35558
  },
  {
    "id": "5174095",
    "geonameId": 5174095,
    "type": "CITY",
    "name": "Toronto",
    "population": 4882,
    "elevation": 214,
    "timezoneId": "America/New_York",
    "coordinates": {
      "latitude": 40.4642,
      "longitude": -80.6009
    },
    "country": {
      "id": "US",
      "geonameId": 6252001,
      "name": "United States of America"
    },
    "adminDivision1": {
      "id": "US.OH",
      "geonameId": 5165418,
      "name": "Ohio"
    },
    "adminDivision2": {
      "id": "US.OH.081",
      "geonameId": 5159079,
      "name": "Jefferson"
    },
    "score": 54.04614
  }
]

*/
```


### .autocompletePlaces(query, options)

Returns a list of places matching a prefix and specified filter properties. Useful to create "search as you type" inputs.

It's an abstraction of Spott endpoint: `GET /places/autocomplete`.


**Parameters**

| Paramter | Type | Description |
| -------- | ---- | ----------- |
|`query`|String|Query string to find places which name starts with this prefix.|
|`options`|Object|Object with modifiers for the call.|


Where `options` is an object that accepts the following parameters:

| Option | Type | Description |
| ------ | ---- | ----------- |
|`types`|Array[String]|Filters places by their "type". Valid types are `CITY`, `ADMIN_DIVISION_1`, `ADMIN_DIVISION_2` and `COUNTRY`.|
|`countries`|Array[String]|Filters places by their country "id".|
|`adminDivisions1`|Array[String]|Filters places by their adminDivision1 "id".|
|`adminDivisions2`|Array[String]|Filters places by their adminDivision2 "id".|
|`latitude`|Number|Latitude component of a coordinates set to filter places by their location. This parameter is ignored if "longitude" is not specified.|
|`longitude`|Number|Longitude component of a coordinates set to filter places by their location. This parameter is ignored if "latitude" is not specified.|
|`accuracyRadiusKm`|Number|Maximum radius from the point specified by "latitude" and "longitude" to filter places located within the area. The value must be expressed in Kilometers.|
|`language`|String|Specifies a language [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to get the localized name of the place. If the translation is not available, "localizedName" property will be null.|
|`skip`|Number|Amount of places to ignore before beginning to return results. Used together with "limit" to paginate results.|
|`limit`|Number|Maximum number of places to return. Used together with "skip" to paginate results.|


**Example**

```js
const options = {
  types: ['CITY']
};

const places = await spott.autocompletePlaces('to', options);

/*
console.log(places);
Prints:

[
  {
    "id": "3369157",
    "geonameId": 3369157,
    "type": "CITY",
    "name": "Cape Town",
    "population": 3433441,
    "elevation": 25,
    "timezoneId": "Africa/Johannesburg",
    "coordinates": {
      "latitude": -33.9258,
      "longitude": 18.4232
    },
    "country": {
      "id": "ZA",
      "geonameId": 953987,
      "name": "South Africa"
    },
    "adminDivision1": {
      "id": "ZA.11",
      "geonameId": 1085599,
      "name": "Western Cape"
    },
    "adminDivision2": {
      "id": "ZA.11.CPT",
      "geonameId": 8334583,
      "name": "City of Cape Town"
    },
    "score": 12.53573
  },
  {
    "id": "1850147",
    "geonameId": 1850147,
    "type": "CITY",
    "name": "Tokyo",
    "population": 8336599,
    "elevation": 44,
    "timezoneId": "Asia/Tokyo",
    "country": {
      "id": "JP",
      "geonameId": 1861060,
      "name": "Japan"
    },
    "adminDivision1": {
      "id": "JP.40",
      "geonameId": 1850144,
      "name": "Tokyo"
    },
    "score": 11.920989,
    "coordinates": {
      "latitude": 35.6895,
      "longitude": 139.692
    }
  },
  {
    "id": "1489425",
    "geonameId": 1489425,
    "type": "CITY",
    "name": "Tomsk"
    ...
    "country": {
      "id": "RU",
      "geonameId": 2017370,
      "name": "Russia"
    }
  }
]

*/
```


### .getPlaceById(id, options)

Returns a single Place identified by an ID.

It's an abstraction of Spott endpoint: `GET /places/:id`.


**Parameters**

| Paramter | Type | Description |
| -------- | ---- | ----------- |
|`id`|String|ID of the Place.|
|`options`|Object|Object with modifiers for the call.|


Where `options` is an object that accepts the following parameters:

| Option | Type | Description |
| ------ | ---- | ----------- |
|`language`|String|Specifies a language [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to get the localized name of the place. If the translation is not available, "localizedName" property will be null.|


**Example**

```js
const options = {
  language: 'ar' // Arabic
};

const place = await spott.getPlaceById('US', options);

/*
console.log(place);
Prints:

{
  "id": "US",
  "geonameId": 6252001,
  "type": "COUNTRY",
  "name": "United States of America",
  "localizedName": "الولايات المتحدة الأمريكية",
  "population": 310232863,
  "elevation": 543,
  "timezoneId": null,
  "iso2": "US",
  "iso3": "USA",
  "isoNumeric": "840",
  "continentId": "NA",
  "domain": ".us",
  "currencyCode": "USD",
  "currencyName": "Dollar",
  "postalCodeFormat": "#####-####",
  "postalCodeRegex": "^\\d{5}(-\\d{4})?$",
  "phoneCodes": ["+1"],
  "languages": ["en", "es", "haw", "fr"],
  "locales": ["en-US", "es-US", "haw", "fr"],
  "neighbourCountryIds": ["CA", "MX", "CU"],
  "areaSqKm": 9629091,
  "coordinates": {
    "latitude": 39.76,
    "longitude": -98.5
  }
}

*/
```


### .getPlaceByGeonameId(geonameId, options)

Returns a single Place identified by a [Geonames](https://www.geonames.org/) ID.

It's an abstraction of Spott endpoint: `GET /places/geoname-id/:geonameId`.


**Parameters**

| Paramter | Type | Description |
| -------- | ---- | ----------- |
|`geonameId`|String|[Geonames](https://www.geonames.org/) ID of the Place.|
|`options`|Object|Object with modifiers for the call.|


Where `options` is an object that accepts the following parameters:

| Option | Type | Description |
| ------ | ---- | ----------- |
|`language`|String|Specifies a language [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to get the localized name of the place. If the translation is not available, "localizedName" property will be null.|


**Example**

```js
const options = {
  language: 'zh' // Chinese
};

const place = await spott.getPlaceByGeonameId('5332921', options);

/*
console.log(place);
Prints:

{
  "id": "US.CA",
  "geonameId": 5332921,
  "type": "ADMIN_DIVISION_1",
  "name": "California",
  "localizedName": "加利福尼亚州",
  "population": 37691912,
  "elevation": 469,
  "timezoneId": "America/Los_Angeles",
  "coordinates": {
    "latitude": 37.2502,
    "longitude": -119.751
  }
  "country": {
    "id": "US",
    "geonameId": 6252001,
    "name": "United States of America",
    "localizedName": "美国"
  }
}

*/
```


### .getPlaceByIp(ip, options)

Returns the Place where a given IP Address is located.

It's an abstraction of Spott endpoint: `GET /places/ip/:ip`.


**Parameters**

| Paramter | Type | Description |
| -------- | ---- | ----------- |
|`ip`|String|IP Address (v4 and v6 are supported).|
|`options`|Object|Object with modifiers for the call.|


Where `options` is an object that accepts the following parameters:

| Option | Type | Description |
| ------ | ---- | ----------- |
|`language`|String|Specifies a language [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to get the localized name of the place. If the translation is not available, "localizedName" property will be null.|


**Example**

```js
const options = {
  language: 'ru' // Russian
};

const place = await spott.getPlaceByIp('200.194.51.97', options);

/*
console.log(place);
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


### .getPlaceByMyIp(options)

Returns the Place related to the IP where the request comes from.

It's an abstraction of Spott endpoint: `GET /places/ip/me`.


**Parameters**

| Paramter | Type | Description |
| -------- | ---- | ----------- |
|`options`|Object|Object with modifiers for the call.|


Where `options` is an object that accepts the following parameters:

| Option | Type | Description |
| ------ | ---- | ----------- |
|`language`|String|Specifies a language [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to get the localized name of the place. If the translation is not available, "localizedName" property will be null.|


**Example**

```js
const options = {
  language: 'fr' // French
};

const place = await spott.getPlaceByMyIp(options);

/*
console.log(place);
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


## License

MIT
