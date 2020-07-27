var thresholds = IntersectionObserver.thresholds;

console.log("thresholds: "+thresholds);

//let myElement = document.querySelector("#supercolor");

const numSteps = 122.0;

let bodyElement;
let prevRatio = 17.0;
let increasingColor = "rgba(40, 40, 190, ratio)";
let decreasingColor = "rgba(190, 40, 40, ratio)";

// Set things up
window.addEventListener("load", (event) => {
  
  bodyElement = document.querySelector("#body");

  createObserver();
}, false);

function createObserver() {
  let observer;
  
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(bodyElement);
}

function buildThresholdList() {
  let thresholds = [];
  let numSteps = 1;

  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > prevRatio) {
      entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
    } else {
      entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
    }

    prevRatio = entry.intersectionRatio;
  });
}