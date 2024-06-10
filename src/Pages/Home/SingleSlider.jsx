// eslint-disable-next-line react/prop-types
const SingleSlider = ({ image, title, description }) => {
    return (
      <div className="hero min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content flex flex-col justify-center items-center">
          <div className="max-w-md px-4">
            <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold">{title}</h1>
            <p className="mb-4 text-sm md:text-base lg:text-lg">{description}</p>
            <div className="flex flex-col items-center w-full">
            <input type="text" placeholder="Search..." className="input input-bordered mb-2 w-full" />
            <button className="btn btn-outline btn-secondary w-full">Search</button>
          </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SingleSlider;
  