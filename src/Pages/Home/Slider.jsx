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
     <SwiperSlide key={1}>
          <SingleSlider 
            image={'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEhvc3RlbCUyME1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D'}
            title="Comprehensive Management"
            description="Manage all aspects of your university's hostels with ease."
          />
        </SwiperSlide>
        <SwiperSlide key={2}>
          <SingleSlider 
            image={'https://plus.unsplash.com/premium_photo-1697730350129-de0e9f2b1e82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEhvc3RlbCUyME1hbmFnZW1lbnQlMjB2aWV3fGVufDB8fDB8fHww'}
            title="Student Accommodation"
            description="Ensure students have a safe and comfortable place to live."
          />
        </SwiperSlide>
        <SwiperSlide key={3}>
          <SingleSlider 
            image={'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SG9zdGVsJTIwTWFuYWdlbWVudCUyMGZvciUyMGElMjB1bml2ZXJzaXR5fGVufDB8fDB8fHww'}
            title="Resource Allocation"
            description="Optimize the allocation of resources within the hostels."
          />
        </SwiperSlide>
        <SwiperSlide key={4}>
          <SingleSlider 
            image={'https://images.unsplash.com/photo-1591710110747-dfeae9fa762a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9zdGVsJTIwTWFuYWdlbWVudCUyMGZvciUyMGElMjB1bml2ZXJzaXR5fGVufDB8fDB8fHww'}
            title="Easy Monitoring"
            description="Keep track of hostel activities and ensure everything runs smoothly."
          />
        </SwiperSlide>

      </Swiper>
        </div>
    );
};

export default Slider;