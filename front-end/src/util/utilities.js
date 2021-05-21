/**
 * A collection of utility functions.
 */

 /**
  * Mutates the given array by randomly shuffling the order of it's items.
  * 
  * @param {any[]} array the nonempty array to shuffle
  */
export function shuffle(array) {
    // Using the Knuth shuffle algorithm.
    /* At the end of each iteration:
        * - Items from index [0, end) are not randomized
        * - Items from index [end, last index in the array] are randomized
     */
    for (let end = array.length - 1; end > 0; end--) {
        // Randomly choose an item out of the remaining ones
        const randomIndex = Math.floor(Math.random() * end);
        // Swap the random item with the current end
        const temp = array[end];
        array[end] = array[randomIndex];
        array[randomIndex] = temp;
    }
}
