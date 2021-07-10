module.exports = {};

// only used to determine the subdivisions/states/provinces within a given country
const isoCountryRawData = module.exports.data = require('iso-3166-2').data;

// sorted array of countries and their data.
// This is our main, static country list. Each item is an object with at least:
// code: two-character iso-3166 country code, used to provide country to other libraries
// name: the version of the country name that we use in our data everywhere, for consistency
// display (optional): a different version of the country name to display to users,
// if different from "name"
const countryInfo = module.exports.countryInfo = [
    {
        name: 'Afghanistan',
        code: 'af'
    },
    {
        name: 'Aland Islands',
        display: 'Åland Islands',
        code: 'ax'
    },
    {
        name: 'Albania',
        code: 'al'
    },
    {
        name: 'Algeria',
        code: 'dz'
    },
    {
        name: 'American Samoa',
        code: 'as'
    },
    {
        name: 'Andorra',
        code: 'ad'
    },
    {
        name: 'Angola',
        code: 'ao'
    },
    {
        name: 'Anguilla',
        code: 'ai'
    },
    {
        name: 'Antarctica',
        code: 'aq'
    },
    {
        name: 'Antigua and Barbuda',
        code: 'ag'
    },
    {
        name: 'Argentina',
        code: 'ar'
    },
    {
        name: 'Armenia',
        code: 'am'
    },
    {
        name: 'Aruba',
        code: 'aw'
    },
    {
        name: 'Australia',
        code: 'au'
    },
    {
        name: 'Austria',
        code: 'at'
    },
    {
        name: 'Azerbaijan',
        code: 'az'
    },
    {
        name: 'Bahamas',
        code: 'bs'
    },
    {
        name: 'Bahrain',
        code: 'bh'
    },
    {
        name: 'Bangladesh',
        code: 'bd',
        majorRegionType: 'division'
    },
    {
        name: 'Barbados',
        code: 'bb'
    },
    {
        name: 'Belarus',
        code: 'by'
    },
    {
        name: 'Belgium',
        code: 'be'
    },
    {
        name: 'Belize',
        code: 'bz'
    },
    {
        name: 'Benin',
        code: 'bj'
    },
    {
        name: 'Bermuda',
        code: 'bm'
    },
    {
        name: 'Bhutan',
        code: 'bt'
    },
    {
        name: 'Bolivia',
        code: 'bo'
    },
    {
        name: 'Bonaire, Sint Eustatius and Saba',
        code: 'bq'
    },
    {
        name: 'Bosnia and Herzegovina',
        code: 'ba'
    },
    {
        name: 'Botswana',
        code: 'bw'
    },
    {
        name: 'Bouvet Island',
        code: 'bv'
    },
    {
        name: 'Brazil',
        code: 'br'
    },
    {
        name: 'British Indian Ocean Territory',
        code: 'io'
    },
    {
        name: 'Brunei',
        display: 'Brunei Darussalami',
        code: 'bn'
    },
    {
        name: 'Bulgaria',
        code: 'bg'
    },
    {
        name: 'Burkina Faso',
        code: 'bf'
    },
    {
        name: 'Burundi',
        code: 'bi'
    },
    {
        name: 'Cambodia',
        code: 'kh'
    },
    {
        name: 'Cameroon',
        code: 'cm'
    },
    {
        name: 'Canada',
        code: 'ca'
    },
    {
        name: 'Cape Verde',
        code: 'cv'
    },
    {
        name: 'Cayman Islands',
        code: 'ky'
    },
    {
        name: 'Central African Republic',
        code: 'cf'
    },
    {
        name: 'Chad',
        code: 'td'
    },
    {
        name: 'Chile',
        code: 'cl'
    },
    {
        name: 'China',
        code: 'cn'
    },
    {
        name: 'Christmas Island',
        code: 'cx'
    },
    {
        name: 'Cocos (Keeling) Islands',
        code: 'cc'
    },
    {
        name: 'Colombia',
        code: 'co'
    },
    {
        name: 'Comoros',
        code: 'km'
    },
    {
        name: 'Congo',
        code: 'cg'
    },
    {
        name: 'Congo, The Democratic Republic of the',
        code: 'cd'
    },
    {
        name: 'Cook Islands',
        code: 'ck'
    },
    {
        name: 'Costa Rica',
        code: 'cr'
    },
    {
        name: 'Cote d\'Ivoire',
        display: 'Côte d\'Ivoire',
        code: 'ci'
    },
    {
        name: 'Croatia',
        code: 'hr'
    },
    {
        name: 'Cuba',
        code: 'cu'
    },
    {
        name: 'Curacao',
        display: 'Curaçao',
        code: 'cw'
    },
    {
        name: 'Cyprus',
        code: 'cy'
    },
    {
        name: 'Czech Republic',
        code: 'cz'
    },
    {
        name: 'Denmark',
        code: 'dk'
    },
    {
        name: 'Djibouti',
        code: 'dj'
    },
    {
        name: 'Dominica',
        code: 'dm'
    },
    {
        name: 'Dominican Republic',
        code: 'do'
    },
    {
        name: 'Ecuador',
        code: 'ec'
    },
    {
        name: 'Egypt',
        code: 'eg'
    },
    {
        name: 'El Salvador',
        code: 'sv'
    },
    {
        name: 'Equatorial Guinea',
        code: 'gq'
    },
    {
        name: 'Eritrea',
        code: 'er'
    },
    {
        name: 'Estonia',
        code: 'ee'
    },
    {
        name: 'Swaziland',
        display: 'Eswatini',
        code: 'sz'
    },
    {
        name: 'Ethiopia',
        code: 'et'
    },
    {
        name: 'Falkland Islands (Malvinas)',
        code: 'fk'
    },
    {
        name: 'Faroe Islands',
        code: 'fo'
    },
    {
        name: 'Fiji',
        code: 'fj'
    },
    {
        name: 'Finland',
        code: 'fi'
    },
    {
        name: 'France',
        code: 'fr'
    },
    {
        name: 'French Guiana',
        code: 'gf'
    },
    {
        name: 'French Polynesia',
        code: 'pf'
    },
    {
        name: 'French Southern Territories',
        code: 'tf'
    },
    {
        name: 'Gabon',
        code: 'ga'
    },
    {
        name: 'Gambia',
        code: 'gm'
    },
    {
        name: 'Georgia',
        code: 'ge'
    },
    {
        name: 'Germany',
        code: 'de'
    },
    {
        name: 'Ghana',
        code: 'gh'
    },
    {
        name: 'Gibraltar',
        code: 'gi'
    },
    {
        name: 'Greece',
        code: 'gr'
    },
    {
        name: 'Greenland',
        code: 'gl'
    },
    {
        name: 'Grenada',
        code: 'gd'
    },
    {
        name: 'Guadeloupe',
        code: 'gp'
    },
    {
        name: 'Guam',
        code: 'gu'
    },
    {
        name: 'Guatemala',
        code: 'gt'
    },
    {
        name: 'Guernsey',
        code: 'gg'
    },
    {
        name: 'Guinea',
        code: 'gn'
    },
    {
        name: 'Guinea-Bissau',
        code: 'gw'
    },
    {
        name: 'Guyana',
        code: 'gy'
    },
    {
        name: 'Haiti',
        code: 'ht'
    },
    {
        name: 'Heard Island and McDonald Islands',
        code: 'hm'
    },
    {
        name: 'Honduras',
        code: 'hn'
    },
    {
        name: 'Hong Kong',
        code: 'hk'
    },
    {
        name: 'Hungary',
        code: 'hu'
    },
    {
        name: 'Iceland',
        code: 'is'
    },
    {
        name: 'India',
        code: 'in'
    },
    {
        name: 'Indonesia',
        code: 'id'
    },
    {
        name: 'Iran',
        code: 'ir'
    },
    {
        name: 'Iraq',
        code: 'iq'
    },
    {
        name: 'Ireland',
        code: 'ie'
    },
    {
        name: 'Isle of Man',
        code: 'im'
    },
    {
        name: 'Israel',
        code: 'il'
    },
    {
        name: 'Italy',
        code: 'it'
    },
    {
        name: 'Jamaica',
        code: 'jm'
    },
    {
        name: 'Japan',
        code: 'jp'
    },
    {
        name: 'Jersey',
        code: 'je'
    },
    {
        name: 'Jordan',
        code: 'jo'
    },
    {
        name: 'Kazakhstan',
        code: 'kz'
    },
    {
        name: 'Kenya',
        code: 'ke'
    },
    {
        name: 'Kiribati',
        code: 'ki'
    },
    {
        name: 'North Korea',
        display: 'Korea, Democratic People\'s Republic of',
        code: 'kp'
    },
    {
        name: 'South Korea',
        display: 'Korea, Republic of',
        code: 'kr'
    },
    {
        name: 'Kosovo',
        code: 'xk'
    },
    {
        name: 'Kuwait',
        code: 'kw'
    },
    {
        name: 'Kyrgyzstan',
        code: 'kg'
    },
    {
        name: 'Laos',
        code: 'la'
    },
    {
        name: 'Latvia',
        code: 'lv'
    },
    {
        name: 'Lebanon',
        code: 'lb'
    },
    {
        name: 'Lesotho',
        code: 'ls'
    },
    {
        name: 'Liberia',
        code: 'lr'
    },
    {
        name: 'Libya',
        code: 'ly'
    },
    {
        name: 'Liechtenstein',
        code: 'li'
    },
    {
        name: 'Lithuania',
        code: 'lt'
    },
    {
        name: 'Luxembourg',
        code: 'lu'
    },
    {
        name: 'Macao',
        code: 'mo'
    },
    {
        name: 'Madagascar',
        code: 'mg'
    },
    {
        name: 'Malawi',
        code: 'mw'
    },
    {
        name: 'Malaysia',
        code: 'my'
    },
    {
        name: 'Maldives',
        code: 'mv'
    },
    {
        name: 'Mali',
        code: 'ml'
    },
    {
        name: 'Malta',
        code: 'mt'
    },
    {
        name: 'Marshall Islands',
        code: 'mh'
    },
    {
        name: 'Martinique',
        code: 'mq'
    },
    {
        name: 'Mauritania',
        code: 'mr'
    },
    {
        name: 'Mauritius',
        code: 'mu'
    },
    {
        name: 'Mayotte',
        code: 'yt'
    },
    {
        name: 'Mexico',
        code: 'mx'
    },
    {
        name: 'Micronesia, Federated States of',
        code: 'fm'
    },
    {
        name: 'Moldova',
        code: 'md'
    },
    {
        name: 'Monaco',
        code: 'mc'
    },
    {
        name: 'Mongolia',
        code: 'mn'
    },
    {
        name: 'Montenegro',
        code: 'me'
    },
    {
        name: 'Montserrat',
        code: 'ms'
    },
    {
        name: 'Morocco',
        code: 'ma'
    },
    {
        name: 'Mozambique',
        code: 'mz'
    },
    {
        name: 'Myanmar',
        code: 'mm'
    },
    {
        name: 'Namibia',
        code: 'na'
    },
    {
        name: 'Nauru',
        code: 'nr'
    },
    {
        name: 'Nepal',
        code: 'np'
    },
    {
        name: 'Netherlands',
        code: 'nl'
    },
    {
        name: 'Netherlands Antilles',
        code: 'an'
    },
    {
        name: 'New Caledonia',
        code: 'nc'
    },
    {
        name: 'New Zealand',
        code: 'nz'
    },
    {
        name: 'Nicaragua',
        code: 'ni'
    },
    {
        name: 'Niger',
        code: 'ne'
    },
    {
        name: 'Nigeria',
        code: 'ng'
    },
    {
        name: 'Niue',
        code: 'nu'
    },
    {
        name: 'Norfolk Island',
        code: 'nf'
    },
    {
        name: 'Macedonia, The Former Yugoslav Republic of',
        display: 'North Macedonia',
        code: 'mk'
    },
    {
        name: 'Northern Mariana Islands',
        code: 'mp'
    },
    {
        name: 'Norway',
        code: 'no'
    },
    {
        name: 'Oman',
        code: 'om'
    },
    {
        name: 'Pakistan',
        code: 'pk'
    },
    {
        name: 'Palau',
        code: 'pw'
    },
    {
        name: 'Palestine, State of',
        code: 'ps'
    },
    {
        name: 'Panama',
        code: 'pa'
    },
    {
        name: 'Papua New Guinea',
        code: 'pg'
    },
    {
        name: 'Paraguay',
        code: 'py'
    },
    {
        name: 'Peru',
        code: 'pe'
    },
    {
        name: 'Philippines',
        code: 'ph'
    },
    {
        name: 'Pitcairn',
        code: 'pn'
    },
    {
        name: 'Poland',
        code: 'pl'
    },
    {
        name: 'Portugal',
        code: 'pt'
    },
    {
        name: 'Puerto Rico',
        code: 'pr'
    },
    {
        name: 'Qatar',
        code: 'qa'
    },
    {
        name: 'Reunion',
        code: 're'
    },
    {
        name: 'Romania',
        code: 'ro'
    },
    {
        name: 'Russia',
        code: 'ru'
    },
    {
        name: 'Rwanda',
        code: 'rw'
    },
    {
        name: 'Saint Barthelemy',
        display: 'Saint Barthélemy',
        code: 'bl'
    },
    {
        name: 'Saint Helena',
        display: 'Saint Helena, Ascension and Tristan Da Cunha',
        code: 'sh'
    },
    {
        name: 'Saint Kitts and Nevis',
        code: 'kn'
    },
    {
        name: 'Saint Lucia',
        code: 'lc'
    },
    {
        name: 'Saint Martin',
        code: 'mf'
    },
    {
        name: 'Saint Pierre and Miquelon',
        code: 'pm'
    },
    {
        name: 'Saint Vincent and the Grenadines',
        code: 'vc'
    },
    {
        name: 'Samoa',
        code: 'ws'
    },
    {
        name: 'San Marino',
        code: 'sm'
    },
    {
        name: 'Sao Tome and Principe',
        code: 'st'
    },
    {
        name: 'Saudi Arabia',
        code: 'sa'
    },
    {
        name: 'Senegal',
        code: 'sn'
    },
    {
        name: 'Serbia',
        code: 'rs'
    },
    {
        name: 'Seychelles',
        code: 'sc'
    },
    {
        name: 'Sierra Leone',
        code: 'sl'
    },
    {
        name: 'Singapore',
        code: 'sg'
    },
    {
        name: 'Sint Maarten',
        code: 'sx'
    },
    {
        name: 'Slovakia',
        code: 'sk'
    },
    {
        name: 'Slovenia',
        code: 'si'
    },
    {
        name: 'Solomon Islands',
        code: 'sb'
    },
    {
        name: 'Somalia',
        code: 'so'
    },
    {
        name: 'South Africa',
        code: 'za'
    },
    {
        name: 'South Georgia and the South Sandwich Islands',
        code: 'gs'
    },
    {
        name: 'South Sudan',
        code: 'ss'
    },
    {
        name: 'Spain',
        code: 'es'
    },
    {
        name: 'Sri Lanka',
        code: 'lk'
    },
    {
        name: 'Sudan',
        code: 'sd'
    },
    {
        name: 'Suriname',
        code: 'sr'
    },
    {
        name: 'Svalbard and Jan Mayen',
        code: 'sj'
    },
    {
        name: 'Sweden',
        code: 'se'
    },
    {
        name: 'Switzerland',
        code: 'ch'
    },
    {
        name: 'Syria',
        code: 'sy'
    },
    {
        name: 'Taiwan',
        code: 'tw'
    },
    {
        name: 'Tajikistan',
        code: 'tj'
    },
    {
        name: 'Tanzania',
        code: 'tz'
    },
    {
        name: 'Thailand',
        code: 'th'
    },
    {
        name: 'Timor-Leste',
        code: 'tl'
    },
    {
        name: 'Togo',
        code: 'tg'
    },
    {
        name: 'Tokelau',
        code: 'tk'
    },
    {
        name: 'Tonga',
        code: 'to'
    },
    {
        name: 'Trinidad and Tobago',
        code: 'tt'
    },
    {
        name: 'Tunisia',
        code: 'tn'
    },
    {
        name: 'Turkey',
        code: 'tr'
    },
    {
        name: 'Turkmenistan',
        code: 'tm'
    },
    {
        name: 'Turks and Caicos Islands',
        code: 'tc'
    },
    {
        name: 'Tuvalu',
        code: 'tv'
    },
    {
        name: 'Uganda',
        code: 'ug'
    },
    {
        name: 'Ukraine',
        code: 'ua'
    },
    {
        name: 'United Arab Emirates',
        code: 'ae'
    },
    {
        name: 'United Kingdom',
        code: 'gb'
    },
    {
        name: 'United States',
        display: 'United States of America',
        code: 'us'
    },
    {
        name: 'United States Minor Outlying Islands',
        code: 'um'
    },
    {
        name: 'Uruguay',
        code: 'uy'
    },
    {
        name: 'Uzbekistan',
        code: 'uz'
    },
    {
        name: 'Vanuatu',
        code: 'vu'
    },
    {
        name: 'Vatican City',
        code: 'va'
    },
    {
        name: 'Venezuela',
        code: 've'
    },
    {
        name: 'Vietnam',
        code: 'vn'
    },
    {
        name: 'Virgin Islands, British',
        code: 'vg'
    },
    {
        name: 'Virgin Islands, U.S.',
        code: 'vi'
    },
    {
        name: 'Wallis and Futuna',
        code: 'wf'
    },
    {
        name: 'Western Sahara',
        code: 'eh'
    },
    {
        name: 'Yemen',
        code: 'ye'
    },
    {
        name: 'Zambia',
        code: 'zm'
    },
    {
        name: 'Zimbabwe',
        code: 'zw'
    }
];

