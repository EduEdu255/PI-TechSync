import React from "react";
import { DivNav } from "../components/DivNav";
import { ElementUiElements } from "../components/ElementUiElements";
import { InterfaceChartLine1 } from "../../icons/InterfaceChartLine1";
import { LogoPousar1 } from "../../assets/icons/LogoPousar1";

export const Dashboard = () => {
  return (
    <div className="bg-[#fafbfc] flex flex-row justify-center w-full">
      <div className="bg-[#fafbfc] overflow-hidden border border-solid border-greysblue-grey300 w-[1920px] h-[1405px] relative">
        <div className="absolute w-[345px] h-[1311px] top-[94px] left-0 bg-colorwhite">
          <div className="absolute w-[252px] h-[544px] top-[155px] left-[46px]">
            <div className="flex w-[252px] h-[64px] items-center gap-[24px] px-[24px] py-[16px] absolute top-0 left-0 bg-[#3658d0] rounded-[16px] shadow-shadow">
              <img className="relative w-[32px] h-[32px]" alt="Graph" src="/img/graph-1.png" />
              <div className="relative w-fit font-semibold text-colorwhite text-[18px] leading-[normal] [font-family:'Poppins',Helvetica] tracking-[0]">
                Dashboard
              </div>
            </div>
            <div className="absolute w-[158px] h-[32px] top-[112px] left-[24px]">
              <img className="absolute w-[32px] h-[32px] top-0 left-0" alt="Group" src="/img/group.png" />
              <div className="absolute top-[2px] left-[56px] font-normal text-[#737791] text-[18px] leading-[normal] [font-family:'Poppins',Helvetica] tracking-[0]">
                Resultados
              </div>
            </div>
            <div className="absolute w-[154px] h-[36px] top-[188px] left-[24px]">
              <div className="absolute w-[32px] h-[32px] top-[4px] left-0 bg-[url(/static/img/icon-outline-shopping-cart-1.png)] bg-[100%_100%]">
                <img className="absolute w-[27px] h-[27px] top-[2px] left-[2px]" alt="Vector" src="/img/vector-2.svg" />
              </div>
              <div className="absolute top-[6px] left-[56px] font-normal text-[#737791] text-[18px] leading-[normal] [font-family:'Poppins',Helvetica] tracking-[0]">
                Aeronaves
              </div>
            </div>
            <div className="absolute w-[156px] h-[32px] top-[272px] left-[24px]">
              <img
                className="absolute w-[32px] h-[32px] top-0 left-0"
                alt="Mdi shopping outline"
                src="/img/mdi-shopping-outline.svg"
              />
              <div className="absolute top-[2px] left-[56px] font-normal text-[#737791] text-[18px] leading-[normal] [font-family:'Poppins',Helvetica] tracking-[0]">
                Passagens
              </div>
            </div>
            <div className="absolute w-[147px] h-[32px] top-[352px] left-[24px]">
              <InterfaceChartLine1 className="!absolute !w-[32px] !h-[32px] !top-0 !left-0" />
              <div className="absolute top-[3px] left-[56px] font-normal text-[#737791] text-[18px] leading-[normal] [font-family:'Poppins',Helvetica] tracking-[0]">
                Relatórios
              </div>
            </div>
            <div className="absolute w-[128px] h-[32px] top-[432px] left-[24px]">
              <img
                className="absolute w-[32px] h-[32px] top-0 left-0"
                alt="Mdi cog outline"
                src="/img/mdi-cog-outline.svg"
              />
              <div className="absolute top-[2px] left-[56px] font-normal text-[#737791] text-[18px] leading-[normal] [font-family:'Poppins',Helvetica] tracking-[0]">
                Opções
              </div>
            </div>
            <div className="absolute w-[92px] h-[32px] top-[512px] left-[24px]">
              <div className="absolute top-[3px] left-[56px] [font-family:'Poppins',Helvetica] font-normal text-[#737791] text-[18px] tracking-[0] leading-[normal]">
                Sair
              </div>
              <div className="absolute w-[32px] h-[32px] top-0 left-0 rotate-[90.00deg]">
                <div className="relative w-[27px] h-[27px] top-[3px] left-[3px]">
                  <img
                    className="absolute w-[21px] h-[21px] top-[3px] left-[3px] rotate-[-90.00deg]"
                    alt="Union"
                    src="/img/union.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <LogoPousar1 className="!absolute !w-[86px] !h-[81px] !top-[20px] !left-[134px]" />
        </div>
        <div className="absolute w-[1577px] h-[120px] top-[94px] left-[345px]">
          <div className="relative w-[1575px] h-[120px] bg-colorwhite">
            <div className="absolute w-[298px] h-[60px] top-[30px] left-[1233px]">
              <div className="absolute w-[226px] h-[60px] top-0 left-[72px]">
                <img
                  className="absolute w-[60px] h-[60px] top-0 left-0 object-cover"
                  alt="Rectangle"
                  src="/img/rectangle-1393.png"
                />
                <div className="absolute w-[150px] h-[48px] top-[6px] left-[80px]">
                  <img
                    className="absolute w-[16px] h-[16px] top-[4px] left-[108px]"
                    alt="Group"
                    src="/img/group-21861.png"
                  />
                  <div className="absolute w-[146px] top-[28px] left-0 [font-family:'Poppins',Helvetica] font-normal text-greysblue-grey700 text-[14px] tracking-[0] leading-[20px]">
                    Administrador
                  </div>
                  <div className="absolute h-[24px] top-0 left-0 font-base-medium font-[number:var(--base-medium-font-weight)] text-[#151d48] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] whitespace-nowrap [font-style:var(--base-medium-font-style)]">
                    CIA AIR
                  </div>
                </div>
              </div>
              <div className="top-[7px] absolute w-[48px] h-[48px] left-0">
                <div className="relative h-[48px] rounded-[8px]">
                  <div className="top-0 bg-[#fffaf1] rounded-[8px] absolute w-[48px] h-[48px] left-0">
                    <img
                      className="absolute w-[24px] h-[24px] top-[12px] left-[12px]"
                      alt="Clarity notification"
                      src="/img/clarity-notification-line.svg"
                    />
                  </div>
                  <img
                    className="absolute w-[7px] h-[7px] top-[6px] left-[35px]"
                    alt="Vector"
                    src="/img/vector-3.svg"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-[513px] h-[60px] items-center gap-[8px] pl-[24px] pr-[32px] py-[2px] absolute top-[30px] left-[447px] bg-greysblue-grey300 rounded-[16px]">
              <img className="relative w-[32px] h-[32px]" alt="Magnifier" src="/img/magnifier.svg" />
              <div className="relative w-fit font-text-text-regular-1 font-[number:var(--text-text-regular-1-font-weight)] text-[#737791] text-[length:var(--text-text-regular-1-font-size)] tracking-[var(--text-text-regular-1-letter-spacing)] leading-[var(--text-text-regular-1-line-height)] [font-style:var(--text-text-regular-1-font-style)]">
                Busque aqui
              </div>
            </div>
            <div className="absolute top-[35px] left-[40px] font-4xl-semibold font-[number:var(--4xl-semibold-font-weight)] text-greysblue-grey900 text-[length:var(--4xl-semibold-font-size)] tracking-[var(--4xl-semibold-letter-spacing)] leading-[var(--4xl-semibold-line-height)] whitespace-nowrap [font-style:var(--4xl-semibold-font-style)]">
              Dashboard
            </div>
          </div>
        </div>
        <div className="absolute w-[877px] h-[348px] top-[246px] left-[377px]">
          <div className="relative h-[348px] bg-white rounded-[20px] overflow-hidden border border-solid border-[#f8f9fa] shadow-[0px_4px_20px_#ededed80]">
            <div className="absolute w-[186px] h-[184px] top-[132px] left-[665px]">
              <div className="relative w-[180px] h-[184px] bg-colorspurple-100 rounded-[16px]">
                <div className="absolute top-[148px] left-[20px] font-xs-medium font-[number:var(--xs-medium-font-weight)] text-primary-800 text-[length:var(--xs-medium-font-size)] tracking-[var(--xs-medium-letter-spacing)] leading-[var(--xs-medium-line-height)] whitespace-nowrap [font-style:var(--xs-medium-font-style)]">
                  0,5% de ontem
                </div>
                <div className="absolute top-[116px] left-[20px] font-base-medium font-[number:var(--base-medium-font-weight)] text-[#415165] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] whitespace-nowrap [font-style:var(--base-medium-font-style)]">
                  Novos Clientes
                </div>
                <div className="top-[76px] left-[20px] font-[number:var(--2xl-semibold-font-weight)] text-greysblue-grey900 text-[length:var(--2xl-semibold-font-size)] leading-[var(--2xl-semibold-line-height)] absolute font-2xl-semibold tracking-[var(--2xl-semibold-letter-spacing)] whitespace-nowrap [font-style:var(--2xl-semibold-font-style)]">
                  8
                </div>
                <div className="absolute w-[40px] h-[40px] top-[20px] left-[20px] bg-[#bf83ff] rounded-[20px]">
                  <div className="relative w-[24px] h-[24px] top-[8px] left-[8px]">
                    <div className="relative w-[20px] h-[20px] top-[2px] left-[2px]">
                      <img
                        className="absolute w-[18px] h-[16px] top-[2px] left-px"
                        alt="Union"
                        src="/img/union-1.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute w-[186px] h-[184px] top-[132px] left-[454px]">
              <div className="relative w-[180px] h-[184px] bg-colorsgreen-100 rounded-[16px]">
                <div className="absolute top-[148px] left-[20px] font-xs-medium font-[number:var(--xs-medium-font-weight)] text-primary-800 text-[length:var(--xs-medium-font-size)] tracking-[var(--xs-medium-letter-spacing)] leading-[var(--xs-medium-line-height)] whitespace-nowrap [font-style:var(--xs-medium-font-style)]">
                  +1,2% de ontem
                </div>
                <div className="absolute top-[116px] left-[20px] font-base-medium font-[number:var(--base-medium-font-weight)] text-[#415165] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] whitespace-nowrap [font-style:var(--base-medium-font-style)]">
                  Pacotes Vendidos
                </div>
                <div className="top-[76px] left-[20px] font-[number:var(--2xl-semibold-font-weight)] text-greysblue-grey900 text-[length:var(--2xl-semibold-font-size)] leading-[var(--2xl-semibold-line-height)] absolute font-2xl-semibold tracking-[var(--2xl-semibold-letter-spacing)] whitespace-nowrap [font-style:var(--2xl-semibold-font-style)]">
                  5
                </div>
                <div className="absolute w-[40px] h-[40px] top-[20px] left-[20px] bg-supporting-colorgreen rounded-[20px]">
                  <div className="relative w-[24px] h-[24px] top-[8px] left-[8px]">
                    <div className="relative w-[20px] h-[20px] top-[2px] left-[2px]">
                      <img
                        className="absolute w-[15px] h-[15px] top-[3px] left-[2px]"
                        alt="Subtract"
                        src="/img/subtract.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute w-[186px] h-[184px] top-[132px] left-[243px]">
              <div className="relative w-[180px] h-[184px] bg-[#fff4de] rounded-[16px]">
                <div className="absolute top-[148px] left-[20px] font-xs-medium font-[number:var(--xs-medium-font-weight)] text-primary-800 text-[length:var(--xs-medium-font-size)] tracking-[var(--xs-medium-letter-spacing)] leading-[var(--xs-medium-line-height)] whitespace-nowrap [font-style:var(--xs-medium-font-style)]">
                  +5% de ontem
                </div>
                <div className="absolute top-[116px] left-[20px] font-base-medium font-[number:var(--base-medium-font-weight)] text-[#415165] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] whitespace-nowrap [font-style:var(--base-medium-font-style)]">
                  Total Compradas
                </div>
                <div className="top-[76px] left-[20px] font-[number:var(--2xl-semibold-font-weight)] text-greysblue-grey900 text-[length:var(--2xl-semibold-font-size)] leading-[var(--2xl-semibold-line-height)] absolute font-2xl-semibold tracking-[var(--2xl-semibold-letter-spacing)] whitespace-nowrap [font-style:var(--2xl-semibold-font-style)]">
                  300
                </div>
                <div className="absolute w-[40px] h-[40px] top-[20px] left-[20px] bg-[#ff947a] rounded-[20px]">
                  <div className="relative w-[24px] h-[24px] top-[8px] left-[8px]">
                    <img
                      className="absolute w-[17px] h-[20px] top-[2px] left-[4px]"
                      alt="Union"
                      src="/img/union-2.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute w-[186px] h-[184px] top-[132px] left-[32px]">
              <div className="relative w-[180px] h-[184px] bg-[#ffe2e5] rounded-[16px]">
                <div className="absolute top-[148px] left-[20px] font-xs-medium font-[number:var(--xs-medium-font-weight)] text-primary-800 text-[length:var(--xs-medium-font-size)] tracking-[var(--xs-medium-letter-spacing)] leading-[var(--xs-medium-line-height)] whitespace-nowrap [font-style:var(--xs-medium-font-style)]">
                  +8% de ontem
                </div>
                <div className="absolute top-[116px] left-[20px] font-base-medium font-[number:var(--base-medium-font-weight)] text-[#415165] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] whitespace-nowrap [font-style:var(--base-medium-font-style)]">
                  Total Convertidos
                </div>
                <div className="absolute top-[76px] left-[20px] font-2xl-semibold font-[number:var(--2xl-semibold-font-weight)] text-greysblue-grey900 text-[length:var(--2xl-semibold-font-size)] tracking-[var(--2xl-semibold-letter-spacing)] leading-[var(--2xl-semibold-line-height)] whitespace-nowrap [font-style:var(--2xl-semibold-font-style)]">
                  R$343k
                </div>
                <div className="absolute w-[40px] h-[40px] top-[20px] left-[20px] bg-[#fa5a7d] rounded-[20px]">
                  <div className="relative w-[24px] h-[24px] top-[8px] left-[8px]">
                    <div className="relative w-[20px] h-[20px] top-[2px] left-[2px]">
                      <img
                        className="absolute w-[18px] h-[18px] top-px left-px"
                        alt="Subtract"
                        src="/img/subtract-1.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute w-[100px] h-[40px] top-[32px] left-[745px] rounded-[8px] border border-solid border-[#c3d3e2]">
              <div className="relative w-[86px] h-[20px] top-[9px] left-[9px]">
                <div className="absolute top-0 left-[25px] font-sm-medium font-[number:var(--sm-medium-font-weight)] text-[#0f3659] text-[length:var(--sm-medium-font-size)] tracking-[var(--sm-medium-letter-spacing)] leading-[var(--sm-medium-line-height)] whitespace-nowrap [font-style:var(--sm-medium-font-style)]">
                  Exportar
                </div>
                <div className="absolute w-[16px] h-[16px] top-[2px] left-0">
                  <div className="relative w-[13px] h-[13px] top-px left-px">
                    <img className="absolute w-[11px] h-[11px] top-px left-px" alt="Union" src="/img/union-3.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute w-[160px] h-[66px] top-[23px] left-[31px]">
              <div className="absolute top-0 left-0 font-xl-semibold font-[number:var(--xl-semibold-font-weight)] text-primarydark-shade text-[length:var(--xl-semibold-font-size)] tracking-[var(--xl-semibold-letter-spacing)] leading-[var(--xl-semibold-line-height)] whitespace-nowrap [font-style:var(--xl-semibold-font-style)]">
                Relatório Diário
              </div>
              <div className="absolute top-[36px] left-[2px] font-base-regular font-[number:var(--base-regular-font-weight)] text-[#737791] text-[length:var(--base-regular-font-size)] tracking-[var(--base-regular-letter-spacing)] leading-[var(--base-regular-line-height)] whitespace-nowrap [font-style:var(--base-regular-font-style)]">
                Resumo
              </div>
            </div>
          </div>
        </div>
        <img
          className="absolute w-[591px] h-[348px] top-[246px] left-[1285px]"
          alt="Visitantes"
          src="/img/visitantes.png"
        />
        <div className="absolute w-[645px] h-[351px] top-[626px] left-[378px] bg-white rounded-[20px] border border-solid border-[#f8f9fa] shadow-[0px_4px_20px_#ededed80]">
          <div className="relative w-[591px] h-[297px] top-[25px] left-[27px]">
            <div className="absolute top-0 left-0 font-xl-semibold font-[number:var(--xl-semibold-font-weight)] text-primarydark-shade text-[length:var(--xl-semibold-font-size)] tracking-[var(--xl-semibold-letter-spacing)] leading-[var(--xl-semibold-line-height)] whitespace-nowrap [font-style:var(--xl-semibold-font-style)]">
              Clientes Convertidos
            </div>
            <div className="absolute w-[603px] h-[240px] top-[57px] left-0">
              <div className="absolute w-[213px] h-[16px] top-[224px] left-[208px]">
                <div className="absolute w-[86px] h-[16px] top-0 left-0 overflow-hidden">
                  <div className="absolute top-[-2px] left-[17px] [font-family:'Open_Sans',Helvetica] font-normal text-[#222b45] text-[12px] tracking-[0] leading-[16px] whitespace-nowrap">
                    Online
                  </div>
                  <div className="absolute w-[13px] h-[13px] top-px -left-px bg-[#3658d0] rounded-[6px]" />
                </div>
                <div className="absolute w-[87px] h-[16px] top-0 left-[126px] overflow-hidden">
                  <div className="absolute top-[-2px] left-[17px] [font-family:'Open_Sans',Helvetica] font-normal text-[#222b45] text-[12px] tracking-[0] leading-[16px] whitespace-nowrap">
                    Offline
                  </div>
                  <div className="w-[13px] h-[13px] top-px bg-[#03a691] absolute -left-px rounded-[6px]" />
                </div>
              </div>
              <div className="absolute w-[601px] h-[176px] top-0 left-0">
                <div className="absolute w-[601px] h-[176px] top-0 left-0">
                  <img
                    className="absolute w-[551px] h-px top-[136px] left-[38px]"
                    alt="Path copy"
                    src="/img/path-2-copy-5.svg"
                  />
                  <img
                    className="absolute w-[551px] h-px top-[167px] left-[38px]"
                    alt="Path"
                    src="/img/path-2-copy-5.svg"
                  />
                  <img
                    className="top-[104px] absolute w-[551px] h-px left-[38px]"
                    alt="Path copy"
                    src="/img/path-2-copy-5.svg"
                  />
                  <img
                    className="top-[72px] absolute w-[551px] h-px left-[38px]"
                    alt="Path copy"
                    src="/img/path-2-copy-5.svg"
                  />
                  <img
                    className="top-[40px] absolute w-[551px] h-px left-[38px]"
                    alt="Path copy"
                    src="/img/path-2-copy-5.svg"
                  />
                  <img
                    className="top-[8px] absolute w-[551px] h-px left-[38px]"
                    alt="Path copy"
                    src="/img/path-2-copy-5.svg"
                  />
                  <div className="absolute top-0 left-0 font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] whitespace-nowrap [font-style:var(--xs-regular-font-style)]">
                    25k
                  </div>
                  <div className="absolute top-[32px] left-0 font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] whitespace-nowrap [font-style:var(--xs-regular-font-style)]">
                    20k
                  </div>
                  <div className="absolute top-[96px] left-0 font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] whitespace-nowrap [font-style:var(--xs-regular-font-style)]">
                    10k
                  </div>
                  <div className="absolute top-[64px] left-0 font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] whitespace-nowrap [font-style:var(--xs-regular-font-style)]">
                    15k
                  </div>
                  <div className="absolute top-[128px] left-0 font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] whitespace-nowrap [font-style:var(--xs-regular-font-style)]">
                    5k
                  </div>
                  <div className="top-[160px] left-0 font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] leading-[var(--xs-regular-line-height)] absolute font-xs-regular tracking-[var(--xs-regular-letter-spacing)] whitespace-nowrap [font-style:var(--xs-regular-font-style)]">
                    0
                  </div>
                </div>
                <div className="absolute w-[28px] h-[88px] top-[79px] left-[63px]">
                  <div className="absolute w-[14px] h-[90px] -top-px -left-px bg-[#3658d0] rounded-[2px]" />
                  <div className="absolute w-[14px] h-[82px] top-[7px] left-[15px] bg-[#03a691] rounded-[2px]" />
                </div>
                <div className="absolute w-[28px] h-[108px] top-[59px] left-[145px]">
                  <div className="h-[110px] -top-px absolute w-[14px] -left-px bg-[#3658d0] rounded-[2px]" />
                  <div className="absolute w-[14px] h-[77px] top-[32px] left-[15px] bg-[#03a691] rounded-[2px]" />
                </div>
                <div className="h-[144px] top-[23px] left-[223px] absolute w-[28px]">
                  <div className="h-[38px] top-[107px] absolute w-[14px] -left-px bg-[#3658d0] rounded-[2px]" />
                  <div className="absolute w-[14px] h-[146px] -top-px left-[15px] bg-[#03a691] rounded-[2px]" />
                </div>
                <div className="h-[100px] top-[67px] left-[302px] absolute w-[28px]">
                  <div className="h-[102px] -top-px absolute w-[14px] -left-px bg-[#3658d0] rounded-[2px]" />
                  <div className="absolute w-[14px] h-[42px] top-[59px] left-[15px] bg-[#03a691] rounded-[2px]" />
                </div>
                <div className="h-[76px] top-[91px] left-[379px] absolute w-[28px]">
                  <div className="h-[78px] -top-px absolute w-[14px] -left-px bg-[#3658d0] rounded-[2px]" />
                  <div className="absolute w-[14px] h-[73px] top-[4px] left-[15px] bg-[#03a691] rounded-[2px]" />
                </div>
                <div className="h-[106px] top-[61px] left-[456px] absolute w-[28px]">
                  <div className="h-[108px] -top-px absolute w-[14px] -left-px bg-[#3658d0] rounded-[2px]" />
                  <div className="absolute w-[14px] h-[87px] top-[20px] left-[15px] bg-[#03a691] rounded-[2px]" />
                </div>
                <div className="h-[134px] top-[33px] left-[538px] absolute w-[28px]">
                  <div className="h-[136px] -top-px absolute w-[14px] -left-px bg-[#3658d0] rounded-[2px]" />
                  <div className="absolute w-[14px] h-[72px] top-[63px] left-[15px] bg-[#03a691] rounded-[2px]" />
                </div>
              </div>
              <div className="absolute w-[78px] top-[184px] left-[39px] font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] text-center tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] [font-style:var(--xs-regular-font-style)]">
                Domingo
              </div>
              <div className="absolute w-[78px] top-[184px] left-[118px] font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] text-center tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] [font-style:var(--xs-regular-font-style)]">
                Segunda
              </div>
              <div className="absolute w-[78px] top-[184px] left-[196px] font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] text-center tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] [font-style:var(--xs-regular-font-style)]">
                Terça
              </div>
              <div className="absolute w-[78px] top-[184px] left-[275px] font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] text-center tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] [font-style:var(--xs-regular-font-style)]">
                Quarta
              </div>
              <div className="absolute w-[78px] top-[184px] left-[354px] font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] text-center tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] [font-style:var(--xs-regular-font-style)]">
                Quinta
              </div>
              <div className="absolute w-[78px] top-[184px] left-[432px] font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] text-center tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] [font-style:var(--xs-regular-font-style)]">
                Sexta
              </div>
              <div className="absolute w-[78px] top-[184px] left-[511px] font-xs-regular font-[number:var(--xs-regular-font-weight)] text-primary-200 text-[length:var(--xs-regular-font-size)] text-center tracking-[var(--xs-regular-letter-spacing)] leading-[var(--xs-regular-line-height)] [font-style:var(--xs-regular-font-style)]">
                Sábado
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[422px] h-[351px] top-[626px] left-[1054px]">
          <div className="relative w-[420px] h-[351px] bg-white rounded-[20px] border border-solid border-[#f8f9fa] shadow-[0px_4px_20px_#ededed80]">
            <ElementUiElements
              className="!absolute !left-[25px] !w-[368px] !top-[257px]"
              rectangleClassName="!w-[370px]"
            />
            <div className="absolute w-[248px] h-[30px] top-[284px] left-[81px]">
              <div className="absolute w-[107px] h-[30px] top-0 left-[143px]">
                <div className="absolute top-0 left-[27px] font-base-regular font-[number:var(--base-regular-font-weight)] text-[#96a5b8] text-[length:var(--base-regular-font-size)] tracking-[var(--base-regular-letter-spacing)] leading-[var(--base-regular-line-height)] whitespace-nowrap [font-style:var(--base-regular-font-style)]">
                  Mês Atual
                </div>
                <div className="absolute w-[19px] h-[9px] top-[10px] left-0">
                  <div className="relative w-[22px] h-[9px] left-[-2px]">
                    <img className="absolute w-[22px] h-[3px] top-[3px] left-0" alt="Path" src="/img/path-4.svg" />
                    <div className="absolute w-[9px] h-[9px] top-0 left-[6px] bg-[#07e098] rounded-[4.5px]" />
                  </div>
                </div>
              </div>
              <div className="absolute w-[117px] h-[30px] top-0 left-0">
                <div className="absolute top-0 left-[27px] font-base-regular font-[number:var(--base-regular-font-weight)] text-[#96a5b8] text-[length:var(--base-regular-font-size)] tracking-[var(--base-regular-letter-spacing)] leading-[var(--base-regular-line-height)] whitespace-nowrap [font-style:var(--base-regular-font-style)]">
                  Último Mês
                </div>
                <div className="absolute w-[19px] h-[9px] top-[11px] left-0">
                  <div className="relative w-[22px] h-[9px] left-[-2px]">
                    <img className="absolute w-[22px] h-[3px] top-[3px] left-0" alt="Path" src="/img/path-4-1.svg" />
                    <div className="absolute w-[9px] h-[9px] top-0 left-[6px] bg-[#0094ff] rounded-[4.5px]" />
                  </div>
                </div>
              </div>
              <div className="absolute w-[3px] h-[26px] top-[5px] left-[127px] bg-[#bcc9d3]" />
            </div>
            <div className="absolute top-[24px] left-[21px] font-xl-semibold font-[number:var(--xl-semibold-font-weight)] text-primarydark-shade text-[length:var(--xl-semibold-font-size)] tracking-[var(--xl-semibold-letter-spacing)] leading-[var(--xl-semibold-line-height)] whitespace-nowrap [font-style:var(--xl-semibold-font-style)]">
              Satisfação do Cliente
            </div>
            <div className="absolute w-[398px] h-[167px] top-[76px] left-[11px]">
              <div className="absolute w-[398px] h-[167px] top-0 left-0">
                <div className="relative w-[400px] h-[168px] -top-px -left-px">
                  <img className="absolute w-[394px] h-[82px] top-[2px] left-[3px]" alt="Path" src="/img/path-6.svg" />
                  <img
                    className="absolute w-[392px] h-[165px] top-[3px] left-[4px]"
                    alt="Path"
                    src="/img/path-6-1.svg"
                  />
                  <div className="absolute w-[10px] h-[10px] top-0 left-[390px] bg-[#07e098] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-[77px] left-[336px] bg-[#07e098] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-[25px] left-[252px] bg-[#07e098] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-[58px] left-[184px] bg-[#07e098] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-[30px] left-[129px] bg-[#07e098] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-[44px] left-[73px] bg-[#07e098] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-[17px] left-0 bg-[#07e098] rounded-[5px]" />
                </div>
              </div>
              <div className="absolute w-[396px] h-[93px] top-[72px] left-0">
                <div className="w-[398px] h-[94px] relative -top-px -left-px">
                  <img className="absolute w-[394px] h-[57px] top-[5px] left-[3px]" alt="Path" src="/img/path-5.svg" />
                  <img
                    className="absolute w-[392px] h-[89px] top-[6px] left-[4px]"
                    alt="Path"
                    src="/img/path-5-1.svg"
                  />
                  <div className="absolute w-[10px] h-[10px] top-[5px] left-[388px] bg-[#0094ff] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-[38px] left-[336px] bg-[#0094ff] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-[38px] left-[252px] bg-[#0094ff] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-[55px] left-[184px] bg-[#0094ff] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-[55px] left-[129px] bg-[#0094ff] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-0 left-[73px] bg-[#0094ff] rounded-[5px]" />
                  <div className="absolute w-[10px] h-[10px] top-[24px] left-0 bg-[#0094ff] rounded-[5px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[373px] h-[349px] top-[1011px] left-[1506px]">
          <div className="relative w-[371px] h-[349px] bg-white rounded-[26px] border border-solid border-[#edf2f6] shadow-[0px_4px_20px_#ededed80]">
            <div className="absolute w-[368px] h-[77px] top-[256px] left-[2px]">
              <ElementUiElements className="!absolute !left-0 !w-[368px] !top-0" rectangleClassName="!w-[370px]" />
              <div className="absolute w-[210px] h-[50px] top-[27px] left-[78px]">
                <div className="absolute w-[91px] h-[50px] top-0 left-[123px]">
                  <div className="top-[30px] left-[20px] font-[number:var(--sm-medium-font-weight)] text-[#222b45] text-[length:var(--sm-medium-font-size)] leading-[var(--sm-medium-line-height)] absolute font-sm-medium tracking-[var(--sm-medium-letter-spacing)] whitespace-nowrap [font-style:var(--sm-medium-font-style)]">
                    635
                  </div>
                  <div className="absolute top-0 left-[20px] font-base-regular font-[number:var(--base-regular-font-weight)] text-[#96a5b8] text-[length:var(--base-regular-font-size)] tracking-[var(--base-regular-letter-spacing)] leading-[var(--base-regular-line-height)] whitespace-nowrap [font-style:var(--base-regular-font-style)]">
                    Serviços
                  </div>
                  <div className="w-[12px] h-[12px] top-[9px] bg-[#00e095] absolute -left-px rounded-[6px]" />
                </div>
                <div className="absolute w-[86px] h-[50px] top-0 left-0">
                  <div className="absolute top-[30px] left-[20px] font-sm-medium font-[number:var(--sm-medium-font-weight)] text-[#222b45] text-[length:var(--sm-medium-font-size)] tracking-[var(--sm-medium-letter-spacing)] leading-[var(--sm-medium-line-height)] whitespace-nowrap [font-style:var(--sm-medium-font-style)]">
                    1,135
                  </div>
                  <div className="absolute top-0 left-[20px] font-base-regular font-[number:var(--base-regular-font-weight)] text-[#96a5b8] text-[length:var(--base-regular-font-size)] tracking-[var(--base-regular-letter-spacing)] leading-[var(--base-regular-line-height)] whitespace-nowrap [font-style:var(--base-regular-font-style)]">
                    Volume
                  </div>
                  <div className="w-[12px] h-[12px] top-[9px] bg-[#0094ff] absolute -left-px rounded-[6px]" />
                </div>
                <div className="absolute w-[3px] h-[26px] top-[5px] left-[101px] bg-[#bcc9d3]" />
              </div>
            </div>
            <div className="absolute top-[24px] left-[25px] font-xl-semibold font-[number:var(--xl-semibold-font-weight)] text-primarydark-shade text-[length:var(--xl-semibold-font-size)] tracking-[var(--xl-semibold-letter-spacing)] leading-[var(--xl-semibold-line-height)] whitespace-nowrap [font-style:var(--xl-semibold-font-style)]">
              Volume de Serviços
            </div>
            <div className="absolute w-[12px] h-[139px] top-[107px] left-[47px]">
              <div className="relative w-[14px] h-[141px] -top-px -left-px bg-[#0094ff] rounded-[2px]">
                <div className="relative h-[81px] top-[60px] bg-[#00e095] rounded-[2px]" />
              </div>
            </div>
            <div className="h-[139px] top-[107px] left-[151px] absolute w-[12px]">
              <div className="relative w-[14px] h-[141px] -top-px -left-px bg-[#0094ff] rounded-[2px]">
                <div className="relative h-[38px] top-[103px] bg-[#00e095] rounded-[2px]" />
              </div>
            </div>
            <div className="h-[96px] top-[150px] left-[255px] absolute w-[12px]">
              <div className="w-[14px] h-[98px] bg-[#0094ff] rounded-[2px] relative -top-px -left-px">
                <div className="relative h-[38px] top-[60px] bg-[#00e095] rounded-[2px]" />
              </div>
            </div>
            <div className="h-[105px] top-[141px] left-[307px] absolute w-[12px]">
              <div className="relative w-[14px] h-[107px] -top-px -left-px bg-[#0094ff] rounded-[2px]">
                <div className="relative h-[64px] top-[43px] bg-[#00e095] rounded-[2px]" />
              </div>
            </div>
            <div className="h-[125px] top-[121px] left-[203px] absolute w-[12px]">
              <div className="relative w-[14px] h-[127px] -top-px -left-px bg-[#0094ff] rounded-[2px]">
                <div className="relative h-[43px] top-[84px] bg-[#00e095] rounded-[2px]" />
              </div>
            </div>
            <div className="absolute w-[12px] h-[168px] top-[78px] left-[99px]">
              <div className="relative w-[14px] h-[170px] -top-px -left-px bg-[#0094ff] rounded-[2px]">
                <div className="relative h-[91px] top-[79px] bg-[#00e095] rounded-[2px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[647px] h-[351px] top-[1009px] left-[378px]">
          <div className="relative w-[645px] h-[351px] bg-white rounded-[20px] border border-solid border-[#f8f9fa] shadow-[0px_4px_20px_#ededed80]">
            <div className="absolute w-[645px] h-[38px] top-[72px] -left-px">
              <div className="absolute w-[607px] h-[16px] top-0 left-[26px]">
                <div className="absolute top-0 left-0 [font-family:'Open_Sans',Helvetica] font-normal text-[#96a5b8] text-[13px] tracking-[0] leading-[16px] whitespace-nowrap">
                  #
                </div>
                <div className="top-0 left-[55px] [font-family:'Open_Sans',Helvetica] text-[#96a5b8] text-[13px] absolute font-normal tracking-[0] leading-[16px] whitespace-nowrap">
                  Cidades
                </div>
                <div className="absolute top-0 left-[307px] [font-family:'Open_Sans',Helvetica] font-normal text-[#96a5b8] text-[13px] tracking-[0] leading-[16px] whitespace-nowrap">
                  Popularidade
                </div>
                <div className="absolute top-0 left-[518px] [font-family:'Open_Sans',Helvetica] font-normal text-[#96a5b8] text-[13px] tracking-[0] leading-[16px] whitespace-nowrap">
                  Encaminadas
                </div>
              </div>
              <ElementUiElements className="!absolute !left-0 !w-[645px] !top-[17px]" rectangleClassName="!w-[647px]" />
            </div>
            <ElementUiElements
              className="!absolute !-left-px !w-[645px] !top-[150px]"
              rectangleClassName="!w-[647px]"
            />
            <div className="absolute top-[22px] left-[25px] font-xl-semibold font-[number:var(--xl-semibold-font-weight)] text-primarydark-shade text-[length:var(--xl-semibold-font-size)] tracking-[var(--xl-semibold-letter-spacing)] leading-[var(--xl-semibold-line-height)] whitespace-nowrap [font-style:var(--xl-semibold-font-style)]">
              Destinos mais escolhidos
            </div>
            <div className="absolute w-[583px] h-[24px] top-[118px] left-[25px]">
              <div className="absolute top-[3px] left-[55px] font-sm-regular font-[number:var(--sm-regular-font-weight)] text-greysblue-grey800 text-[length:var(--sm-regular-font-size)] tracking-[var(--sm-regular-letter-spacing)] leading-[var(--sm-regular-line-height)] whitespace-nowrap [font-style:var(--sm-regular-font-style)]">
                Lorem ipsum dolor
              </div>
              <div className="top-[3px] left-0 font-[number:var(--sm-regular-font-weight)] text-greysblue-grey800 text-[length:var(--sm-regular-font-size)] leading-[var(--sm-regular-line-height)] absolute font-sm-regular tracking-[var(--sm-regular-letter-spacing)] whitespace-nowrap [font-style:var(--sm-regular-font-style)]">
                01
              </div>
              <div className="absolute w-[50px] h-[24px] top-0 left-[533px] bg-colorslight-blue50 rounded-[8px] overflow-hidden border border-solid border-[#0094ff]">
                <div className="absolute top-[2px] left-[11px] [font-family:'Open_Sans',Helvetica] font-normal text-[#0094ff] text-[13px] text-center tracking-[0] leading-[16px] whitespace-nowrap">
                  45%
                </div>
              </div>
              <div className="absolute w-[180px] h-[4px] top-[11px] left-[307px]">
                <div className="relative w-[182px] h-[6px] -top-px -left-px bg-[#cde7ff] rounded-[8px]">
                  <div className="w-[142px] h-[6px] bg-[#0094ff] rounded-[8px]" />
                </div>
              </div>
            </div>
            <div className="absolute w-[583px] h-[24px] top-[179px] left-[25px]">
              <div className="absolute top-[3px] left-[55px] font-sm-regular font-[number:var(--sm-regular-font-weight)] text-greysblue-grey800 text-[length:var(--sm-regular-font-size)] tracking-[var(--sm-regular-letter-spacing)] leading-[var(--sm-regular-line-height)] whitespace-nowrap [font-style:var(--sm-regular-font-style)]">
                Lorem ipsum dolor sit
              </div>
              <div className="top-[3px] left-0 font-[number:var(--sm-regular-font-weight)] text-greysblue-grey800 text-[length:var(--sm-regular-font-size)] leading-[var(--sm-regular-line-height)] absolute font-sm-regular tracking-[var(--sm-regular-letter-spacing)] whitespace-nowrap [font-style:var(--sm-regular-font-style)]">
                02
              </div>
              <div className="bg-colorsgreen-50 border-[#00e48f] absolute w-[50px] h-[24px] top-0 left-[533px] rounded-[8px] overflow-hidden border border-solid">
                <div className="absolute top-[2px] left-[11px] [font-family:'Open_Sans',Helvetica] font-normal text-[#00e58f] text-[13px] text-center tracking-[0] leading-[16px] whitespace-nowrap">
                  29%
                </div>
              </div>
              <div className="absolute w-[180px] h-[4px] top-[11px] left-[307px]">
                <div className="relative w-[182px] h-[6px] -top-px -left-px bg-[#8bf9c6] rounded-[8px]">
                  <div className="w-[112px] h-[6px] bg-[#00e095] rounded-[8px]" />
                </div>
              </div>
            </div>
            <ElementUiElements
              className="!absolute !-left-px !w-[645px] !top-[211px]"
              rectangleClassName="!w-[647px]"
            />
            <div className="top-[240px] absolute w-[583px] h-[24px] left-[25px]">
              <div className="absolute top-[3px] left-[55px] font-sm-regular font-[number:var(--sm-regular-font-weight)] text-greysblue-grey800 text-[length:var(--sm-regular-font-size)] tracking-[var(--sm-regular-letter-spacing)] leading-[var(--sm-regular-line-height)] whitespace-nowrap [font-style:var(--sm-regular-font-style)]">
                Lorem ipsum dolor
              </div>
              <div className="top-[3px] left-0 font-[number:var(--sm-regular-font-weight)] text-greysblue-grey800 text-[length:var(--sm-regular-font-size)] leading-[var(--sm-regular-line-height)] absolute font-sm-regular tracking-[var(--sm-regular-letter-spacing)] whitespace-nowrap [font-style:var(--sm-regular-font-style)]">
                03
              </div>
              <div className="bg-supporting-colorviolet-shade border-[#884dff] absolute w-[50px] h-[24px] top-0 left-[533px] rounded-[8px] overflow-hidden border border-solid">
                <div className="absolute top-[2px] left-[11px] [font-family:'Open_Sans',Helvetica] font-normal text-[#884dff] text-[13px] text-center tracking-[0] leading-[16px] whitespace-nowrap">
                  18%
                </div>
              </div>
              <div className="absolute w-[180px] h-[4px] top-[11px] left-[307px]">
                <div className="relative w-[182px] h-[6px] -top-px -left-px bg-[#c5a8ff] rounded-[8px]">
                  <div className="w-[102px] h-[6px] bg-[#884dff] rounded-[8px]" />
                </div>
              </div>
            </div>
            <ElementUiElements
              className="!absolute !-left-px !w-[645px] !top-[272px]"
              rectangleClassName="!w-[647px]"
            />
            <div className="top-[301px] absolute w-[583px] h-[24px] left-[25px]">
              <div className="absolute top-[3px] left-[55px] font-sm-regular font-[number:var(--sm-regular-font-weight)] text-greysblue-grey800 text-[length:var(--sm-regular-font-size)] tracking-[var(--sm-regular-letter-spacing)] leading-[var(--sm-regular-line-height)] whitespace-nowrap [font-style:var(--sm-regular-font-style)]">
                Lorem ipsum dolor
              </div>
              <div className="top-[3px] left-0 font-[number:var(--sm-regular-font-weight)] text-greysblue-grey800 text-[length:var(--sm-regular-font-size)] leading-[var(--sm-regular-line-height)] absolute font-sm-regular tracking-[var(--sm-regular-letter-spacing)] whitespace-nowrap [font-style:var(--sm-regular-font-style)]">
                04
              </div>
              <div className="bg-supporting-coloryellow-shade border-[#ff8900] absolute w-[50px] h-[24px] top-0 left-[533px] rounded-[8px] overflow-hidden border border-solid">
                <div className="absolute top-[2px] left-[11px] [font-family:'Open_Sans',Helvetica] font-normal text-[#ff8900] text-[13px] text-center tracking-[0] leading-[16px] whitespace-nowrap">
                  25%
                </div>
              </div>
              <div className="absolute w-[180px] h-[4px] top-[11px] left-[307px]">
                <div className="relative w-[182px] h-[6px] -top-px -left-px bg-[#ffd4a3] rounded-[8px]">
                  <div className="w-[62px] h-[6px] bg-[#ff8e0c] rounded-[8px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[423px] h-[351px] top-[1009px] left-[1054px]">
          <div className="relative w-[420px] h-[351px] bg-white rounded-[20px] border border-solid border-[#f8f9fa] shadow-[0px_4px_20px_#ededed80]">
            <img className="absolute w-[380px] h-[229px] top-[96px] left-[14px]" alt="World" src="/img/world-1.png" />
            <div className="absolute top-[25px] left-[23px] font-xl-semibold font-[number:var(--xl-semibold-font-weight)] text-primarydark-shade text-[length:var(--xl-semibold-font-size)] tracking-[var(--xl-semibold-letter-spacing)] leading-[var(--xl-semibold-line-height)] whitespace-nowrap [font-style:var(--xl-semibold-font-style)]">
              Países mais&nbsp;&nbsp;buscados
            </div>
          </div>
        </div>
        <div className="absolute w-[373px] h-[351px] top-[626px] left-[1505px]">
          <div className="relative w-[371px] h-[351px]">
            <div className="w-[371px] h-[351px] absolute top-0 left-0">
              <img
                className="absolute w-[411px] h-[391px] top-[-16px] left-[-20px]"
                alt="Card team"
                src="/img/card-team.png"
              />
            </div>
            <div className="absolute top-[25px] left-[19px] font-xl-semibold font-[number:var(--xl-semibold-font-weight)] text-primarydark-shade text-[length:var(--xl-semibold-font-size)] tracking-[var(--xl-semibold-letter-spacing)] leading-[var(--xl-semibold-line-height)] whitespace-nowrap [font-style:var(--xl-semibold-font-style)]">
              Metas vs Real
            </div>
            <div className="absolute w-[334px] h-[157px] top-[68px] left-[19px]">
              <div className="relative h-[157px]">
                <div className="absolute w-[38px] h-[126px] top-[31px] left-0">
                  <div className="top-[110px] left-[9px] [font-family:'Poppins',Helvetica] text-primary-200 text-[10px] absolute font-normal tracking-[0] leading-[16px] whitespace-nowrap">
                    Jan
                  </div>
                  <div className="absolute w-[36px] h-[102px] top-0 left-0">
                    <div className="absolute w-[16px] h-[102px] top-0 left-[20px] bg-[#ffcf00] rounded-[4px]" />
                    <div className="absolute w-[16px] h-[79px] top-[23px] left-0 bg-[#49b48e] rounded-[4px]" />
                  </div>
                </div>
                <div className="absolute w-[38px] h-[117px] top-[40px] left-[50px]">
                  <div className="absolute top-[101px] left-[9px] [font-family:'Poppins',Helvetica] font-normal text-primary-200 text-[10px] tracking-[0] leading-[16px] whitespace-nowrap">
                    Fev
                  </div>
                  <div className="absolute w-[36px] h-[93px] top-0 left-0">
                    <div className="absolute w-[16px] h-[93px] top-0 left-[20px] bg-[#ffcf00] rounded-[4px]" />
                    <div className="absolute w-[16px] h-[68px] top-[24px] left-0 bg-[#49b48e] rounded-[4px]" />
                  </div>
                </div>
                <div className="absolute w-[38px] h-[140px] top-[17px] left-[100px]">
                  <div className="top-[124px] left-[9px] font-normal text-primary-200 text-[10px] absolute [font-family:'Poppins',Helvetica] tracking-[0] leading-[16px] whitespace-nowrap">
                    Mar
                  </div>
                  <div className="absolute w-[36px] h-[116px] top-0 left-0">
                    <div className="absolute w-[16px] h-[116px] top-0 left-[20px] bg-[#ffcf00] rounded-[4px]" />
                    <div className="absolute w-[16px] h-[58px] top-[58px] left-0 bg-[#49b48e] rounded-[4px]" />
                  </div>
                </div>
                <div className="absolute w-[36px] h-[117px] top-[40px] left-[150px]">
                  <div className="absolute top-[101px] left-[9px] [font-family:'Poppins',Helvetica] font-normal text-primary-200 text-[10px] tracking-[0] leading-[16px] whitespace-nowrap">
                    Abr
                  </div>
                  <div className="absolute w-[34px] h-[93px] top-0 left-0">
                    <div className="absolute w-[16px] h-[93px] top-0 left-[18px] bg-[#ffcf00] rounded-[4px]" />
                    <div className="absolute w-[16px] h-[79px] top-[14px] left-0 bg-[#49b48e] rounded-[4px]" />
                  </div>
                </div>
                <div className="absolute w-[38px] h-[157px] top-0 left-[198px]">
                  <div className="left-[8px] absolute top-[141px] [font-family:'Poppins',Helvetica] font-normal text-primary-200 text-[10px] tracking-[0] leading-[16px] whitespace-nowrap">
                    Mai
                  </div>
                  <div className="absolute w-[36px] h-[133px] top-0 left-0">
                    <div className="absolute w-[16px] h-[133px] top-0 left-[20px] bg-[#ffcf00] rounded-[4px]" />
                    <div className="absolute w-[16px] h-[96px] top-[37px] left-0 bg-[#49b48e] rounded-[4px]" />
                  </div>
                </div>
                <div className="absolute w-[38px] h-[157px] top-0 left-[248px]">
                  <div className="left-[6px] absolute top-[141px] [font-family:'Poppins',Helvetica] font-normal text-primary-200 text-[10px] tracking-[0] leading-[16px] whitespace-nowrap">
                    Jun
                  </div>
                  <div className="absolute w-[36px] h-[133px] top-0 left-0">
                    <div className="absolute w-[16px] h-[133px] top-0 left-[20px] bg-[#ffcf00] rounded-[4px]" />
                    <div className="absolute w-[16px] h-[96px] top-[37px] left-0 bg-[#49b48e] rounded-[4px]" />
                  </div>
                </div>
                <div className="absolute w-[38px] h-[157px] top-0 left-[298px]">
                  <div className="left-[8px] absolute top-[141px] [font-family:'Poppins',Helvetica] font-normal text-primary-200 text-[10px] tracking-[0] leading-[16px] whitespace-nowrap">
                    Jul
                  </div>
                  <div className="absolute w-[36px] h-[133px] top-0 left-0">
                    <div className="absolute w-[16px] h-[133px] top-0 left-[20px] bg-[#ffcf00] rounded-[4px]" />
                    <div className="absolute w-[16px] h-[96px] top-[37px] left-0 bg-[#49b48e] rounded-[4px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute w-[237px] h-[36px] top-[243px] left-[19px]">
              <div className="absolute top-[8px] left-[197px] font-sm-medium font-[number:var(--sm-medium-font-weight)] text-state-colorssuccess text-[length:var(--sm-medium-font-size)] text-right tracking-[var(--sm-medium-letter-spacing)] leading-[var(--sm-medium-line-height)] whitespace-nowrap [font-style:var(--sm-medium-font-style)]">
                8.823
              </div>
              <div className="absolute w-[37px] h-[34px] top-px left-[46px]">
                <div className="top-0 left-0 font-[number:var(--xs-semibold-font-weight)] text-greysblue-grey900 text-[length:var(--xs-semibold-font-size)] absolute font-xs-semibold tracking-[var(--xs-semibold-letter-spacing)] leading-[var(--xs-semibold-line-height)] whitespace-nowrap [font-style:var(--xs-semibold-font-style)]">
                  Real
                </div>
                <div className="absolute top-[18px] left-0 [font-family:'Poppins',Helvetica] font-normal text-[#737791] text-[10px] tracking-[0] leading-[16px] whitespace-nowrap">
                  Global
                </div>
              </div>
              <div className="bg-supporting-colorgreen-shade absolute w-[36px] h-[36px] top-0 left-0 rounded-[6px] overflow-hidden">
                <img className="absolute w-[29px] h-[29px] top-[4px] left-[4px]" alt="Boy" src="/img/boy.png" />
              </div>
            </div>
            <div className="absolute w-[237px] h-[36px] top-[294px] left-[19px]">
              <div className="absolute top-[10px] left-[197px] font-[number:var(--sm-medium-font-weight)] text-supporting-coloryellow text-[length:var(--sm-medium-font-size)] text-right leading-[var(--sm-medium-line-height)] whitespace-nowrap font-sm-medium tracking-[var(--sm-medium-letter-spacing)] [font-style:var(--sm-medium-font-style)]">
                12.122
              </div>
              <div className="absolute w-[57px] h-[34px] top-px left-[46px]">
                <div className="font-xs-semibold font-[number:var(--xs-semibold-font-weight)] text-greysblue-grey900 text-[length:var(--xs-semibold-font-size)] tracking-[var(--xs-semibold-letter-spacing)] leading-[var(--xs-semibold-line-height)] whitespace-nowrap absolute top-0 left-0 [font-style:var(--xs-semibold-font-style)]">
                  Meta
                </div>
                <div className="absolute top-[18px] left-0 [font-family:'Poppins',Helvetica] font-normal text-[#737791] text-[10px] tracking-[0] leading-[16px] whitespace-nowrap">
                  Comercial
                </div>
              </div>
              <div className="bg-[#fff4de] absolute w-[36px] h-[36px] top-0 left-0 rounded-[6px] overflow-hidden">
                <img
                  className="absolute w-[17px] h-[17px] top-[9px] left-[9px]"
                  alt="Ticket star"
                  src="/img/ticket-star-1.png"
                />
              </div>
            </div>
          </div>
        </div>
        <DivNav
          SVG="/img/svg-1.svg"
          className="!left-[320px] !absolute !top-0"
          navMenuDivisor="/img/divisor-2.svg"
          navMenuIcon="/img/icon-7.svg"
          navMenuText="Sessão Iniciada"
          navMenuVector="/img/vector-4.svg"
        />
      </div>
    </div>
  );
};
