// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import SingleSlider from './SingleSlider';
const Slider = () => {
    return (
        <div>
              <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><SingleSlider></SingleSlider></SwiperSlide>
        <SwiperSlide><SingleSlider></SingleSlider></SwiperSlide>
        <SwiperSlide><SingleSlider></SingleSlider></SwiperSlide>
        <SwiperSlide><SingleSlider></SingleSlider></SwiperSlide>

      </Swiper>
        </div>
    );
};

export default Slider;