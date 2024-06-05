// These must be added to the database for interpretation of the units to function

const measurements = [
  {
    id: 'f12ee201-8e8e-434a-89da-84ecd49ffc1e',
    name: ' Cup'
  },
  {
    id: '1e6f9963-2584-4a92-8994-dfbc2913ffe7',
    name: " tsp"
  },
  {
    id: 'b298799c-826e-4182-a152-1c8c58531589',
    name: ' tbsp'
  },
  {
    id: '377e2572-0d53-44c7-ab43-656a90ef88cf',
    name: 'g'
  },
  {
    id: '58af30c0-2c2c-4483-83d6-adab30f3a604',
    name: 'oz'
  },
  {
    id: 'addd3050-372b-4de2-9761-5adc8f6a47d2',
    name: 'lb'
  },
  {
    id: '72290ce0-7c76-4439-b34e-4111a5804652',
    name: 'ml'
  },
  {
    id: '9b2bedc3-d927-4c24-b11b-5d109f3428c0',
    name: ' quart'
  },
  {
    id: 'cc77c11c-7f0b-45ee-bb3e-d13344204fbc',
    name: ' liter'
  },
  {
    id: '4b455b2c-cb26-4173-9551-46106b3e5898',
    name: 'kg'
  },
  {
    id: '3ea489d3-96b1-46cd-96f8-a861cc0649c9',
    name: ' gal'
  },
  {
    id: '80e594b7-73b9-479b-8cd0-4212582720b2',
    name: ' pt'
  },
  {
    id: '8094640b-ab83-4ab0-8fc9-d104645fcf9d',
    name: ' fl oz'
  },
  {
    id: 'b35e5b4b-b005-4477-a161-bdf26aeac8f9',
    name: ' scoop'
  },
  {
    id: 'ad3c6534-8649-4acf-babb-4b330f8112a0',
    name: ' heaped tsp'
  },
  {
    id: '93ee0119-63d4-494d-ab5a-c76a3d8d3b06',
    name: ' heaped tbsp'
  },
]

