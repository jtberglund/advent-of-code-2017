import R from 'ramda';

const phraseToWords = R.split(' ');

// Takes a function to filter out invalid passphrases
const getNumValidPassphrases = isValid => R.compose(R.length, R.filter(isValid), R.map(phraseToWords));

const hasNoDuplicates = words => R.uniq(words).length === words.length;

/**
 * --- Part One ---
 * A new system policy has been put in place that requires all accounts to use a passphrase
 * instead of simply a password. A passphrase consists of a series of words (lowercase letters)
 * separated by spaces.
 *
 * To ensure security, a valid passphrase must contain no duplicate words.
 *
 * For example:
 *
 * aa bb cc dd ee is valid.
 * aa bb cc dd aa is not valid - the word aa appears more than once.
 * aa bb cc dd aaa is valid - aa and aaa count as different words.
 *
 * The system's full passphrase list is available as your puzzle input.
 * How many passphrases are valid?
 */
const highEntropyPassphrasesPart1 = getNumValidPassphrases(hasNoDuplicates);

/**
 * --- Part Two ---
 * For added security, yet another system policy has been put in place. Now, a valid passphrase must
 * contain no two words that are anagrams of each other - that is, a passphrase is invalid if any
 * word's letters can be rearranged to form any other word in the passphrase.
 *
 * For example:
 *
 * abcde fghij is a valid passphrase.
 * abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the
 * first word.
 * a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming
 * another word.
 * iiii oiii ooii oooi oooo is valid.
 * oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
 * Under this new system policy, how many passphrases are valid?
 */

const sortStr = R.compose(R.join(''), R.sort(undefined));

// Sorting the characters of the words will make anagrams equal to each other
const hasNoAnagramDuplicates = R.compose(hasNoDuplicates, R.map(sortStr));

const highEntropyPassphrasesPart2 = getNumValidPassphrases(hasNoAnagramDuplicates);

export { hasNoDuplicates, hasNoAnagramDuplicates, highEntropyPassphrasesPart1, highEntropyPassphrasesPart2 };
