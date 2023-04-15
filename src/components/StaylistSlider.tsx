import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { set } from 'react-native-reanimated';

function StaylistSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div style={{ width: '100%' }}>
      <StyledSlider
        dots={settings.dots}
        infinite={settings.infinite}
        speed={settings.speed}
        slidesToShow={settings.slidesToShow}
        slidesToScroll={settings.slidesToScroll}
      >
        <img src="/img.png" alt="img" />
        <img src="/img.png" alt="img" />
        <img src="/img.png" alt="img" />
        <img src="/img.png" alt="img" />
      </StyledSlider>
    </div>
  );
}
const StyledSlider = styled(Slider)`
  .container {
    width: 100%;
    height: 100%;
  }
  .slick-slide img {
    width: 100%;
  }
  .slick-list {
    width: 100%;
  }

  .slick-prev,
  .slick-next {
    z-index: 9999;
    width: 30px !important;
    opacity: 0;
  }

  .slick-prev {
    left: 5px;
  }
  .slick-next {
    right: 5px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 3rem;
  }

  .slick-prev:hover,
  .slick-next:hover {
    opacity: 1;
  }

  .slick-prev:hover:before,
  .slick-next:hover:before {
    color: white;
  }
  .slick-dots {
    li button:before {
      color: #000000;
      border-radius: 0px;
    }
  }
`;

export default StaylistSlider;
