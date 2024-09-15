import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function Rating({ rating, shop }) {
  return (
    <div className={`flex ${shop ? "gap-3" : "gap-1"}`}>
      {[1, 2, 3, 4, 5].map((each, index) => {
        return rating >= each ? (
          <span key={index} className="text-[#EDB00E]">
            <FaStar></FaStar>
          </span>
        ) : rating >= each - 0.5 ? (
          <span key={index} className="text-[#EDB00E]">
            <FaStarHalfAlt></FaStarHalfAlt>
          </span>
        ) : (
          <span key={index} className="text-[#EDB00E]">
            <CiStar></CiStar>
          </span>
        );
      })}

      {/* {rating >= 1 ? (
        <span className="text-[#EDB00E]">
          <FaStar></FaStar>
        </span>
      ) : rating >= 0.5 ? (
        <span className="text-[#EDB00E]">
          <FaStarHalfAlt></FaStarHalfAlt>
        </span>
      ) : (
        <span className="text-[#EDB00E]">
          <CiStar></CiStar>
        </span>
      )}
      {rating >= 2 ? (
        <span className="text-[#EDB00E]">
          <FaStar></FaStar>
        </span>
      ) : rating >= 1.5 ? (
        <span className="text-[#EDB00E]">
          <FaStarHalfAlt></FaStarHalfAlt>
        </span>
      ) : (
        <span className="text-[#EDB00E]">
          <CiStar></CiStar>
        </span>
      )}
      {rating >= 3 ? (
        <span className="text-[#EDB00E]">
          <FaStar></FaStar>
        </span>
      ) : rating >= 2.5 ? (
        <span className="text-[#EDB00E]">
          <FaStarHalfAlt></FaStarHalfAlt>
        </span>
      ) : (
        <span className="text-[#EDB00E]">
          <CiStar></CiStar>
        </span>
      )}
      {rating >= 4 ? (
        <span className="text-[#EDB00E]">
          <FaStar></FaStar>
        </span>
      ) : rating >= 3.5 ? (
        <span className="text-[#EDB00E]">
          <FaStarHalfAlt></FaStarHalfAlt>
        </span>
      ) : (
        <span className="text-[#EDB00E]">
          <CiStar></CiStar>
        </span>
      )}
      {rating >= 5 ? (
        <span className="text-[#EDB00E]">
          <FaStar></FaStar>
        </span>
      ) : rating >= 4.5 ? (
        <span className="text-[#EDB00E]">
          <FaStarHalfAlt></FaStarHalfAlt>
        </span>
      ) : (
        <span className="text-[#EDB00E]">
          <CiStar></CiStar>
        </span>
      )} */}
    </div>
  );
}

export default Rating;
