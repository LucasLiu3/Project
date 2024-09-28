import Rating from "./Rating";

function RatingTemp({ rating, total }) {
  console.log(rating);
  return (
    <div className="flex justify-center items-center gap-5">
      <div className="text-md flex gap-1 w-[93px] flex-col">
        <Rating rating={rating.rating}></Rating>
      </div>
      <div className="w-[200px] h-[14px] bg-slate-200 relative">
        <div
          className="h-full bg-[#Edbb0E]"
          style={{
            width: `${Math.floor((100 * (rating.sum || 0)) / (total || 1))}%`,
          }}
        ></div>
      </div>
      <p className="text-sm text-slate-600 w-[0%]">{rating.sum}</p>
    </div>
  );
}

export default RatingTemp;
