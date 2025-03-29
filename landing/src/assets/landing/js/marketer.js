(function () {
  "use strict";

  const carousels = () => {
    const owlCarousel1 = document.querySelector(".owl-carousel1");
    if (!owlCarousel1) return;

    const responsiveConfig = {
      0: { items: 1 },
      680: { items: 2, loop: false },
      1000: { items: 3, nav: true },
    };

    const responsiveKeys = Object.keys(responsiveConfig)
      .map(Number)
      .sort((a, b) => a - b);

    let responsiveValue = {};
    for (let i = 0; i < responsiveKeys.length; i++) {
      if (window.innerWidth >= responsiveKeys[i]) {
        responsiveValue = responsiveConfig[responsiveKeys[i]];
      }
    }

    const carousel = new Flickity(owlCarousel1, {
      cellAlign: "center",
      contain: true,
      wrapAround: true,
      ...responsiveValue,
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    carousels();
  });
})();
// ...................................


