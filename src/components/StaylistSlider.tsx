import React, { Component, ReactComponentElement } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  children: React.ReactNode;
  num: number;
}
function StaylistSlider(props: Props) {
  const { children, num } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: num,
    slidesToScroll: num,
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
        {children}
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
    height: 200px;
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
    width: 30px !important;
    opacity: 1;
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
    color: rgba(255, 137, 35, 0.6);
  }

  .slick-prev:hover,
  .slick-next:hover {
    opacity: 1;
    color: rgba(255, 137, 35, 0.6);
  }

  .slick-prev:hover:before,
  .slick-next:hover:before {
    color: rgba(255, 137, 35);
  }
  .slick-dots {
    bottom: 0px;
    li button:before {
      color: rgba(255, 137, 35);
      border-radius: 0px;
    }
  }
`;

export default StaylistSlider;
