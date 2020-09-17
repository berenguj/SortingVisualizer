import React from "react";

export const merge = (array, l, m, r, animations) => {
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
    animation.compare = [l + i, m + j];
    if (L[i].value <= R[j].value) {
      array[k] = L[i];
      animation.swap = [k, L[i].value];
      i++;
    } else {
      array[k] = R[j];
      animation.swap = [k, R[j].value];
      j++;
    }
    k++;
    animations.push(animation);
  }
  while (i < left) {
    const animation = {};
    animation.compare = [l + i, l + i];
    animation.swap = [k, L[i].value];
    animations.push(animation);
    array[k] = L[i];
    i++;
    k++;
  }
  while (j < right) {
    const animation = {};
    animation.compare = [m + j, m + j];
    animation.swap = [k, R[j].value];
    animations.push(animation);
    array[k] = R[j];
    j++;
    k++;
  }
};

export const mergeSort = (array, left, right, animations) => {
  if (left < right) {
    var mid = Math.floor(left + (right - left) / 2);
    mergeSort(array, left, mid, animations);
    mergeSort(array, mid + 1, right, animations);
    merge(array, left, mid, right, animations);
  }
  //setArr(array);
};

export const bubbleSort = (array, animations) => {
  for (var i = 0; i < array.length - 1; i++) {
    for (var j = 0; j < array.length - i - 1; j++) {
      const animation = {};
      animation.compare = [j, j + 1];

      if (array[j].value > array[j + 1].value) {
        animation.swap = [array[j], array[j + 1]];
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      } else {
        animation.swap = [-1, -1];
      }
      animations.push(animation);
    }
  }
};
