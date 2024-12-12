function heapify(array, length, i, moves) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  moves.push({ indices: [left, largest], type: "comp" });
  if (left < length && array[left] > array[largest]) {
    largest = left;
  }

  moves.push({ indices: [right, largest], type: "comp" });
  if (right < length && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    moves.push({ indices: [i, largest], type: "swap" });
    [array[i], array[largest]] = [array[largest], array[i]];
    heapify(array, length, largest, moves);
  }
}

function heapSort(array) {
  const moves = [];
  const length = array.length;
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    heapify(array, length, i, moves);
  }
  for (let i = length - 1; i > 0; i--) {
    moves.push({ indices: [0, i], type: "swap" });
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, i, 0, moves);
  }
  return moves;
}
