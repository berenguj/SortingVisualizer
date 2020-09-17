import React, { useState } from "react";
import "./App.css";
import RandomArray from "./SortingVisualizer";
import { mergeSort, bubbleSort } from "./SortingAlgos";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

var ARRAY_LENGTH = 300;
var LEFT = 0;
var RIGHT = 299;
var testArr = [
  { key: 0, value: 38 },
  { key: 1, value: 27 },
  { key: 2, value: 43 },
  { key: 3, value: 3 },
  { key: 4, value: 9 },
  { key: 5, value: 82 },
  { key: 6, value: 10 },
];

function App() {
  const [arr, setArr] = useState([]);

  function addRandomNum() {
    var min = 5;
    var max = 500;
    var random;
    random = Math.floor(Math.random() * (max - min + 1)) + min;
    setArr((prevArr) => {
      return [...prevArr, { id: uuidv4(), value: random }];
    });
  }

  function getRandomArray() {
    setArr([]);
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      addRandomNum();
    }
    //console.log("created arr");
    //console.log(arr);
  }

  function getAnimations(array, left, right, algo) {
    const animations = [];
    console.log(algo);
    if (algo === "MergeSort") {
      mergeSort(array, left, right, animations);
    } else if (algo === "BubbleSort") {
      console.log(array);
      bubbleSort(array, animations);
    }
    return animations;
  }

  function animate(algo) {
    const animations = getAnimations(arr, LEFT, RIGHT, algo);
    //const animations = getAnimations(testArr, 0, 6);
    //console.log(animations);
    console.log(arr);
    if (algo === "MergeSort") {
      mergeSortAnimation(animations);
    } else if (algo === "BubbleSort") {
      bubbleSortAnimation(animations);
    }
  }

  function mergeSortAnimation(animations) {
    const newAnimations = [];
    for (const animation of animations) {
      newAnimations.push(animation.compare);
      newAnimations.push(animation.compare);
      newAnimations.push(animation.swap);
    }
    for (let i = 0; i < newAnimations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const comparing = i % 3 !== 2;
      if (comparing) {
        const [barOneIndex, barTwoIndex] = newAnimations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        const color = i % 3 === 0 ? "blue" : "lightpink";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 5);
      } else {
        setTimeout(() => {
          const [barOneIndex, newHeight] = newAnimations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 5);
      }
    }
    //console.log("after animations");
    //console.log(arr);
  }

  function bubbleSortAnimation(animations) {
    const newAnimations = [];
    for (const animation of animations) {
      newAnimations.push(animation.compare);
      newAnimations.push(animation.compare);
      newAnimations.push(animation.swap);
    }
    for (let i = 0; i < newAnimations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const comparing = i % 3 !== 2;
      if (comparing) {
        const [barOneIndex, barTwoIndex] = newAnimations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        const color = i % 3 === 0 ? "blue" : "lightpink";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 5);
      } else {
        setTimeout(() => {
          const [barOneIndex, barTwoIndex] = newAnimations[i - 1];
          const [barOneHeight, barTwoHeight] = newAnimations[i];
          if (barOneHeight.value != -1 && barTwoHeight.value != -1) {
            /*if it is a valid swap*/
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            barOneStyle.height = `${barTwoHeight.value}px`;
            barTwoStyle.height = `${barOneHeight.value}px`;
          }
        }, i * 5);
      }
    }
  }

  function checkArray() {
    console.log("check arr");
    console.log(arr);
  }

  return (
    <div className="App">
      <h1>Sorting Algorithm Visualizer</h1>
      <button className="arraybutton" onClick={getRandomArray}>
        Create Random Array
      </button>
      <button
        className="arraybutton"
        onClick={function () {
          /*mergeSort(arr, LEFT, RIGHT);*/
          animate("MergeSort");
        }}
      >
        Mergesort
      </button>
      <button
        className="arraybutton"
        onClick={function () {
          animate("BubbleSort");
        }}
      >
        Bubble Sort
      </button>
      <RandomArray array={arr} />
    </div>
  );
}

export default App;
