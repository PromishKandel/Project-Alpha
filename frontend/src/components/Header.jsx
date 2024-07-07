const Header = () => {
  return (
    <header
      className={`absolute  shadow-[0px_4px_20px_rgba(0,_0,_0,_0.25)] bg-gray-300 w-full overflow-hidden flex flex-row items-start justify-center py-[31px] px-[58px] box-border gap-[1000px]`}
    >
      <img className="w-[165px] relative h-[45px]" alt="" src="/vector1.svg" />
      <div className="flex flex-row items-center justify-start gap-[10px]">
        <button className="cursor-pointer [border:none] py-2.5 px-2 bg-white-8 w-40 rounded-xl flex flex-row items-center justify-center box-border">
          <div className="relative text-base leading-[24px] font-semibold font-button-2-regular text-neutral-100 text-center">
            Find Target
          </div>
        </button>
        <button className="cursor-pointer [border:none] py-2.5 px-2 bg-white-8 w-40 rounded-xl flex flex-row items-center justify-center box-border">
          <div className="relative text-base leading-[24px] font-semibold font-button-2-regular text-neutral-100 text-center">
            Upload Target
          </div>
        </button>
        <button className="cursor-pointer [border:none] py-2.5 px-2 bg-primary-500 w-40 rounded-xl flex flex-row items-center justify-center box-border">
          <div className="relative text-base leading-[24px] font-semibold font-button-2-regular text-neutral-100 text-center">
            Logout
          </div>
        </button>
      </div>
    </header>
  );
  };
  
  
  export default Header;
  