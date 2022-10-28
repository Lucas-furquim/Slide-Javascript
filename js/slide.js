export default class slide {
  constructor(slide, wrap) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrap);

    this.Start = this.Start.bind(this);
    this.Move = this.Move.bind(this);
    this.End = this.End.bind(this);

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

  addEvents() {
    this.wrapper.addEventListener("mousedown", this.Start);
    this.wrapper.addEventListener("mouseup", this.End);
  }

  init() {
    this.addEvents();
    return this;
  }
}
