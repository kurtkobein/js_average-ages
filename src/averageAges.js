'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const man = people.filter(({ sex, died }) => !century
    ? sex === 'm'
    : sex === 'm' && Math.ceil(died / 100) === century);

  const age = man.reduce((sum, { died, born }) => sum + died - born, 0);

  return age / man.length;
}
/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(({ sex, name }) => !withChildren
    ? sex === 'f'
    : sex === 'f' && people.find(({ mother }) => mother === name));

  const age = women.reduce((sum, { died, born }) => sum + died - born, 0);

  return age / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const kids = people.filter(({ mother, sex }) => !onlyWithSon
    ? people.find(({ name }) => name === mother)
    : sex === 'm' && people.find(({ name }) => name === mother));

  const diff = kids.map(({ born, mother }) => born - momBorn(people, mother));

  return diff.reduce((sum, age) => sum + age) / diff.length;
}

function momBorn(people, mother) {
  return (people.find(({ name }) => name === mother)).born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
