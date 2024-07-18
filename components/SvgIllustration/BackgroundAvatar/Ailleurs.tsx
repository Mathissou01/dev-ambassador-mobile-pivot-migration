import Svg, {G, Path, SvgProps} from "react-native-svg";
import { type MusicBackgroundProps } from "@/types";
import { hexToRgbA } from "@/utils/hexToRgbA";
import React from "react";

export default function Ailleurs({
  mainColor,
  secondColor,
  thirdColor,
  fourthColor,
  style,
                                   ...props
}: MusicBackgroundProps & SvgProps): React.JSX.Element {
  return (
    <Svg viewBox="0 0 900 900" style={style} {...props}>
      <G strokeLinejoin="bevel">
        <Path
          d="M484 415l38.5 37L485 342.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path
          d="M522.5 452l79-155.5-116.5 46z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path d="M689 454l-29-150.5-58.5-7z" fill={fourthColor} stroke={fourthColor} />
        <Path
          d="M522.5 452l166.5 2-87.5-157.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path
          d="M530.5 220L485 342.5l116.5-46z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path d="M530.5 220L479 241l6 101.5z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M343.5 302.5l20 189.5L484 415z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path d="M705 250l-174.5-30 71 76.5z" fill={thirdColor} stroke={thirdColor} />
        <Path d="M755.5 301.5L705 250l-45 53.5z" fill={fourthColor} stroke={fourthColor} />
        <Path
          d="M660 303.5l45-53.5-103.5 46.5z"
          fill={hexToRgbA(mainColor, 0.6)}
          stroke={hexToRgbA(mainColor, 0.6)}
        />
        <Path d="M522.5 452L681 539.5l8-85.5z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M689 454l66.5-152.5-95.5 2z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path
          d="M829.5 442l-74-140.5L689 454z"
          fill={hexToRgbA(mainColor, 0.6)}
          stroke={hexToRgbA(mainColor, 0.6)}
        />
        <Path d="M477 639l115.5-42.5-70-144.5z" fill={fourthColor} stroke={fourthColor} />
        <Path d="M522.5 452l70 144.5 88.5-57z" fill={thirdColor} stroke={thirdColor} />
        <Path
          d="M343.5 302.5L484 415l1-72.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path
          d="M484 415l-120.5 77 159-40z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path d="M479 241l-135.5 61.5 141.5 40z" fill={thirdColor} stroke={thirdColor} />
        <Path d="M363.5 492l47.5 95.5L522.5 452z" fill={secondColor} stroke={secondColor} />
        <Path d="M692 82.5l-167.5 30 6 107.5z" fill={mainColor} stroke={mainColor} />
        <Path d="M530.5 220l-6-107.5L479 241z" fill={thirdColor} stroke={thirdColor} />
        <Path d="M479 241l-168.5 7 33 54.5z" fill={fourthColor} stroke={fourthColor} />
        <Path
          d="M411 587.5l66 51.5 45.5-187z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path d="M424 92.5L310.5 248l168.5-7z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M264 470l57.5 102.5 42-80.5z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path
          d="M823.5 522.5l6-80.5L689 454z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path
          d="M755.5 301.5l31-111.5-81.5 60zM705 250L692 82.5 530.5 220z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path
          d="M900 198l-113.5-8-31 111.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path d="M363.5 492l-42 80.5 89.5 15z" fill={thirdColor} stroke={thirdColor} />
        <Path d="M411 587.5L326.5 646l150.5-7z" fill={fourthColor} stroke={fourthColor} />
        <Path
          d="M264 470l99.5 22-20-189.5z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path d="M750.5 651l73-128.5-142.5 17z" fill={fourthColor} stroke={fourthColor} />
        <Path d="M681 539.5l142.5-17L689 454z" fill={secondColor} stroke={secondColor} />
        <Path
          d="M750.5 651L681 539.5l3 151.5z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path
          d="M249 331.5L264 470l79.5-167.5zM557.5 769.5l10-83.5-90.5-47z"
          fill={fourthColor}
          stroke={fourthColor}
        />
        <Path d="M477 639l90.5 47 25-89.5z" fill={mainColor} stroke={mainColor} />
        <Path d="M264 252l-15 79.5 94.5-29z" fill={fourthColor} stroke={fourthColor} />
        <Path d="M524.5 112.5L424 92.5 479 241z" fill={thirdColor} stroke={thirdColor} />
        <Path
          d="M310.5 248l-46.5 4 79.5 50.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path d="M201 119.5L264 252l46.5-4z" fill={thirdColor} stroke={thirdColor} />
        <Path d="M786.5 190L692 82.5 705 250z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M524.5 112.5L469 0l-45 92.5z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path d="M684 691l-3-151.5-88.5 57z" fill={secondColor} stroke={secondColor} />
        <Path d="M567.5 686l116.5 5-91.5-94.5z" fill={fourthColor} stroke={fourthColor} />
        <Path d="M900 490V355.5L829.5 442z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M829.5 442l70.5-86.5-144.5-54z"
          fill={hexToRgbA(mainColor, 0.6)}
          stroke={hexToRgbA(mainColor, 0.6)}
        />
        <Path d="M210 648l116.5-2-5-73.5z" fill={thirdColor} stroke={thirdColor} />
        <Path d="M321.5 572.5l5 73.5 84.5-58.5z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M900 130.5l-117.5-30 4 89.5z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path
          d="M786.5 190l-4-89.5-90.5-18z"
          fill={hexToRgbA(mainColor, 0.6)}
          stroke={hexToRgbA(mainColor, 0.6)}
        />
        <Path d="M900 567.5V490l-76.5 32.5z" fill={fourthColor} stroke={fourthColor} />
        <Path
          d="M823.5 522.5L900 490l-70.5-48z"
          fill={hexToRgbA(mainColor, 0.6)}
          stroke={hexToRgbA(mainColor, 0.6)}
        />
        <Path
          d="M329.5 0l21 79.5 73.5 13z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path d="M424 92.5l-73.5-13-40 168.5z" fill={secondColor} stroke={secondColor} />
        <Path
          d="M639 0L524.5 112.5l167.5-30z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path
          d="M639 0h-70.5l-44 112.5z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path d="M771.5 0H639l53 82.5z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M568.5 0H469l55.5 112.5z"
          fill={hexToRgbA(mainColor, 0.6)}
          stroke={hexToRgbA(mainColor, 0.6)}
        />
        <Path
          d="M441 810.5l116.5-41L477 639z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path
          d="M567.5 686l-10 83.5L684 691z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path d="M900 713V567.5L750.5 651z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M900 355.5V198L755.5 301.5z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path d="M777.5 772.5l-27-121.5-66.5 40z" fill={mainColor} stroke={mainColor} />
        <Path d="M750.5 651L900 567.5l-76.5-45z" fill={fourthColor} stroke={fourthColor} />
        <Path d="M93.5 449L188 594.5 264 470z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M264 470l-76 124.5 133.5-22z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path d="M320.5 761.5l120.5 49L477 639z" fill={fourthColor} stroke={fourthColor} />
        <Path
          d="M123.5 341.5L264 470l-15-138.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path
          d="M900 198v-67.5L786.5 190z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path d="M782.5 100.5L771.5 0 692 82.5z" fill={thirdColor} stroke={thirdColor} />
        <Path d="M101.5 250L249 331.5l15-79.5z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M101.5 250l22 91.5 125.5-10z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path
          d="M188 594.5l22 53.5 111.5-75.5zM900 0H771.5l11 100.5z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path
          d="M350.5 79.5l-149.5 40L310.5 248z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path
          d="M213 0l-12 119.5 149.5-40z"
          fill={hexToRgbA(mainColor, 0.6)}
          stroke={hexToRgbA(mainColor, 0.6)}
        />
        <Path
          d="M469 0H329.5L424 92.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path d="M557.5 769.5l157.5 22L684 691z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M320.5 761.5L477 639l-150.5 7z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path
          d="M557.5 769.5l42 130.5L715 791.5z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path
          d="M210 648l110.5 113.5 6-115.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path
          d="M715 791.5l62.5-19L684 691z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path
          d="M188 594.5L129.5 711l80.5-63zM123.5 341.5L93.5 449 264 470z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path d="M201 119.5L101.5 250l162.5 2z" fill={thirdColor} stroke={thirdColor} />
        <Path
          d="M123.5 341.5L0 354.5 93.5 449zM777.5 772.5L900 713l-149.5-62z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path
          d="M0 485l76.5 57.5 17-93.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path
          d="M93.5 449l-17 93.5 111.5 52z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path d="M210 648l20 153.5 90.5-40z" fill={fourthColor} stroke={fourthColor} />
        <Path
          d="M329.5 0H213l137.5 79.5z"
          fill={hexToRgbA(mainColor, 0.6)}
          stroke={hexToRgbA(mainColor, 0.6)}
        />
        <Path d="M201 119.5l-93.5-38-6 168.5z" fill={fourthColor} stroke={fourthColor} />
        <Path d="M900 130.5V0L782.5 100.5z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M900 900V768.5l-122.5 4z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path
          d="M777.5 772.5l122.5-4V713z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path d="M487 900h112.5l-42-130.5z" fill={fourthColor} stroke={fourthColor} />
        <Path
          d="M715 791.5L750.5 900l27-127.5z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path
          d="M487 900l70.5-130.5-116.5 41z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path d="M360.5 900H487l-46-89.5z" fill={secondColor} stroke={secondColor} />
        <Path
          d="M129.5 711L230 801.5 210 648z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path
          d="M320.5 761.5l40 138.5 80.5-89.5z"
          fill={hexToRgbA(mainColor, 0.6)}
          stroke={hexToRgbA(mainColor, 0.6)}
        />
        <Path
          d="M213 0L107.5 81.5l93.5 38zM101.5 250L0 354.5l123.5-13z"
          fill={fourthColor}
          stroke={fourthColor}
        />
        <Path d="M76.5 542.5l53 168.5L188 594.5z" fill={thirdColor} stroke={thirdColor} />
        <Path
          d="M599.5 900H697l18-108.5z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path
          d="M230 801.5L360.5 900l-40-138.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path
          d="M0 205v149.5L101.5 250z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path d="M76.5 542.5L0 679l129.5 32z" fill={mainColor} stroke={mainColor} />
        <Path
          d="M697 900h53.5L715 791.5z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path
          d="M0 354.5V485l93.5-36z"
          fill={hexToRgbA(mainColor, 0.6)}
          stroke={hexToRgbA(mainColor, 0.6)}
        />
        <Path d="M0 485v59.5l76.5-2z" fill={secondColor} stroke={secondColor} />
        <Path
          d="M107.5 81.5L0 205l101.5 45z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path d="M213 0H105.5l2 81.5z" fill={mainColor} stroke={mainColor} />
        <Path d="M107.5 81.5L0 105.5V205z" fill={secondColor} stroke={secondColor} />
        <Path
          d="M129.5 711l3 103.5 97.5-13z"
          fill={hexToRgbA(mainColor, 0.7)}
          stroke={hexToRgbA(mainColor, 0.7)}
        />
        <Path
          d="M230 801.5L194 900h166.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path
          d="M0 806.5l132.5 8-3-103.5z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
        <Path
          d="M0 0v105.5l107.5-24z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path
          d="M750.5 900H900L777.5 772.5z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path
          d="M0 544.5V679l76.5-136.5z"
          fill={hexToRgbA(secondColor, 0.6)}
          stroke={hexToRgbA(secondColor, 0.6)}
        />
        <Path d="M69.5 900H194l-61.5-85.5z" fill={fourthColor} stroke={fourthColor} />
        <Path
          d="M132.5 814.5L194 900l36-98.5z"
          fill={hexToRgbA(secondColor, 0.2)}
          stroke={hexToRgbA(secondColor, 0.2)}
        />
        <Path d="M105.5 0H0l107.5 81.5z" fill={thirdColor} stroke={thirdColor} />
        <Path
          d="M0 679v127.5L129.5 711z"
          fill={hexToRgbA(mainColor, 0.6)}
          stroke={hexToRgbA(mainColor, 0.6)}
        />
        <Path d="M0 806.5L69.5 900l63-85.5z" fill={fourthColor} stroke={fourthColor} />
        <Path
          d="M0 806.5V900h69.5z"
          fill={hexToRgbA(thirdColor, 0.6)}
          stroke={hexToRgbA(thirdColor, 0.6)}
        />
      </G>
    </Svg>
  );
}
