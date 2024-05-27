/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const NavMenu = ({
  className,
  divisor = "/img/divisor-1.svg",
  vector = "/img/vector-1.svg",
  text = "Iniciar Sessão",
  icon = "/img/icon-4.svg",
}) => {
  return (
    <div
      className={`flex w-[694px] h-[64px] items-center justify-between p-[20px] relative bg-[#b1bcdf36] rounded-[0px_0px_24px_24px] ${className}`}
    >
      <div className="inline-flex items-center gap-[7px] relative flex-[0_0_auto]">
        <img className="relative w-[19px] h-[17px]" alt="Icon" src="/img/icon-3.svg" />
        <p className="relative w-fit [font-family:'Rubik',Helvetica] font-normal text-[#515151] text-[14px] tracking-[0] leading-[14px] whitespace-nowrap">
          <span className="[font-family:'Rubik',Helvetica] font-normal text-[#515151] text-[14px] tracking-[0] leading-[14px]">
            Televendas{" "}
          </span>
          <span className="font-medium">0800 616 6161</span>
        </p>
      </div>
      <img className="relative w-px h-[25px] mt-[-0.50px] mb-[-0.50px] object-cover" alt="Divisor" src={divisor} />
      <div className="inline-flex items-center gap-[8px] relative flex-[0_0_auto]">
        <img className="relative w-[16px] h-[18px]" alt="Vector" src={vector} />
        <div className="relative w-fit [font-family:'Rubik',Helvetica] font-normal text-[#515151] text-[14px] tracking-[0] leading-[14px] whitespace-nowrap">
          {text}
        </div>
      </div>
      <div className="flex w-[122px] items-center gap-[8px] relative">
        <img className="relative w-[23px] h-[20px]" alt="Icon" src={icon} />
        <div className="relative w-fit mr-[-11.00px] [font-family:'Rubik',Helvetica] font-normal text-[#515151] text-[14px] tracking-[0] leading-[14px] whitespace-nowrap">
          Minhas Viagens
        </div>
      </div>
      <div className="flex w-[63px] items-center justify-between relative">
        <img className="relative w-[20px] h-[20px]" alt="Icon" src="/img/icon-5.png" />
        <div className="relative w-fit [font-family:'Rubik',Helvetica] font-normal text-[#515151] text-[14px] tracking-[0] leading-[14px] whitespace-nowrap">
          Ajuda
        </div>
      </div>
    </div>
  );
};

NavMenu.propTypes = {
  divisor: PropTypes.string,
  vector: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
};
