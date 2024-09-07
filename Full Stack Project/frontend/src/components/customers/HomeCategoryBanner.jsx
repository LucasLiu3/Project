import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

function HomeCategoryBanner() {
  const fakeCategory = [
    "Category1",
    "Category2",
    "Category3",
    "Category4",
    "Category5",
    "Category6",
  ];
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-[85%] mx-auto relative">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Category</h2>
          <div className="w-[100px] h-[3px] bg-black mt-4"></div>
        </div>
      </div>
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={1000}
      >
        {fakeCategory.map((c, i) => (
          <Link className="h-[185px] border block" key={i} to="#">
            <div className="w-full h-full relative p-3">
              <img
                src={`images1/products/${i + 1}.webp`}
                alt=""
                className="h-full w-full"
              />
              <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center">
                <span className="py-[2px] px-6 bg-[#3330305d] text-white">
                  {c}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default HomeCategoryBanner;
