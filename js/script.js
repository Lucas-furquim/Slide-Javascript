import slide from "./slide.js";

window.addEventListener("load", () => {
  const desliza = new slide(".slide", ".container");
  desliza.init();
  desliza.nextSlide(2);
});
