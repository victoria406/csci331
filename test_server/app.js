const element = document.getElementById("dogg");

let currentAnimation;

function move(transformEnd) {
  currentAnimation?.pause();
  let transformStart = getComputedStyle(element).transform;

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
    [{ transform: transformStart }, { transform: transformEnd }],
    {
      duration: duration,
      easing: "linear",
      fill: "forwards",
    }
  );
  animation_ForC();
}
async function animation_ForC() {
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
  move("translateX(0)", "translateX(500px)");
}

function animateRight() {
  move("translateX(500px)", "translateX(0)");
}

function animateDown() {
  move("translateY(500px)", "translateY(0)");
}

function animateUp() {
  move("translateY(0)", "translateY(500px)");
}