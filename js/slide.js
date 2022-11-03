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

  // eventos

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
    // click
  }

  // slide config

  slideCalcula(img) {
    const largura = img.getBoundingClientRect();
    const janelaWidth = window.innerWidth;
    const soma = (janelaWidth - largura.width) / 2;
    const total = -(img.offsetLeft - soma);
    return total;
  }

  slideConfig() {
    this.slideArray = [...this.slide.children].map((item) => {
      const posicao = item.offsetLeft;
      const margin = this.slideCalcula(item);
      return {
        img: margin,
      };
    });
  }

  slideIndexNav(index) {
    const last = this.slideArray.length - 1;
    return (this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    });
  }

  nextSlide(index) {
    this.moveSlide(this.slideArray[index].img);
    this.slideIndexNav(index);
    this.distancia.posicaoFinal = this.slideArray[index].img;
  }

  init() {
    this.addEvents();
    this.slideConfig();
    return this;
  }
}
