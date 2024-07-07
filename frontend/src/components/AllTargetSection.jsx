const AllTargetSection = () => {
  return (
    <div
      className={`absolute top-[calc(50%_+_64px)] left-[calc(50%_+_149px)] rounded-2xl bg-gray-200 w-[523px] h-[390px] overflow-hidden text-left text-sm text-neutral-100 font-button-2-regular`}
    >
      <div className="absolute top-[77px] left-[12px] w-[499px] h-[313px] overflow-y-auto flex flex-col items-start justify-start gap-[35px]">
        <div className="self-stretch h-12 shrink-0 flex flex-row items-center justify-start gap-[20px]">
          <img
            className="w-12 relative rounded-[50%] h-12 object-cover"
            alt=""
            src="/oval@2x.png"
          />
          <div className="w-[411px] flex flex-col items-start justify-start gap-[8px]">
            <div className="relative font-semibold">Target Name</div>
            <div className="relative font-semibold">Target Location</div>
          </div>
        </div>
        <div className="self-stretch h-12 shrink-0 flex flex-row items-center justify-start gap-[20px]">
          <img
            className="w-12 relative rounded-[50%] h-12 object-cover"
            alt=""
            src="/oval@2x.png"
          />
          <div className="w-[411px] flex flex-col items-start justify-start gap-[8px]">
            <div className="relative font-semibold">Target Name</div>
            <div className="relative font-semibold">Target Location</div>
          </div>
        </div>
      </div>
      <div className="absolute top-[9px] left-[18px] rounded-2xl bg-gray-100 w-[487px] flex flex-row items-start justify-start py-2 px-4 box-border gap-[8px]">
        <img
          className="w-6 relative h-6 overflow-hidden shrink-0"
          alt=""
          src="/hugeiconinterfacesolidsearch-02.svg"
        />
        <input
          className="[border:none] [outline:none] font-button-2-regular text-base bg-[transparent] flex-1 relative leading-[24px] text-neutral-100 text-left"
          placeholder="Search"
          type="text"
        />
      </div>
    </div>
  );
};

export default AllTargetSection;
