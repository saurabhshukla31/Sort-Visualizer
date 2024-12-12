function insertionSort(array) {
  const moves = [];
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      moves.push({ indices: [j, j + 1], type: "comp" });
      moves.push({ indices: [j, j + 1], type: "swap" });
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }
  return moves;
}
