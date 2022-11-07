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

  transition(ativo) {
    this.slide.style.transition = ativo ? "transform .3s" : "";
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
    this.transition(false);
  }

  Move(e) {
    e.preventDefault();
    const finalPosition = this.atualizaPosicao(e.clientX);
    this.moveSlide(finalPosition);
  }

  End(e) {
    this.wrapper.removeEventListener("mousemove", this.Move);
    this.distancia.posicaoFinal = this.distancia.moveFinal;
    this.TrocaNoFinal();
    this.transition(true);
  }

  TrocaNoFinal() {
    if (this.distancia.movimento > 180 && this.numero.next !== undefined) {
      this.proximoSlide();
    } else if (
      this.distancia.movimento < -180 &&
      this.numero.prev !== undefined
    ) {
      this.prevSlide();
    } else {
      this.nextSlide(this.numero.active);
    }
  }

  // touch

  StartTouch(e) {
    console.log(this.wrapper);
    this.wrapper.addEventListener("touchmove", this.MoveTouch);
    this.distancia.startX = e.changedTouches[0].clientX;
    this.transition(false);
  }

  MoveTouch(e) {
    const finalPosition = this.atualizaPosicao(e.changedTouches[0].clientX);
    this.moveSlide(finalPosition);
  }

  EndTouch(e) {
    this.wrapper.removeEventListener("touchmove", this.MoveTouch);
    this.distancia.posicaoFinal = this.distancia.moveFinal;
    this.transition(true);
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

  slideIndexNav(numero) {
    const last = this.slideArray.length - 1;
    return (this.numero = {
      prev: numero ? numero - 1 : undefined,
      active: numero,
      next: numero === last ? undefined : numero + 1,
    });
  }

  nextSlide(numero) {
    this.transition(true);
    this.moveSlide(this.slideArray[numero].img);
    this.slideIndexNav(numero);
    this.distancia.posicaoFinal = this.slideArray[numero].img;
  }

  // nav

  prevSlide() {
    if (this.numero.prev !== undefined) {
      this.nextSlide(this.numero.prev);
    }
  }

  proximoSlide() {
    if (this.numero.next !== undefined) {
      this.nextSlide(this.numero.next);
    }
  }

  init() {
    this.addEvents();
    this.slideConfig();
    this.nextSlide(2);
    return this;
  }
}
