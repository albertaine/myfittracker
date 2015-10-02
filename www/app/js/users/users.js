;(function() {
    'use strict';

    angular
        .module('MyFitTracker.Users', [
            /*'ngRoute'*/'ui.router',
            'ui.bootstrap'
        ])
        .config(/*UsersConfig*/UsersConfigUiRouter)
        .controller('UsersCtrl', UsersController)
        .filter('EyeColor', EyeColorFilter)
        .filter('rusEyeColor', rusEyeColorFilter)
        .filter('rusCurrencyFormat', rusCurrencyFormat)
        .factory('UsersFactory', UsersFactory)
        .service('UsersService', UsersService)
        .provider('Users', UsersProvider)
        .run(Run);

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    function rusCurrencyFormat() {
        return function(balance) {
            var number = replaceAll(replaceAll(balance, ',', ' '), '\\$', '').replace(/\./g, ',');
            return number + ' руб.'
        }
    }

    // @ngInject
    function rusEyeColorFilter() {
        return function(name) {
            if (name == 'green') {
                return 'Зеленые';
            }
            if (name == 'blue') {
                return 'Голубые';
            }
            if (name == 'brown') {
                return 'Карие';
            }
        }
    }

    // @ngInject
    function EyeColorFilter() {
        return function(input, color) {
            color = color || 'green';
            //console.log(input, color);
            var result = [];
            angular.forEach(input, function(e, i) {
                //console.log(e, i);
                if (e.eyeColor === color) {
                    //console.log(e, i);
                    result.push(e);
                }
            });

            return result;
        }
    }

    // @ngInject
    function UsersFactory($log, $filter) {
        var o = {};

/*
        $log.log('UsersFactory');
        $log.info('UsersFactory');
        $log.warn('UsersFactory');
        $log.error('UsersFactory');
        $log.debug('UsersFactory');
*/

        var usersList =
            [
                {
                    "_id": "560ea0634939ab244fe0c572",
                    "index": 0,
                    "guid": "255c55f5-14b3-4a52-a119-ad1fcd530ba1",
                    "isActive": false,
                    "balance": "$2,235.48",
                    "picture": "http://placehold.it/32x32",
                    "age": 37,
                    "eyeColor": "brown",
                    "name": "May Whitehead",
                    "gender": "male",
                    "company": "COMTRAIL",
                    "email": "maywhitehead@comtrail.com",
                    "phone": "+1 (995) 559-2038",
                    "address": "843 Anna Court, Waukeenah, Arkansas, 5568",
                    "about": "Magna ut excepteur pariatur in minim ullamco cupidatat. In voluptate tempor ullamco officia aliquip in do. Irure esse ad ipsum id elit laborum exercitation eu anim eiusmod dolor nulla. Occaecat deserunt aliquip cillum esse dolor minim ullamco Lorem cillum minim voluptate magna culpa id. Duis ad sint amet sint in elit fugiat. Labore deserunt sint veniam velit laboris irure est esse magna laborum nulla.\r\n",
                    "registered": "2014-12-25T03:56:55 -03:00",
                    "latitude": 89.985736,
                    "longitude": -115.847054,
                    "tags": [
                        "excepteur",
                        "non",
                        "sint",
                        "Lorem",
                        "nulla",
                        "pariatur",
                        "aliqua"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Margo Clark"
                        },
                        {
                            "id": 1,
                            "name": "Spears Griffith"
                        },
                        {
                            "id": 2,
                            "name": "Frazier Stein"
                        }
                    ],
                    "greeting": "Hello, May Whitehead! You have 5 unread messages.",
                    "favoriteFruit": "apple"
                },
                {
                    "_id": "560ea06373e17f46dc585dfb",
                    "index": 1,
                    "guid": "c90d3825-1289-446f-a6f0-14c86860fdc1",
                    "isActive": true,
                    "balance": "$1,942.74",
                    "picture": "http://placehold.it/32x32",
                    "age": 31,
                    "eyeColor": "brown",
                    "name": "Hill Cobb",
                    "gender": "male",
                    "company": "ENTALITY",
                    "email": "hillcobb@entality.com",
                    "phone": "+1 (937) 592-2932",
                    "address": "474 Story Street, Selma, Delaware, 1256",
                    "about": "Ex consequat culpa eu veniam ad commodo sint consectetur cupidatat proident ut. Esse ea commodo sit enim dolor adipisicing sit et. Velit elit mollit sint id commodo duis anim aute amet. Sint deserunt anim duis aute proident. Consectetur magna laborum laboris exercitation reprehenderit nostrud nulla culpa adipisicing adipisicing qui non eu eiusmod. Ipsum sint ullamco reprehenderit aute nulla eu. Id eiusmod irure sit dolore elit anim.\r\n",
                    "registered": "2015-07-23T03:11:26 -03:00",
                    "latitude": 18.460865,
                    "longitude": 59.488976,
                    "tags": [
                        "in",
                        "labore",
                        "id",
                        "ad",
                        "eu",
                        "excepteur",
                        "ad"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Sofia Murphy"
                        },
                        {
                            "id": 1,
                            "name": "Joseph Romero"
                        },
                        {
                            "id": 2,
                            "name": "Brandie Ferguson"
                        }
                    ],
                    "greeting": "Hello, Hill Cobb! You have 4 unread messages.",
                    "favoriteFruit": "apple"
                },
                {
                    "_id": "560ea0633ca188457d81ca6d",
                    "index": 2,
                    "guid": "76a45b5a-3015-4365-b900-2b922fb425c2",
                    "isActive": true,
                    "balance": "$3,875.62",
                    "picture": "http://placehold.it/32x32",
                    "age": 29,
                    "eyeColor": "brown",
                    "name": "Hines Dejesus",
                    "gender": "male",
                    "company": "TUBESYS",
                    "email": "hinesdejesus@tubesys.com",
                    "phone": "+1 (901) 448-2290",
                    "address": "226 Sedgwick Street, Westmoreland, Utah, 8679",
                    "about": "Sunt excepteur excepteur duis duis cupidatat. Fugiat deserunt tempor veniam dolore eu incididunt labore voluptate ullamco ipsum elit. Qui dolor duis dolore ad fugiat do ipsum. Dolore nisi aliqua nisi non proident laboris labore excepteur irure non non veniam. Deserunt ex ipsum occaecat irure laboris veniam.\r\n",
                    "registered": "2014-10-02T03:02:26 -04:00",
                    "latitude": 44.148581,
                    "longitude": -88.891126,
                    "tags": [
                        "ut",
                        "dolore",
                        "anim",
                        "nisi",
                        "enim",
                        "deserunt",
                        "dolore"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Walls Bennett"
                        },
                        {
                            "id": 1,
                            "name": "Mai Barnes"
                        },
                        {
                            "id": 2,
                            "name": "Hart Carter"
                        }
                    ],
                    "greeting": "Hello, Hines Dejesus! You have 2 unread messages.",
                    "favoriteFruit": "strawberry"
                },
                {
                    "_id": "560ea063c9fa52ea0204a477",
                    "index": 3,
                    "guid": "05384737-b7e9-449d-ad79-dcc7f295c50b",
                    "isActive": true,
                    "balance": "$3,008.63",
                    "picture": "http://placehold.it/32x32",
                    "age": 26,
                    "eyeColor": "blue",
                    "name": "Georgette Fitzgerald",
                    "gender": "female",
                    "company": "DAIDO",
                    "email": "georgettefitzgerald@daido.com",
                    "phone": "+1 (818) 554-3566",
                    "address": "759 Gotham Avenue, Westwood, Puerto Rico, 7125",
                    "about": "Aute elit reprehenderit ullamco nisi amet aliqua id aute duis veniam ut eiusmod sit. Culpa excepteur qui veniam enim commodo duis aliqua proident. Sit sint minim ut eiusmod consequat nulla incididunt nisi mollit sint. Adipisicing aute consectetur amet irure qui ex qui do qui sit nulla ad. Nisi nulla consequat commodo velit nisi.\r\n",
                    "registered": "2014-08-07T03:28:55 -04:00",
                    "latitude": 89.790591,
                    "longitude": -116.252129,
                    "tags": [
                        "veniam",
                        "ut",
                        "incididunt",
                        "proident",
                        "est",
                        "adipisicing",
                        "dolore"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Campbell Pace"
                        },
                        {
                            "id": 1,
                            "name": "Millicent Lindsay"
                        },
                        {
                            "id": 2,
                            "name": "Noel Forbes"
                        }
                    ],
                    "greeting": "Hello, Georgette Fitzgerald! You have 6 unread messages.",
                    "favoriteFruit": "apple"
                },
                {
                    "_id": "560ea0638aaeafb1f046ee30",
                    "index": 4,
                    "guid": "cf96451c-d54c-4bd3-b73c-0e1a4dd2972a",
                    "isActive": false,
                    "balance": "$2,737.45",
                    "picture": "http://placehold.it/32x32",
                    "age": 40,
                    "eyeColor": "blue",
                    "name": "Natasha Travis",
                    "gender": "female",
                    "company": "PLASTO",
                    "email": "natashatravis@plasto.com",
                    "phone": "+1 (889) 499-3263",
                    "address": "827 Kingsland Avenue, Caberfae, Oregon, 3133",
                    "about": "Aliquip laboris qui adipisicing excepteur incididunt commodo nisi dolor veniam dolore tempor exercitation. Ullamco aliquip nulla in minim culpa deserunt culpa incididunt aute voluptate consectetur consequat proident. Voluptate ullamco commodo ex eu nisi mollit elit eiusmod consectetur dolor qui officia anim excepteur.\r\n",
                    "registered": "2015-09-08T11:20:08 -03:00",
                    "latitude": -39.453408,
                    "longitude": -7.537122,
                    "tags": [
                        "duis",
                        "officia",
                        "amet",
                        "ipsum",
                        "cupidatat",
                        "proident",
                        "dolore"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Priscilla Eaton"
                        },
                        {
                            "id": 1,
                            "name": "Larson Carson"
                        },
                        {
                            "id": 2,
                            "name": "Karina Rowland"
                        }
                    ],
                    "greeting": "Hello, Natasha Travis! You have 1 unread messages.",
                    "favoriteFruit": "apple"
                },
                {
                    "_id": "560ea063f5005a801761b791",
                    "index": 5,
                    "guid": "ba1d376c-0d70-4855-a46a-6ae00942ff2e",
                    "isActive": false,
                    "balance": "$2,139.94",
                    "picture": "http://placehold.it/32x32",
                    "age": 25,
                    "eyeColor": "brown",
                    "name": "Jean Valenzuela",
                    "gender": "female",
                    "company": "BLUPLANET",
                    "email": "jeanvalenzuela@bluplanet.com",
                    "phone": "+1 (888) 556-3270",
                    "address": "156 Beard Street, Inkerman, American Samoa, 4208",
                    "about": "Occaecat ullamco adipisicing ullamco cillum et. Minim anim elit eu ad mollit tempor incididunt dolor nulla. Ad qui ullamco do deserunt officia laborum cupidatat ullamco amet. Incididunt laboris veniam nostrud esse ut mollit minim magna et aliqua. Pariatur elit est pariatur proident duis adipisicing veniam magna.\r\n",
                    "registered": "2014-12-10T10:24:50 -03:00",
                    "latitude": -66.141353,
                    "longitude": -123.995587,
                    "tags": [
                        "irure",
                        "enim",
                        "dolore",
                        "nostrud",
                        "adipisicing",
                        "commodo",
                        "cupidatat"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Duke Griffin"
                        },
                        {
                            "id": 1,
                            "name": "Juarez West"
                        },
                        {
                            "id": 2,
                            "name": "Vincent Gibson"
                        }
                    ],
                    "greeting": "Hello, Jean Valenzuela! You have 7 unread messages.",
                    "favoriteFruit": "strawberry"
                },
                {
                    "_id": "560ea06343324d20b1a9a85e",
                    "index": 6,
                    "guid": "63599159-b547-4bfc-a585-282d9caff849",
                    "isActive": true,
                    "balance": "$1,956.68",
                    "picture": "http://placehold.it/32x32",
                    "age": 23,
                    "eyeColor": "brown",
                    "name": "Darla Mckay",
                    "gender": "female",
                    "company": "FOSSIEL",
                    "email": "darlamckay@fossiel.com",
                    "phone": "+1 (878) 413-2966",
                    "address": "199 Everett Avenue, Lopezo, Wyoming, 5058",
                    "about": "Do non mollit sunt ut consectetur. Ipsum consequat adipisicing id proident ea eiusmod excepteur qui proident enim amet adipisicing. Dolore consectetur cupidatat magna non. Mollit id eu reprehenderit voluptate officia labore labore amet.\r\n",
                    "registered": "2015-01-17T04:38:50 -03:00",
                    "latitude": 58.159317,
                    "longitude": -114.025418,
                    "tags": [
                        "tempor",
                        "velit",
                        "do",
                        "sint",
                        "ipsum",
                        "amet",
                        "incididunt"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Blevins Riggs"
                        },
                        {
                            "id": 1,
                            "name": "Jaime Hendrix"
                        },
                        {
                            "id": 2,
                            "name": "Parsons Daugherty"
                        }
                    ],
                    "greeting": "Hello, Darla Mckay! You have 3 unread messages.",
                    "favoriteFruit": "banana"
                },
                {
                    "_id": "560ea063415e735e99180850",
                    "index": 7,
                    "guid": "632c12ad-28a0-4de5-b10c-900c34476ad9",
                    "isActive": true,
                    "balance": "$1,244.65",
                    "picture": "http://placehold.it/32x32",
                    "age": 26,
                    "eyeColor": "brown",
                    "name": "Tania Cortez",
                    "gender": "female",
                    "company": "RETROTEX",
                    "email": "taniacortez@retrotex.com",
                    "phone": "+1 (937) 596-3681",
                    "address": "430 Chase Court, Ripley, Pennsylvania, 5948",
                    "about": "Mollit enim cupidatat sit Lorem et adipisicing nulla id eu officia. Velit aliqua sint eiusmod ullamco ea velit aute ut et in. In occaecat in nisi laborum deserunt ad. Consectetur dolor id cillum est non cupidatat et veniam culpa cillum. Nisi exercitation aliquip eiusmod laboris. Nisi laborum elit esse adipisicing mollit enim mollit quis. Esse excepteur dolor irure elit veniam excepteur.\r\n",
                    "registered": "2014-01-15T08:47:53 -04:00",
                    "latitude": -65.302577,
                    "longitude": -21.927175,
                    "tags": [
                        "officia",
                        "consectetur",
                        "ullamco",
                        "enim",
                        "ea",
                        "nostrud",
                        "Lorem"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Trujillo Carpenter"
                        },
                        {
                            "id": 1,
                            "name": "Tammi Martinez"
                        },
                        {
                            "id": 2,
                            "name": "Leach Kirk"
                        }
                    ],
                    "greeting": "Hello, Tania Cortez! You have 2 unread messages.",
                    "favoriteFruit": "strawberry"
                },
                {
                    "_id": "560ea063fe60d033a89bdfb9",
                    "index": 8,
                    "guid": "5dfdfb1f-78d6-424b-a234-e675c4b1c3cd",
                    "isActive": true,
                    "balance": "$1,583.30",
                    "picture": "http://placehold.it/32x32",
                    "age": 24,
                    "eyeColor": "green",
                    "name": "Estela Farmer",
                    "gender": "female",
                    "company": "DUOFLEX",
                    "email": "estelafarmer@duoflex.com",
                    "phone": "+1 (856) 454-3651",
                    "address": "332 Oxford Walk, Geyserville, Guam, 1992",
                    "about": "Aliqua mollit dolor id fugiat aliqua pariatur exercitation in proident voluptate voluptate consequat. Est nostrud commodo nulla commodo anim aliqua commodo commodo. Dolor consequat esse culpa minim ad exercitation ipsum excepteur Lorem cillum exercitation.\r\n",
                    "registered": "2015-02-02T07:34:57 -03:00",
                    "latitude": 10.54875,
                    "longitude": 57.043351,
                    "tags": [
                        "nisi",
                        "esse",
                        "fugiat",
                        "veniam",
                        "aliquip",
                        "aute",
                        "laboris"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Wilma Nash"
                        },
                        {
                            "id": 1,
                            "name": "Doris Hardin"
                        },
                        {
                            "id": 2,
                            "name": "Foley Pena"
                        }
                    ],
                    "greeting": "Hello, Estela Farmer! You have 8 unread messages.",
                    "favoriteFruit": "apple"
                },
                {
                    "_id": "560ea063991b64a914835f40",
                    "index": 9,
                    "guid": "a14c3208-e80a-4eef-932a-9399adc7241c",
                    "isActive": true,
                    "balance": "$1,109.84",
                    "picture": "http://placehold.it/32x32",
                    "age": 37,
                    "eyeColor": "green",
                    "name": "Eve Wood",
                    "gender": "female",
                    "company": "ACCUSAGE",
                    "email": "evewood@accusage.com",
                    "phone": "+1 (851) 417-3591",
                    "address": "253 Kenmore Terrace, Curtice, Wisconsin, 4211",
                    "about": "Dolore exercitation pariatur ipsum officia. Ullamco cupidatat cillum consequat quis Lorem veniam sit tempor. Est nulla esse ipsum veniam nisi nostrud proident est. Magna laborum voluptate laboris in dolore sunt sunt labore deserunt non est. Ea fugiat dolore mollit cillum aliquip proident consequat. Labore cupidatat enim esse Lorem tempor sit enim ipsum voluptate est cillum nostrud ut occaecat. Id reprehenderit eiusmod veniam culpa ex.\r\n",
                    "registered": "2015-02-12T12:16:42 -03:00",
                    "latitude": -33.53047,
                    "longitude": -137.295755,
                    "tags": [
                        "anim",
                        "velit",
                        "nostrud",
                        "in",
                        "ipsum",
                        "ut",
                        "ea"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Sherry Keller"
                        },
                        {
                            "id": 1,
                            "name": "Mariana Burnett"
                        },
                        {
                            "id": 2,
                            "name": "Karen Valencia"
                        }
                    ],
                    "greeting": "Hello, Eve Wood! You have 4 unread messages.",
                    "favoriteFruit": "banana"
                },
                {
                    "_id": "560ea063fbf492447c324f9f",
                    "index": 10,
                    "guid": "fc57aa60-f40e-4fa2-8c6b-029b9cf4456d",
                    "isActive": true,
                    "balance": "$3,859.85",
                    "picture": "http://placehold.it/32x32",
                    "age": 29,
                    "eyeColor": "brown",
                    "name": "Janine Mercado",
                    "gender": "female",
                    "company": "IZZBY",
                    "email": "janinemercado@izzby.com",
                    "phone": "+1 (918) 579-3905",
                    "address": "951 Bassett Avenue, Bowie, West Virginia, 4852",
                    "about": "Nulla proident aliquip amet irure anim sunt aliqua ad exercitation laborum amet. Fugiat Lorem aliqua sit elit duis eu commodo magna. Lorem eiusmod deserunt cillum culpa Lorem cupidatat anim exercitation fugiat non dolore. Dolore laboris labore officia qui deserunt est pariatur. Magna in sit et ut duis magna dolore excepteur dolor aliquip ipsum excepteur. Amet fugiat amet officia consequat in sit labore ex non minim pariatur eu minim. Laboris nostrud elit tempor consequat consequat ex sunt eu.\r\n",
                    "registered": "2014-05-08T06:30:00 -04:00",
                    "latitude": 13.983755,
                    "longitude": -132.746763,
                    "tags": [
                        "laboris",
                        "labore",
                        "dolore",
                        "excepteur",
                        "cupidatat",
                        "irure",
                        "aliquip"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Taylor Ramsey"
                        },
                        {
                            "id": 1,
                            "name": "Greene Simpson"
                        },
                        {
                            "id": 2,
                            "name": "Darlene Mclean"
                        }
                    ],
                    "greeting": "Hello, Janine Mercado! You have 1 unread messages.",
                    "favoriteFruit": "strawberry"
                },
                {
                    "_id": "560ea0633a223aaabc0721fa",
                    "index": 11,
                    "guid": "2f250d4c-3f59-4e1e-8466-4a16fbd487dc",
                    "isActive": false,
                    "balance": "$3,619.66",
                    "picture": "http://placehold.it/32x32",
                    "age": 29,
                    "eyeColor": "blue",
                    "name": "Tammy Porter",
                    "gender": "female",
                    "company": "XERONK",
                    "email": "tammyporter@xeronk.com",
                    "phone": "+1 (836) 584-3987",
                    "address": "738 Corbin Place, Ada, Federated States Of Micronesia, 8215",
                    "about": "Cupidatat fugiat adipisicing nostrud pariatur non ea anim ea aute. Qui sit anim ullamco aute nostrud mollit sunt. Est magna aliqua irure voluptate. Nostrud Lorem sint non cupidatat incididunt anim esse tempor. Magna laboris adipisicing est irure quis amet do eiusmod pariatur laboris non dolore minim incididunt.\r\n",
                    "registered": "2014-05-12T07:13:29 -04:00",
                    "latitude": 5.932315,
                    "longitude": -134.817146,
                    "tags": [
                        "sunt",
                        "elit",
                        "cillum",
                        "occaecat",
                        "voluptate",
                        "commodo",
                        "veniam"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Barrett Gibbs"
                        },
                        {
                            "id": 1,
                            "name": "Davenport Burton"
                        },
                        {
                            "id": 2,
                            "name": "Norton Donovan"
                        }
                    ],
                    "greeting": "Hello, Tammy Porter! You have 1 unread messages.",
                    "favoriteFruit": "strawberry"
                },
                {
                    "_id": "560ea063999fe0c0eb5c90e2",
                    "index": 12,
                    "guid": "b30ddfa4-7218-4354-96d1-764c9caccee5",
                    "isActive": false,
                    "balance": "$1,561.63",
                    "picture": "http://placehold.it/32x32",
                    "age": 38,
                    "eyeColor": "brown",
                    "name": "Sosa Emerson",
                    "gender": "male",
                    "company": "ENDIPIN",
                    "email": "sosaemerson@endipin.com",
                    "phone": "+1 (960) 568-3062",
                    "address": "285 Ralph Avenue, Grayhawk, Kentucky, 1261",
                    "about": "Aliquip exercitation et tempor consequat aute duis voluptate laborum anim non adipisicing veniam. Laborum cillum ullamco nisi eiusmod officia sit. Excepteur cupidatat fugiat tempor et duis laboris adipisicing et tempor minim sit dolor. Dolore exercitation sint et ut ipsum excepteur ad laboris ex eiusmod. Consequat velit mollit ullamco occaecat quis laboris Lorem cupidatat laboris esse enim duis adipisicing aliquip. Non exercitation ipsum fugiat veniam nulla non. Proident tempor et culpa dolor veniam cillum anim labore aliquip pariatur aliqua nostrud.\r\n",
                    "registered": "2014-08-25T02:14:20 -04:00",
                    "latitude": -0.536802,
                    "longitude": -110.169306,
                    "tags": [
                        "ad",
                        "elit",
                        "esse",
                        "excepteur",
                        "veniam",
                        "adipisicing",
                        "Lorem"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Workman Mccormick"
                        },
                        {
                            "id": 1,
                            "name": "Buckner Langley"
                        },
                        {
                            "id": 2,
                            "name": "Peterson Scott"
                        }
                    ],
                    "greeting": "Hello, Sosa Emerson! You have 3 unread messages.",
                    "favoriteFruit": "strawberry"
                },
                {
                    "_id": "560ea063c0ba065ee7890ab4",
                    "index": 13,
                    "guid": "dd45c0a3-a4e9-4425-8b09-a436fb60a0e2",
                    "isActive": false,
                    "balance": "$1,445.59",
                    "picture": "http://placehold.it/32x32",
                    "age": 32,
                    "eyeColor": "green",
                    "name": "Gallagher Kerr",
                    "gender": "male",
                    "company": "COMCUBINE",
                    "email": "gallagherkerr@comcubine.com",
                    "phone": "+1 (975) 492-2615",
                    "address": "349 Bay Street, Bordelonville, New Hampshire, 1866",
                    "about": "Exercitation consequat consectetur pariatur consequat aliqua ut enim. Anim irure ipsum occaecat culpa tempor deserunt. Amet reprehenderit nisi in laboris et velit dolor adipisicing sit elit.\r\n",
                    "registered": "2014-06-23T03:54:23 -04:00",
                    "latitude": -61.449802,
                    "longitude": 56.676321,
                    "tags": [
                        "irure",
                        "labore",
                        "nulla",
                        "ad",
                        "elit",
                        "enim",
                        "irure"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Willis Koch"
                        },
                        {
                            "id": 1,
                            "name": "Yvonne Montgomery"
                        },
                        {
                            "id": 2,
                            "name": "Wanda Day"
                        }
                    ],
                    "greeting": "Hello, Gallagher Kerr! You have 7 unread messages.",
                    "favoriteFruit": "apple"
                },
                {
                    "_id": "560ea063b8d9fbe2b575ca93",
                    "index": 14,
                    "guid": "6614c3f2-45e0-4bcb-a01c-e3b1e87eefb2",
                    "isActive": false,
                    "balance": "$2,455.98",
                    "picture": "http://placehold.it/32x32",
                    "age": 20,
                    "eyeColor": "green",
                    "name": "Ratliff Weaver",
                    "gender": "male",
                    "company": "QUILM",
                    "email": "ratliffweaver@quilm.com",
                    "phone": "+1 (890) 404-3766",
                    "address": "912 Strong Place, Macdona, Virgin Islands, 7438",
                    "about": "Culpa laborum tempor fugiat aute veniam ex tempor officia proident. Do velit consectetur consectetur sunt commodo amet do veniam est amet occaecat. Ex anim id aliqua esse pariatur. Cupidatat nostrud consequat consectetur cillum. Deserunt ut voluptate voluptate duis labore quis commodo eiusmod sint ut est. Consectetur dolor commodo esse et.\r\n",
                    "registered": "2014-07-11T06:16:07 -04:00",
                    "latitude": 3.512729,
                    "longitude": 122.880964,
                    "tags": [
                        "sit",
                        "duis",
                        "esse",
                        "esse",
                        "adipisicing",
                        "nulla",
                        "esse"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Mack Bryan"
                        },
                        {
                            "id": 1,
                            "name": "Jewel Chaney"
                        },
                        {
                            "id": 2,
                            "name": "Gina Peters"
                        }
                    ],
                    "greeting": "Hello, Ratliff Weaver! You have 1 unread messages.",
                    "favoriteFruit": "banana"
                },
                {
                    "_id": "560ea06383c93d0dbc1ac23d",
                    "index": 15,
                    "guid": "9eb75dcb-6e46-413f-b818-793fdcdda86d",
                    "isActive": false,
                    "balance": "$2,223.33",
                    "picture": "http://placehold.it/32x32",
                    "age": 32,
                    "eyeColor": "brown",
                    "name": "Moss Morgan",
                    "gender": "male",
                    "company": "EARTHPURE",
                    "email": "mossmorgan@earthpure.com",
                    "phone": "+1 (816) 507-2132",
                    "address": "211 Bayview Place, Laurelton, Connecticut, 446",
                    "about": "Labore irure duis adipisicing tempor velit do mollit consequat deserunt commodo aliquip sint. Sint non non incididunt ullamco proident nostrud ea veniam tempor aliqua. Et cillum id culpa ea ea qui. Qui officia sint cupidatat non consectetur sint reprehenderit. Minim elit aliquip deserunt occaecat tempor non reprehenderit est aliqua duis ipsum.\r\n",
                    "registered": "2015-07-11T08:39:59 -03:00",
                    "latitude": 40.578817,
                    "longitude": -9.799419,
                    "tags": [
                        "est",
                        "do",
                        "occaecat",
                        "proident",
                        "qui",
                        "laborum",
                        "exercitation"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Cobb Herman"
                        },
                        {
                            "id": 1,
                            "name": "Woodard Gray"
                        },
                        {
                            "id": 2,
                            "name": "Valencia Phillips"
                        }
                    ],
                    "greeting": "Hello, Moss Morgan! You have 6 unread messages.",
                    "favoriteFruit": "strawberry"
                },
                {
                    "_id": "560ea0639caaa16a1f4eb426",
                    "index": 16,
                    "guid": "ad727606-2376-4941-aa26-017fc26fe0c0",
                    "isActive": false,
                    "balance": "$3,926.78",
                    "picture": "http://placehold.it/32x32",
                    "age": 21,
                    "eyeColor": "blue",
                    "name": "Bailey Stone",
                    "gender": "male",
                    "company": "ORBEAN",
                    "email": "baileystone@orbean.com",
                    "phone": "+1 (977) 600-2860",
                    "address": "249 Lewis Place, Saticoy, Michigan, 7439",
                    "about": "Deserunt dolor amet ea dolor eu ex enim. Adipisicing ut nisi duis cupidatat cillum ut et ullamco et exercitation. Consequat quis nisi consequat nostrud elit nisi sunt.\r\n",
                    "registered": "2015-07-08T01:25:13 -03:00",
                    "latitude": -15.231596,
                    "longitude": -10.146851,
                    "tags": [
                        "officia",
                        "labore",
                        "labore",
                        "nulla",
                        "ipsum",
                        "esse",
                        "reprehenderit"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Whitney Decker"
                        },
                        {
                            "id": 1,
                            "name": "Luz Mercer"
                        },
                        {
                            "id": 2,
                            "name": "Burgess Holmes"
                        }
                    ],
                    "greeting": "Hello, Bailey Stone! You have 2 unread messages.",
                    "favoriteFruit": "strawberry"
                }
            ];

        var val = null;
        o.val = 'Some value';

        o.getVal = function() {
            return val;
        };

        o.setVal = function(_val) {
            val = _val;
        };

        //window.UsersFactory = o;

        o.getUsers = function() {
            return usersList;
        };

        o.getBlueEyeColorUsers = function() {
            return $filter('EyeColor')(usersList, 'blue');
        };

        o.getEyeColorUsers = function(color) {
            return $filter('EyeColor')(usersList, color);
        };

        return o;
    }

    // @ngInject
    function UsersService() {
        var val = null;
        this.val = 'Some value';

        this.getVal = function() {
            return val;
        };

        this.setVal = function(_val) {
            val = _val;
        };
    }

    // @ngInject
    function UsersProvider() {
        var val = 'Val';

        return {
            setVal: function(_val) {
                val = _val;
            },

            $get: function() {
                var o = {};
                o.getVal = function() {
                    return val;
                };

                return o;
            }
        }
    }

    // @ngInject
    function Run(FIREBASE_URL, configOptions, UsersFactory, UsersService, Users) {
        UsersFactory.setVal('Hello from UsersFactory !');
        console.log('UsersService val = ' + UsersService.getVal());
        UsersService.setVal('Another value');
        console.log('...Run Users');
        console.log(Users);//Users.setVal('New value');
        console.log('...Users Provider getVal() = ' + Users.getVal());
        console.log(FIREBASE_URL);
        console.log(configOptions);
    }

    // @ngInject
    function UsersController ($log, $timeout, $http, UsersFactory, UsersService, $rootScope, $scope) {
        console.log('...UsersController');
        var self = this;
        self.desc = 'Пользователи';

/*
        setTimeout(function() {
            $scope.$apply(function() {
                self.desc = 'Юзеры';
                $scope.desc = 'Пока';
                $log.debug(self.desc);
            });
        }, 800);
*/
/*
        $timeout(function() {
            //$scope.$apply(function() {
                self.desc = 'Юзеры';
                $scope.desc = 'Пока';
                $log.debug(self.desc);
            //});
        }, 800);
*/

        $scope.desc = 'Привет';

        $scope.$watch('desc', function(newVal, oldVal) {
            if (oldVal === newVal) return;
            console.log(oldVal, newVal);
        });

        $scope.eyeColor = 'blue';

        $scope.$watch('eyeColor', function(color) {
            self.list = UsersFactory.getEyeColorUsers(color);
        });

        self.usersList = [{
            name: 'User1',
            email: 'user1@dom.com'
        }];

        self.eyeColorModel = 'green';

        console.log('UsersService val = ' + UsersService.getVal());

        //self.list = UsersFactory.getUsers();
        self.list = UsersFactory.getEyeColorUsers(self.eyeColorModel);

        self.changeColor = function(color) {
            $log.debug('changeColor', color);
            self.list = UsersFactory.getEyeColorUsers(color);
        };
        self.changeColor();

        self.addUser = function(_user) {
            //self.usersList.push({name: 'Albert', email: 'myemail@dom.com'});
            self.usersList.push(_user);
        };

        //self.desc = /*UsersFactory.getVal()*/UsersFactory.helloVal();

        //window.UsersController = self;
    }

/*
    function UsersConfig ($routeProvider) {
        $routeProvider
            .when('/users', {
                templateUrl: '../../users/index.html',
                controller: 'UsersCtrl',
                controllerAs: 'usc'
            });
    }
*/

    // @ngInject
    function UsersConfigUiRouter ($provide, $stateProvider, UsersProvider) {
        console.log('...Config Users');

        $stateProvider
            .state('Users.state1', {
                url: '/state1',
                template: '<h1>State1</h1>'
            })
            .state('Users.state2', {
                url: '/state2',
                template: '<h1>State2</h1>'
            })
            .state('Users', {
                url: '/users',
                templateUrl: 'ht/users/index.html',
                controller: 'UsersCtrl',
                controllerAs: 'usc'
            });

        console.log(UsersProvider);
        UsersProvider.setVal('Not almost private');

        $provide.decorator('UsersFactory', ['$delegate', function($delegate) {
            $delegate.helloVal = function() {
                return 'Hi ' + $delegate.getVal();
            };
            return $delegate;
        }]);
    }

})();
