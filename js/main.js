$(function () {
  "use strict";

  var quotes = [
    "Believe in yourself.<br> I don't want to be the only one who does.",
    "Looking for your full potential?<br> I'm good at hiding and seek",
    "Looking for a Front-end developer in Singapore. <br> Or who can work remote all over the world?",
    "Become a genius. I don't mind if your evil",
    "Challenge yourself.. And others.<br> It's good for everyone",
    "Emotions are valuable. Don't throw them.",
    "Stop being negative.<br> You're literally bringing the world down",
    "Be cautious, you are entering my territory.",
    "Be cautious, you are entering my world of Front-end.",
  ];

  $('.quote').html(quotes[2]);
  TweenLite.fromTo('.quote', .7, {
    alpha: 0,
    y: '-20px'
  }, {
    alpha: 1,
    y: '0',
    ease: Power2.easeOut
  });

  var aboutAnimation = new TimelineMax({ repeat: false, delay: 0.4 });
  aboutAnimation
    .to('.load', .5, {
      autoAlpha: 0,
      y: '-40%',
      delay: 2
    })
    .set('.aboutAni', {
      scale: '1.001',
    })
    .from('.aboutAni', 1, {
      scale: 1,
      autoAlpha: 0,
      y: '20px',
      width: '100px',
      height: '20px',
      ease: Elastic.easeOut.config(1, 0.5)
    })
    .from('.text-html-css', .3, {
      autoAlpha: 0,
      y: '-40px',
      ease: Power3.easeOut
    })
    .from('.head', .5, {
      autoAlpha: 0,
      y: '-20px',
      ease: Power3.easeOut
    })
    .staggerFrom('.box', .5, {
      autoAlpha: 0,
      y: '-20px',
      ease: Power3.easeOut
    }, '.15', '-=.3')
    .to('.text-html-css', .3, {
      display: 'none',
      autoAlpha: 0,
      y: '20px',
      ease: Power3.easeIn,
      delay: .5
    })
    .to('.html-css', .5, {
      autoAlpha: 0,
      y: '20px',
      ease: Power3.easeIn,
      display: 'none'
    })
    .to('.aboutAni', 1, {
      scale: '.3',
      ease: Elastic.easeInOut.config(1, 0.75)
    }, '-=.5')
    .to('.aboutAni', 1, {
      rotation: '360deg',
      ease: Elastic.easeOut.config(1, 0.75)
    }, '-=.5')
    .to('.aboutAni', 1, {
      scale: '1',
      ease: Elastic.easeInOut.config(1, 0.75)
    }, '-=.75')
    .from('.text-javascript', .3, {
      display: 'none',
      autoAlpha: 0,
      y: '-20px',
      ease: Power3.easeOut
    }, '-=.5')
    .from('.javascript', .5, {
      autoAlpha: 0,
      ease: Power3.easeOut
    }, '-=1')
    .from('.sidebar', .5, {
      autoAlpha: 0,
      ease: Power3.easeOut,
      x: '-20px'
    }, '-=.3')
    .staggerFrom('.line', .3, {
      autoAlpha: 0,
      y: '-20px',
      ease: Power4.easeOut
    }, '.15', '-=.3')
    .to('.text-javascript', .3, {
      display: 'none',
      autoAlpha: 0,
      y: '20px',
      ease: Power3.easeIn,
      delay: .7
    })
    .to('.javascript', .5, {
      autoAlpha: 0,
      y: '20px',
      ease: Power3.easeIn
    }, '-=.3')
    .to('.aboutAni', 1, {
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      top: '50%',
      y: '-50%',
      ease: Elastic.easeInOut.config(1, 0.75)
    })
    .to('.aboutAni', .3, {
      autoAlpha: 0
    }, '-=.3')
    .fromTo('.browser', 1, {
      autoAlpha: 0,
      scale: .5
    }, {
      autoAlpha: 1,
      scale: 1,
      y: '-50%',
      borderRadius: '50%',
      ease: Elastic.easeOut.config(1, 0.75)
    }, '-=1')
    .to('.browser', 1, {
      width: '100%',
      height: '210px',
      borderRadius: '5px',
      delay: 1,
      ease: Elastic.easeOut.config(1, 0.75)
    }, '-=.5')
    .fromTo('.text-screen', .3, {
      autoAlpha: 0,
      y: '-40px'
    }, {
      autoAlpha: 1,
      y: '-25px'
    }, '-=.5')
    .to('.icon', .3, {
      autoAlpha: 0,
      display: 'none',
      ease: Power3.easeIn
    })
    .fromTo('.header', .3, {
      autoAlpha: 0,
      y: '-10px'
    }, {
      autoAlpha: 1,
      y: '0'
    })
    .to('.header, .body', .3, {
      autoAlpha: 0,
      y: '10px',
      display: 'none',
      delay: 1.2
    })
    .to('.browser', 1, {
      width: '200px',
      ease: Elastic.easeOut.config(1, 0.75)
    })
    .fromTo('.tablet', .3, {
      autoAlpha: 0,
      y: '-10px'
    }, {
      autoAlpha: 1,
      y: '0'
    }, '-=.3')
    .to('.tablet', .3, {
      autoAlpha: 0,
      y: '10px',
      display: 'none',
      delay: .7
    })
    .to('.browser', 1, {
      width: '90px',
      height: '160px',
      ease: Elastic.easeOut.config(1, 0.75)
    })
    .fromTo('.phone', .3, {
      autoAlpha: 0,
      y: '-10px'
    }, {
      autoAlpha: 1,
      y: '0'
    }, '-=.5')
    .to('.text-screen', .3, {
      autoAlpha: 0,
      y: '10px',
      display: 'none',
      delay: .7
    })
    .fromTo('.text-web', .3, {
      autoAlpha: 0,
      y: '-10px'
    }, {
      autoAlpha: 1,
      y: '0'
    })
    .to('.phone', .3, {
      autoAlpha: 0,
      y: '10px',
      display: 'none'
    })
    .to('.body', 0, {
      autoAlpha: 1,
      y: '0',
      display: '',
      height: '100%',
      padding: 0
    })
    .to('.browser', 1, {
      width: '10px',
      height: '10px',
      ease: Elastic.easeInOut.config(1, 0.75)
    })
    .to('.browser', 1, {
      width: '200px',
      height: '200px',
      borderRadius: '5px',
      ease: Elastic.easeOut.config(1, 0.75)
    }, '-=.3')
    .fromTo('.heart span', .5, {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      fontSize: '100px',
      ease: Elastic.easeOut.config(1, 0.75)
    }, '-=1')
    .to('.heart', .3, {
      autoAlpha: 0,
      y: '10px',
      display: 'none',
      delay: .7
    })
    .to('.text-web', .3, {
      autoAlpha: 0,
      y: '10px',
      display: 'none'
    })
    .to('.browser', 1, {
      width: '200px',
      height: '60px',
      borderRadius: '5px',
      ease: Elastic.easeOut.config(1, 0.75)
    }, '-=.5')
    .fromTo('.more', .3, {
      alpha: 0,
      y: '-80%'
    }, {
      autoAlpha: 1,
      y: '-50%'
    })
    .to('.more', .3, {
      alpha: 0,
      y: '10px',
      display: 'none',
      delay: 2
    })
    .to('.browser', .1, {
      alpha: 0,
      ease: Power4.easeOut
    }, '-=.3')
    .fromTo('.checkout-project', .3, {
      autoAlpha: 0,
      y: '-20px'
    }, {
      autoAlpha: 1
    }, '-=2.2')
    .to('.checkout-project', .3, {
      autoAlpha: 0,
      y: '10px',
      display: 'none',
    }, '-=.3')
    .from('.text-heinz', .3, {
      autoAlpha: 0,
      y: '-20px'
    })
    .to('.text-heinz', 0.3, {
      autoAlpha: 0,
      y: '10px',
      display: 'none',
      delay: 2.5
    })
    .fromTo('.img-heinz', 1, {
      autoAlpha: 0,
      ease: Elastic.easeOut.config(1, 0.75)
    }, {
      autoAlpha: 1,
      rotation: '720deg',
      ease: Elastic.easeOut.config(1, 0.75)
    }, '-=2.6')
    .to('.img-heinz', .6, {
      scale: 0,
      display: 'none',
      ease: Expo.easeInOut,
      delay: 0.5
    })
    .from('.img-sf-spa', 0.3, {
      display: 'none',
      autoAlpha: 0,
      x: '-1500px',
      skewX: '30deg',
      scaleX: 1.3
    })
    .to('.img-sf-spa', .4, {
      autoAlpha: 1,
      x: '30px',
      skewX: '0deg',
      scaleX: .8,
      ease: Elastic.easeOut.config(1, 0.75)
    })
    .to('.img-sf-spa', 0.7, {
      x: 0,
      skewX: '0deg',
      scaleX: 1,
      ease: Expo.easeInOut
    })
    .to('.img-sf-spa', .3, {
      scale: 0,
      display: 'none',
      ease: Expo.easeInOut,
      delay: 2
    })
    .from('.text-sf-spa', .3, {
      autoAlpha: 0,
      y: '-20px'
    }, '-=3')
    .to('.text-sf-spa', 0.3, {
      autoAlpha: 0,
      y: '10px',
      display: 'none'
    })
    .to('.browser', .1, {
      alpha: 1,
      ease: Power4.easeOut
    })
    .fromTo('.more-2', .3, {
      alpha: 0,
      y: '-80%'
    }, {
      autoAlpha: 1,
      y: '-50%'
    }, '-=.1')
    .to('.more-2', .3, {
      alpha: 0,
      y: '10px',
      display: 'none',
      delay: 2
    })
    .to('.browser', .1, {
      alpha: 0,
      ease: Power4.easeOut
    }, '-=.3')
    .fromTo('.contact-me', .3, {
      autoAlpha: 0,
      y: '-20px'
    }, {
      autoAlpha: 1
    }, '-=2.2')
    .to('.contact-me', .3, {
      autoAlpha: 0,
      y: '10px',
      display: 'none',
    }, '-=.3')
    .fromTo('.profile-card', 1, {
      scaleY: 0.00,
      scaleX: 0,
      ease: SteppedEase.config(12)
    }, {
      scaleY: 0.01,
      scaleX: 2,
      ease: Sine.easeInOut
    })
    .to('.profile-card', 1, {
      scaleY: 1,
      scaleX: 1,
      ease: Elastic.easeOut.config(1, 0.3)
    })

  //on resize
  $(window).resize(function () {
    $('.browser-height').height($(this).height());
  })
  $(window).resize();  
});