const measurement_perms = [
  {
    id: 'ff42bbf7-90d3-44ae-9c66-7949f946aa20',
    name: 'cup',
    measurement: 'f12ee201-8e8e-434a-89da-84ecd49ffc1e'
  },
  {
    id: 'ab6a8ae9-ec92-42c5-a641-d55fb68833ca',
    name: "tsp",
    measurement: '1e6f9963-2584-4a92-8994-dfbc2913ffe7'
  },
  {
    id: 'a9b5c248-bab9-493e-b7ca-1d077311b04c',
    name: 'tbsp',
    measurement: 'b298799c-826e-4182-a152-1c8c58531589'
  },
  {
    id: 'b12d9bf2-af62-4885-8454-56b60cdeeaf2',
    name: 'g',
    measurement: '377e2572-0d53-44c7-ab43-656a90ef88cf'
  },
  {
    id: '39024576-7163-4a86-ae69-258ddd388336',
    name: 'oz',
    measurement: '58af30c0-2c2c-4483-83d6-adab30f3a604'
  },
  {
    id: 'f4ae1f3e-955a-4781-ac1c-7f096b417f9d',
    name: 'lb',
    measurement: 'addd3050-372b-4de2-9761-5adc8f6a47d2'
  },
  {
    id: '00d43d4c-f9c0-49df-84b8-8f3adf0b8579',
    name: 'ml',
    measurement: '72290ce0-7c76-4439-b34e-4111a5804652'
  },
  {
    id: '33724d99-6576-4df5-b6bb-8865cc3b4f9c',
    name: 'quart',
    measurement: '9b2bedc3-d927-4c24-b11b-5d109f3428c0'
  },
  {
    id: '291eea50-cf83-41e3-8bc7-2b8b385a292f',
    name: 'liter',
    measurement: 'cc77c11c-7f0b-45ee-bb3e-d13344204fbc'
  },
  {
    id: '04e712ee-583b-4ef5-8b3a-a20dc99c0288',
    name: 'kg',
    measurement: '4b455b2c-cb26-4173-9551-46106b3e5898'
  },
  {
    id: '5a6ae674-9d36-4b7b-ae0c-8cd26ead4aa2',
    name: 'gal',
    measurement: '3ea489d3-96b1-46cd-96f8-a861cc0649c9'
  },
  {
    id: '29951bbd-a24b-4041-a0e8-abc77681a48f',
    name: 'pt',
    measurement: '80e594b7-73b9-479b-8cd0-4212582720b2'
  },
  {
    id: '7c23cb81-64eb-4c78-a386-ce1e541742c7',
    name: 'fl oz',
    measurement: '8094640b-ab83-4ab0-8fc9-d104645fcf9d'
  },
  {
    id: 'c2faa9e7-dc91-42da-8692-6ebc6b1267f4',
    name: 'scoop',
    measurement: 'b35e5b4b-b005-4477-a161-bdf26aeac8f9'
  },
  {
    id: '7589ade8-966e-4c37-b6d2-43cc1df78e0d',
    name: 'heaped tsp',
    measurement: 'ad3c6534-8649-4acf-babb-4b330f8112a0'
  },
  {
    id: '04c44840-0e37-44f7-aeeb-13090c4397c6',
    name: 'heaped tbsp',
    measurement: '93ee0119-63d4-494d-ab5a-c76a3d8d3b06'
  },
  {
    id: 'c3a43263-6ab7-45fd-9d2e-311a17a335eb',
    name: 'gram',
    measurement: '377e2572-0d53-44c7-ab43-656a90ef88cf'
  },
  {
    id: '184f3a52-2087-45df-a192-06f628f627b6',
    name: 'teaspoon',
    measurement: '1e6f9963-2584-4a92-8994-dfbc2913ffe7'
  },
  {
    id: '8f0656ee-c32f-45ad-8680-8614f4b8f4d7',
    name: 'tablespoon',
    measurement: 'b298799c-826e-4182-a152-1c8c58531589'
  },
  {
    id: 'fc7c2188-3367-4ac6-b0f1-cd086780adbc',
    name: 'ounce',
    measurement: '58af30c0-2c2c-4483-83d6-adab30f3a604'
  },
  {
    id: '1c78dc0e-5710-4b03-ab6e-c4c01de9003e',
    name: 'pound',
    measurement: 'addd3050-372b-4de2-9761-5adc8f6a47d2'
  },
  {
    id: '9f18347c-71dd-4501-bac4-21ca6b4d2154',
    name: 'milliliter',
    measurement: '72290ce0-7c76-4439-b34e-4111a5804652'
  },
  {
    id: '4500b2d3-5e8e-4395-a1a8-38532fba46dd',
    name: 'millilitre',
    measurement: '72290ce0-7c76-4439-b34e-4111a5804652'
  },
  {
    id: '3993cfb6-d9a4-4b36-bc08-af160d71c58e',
    name: 'litre',
    measurement: 'cc77c11c-7f0b-45ee-bb3e-d13344204fbc'
  },
  {
    id: '52a9f2fb-be1d-4929-9bf3-4881c8d006a7',
    name: 'l',
    measurement: 'cc77c11c-7f0b-45ee-bb3e-d13344204fbc'
  },
  {
    id: 'b6ec9458-c238-4f71-bfce-d939013cc140',
    name: 'gallon',
    measurement: '3ea489d3-96b1-46cd-96f8-a861cc0649c9'
  },
  {
    id: '5b7ec090-fde1-425d-a09b-cc9c42337f94',
    name: 'fl ounce',
    measurement: '8094640b-ab83-4ab0-8fc9-d104645fcf9d'
  },
  {
    id: '644811be-fd70-475b-8790-31ec312cb55a',
    name: 'fluid ounce',
    measurement: '8094640b-ab83-4ab0-8fc9-d104645fcf9d'
  },
  {
    id: '00ebd74d-3db1-4024-9434-7c9a031a726d',
    name: 'fluid oz',
    measurement: '8094640b-ab83-4ab0-8fc9-d104645fcf9d'
  },
  {
    id: 'cefbba74-2fb9-4a9a-b320-0e0a64e7b458',
    name: 'qt',
    measurement: '9b2bedc3-d927-4c24-b11b-5d109f3428c0'
  },
  {
    id: '6b83ab34-7746-4921-b633-b32aa3eee1d0',
    name: 'pint',
    measurement: '80e594b7-73b9-479b-8cd0-4212582720b2'
  },
  {
    id: 'ffa15756-d37b-4172-8e7e-dcf067450db5',
    name: 'heaped teaspoon',
    measurement: 'ad3c6534-8649-4acf-babb-4b330f8112a0'
  },
  {
    id: '019ec3a9-10b9-433a-bc7b-33e1374e8f11',
    name: 'heaping teaspoon',
    measurement: 'ad3c6534-8649-4acf-babb-4b330f8112a0'
  },
  {
    id: 'bc569163-17f1-4bd5-b228-102930d48dbe',
    name: 'heaping tsp',
    measurement: 'ad3c6534-8649-4acf-babb-4b330f8112a0'
  },
  {
    id: '2d47f7b5-4f17-41b4-abbc-e2d31da7d346',
    name: 'heaped tablespoon',
    measurement: '93ee0119-63d4-494d-ab5a-c76a3d8d3b06'
  },
  {
    id: 'b69f9970-0514-4c63-a567-09c196b996bf',
    name: 'heaping tablespoon',
    measurement: '93ee0119-63d4-494d-ab5a-c76a3d8d3b06'
  },
  {
    id: '4d88c0ed-a6a4-4d9f-9e89-04644f93ddb0',
    name: 'heaping tbsp',
    measurement: '93ee0119-63d4-494d-ab5a-c76a3d8d3b06'
  },
  {
    id: 'caaeea55-e624-42f6-976d-7d0f6b945fb9',
    name: 'kilogram',
    measurement: '4b455b2c-cb26-4173-9551-46106b3e5898'
  },
]


module.exports = {
  measurements,
  measurement_perms,
};
