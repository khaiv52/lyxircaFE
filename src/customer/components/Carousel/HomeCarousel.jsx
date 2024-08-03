import React, { useRef } from 'react';
import { homeCarouselData } from './HomeCarouselData';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../../style/HomeCarousel.css'; // Import CSS cho Carousel
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomeCarousel = () => {
    const carouselRef = useRef(null);

    const items = homeCarouselData.map(item => (
        <img 
            className='cursor-pointer carousel-image -z-10' 
            role='presentation' 
            src={item.image} 
            alt='' 
        />
    ));

    return (
        <div className="carousel-container">
            <AliceCarousel
                ref={carouselRef}
                items={items}
                disableButtonsControls
                autoPlay
                autoPlayInterval={3000}
                infinite
                mouseTracking
            />
            <button 
                className="carousel-control prev" 
                onClick={() => carouselRef.current.slidePrev()}
            >
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            </button>
            <button 
                className="carousel-control next" 
                onClick={() => carouselRef.current.slideNext()}
            >
                <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
            </button>
        </div>
    );
}

export default HomeCarousel;
