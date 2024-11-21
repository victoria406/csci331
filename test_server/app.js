const element = document.getElementById("dogg");

document.addEventListener("keypress",determineKey)

function determineKey(event){
  let key = event.key;
  if (key == "w" || key == "W") {
    animateUp();
  } else if (key == "a" || key == "A") {
    animateLeft();
  } else if (key == "s" || key == "S") {
    animateDown();
  } else if (key == "d" || key == "D") {
    animateRight();
  }
}

let currentAnimation;

function move(transformEndXY) {
  var rect = element.getBoundingClientRect();
  
  currentAnimation?.pause();
  let transformStartXY = "translate(" + (rect.left.toString()-8) + "px, " + (rect.top.toString()-8) + "px)";
  //console.log(transformStartXY);
  //console.log(transformEndXY);
  let duration = 1000;
  if (currentAnimation) {
    const timing = currentAnimation.effect.getComputedTiming();

    // duration of the running animation
    const activeDuration = timing.activeDuration;

    // progress between 0 and 1 of the running animation
    const activeProgress = timing.progress;

    // calculate duration so that velocity is constant
    duration -= activeDuration - activeProgress * activeDuration;
  }

  currentAnimation?.cancel(); 

  currentAnimation = element.animate(
    [{ transform: transformStartXY }, { transform: transformEndXY }],
    {
      duration: duration,
      easing: "linear",
      fill: "forwards",
    }
  );
  animation_ForC();
  //console.log("test"); 
  var rect = element.getBoundingClientRect();
  //console.log(rect.top, rect.right, rect.bottom, rect.left);
}
async function animation_ForC() {
  var rect = dogg.getBoundingClientRect();
  // handling cancellation with promises
  currentAnimation?.finished
    .then(() => console.log("animation finished!"))
    .catch(error => console.error("animation cancelled.", error));
  // handling cancellation with async await
  try {
    await currentAnimation?.finished;
  } catch (error) {
    console.error("animation cancelled.", error);
  }
}
function animateLeft() {
  var rect = element.getBoundingClientRect();
  //console.log(rect.top, rect.right, rect.bottom, rect.left);
  var yadj = rect.top - 8;
  var leftadj = rect.left - 508;
  move("translate(" + (leftadj.toString()) + "px, " + (yadj.toString()) + "px)");
}

function animateRight() {
  var rect = element.getBoundingClientRect();
  //console.log(rect.top, rect.right, rect.bottom, rect.left);
  //console.log("right");
  var yadj = rect.top - 8;
  var rightadj = rect.left + 492;
  move("translate(" + (rightadj.toString()) + "px, " + (yadj.toString()) + "px)");
}

function animateDown() {
  var rect = element.getBoundingClientRect();
  //console.log(rect.top, rect.right, rect.bottom, rect.left);
  var xadj = rect.left - 8;
  var downadj = rect.top + 492;
  move("translate(" + (xadj.toString()) + "px, " + (downadj.toString()) + "px)");
}

function animateUp() {
  var rect = element.getBoundingClientRect();
  //console.log(rect.top, rect.right, rect.bottom, rect.left);
  var xadj = rect.left - 8;
  var upadj = rect.top - 508;
  move("translate(" + (xadj.toString()) + "px, " + (upadj.toString()) + "px)");
}