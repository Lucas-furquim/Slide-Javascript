export default class slide {
  constructor(slide, wrap) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrap);

    this.Start = this.Start.bind(this);
    this.Move = this.Move.bind(this);
    this.End = this.End.bind(this);
    this.StartTouch = this.StartTouch.bind(this);
    this.MoveTouch = this.MoveTouch.bind(this);
    this.EndTouch = this.EndTouch.bind(this);

    this.distancia = {
      posicaoFinal: 0,
      startX: 0,
      movimento: 0,
    };
  }

  moveSlide(distX) {
    this.distancia.moveFinal = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  atualizaPosicao(clientX) {
    this.distancia.movimento = this.distancia.startX - clientX;
    return this.distancia.posicaoFinal - this.distancia.movimento * 1.5;
  }

  Start(e) {
    e.preventDefault();
    console.log(this.wrapper);
    this.wrapper.addEventListener("mousemove", this.Move);
    this.distancia.startX = e.clientX;
  }

  Move(e) {
    e.preventDefault();
    const finalPosition = this.atualizaPosicao(e.clientX);
    this.moveSlide(finalPosition);
  }
  End(e) {
    this.wrapper.removeEventListener("mousemove", this.Move);
    this.distancia.posicaoFinal = this.distancia.moveFinal;
  }

  // touch

  StartTouch(e) {
    console.log(this.wrapper);
    this.wrapper.addEventListener("touchmove", this.MoveTouch);
    this.distancia.startX = e.changedTouches[0].clientX;
  }

  MoveTouch(e) {
    const finalPosition = this.atualizaPosicao(e.changedTouches[0].clientX);
    this.moveSlide(finalPosition);
  }

  EndTouch(e) {
    this.wrapper.removeEventListener("touchmove", this.MoveTouch);
    this.distancia.posicaoFinal = this.distancia.moveFinal;
  }

  addEvents() {
    this.wrapper.addEventListener("mousedown", this.Start);
    this.wrapper.addEventListener("mouseup", this.End);
    // touch
    this.wrapper.addEventListener("touchstart", this.StartTouch);
    this.wrapper.addEventListener("touchend", this.EndTouch);
  }

  init() {
    this.addEvents();
    return this;
  }
}
