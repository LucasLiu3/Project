function PageTopBackImg({ children }) {
  return (
    <section className='bg-[url("http://localhost:3000/images1/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
      <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
        <div className="w-[85%] md:w-[80%] lg:w-[90%] h-full mx-auto">
          <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
            <h2 className="text-4xl font-bold">{children}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageTopBackImg;