const countryOptions = module.exports.countryOptions = (startingCountryInfo, valueField) => (
    startingCountryInfo.map(thisCountryInfo => (
        {
            value: thisCountryInfo[valueField],
            label: thisCountryInfo.display ? thisCountryInfo.display : thisCountryInfo.name
        }
    ))
);

const lookupCountryByCode = module.exports.lookupCountryByCode = countryCode => (
    countryInfo.find(country => country.code === countryCode)
);

module.exports.lookupCountryByName = countryName => (
    countryInfo.find(country => country.name === countryName)
);

/**
 * Function dupeCommonCountries():
 * takes startingCountryInfo, and duplicates any number of its country labels
 * at the beginning of the array.
 * E.g., to have "Germany" and "Italy" at the top of the list, use:
 *     dupeCommonCountries(['de', 'it')
 * @param {array} startingCountryInfo array of country objects
 *     like [{value: 'ca', label: 'Canada'}, ...]
 * @param {array} commonCountryCodes array of country codes we should duplicate
 * @returns {array} revised array of country objects, with duplicates inserted at beginning
 */
const dupeCommonCountries = module.exports.dupeCommonCountries = (startingCountryInfo, commonCountryCodes) => {
    const commonCountriesInfo = commonCountryCodes.map(commonCountryCode => (
        startingCountryInfo.find(country => country.code === commonCountryCode.toLowerCase())
    ));
    return [...commonCountriesInfo, ...startingCountryInfo];
};

