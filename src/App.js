import React, { useState } from "react";
import "./App.css";
import RandomArray from "./SortingVisualizer";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
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
    var i = 0;
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

  function merge(array, l, m, r, animations) {
    var i, j, k;
    var left = m - l + 1;
    var right = r - m;

    /*create temp arrays*/

    var L = []; //array.slice(l, m);
    var R = []; //array.slice(m + 1, r);

    /*copy data*/
    for (let i = 0; i < left; i++) {
      L[i] = array[l + i];
    }
    for (let j = 0; j < right; j++) {
      R[j] = array[m + 1 + j];
    }

    /*merge*/
    i = 0;
    j = 0;
    k = l;
    while (i < left && j < right) {
      const animation = {};
      animation.compare = [i, j];
      if (L[i].value <= R[j].value) {
        array[k] = L[i];
        animation.swap = [k, i];
        i++;
        console.log("left");
      } else {
        array[k] = R[j];
        animation.swap = [k, j];
        j++;
        console.log("right");
      }
      k++;

      console.log("i");
      console.log(i);
      console.log("j");
      console.log(j);
      animations.push(animation);
    }
    while (i < left) {
      const animation = {};
      animation.compare = [i, i];
      animation.swap = [k, i];
      animations.push(animation);
      array[k] = L[i];
      i++;
      k++;
    }
    while (j < right) {
      const animation = {};
      animation.compare = [j, j];
      animation.swap = [k, j];
      animations.push(animation);
      array[k] = R[j];
      j++;
      k++;
    }
  }

  function mergeSort(array, left, right, animations) {
    if (left < right) {
      var mid = Math.floor(left + (right - left) / 2);
      mergeSort(array, left, mid, animations);
      mergeSort(array, mid + 1, right, animations);
      merge(array, left, mid, right, animations);
    }
    setArr(array);
  }

  function getAnimations(array, left, right) {
    const animations = [];
    mergeSort(array, left, right, animations);
    console.log("after mergesort");
    //console.log(arr);
    console.log(testArr);
    return animations;
  }

  function animate() {
    //const animations = getAnimations(arr, LEFT, RIGHT);
    const animations = getAnimations(testArr, 0, 6);
    console.log(animations);
    /*for(let i = 0; i < animations.length; i++){
      const {compare, swap} = animations[i];
      setTimeout(() => {

      }
    }*/
  }

  function combine() {
    var array = arr;
    //console.log("arr in combine");
    //checkArray();
    //console.log("array");
    //console.log(array);
    array.sort((a, b) => a.value - b.value);
    setArr(array);
    console.log(arr);
    //console.log(array);
    //mergeSort(arr, LEFT, RIGHT);
    //mergeSort(testArr, 0, 7);
    //console.log("testarray");
    //console.log(testArr);
    //setArr(array);
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
      <button className="arraybutton" onClick={checkArray}>
        Check Array
      </button>
      <button
        className="arraybutton"
        onClick={function () {
          /*mergeSort(arr, LEFT, RIGHT);*/
          animate();
        }}
      >
        Mergesort
      </button>
      <RandomArray array={arr} />
    </div>
  );
}

export default App;
