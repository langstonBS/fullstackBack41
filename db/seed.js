require('dotenv').config();
const chance = require('chance').Chance();
const Cereal = require('../lib/models/Cereal');
require('../lib/utils/connect')();



const seedData = async({ cereal = 10 } = {}) => {
  await Cereal.create([...Array(cereal)].map(() => ({
    name: chance.name(),
    thoughts: chance.sentence(),
    scale: chance.integer(),
    tag: chance.name_prefix()
  })));
};
seedData();
