/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { NavMenu } from "../NavMenu";

export const DivNav = ({
  className,
  SVG = "/img/svg.svg",
  navMenuVector = "/img/vector-1.svg",
  navMenuIcon = "/img/icon-4.svg",
  navMenuDivisor = "/img/divisor-1.svg",
  navMenuText = "Iniciar Sessão",
}) => {
  return (
    <div className={`flex max-w-screen-xl w-[1280px] items-start justify-between relative ${className}`}>
      <div className="inline-flex items-center px-0 py-[14px] relative self-stretch flex-[0_0_auto]">
        <img className="relative w-[148px] h-[32px]" alt="Svg" src={SVG} />
      </div>
      <NavMenu
        className="!self-stretch !h-[unset]"
        divisor={navMenuDivisor}
        icon={navMenuIcon}
        text={navMenuText}
        vector={navMenuVector}
      />
    </div>
  );
};

DivNav.propTypes = {
  SVG: PropTypes.string,
  navMenuVector: PropTypes.string,
  navMenuIcon: PropTypes.string,
  navMenuDivisor: PropTypes.string,
  navMenuText: PropTypes.string,
};
