import {useNavigate} from "react-router-dom";
const LoginComponent = () => {
  return (
    <div
      className={`absolute top-[calc(50%_-_206px)] left-[calc(50%_-_205px)] [backdrop-filter:blur(17.79px)] rounded-[28.46px] bg-gray-300 box-border h-[413px] overflow-hidden flex flex-col items-center justify-start py-10 px-20 gap-[40px] text-left text-smi text-neutral-100 font-button-2-regular border-[2.1px] border-solid border-steelblue`}
    >
      <img className="w-[165px] relative h-[45px]" alt="" src="/vector.svg" />
      <div className="w-[250px] flex flex-col items-start justify-start">
        <div className="w-[250px] relative h-[130px]"> 
          <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[8px]">
            <div className="relative font-semibold">Username</div>
            <input
              className="[outline:none] flex font-abeezee text-smi bg-neutral-100 w-[250px] rounded-8xs box-border h-8 overflow-hidden shrink-0 flex-row items-center justify-start p-4 italic text-black border-[0.7px] border-solid border-silver"
              placeholder="Agent code name"
              type="text"
            />
          </div>
          <div className="absolute top-[72px] left-[0px] flex flex-col items-start justify-start gap-[8px]">
            <div className="relative font-semibold">Password</div>
            <input
              className="[outline:none] flex font-abeezee text-smi bg-neutral-100 w-[250px] rounded-8xs box-border h-8 overflow-hidden shrink-0 flex-col items-start justify-center p-4 italic text-black border-[0.7px] border-solid border-silver"
              placeholder="Password"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="cursor-pointer self-stretch rounded-xl bg-primary-500 flex flex-row items-center justify-center py-2.5 px-2 gap-[8px] text-center text-base" onClick={useNavigate("/target-page")}>
        <div className="relative leading-[24px] font-semibold">Login In</div>
      </div>
    </div>
  );
};

export default LoginComponent;