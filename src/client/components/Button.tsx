import React from "react";
import Spinner from "./Spinner";
import { LoadingButtonProps } from "../lib/types";

export const Button: React.FC<LoadingButtonProps> = ({
  textColor = "text-white",
  btnColor = "bg-ct-yellow-600",
  children,
  loading = false,
}) => {
  return (
    <div className="outer-border">
      <button
        type="submit"
        className={`w-full text-white bg-[#171A20] focus:bg-[#383E4A] btn-style py-[16px] px-[25px] text-[#EBEEF1] rounded-md transition-all hover:bg-[#242932] hover:p-4 hover:gap-10 hover:shadow-inset hover:rounded-[13px] ${
          loading ? "bg-[#ccc] loading-style" : ""
        }`}
      >
        {loading ? (
          <div className="text-white flex justify-center items-center gap-10 loading-style">
            {/* <Spinner />
            <span className="text-white inline-block">Loading...</span> */}
          </div>
        ) : (
          <span className={`${textColor}`}>{children}</span>
        )}
      </button>
    </div>
  );
};
