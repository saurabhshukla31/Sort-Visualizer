const n = 50;
const array = [];
const container = document.getElementById("container");
const speedSlider = document.getElementById("speed-slider"); // Get the speed slider element
let animationSpeed = 100 - speedSlider.value * 10; // Initial animation speed (milliseconds)
init();

speedSlider.addEventListener("input", function() {
  animationSpeed = 100 - this.value * 10;
});

function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  showBars();
}

function play() {
  const sortingAlgorithm = document.getElementById("sorting-algorithm").value;
  let moves = [];

  switch (sortingAlgorithm) {
    case "selection":
      moves = selectionSort([...array]);
      break;
    case "bubble":
      moves = bubbleSort([...array]);
      break;
    case "insertion":
      moves = insertionSort([...array]);
      break;
    case "merge":
      moves = mergeSort([...array]);
      break;
    case "quick":
      moves = quickSort([...array], 0, array.length - 1);
      break;
    case "heap":
      moves = heapSort([...array]);
      break;
  }

  animate(moves);
}

function animate(moves) {
  if (moves.length == 0) {
    const bars = document.querySelectorAll(".bar");
    for (let i = bars.length - 1; i >= 0; i--) {
      const bar = bars[i];
      const previousBar = bars[i + 1];
      setTimeout(function () {
        bar.style.backgroundColor = "green";
        playNote(200 + array[i] * 500);
        if (previousBar) {
          previousBar.style.backgroundColor = "black";
          playNote(200 + array[i + 1] * 500);
          if (i == 0) {
            bars[0].style.backgroundColor = "black";
          }
        }
      }, 100 * (bars.length - i));
    }
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }
  showBars(move);
  setTimeout(function () {
    animate(moves);
  }, animationSpeed);
}

function showBars(move) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");
    bar.style.backgroundColor = "white";

    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
    }
    container.appendChild(bar);
  }
}

const squareBox = document.querySelector(".square-box");

function updateSquareBoxContent(
  algoName,
  description,
  timeComplexity,
  spaceComplexity
) {
  squareBox.innerHTML = `
        <h2>${algoName}</h2>
        <p>${description}</p>
        <p>Time Complexity: ${timeComplexity}</p>
        <p>Space Complexity: ${spaceComplexity}</p>
    `;
}

function play() {
  const sortingAlgorithm = document.getElementById("sorting-algorithm").value;
  let moves = [];
  let algoName = "";
  let description = "";
  let timeComplexity = "";
  let spaceComplexity = "";

  switch (sortingAlgorithm) {
    case "selection":
      moves = selectionSort([...array]);
      algoName = "Selection Sort";
      description =
        "Selection Sort is an iterative and in-place sorting algorithm that divides the data structure in two sublists: the ordered one, and the unordered one. The algorithm loops for all the elements of the data structure and for every cycle picks the smallest element of the unordered sublist and adds it to the sorted sublist, progressively filling it. It's a really simple and intuitive algorithm that does not require additional memory, but it's not really efficient on big data structures due to its quadratic time complexity. This algorithm has been upgraded and enhanced in several variants such as Heap Sort.";
      timeComplexity = "O(n^2) for worst, average, and best cases";
      spaceComplexity = "O(1)";
      break;
    case "bubble":
      moves = bubbleSort([...array]);
      algoName = "Bubble Sort";
      description =
        "Bubble Sort is an iterative sorting algorithm that imitates the movement of bubbles in sparkling water. The bubbles represent the elements of the data structure. The bigger bubbles reach the top faster than smaller bubbles, and this algorithm works in the same way. It iterates through the data structure and for each cycle compares the current element with the next one, swapping them if they are in the wrong order. It's a simple algorithm to implement, but not very efficient: on average, quadratic sorting algorithms with the same time complexity such as Selection Sort or Insertion Sort perform better. It has several variants to improve its performances, such as Shaker Sort, Odd Even Sort, and Comb Sort.";
      timeComplexity = "O(n^2) for worst and average cases, O(n) for best case";
      spaceComplexity = "O(1)";
      break;
    case "insertion":
      moves = insertionSort([...array]);
      algoName = "Insertion Sort";
      description =
        "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It's less performant than advanced sorting algorithms, but it can still have some advantages: it's really easy to implement and it's efficient on small data structures almost sorted. The algorithm divides the data structure into two sublists: a sorted one, and one still to sort. Initially, the sorted sublist is made up of just one element and it gets progressively filled. For every iteration, the algorithm picks an element in the unsorted sublist and inserts it at the right place in the sorted sublist. It's available in several variants such as Gnome Sort.";
      timeComplexity = "O(n^2) for worst and average cases, O(n) for best case";
      spaceComplexity = "O(1)";
      break;
    case "heap":
      moves = heapSort([...array]);
      algoName = "Heap Sort";
      description =
        "Heap Sort is an in-place iterative sorting algorithm based on auxiliary data structures called heap. It's less efficient than algorithms with the same time complexity and is not suitable for data structures with few elements. The heap is a data structure representable as a binary tree, where each node has a value bigger or equal to its children. Consequently, the root will hold the maximum value. The data structure gets ordered to form the heap initially and then it gets progressively reordered with an algorithm similar to Selection Sort, starting from the bigger elements.";
      timeComplexity = "O(n log n) for worst, average, and best cases";
      spaceComplexity = "O(1)";
      break;
  }

  updateSquareBoxContent(
    algoName,
    description,
    timeComplexity,
    spaceComplexity
  );

  animate(moves);
}
