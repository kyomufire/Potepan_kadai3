"use strict";

window.onload = function () {
  display = document.getElementById("display");
  display.value = "";
};

const num = document.querySelectorAll(".num");
let display = null;
let state = "start";
let total = 0;
let mode = "integer_mode";

const o_n = document.querySelectorAll(".o_n");
o_n.forEach((index) => {
  index.addEventListener("click", () => {
    if (state === "start") {
      total = index.dataset.indexId;
    } else if (state === "finish") {
      reset();
      total = index.dataset.indexId;
    } else if (state === "calculation" || state === "calBtn") {
      total += index.dataset.indexId;
    }
    display.value = total;
    state = "calculation";
  });
});

const zero = document.getElementById("zero");
zero.addEventListener("click", () => {
  if (state === "start" || state === "finish" || state === "calBtn") {
    if (display.value.slice(-1) === "0") {
      console.log("");
      return;
    }
  }

  if (state === "start") {
    total = zero.dataset.indexId;
  } else {
    total += zero.dataset.indexId;
  }
  display.value = total;
});

const point = document.getElementById("point");
point.addEventListener("click", () => {
  console.log(point.dataset.indexId);
  if (mode === "decimal_mode") {
    return;
  }
  if (state === "start" || state === "finish") {
    total = 0;
  } else if (state === "calBtn") {
    if (display.value.slice(-1) !== "0") {
      total += 0;
    }
  }
  total += point.dataset.indexId;
  display.value = total;
  state = "calculation";
  mode = "decimal_mode";
});

const ope = document.querySelectorAll(".ope");
ope.forEach((index) => {
  index.addEventListener("click", () => {
    if (state === "start") {
      return;
    } else if (state === "calculation") {
      total += index.dataset.indexId;
    } else if (state === "finish") {
      total = display.value;
      total += index.dataset.indexId;
      display.value = 0;
    } else if (state === "calBtn") {
      total = total.slice(0, -1);
      total += index.dataset.indexId;
    }
    display.value = total;
    state = "calBtn";
    mode = "integer_mode";
  });
});

const equal = document.getElementById("equal");
equal.addEventListener("click", () => {
  console.log(eval(total));
  display.value = eval(total);
  state = "finish";
  mode = "integer_mode";
});

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  reset();
});

function reset() {
  total = 0;
  display.value = 0;
  mode = "integer_mode";
  state = "start";
}
