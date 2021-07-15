const bd = require('../models/index');
const CONSTANTS = require('../../constants');

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

function getPredicateTypes(index) {
  return { [bd.Sequelize.Op.or]: [types[index].split(',')] };
}

module.exports.createWhereForAllContests = (
  typeIndex, contestId, industry, awardSort,
) => {
  const option = {
    where: {},
    order: [],
  };
  if (typeIndex) {
    Object.assign(option.where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(option.where, { id: contestId });
  }
  if (industry) {
    Object.assign(option.where, { industry });
  }
  if (awardSort) {
    option.order.push(['prize', awardSort]);
  }
  Object.assign(option.where, {
    status: {
      [bd.Sequelize.Op.or]: [
        CONSTANTS.CONTESTS_STATUSES.FINISHED,
        CONSTANTS.CONTESTS_STATUSES.ACTIVE,
      ],
    },
  });
  option.order.push(['id', 'desc']);
  return option;
};