/*
 * registrationCountryNameOptions is the result of taking the standard countryInfo,
 * setting a 'value' key and a 'label' key both to the country data's 'name' value,
 * but using the 'display' value for 'label' instead of 'name' if 'display' exists;
 * then duplicating 'United States of America' and 'United Kingdom' at the top of the list.
 * The result is an array like:
 * [
 *    {value: 'United States', label: 'United States of America'},
 *    {value: 'United Kingdom', label: 'United Kingdom'},
 *    {value: 'Afghanistan', label: 'Afghanistan'},
 *    ...
 *    {value: 'United Arab Emirates', label: 'United Arab Emirates'},
 *    {value: 'United States', label: 'United States of America'},
 *    {value: 'United Kingdom', label: 'United Kingdom'},
 *    {value: 'Uzbekistan', label: 'Uzbekistan'},
 *    ...
 *    {value: 'Zimbabwe', label: 'Zimbabwe'}
 * ]
 */
module.exports.registrationCountryNameOptions =
    countryOptions(dupeCommonCountries(countryInfo, ['us', 'gb']), 'name');
// use country code for value, instead of country name:
module.exports.registrationCountryCodeOptions =
    countryOptions(dupeCommonCountries(countryInfo, ['us', 'gb']), 'code');

/* subdivisionOptions uses iso-3166 data to produce an array like:
 * [
 *    {'ad':
 *       [
 *          {'value': 'ad-07', 'label': 'Andorra la Vella', 'type': 'Parish'},
 *          {'value': 'ad-02', 'label': 'Canillo', 'type': 'Parish'},
 *          ...
 *       ]
 *    },
 *    ...
 *    {'zw':
 *       [
 *          {'value': 'zw-bu', 'label': 'Bulawayo', 'type': 'Province'},
 *          {'value': 'zw-ma', 'label': 'Manicaland', 'type': 'Province'},
 *          ...
 *       ]
 *    },
 *    ...
 * ]
 */
module.exports.subdivisionOptions = Object.keys(isoCountryRawData).reduce((subByCountry, code) => {
    const country = lookupCountryByCode(code.toLowerCase());
    subByCountry[code.toLowerCase()] = Object.keys(isoCountryRawData[code].sub)
        .filter(subCode => { // only include subdivisions that are analogous to states
            const majorRegionType = country && country.majorRegionType;
            // Data for some countries includes both major divisions (analogous to US states)
            // and minor divisions, municipalities, etc.
            // If we don't know which subdivisions of this country are "major", include all of them.
            return !majorRegionType ||
                (
                    isoCountryRawData[code].sub[subCode].type &&
                    isoCountryRawData[code].sub[subCode].type.toLowerCase()
                ) === majorRegionType.toLowerCase();
        })
        .map(subCode => ({
            value: subCode.toLowerCase(),
            label: isoCountryRawData[code].sub[subCode].name,
            type: isoCountryRawData[code].sub[subCode].type
        }))
        .sort((a, b) => {
            if (a.label < b.label) {
                return -1;
            }
            return 1;
        });
    return subByCountry;
}, {});
