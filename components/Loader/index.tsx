import { TailSpin } from "react-loader-spinner";
  
export default function Loader(){
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="modal z-50 p-8 rounded absolute">
      <TailSpin
        color="#Fff"
        height={60}
        width={60}
      /> 
      </div>
    </div>
  );
}