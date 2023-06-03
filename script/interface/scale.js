window.addEventListener("resize", () => {
  let scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  document.documentElement.style.setProperty("--font-scale", scale.toFixed(3));
});
