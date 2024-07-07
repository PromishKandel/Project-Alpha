import NewTargetModal from "../components/NewTargetModal";
import Header from "../components/Header";

const UploadTarget = () => {
  return (
    <div className="w-full relative shadow-[555px_868px_288px_rgba(0,_0,_0,_0),_355px_556px_264px_rgba(0,_0,_0,_0.01),_200px_312px_223px_rgba(0,_0,_0,_0.05),_89px_139px_165px_rgba(0,_0,_0,_0.09),_22px_35px_91px_rgba(0,_0,_0,_0.1)] [background:radial-gradient(50%_50%_at_50%_50%,_#4b4d4f,_#151516)] h-screen overflow-hidden">
      <NewTargetModal />
      <Header/>
    </div>
  );
};

export default UploadTarget;
