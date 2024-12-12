function selectionSort(array) {
  const moves = [];
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      moves.push({ indices: [i, j], type: "comp" });
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    moves.push({ indices: [i, minIndex], type: "swap" });
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
  return moves;
}
