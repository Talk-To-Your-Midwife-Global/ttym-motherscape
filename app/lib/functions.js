/**
 * Remove spaces in a string
 * @param {string} sentence
 * @returns {string} sentence without spaces
 */
export function removeSpaces(sentence) {
    return sentence.replace(/\s+/g, '');
  }


/**
 * Makes a number in the thousands more relatable
 * @param int
 * @returns {string} A more relatable number like 2K or 20K
 */
export function relatableNumber(int) {
    if (Math.abs(int) >= 1.0e9) {
        return Math.round((int) / 1.0e9) + "B"
    } else if (Math.abs(int) >= 1.0e6) {
        return Math.round((int) / 1.0e6) + "M"
    } else if (Math.abs(int) >= 1.0e3) {
        return Math.round((int) / 1.0e3) + "K"
    } else {
        return int.toString()
    }
}
