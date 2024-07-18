import React from "react";
import Svg, { Polygon, Path, G, SvgProps } from "react-native-svg";
import { type MusicBackgroundProps } from "@/types";

export default function Voyage({
  mainColor,
  secondColor,
  thirdColor,
  fourthColor,
  style,
    ...props
}: MusicBackgroundProps & SvgProps): React.JSX.Element {
  return (
    <Svg
      id="Calque_1"
      x="0px"
      y="0px"
      viewBox="0 0 700 700"
      enableBackground="new 0 0 700 700"
      style={style}
      {...props}
    >
      <Polygon fill={mainColor} points="0,700 0.1,700 0.5,585.3 0.1,700 700,700 700,0 0,0 " />
      <Path
        fill={secondColor}
        d="M700.6,425.4c-8.1,3.2-16.5,7.7-25.1,13.4c-11.4-36.6-35.4-49.3-72-37.9c-19.8-28.2-43.8-32.4-72-12.6 c-19.6-28.4-43.6-32.9-72-13.3c-58.5-21.4-98.5-2.9-120,55.6c-16.7-63.3-56.7-86.6-120-69.9c-48.6-31.5-88.6-22.9-120,25.7 c-20.7-27.3-44.7-30.7-72-10c-10.1-1-19.1-0.7-27,0.8v208v115.6l700.2-0.5V425.4H700.6z"
      />
      <Path
        fill={fourthColor}
        d="M700.6,522.8c-0.4,0.9-0.8,1.8-1.1,2.8c-48.8-31.2-88.8-22.3-120,26.5c-8.2-39.8-32.2-55.6-72-47.4 c-20.4-59.6-60.4-79.3-120-58.9c-30.3-17.7-54.3-11.3-72,19c-29.1-18.9-53.1-13.9-72,15.2c-56.6-23.4-96.6-6.8-120,49.8 c-48.1-31.9-88.1-23.9-120,24.2c-1-1.4-2-2.7-3-4v35.3v115.6l700.2-0.5V522.8H700.6z"
      />
      <Path
        fill={thirdColor}
        d="M700.6,602.2c-7.7,0.4-16.1,2.5-25.1,6.3c-14.1-33.9-38.1-43.9-72-29.8c-55.5-24.4-95.5-8.9-120,46.6 c-36.1-43.9-76.1-47.7-120-11.6c-7-41-31-58-72-51c-45-35-85-30-120,15c-31.3-48.7-71.3-57.4-120-26.1c-15.7-21.4-32.7-34.3-51-38.5 v72.2v115.6l700.2-0.5v-98.2H700.6z"
      />
      <Path
        fill={fourthColor}
        d="M700.6,650.5c-8,1.8-16.4,4.7-25.1,8.5c-16.5-31.5-40.5-38.9-72-22.4c-52.4-27.6-92.4-15.3-120,37.1 c-7.1-40.9-31.1-57.7-72-50.6c-49-30.9-89-21.9-120,27.1c-39.9,1.7-63.2,18.5-70,50.6l479.1-0.4V650.5z"
      />
      <Path
        fill={fourthColor}
        d="M147.5,638.2c-18.5-29.5-42.5-35-72-16.5c-35.9-12.1-59.9-0.3-72,35.6c-1.1-0.7-2.2-1.4-3.2-2.1l-0.1,45.7 l219.7-0.2C215.6,664,191.6,643.1,147.5,638.2z"
      />
      <G fill="white">
        <Path
          fill="white"
          d="M627.5,299.9L627.5,299.9c2.6-1.3,4.2-3.9,4.3-6.8l1.3-29.4c0.1-2,1.3-3.9,3.1-4.9l9.9-5.3 c2.5-1.3,4.6-3.2,6.3-5.4l1.1-1.5c0.9-1.2,0-2.8-1.5-2.8h-1.8c-2.8,0.1-5.5,0.8-8,2l-10,5.1c-1.8,0.9-4,0.8-5.7-0.3l-24.9-15.8 c-2.4-1.5-5.5-1.7-8.1-0.3l0,0c10.5,7.1,19.9,17.8,23.7,22.3c0.5,0.6,0.3,1.6-0.4,1.9l0,0l-1.6-1.8c-0.8-0.9-2.1-1-3.1-0.3l-2.5,2 c-0.3,0.3-0.6,0.6-0.7,1.1l0,0c-0.1,0.4-0.4,0.8-0.7,1.1l-0.9,0.7l1.2-0.4c0.4-0.1,0.8-0.1,1.2,0l0.6,0.2l1,0.3l-2.1,1.1 c-1.4,0.7-2.6,1.6-3.8,2.6l-5.8,5.1l-6.4-5.8c-1.4-1.2-3.4-1.4-4.9-0.3l-2.3,1.6l9.3,8.3l-1.6,1.4c-0.3,0.2,0,0.7,0.3,0.6l2.1-0.5 l1.5,12.4l2.6-1c1.7-0.6,2.8-2.4,2.6-4.2l-1-8.6l7.4-1.8c1.5-0.4,2.9-0.9,4.3-1.6l2.1-1.1l-0.3,1l-0.2,0.6c-0.1,0.4-0.4,0.7-0.7,1 l-1,0.8l1.1-0.4c0.4-0.1,0.9-0.1,1.3,0l0,0c0.4,0.2,0.8,0.2,1.3,0l3.1-1c1.1-0.4,1.8-1.5,1.5-2.7l-0.6-2.4l0,0 c0.7-0.4,1.6,0,1.8,0.8C624.3,273.4,627.7,287.3,627.5,299.9z"
        />
        <G>
          <Path d="M65.5,195.3c-0.3-0.1-0.6-0.2-0.8-0.3c-1.2-1.1-2.5-2.2-3.7-3.3c-0.6-0.6-0.7-1.5-0.1-2.1 c0.5-0.6,1.4-0.6,2,0c1.2,1.1,2.4,2.2,3.6,3.3c0.6,0.6,0.7,1.5,0.1,2.1C66.4,195.2,65.9,195.3,65.5,195.3z" />
          <Path d="M170.6,244.7L170.6,244.7c-1-0.2-2-0.3-2.9-0.5c-2.2-0.4-4.5-0.8-6.7-1.3c-0.8-0.2-1.3-0.9-1.2-1.7 c0.1-0.7,0.9-1.2,1.7-1.1c2.2,0.5,4.4,0.9,6.7,1.3c0.9,0.2,1.9,0.3,2.9,0.5c0.8,0.2,1.4,0.8,1.2,1.6S171.4,244.8,170.6,244.7z  M180.3,245.8c-0.7-0.1-1.3-0.8-1.3-1.6c0.1-0.8,0.7-1.4,1.5-1.3c3.3,0.3,6.5,0.5,9.6,0.5c0.8,0,1.4,0.7,1.5,1.5 c0,0.8-0.6,1.4-1.4,1.4C187.1,246.3,183.7,246.2,180.3,245.8C180.3,245.9,180.3,245.9,180.3,245.8z M270.3,258.8L270.3,258.8 c-3.3-0.5-6.5-1.1-9.7-1.8c-0.8-0.2-1.3-0.9-1.2-1.7c0.1-0.7,0.9-1.2,1.7-1.1c3.1,0.7,6.4,1.2,9.5,1.7c0.8,0.1,1.4,0.8,1.3,1.6 C271.9,258.4,271.1,259,270.3,258.8z M151.5,240.6c-0.1,0-0.1,0-0.1,0c-3.2-0.8-6.4-1.7-9.5-2.7c-0.8-0.2-1.2-1.1-1-1.8 s1-1.2,1.8-0.9c3.1,1,6.2,1.8,9.3,2.6c0.8,0.2,1.3,1,1.1,1.7C153,240.3,152.2,240.7,151.5,240.6z M280,260.1 c-0.7-0.1-1.3-0.8-1.3-1.6c0.1-0.8,0.7-1.4,1.5-1.3c3.2,0.3,6.4,0.6,9.6,0.7c0.8,0,1.4,0.7,1.4,1.5s-0.7,1.4-1.4,1.4 C286.6,260.6,283.3,260.3,280,260.1L280,260.1z M251.2,254.8c-0.1,0-0.1,0-0.1,0c-3.2-0.8-6.4-1.8-9.5-2.9 c-0.8-0.2-1.2-1.1-0.9-1.8c0.2-0.7,1-1.2,1.8-0.9c3,1,6.2,2,9.3,2.8c0.8,0.2,1.2,1,1.1,1.7C252.7,254.5,252,255,251.2,254.8z  M199.6,246c-0.7-0.1-1.2-0.6-1.3-1.3c-0.1-0.8,0.4-1.5,1.2-1.6c3.3-0.3,6.4-0.8,9.3-1.6c0.8-0.2,1.6,0.3,1.8,1.1 c0.2,0.7-0.2,1.6-1,1.7c-3,0.7-6.3,1.2-9.7,1.6C199.9,246,199.8,246,199.6,246z M299.4,261c-0.7-0.1-1.2-0.7-1.3-1.4 c-0.1-0.8,0.6-1.5,1.4-1.5c3.2,0,6.4-0.2,9.6-0.4c0.8-0.1,1.5,0.6,1.6,1.3c0.1,0.8-0.5,1.5-1.3,1.6c-3.2,0.2-6.5,0.3-9.8,0.4 C299.5,261,299.4,261,299.4,261z M132.9,234.9c-0.1,0-0.2,0-0.3-0.1c-3.1-1.1-6.2-2.3-9.2-3.5c-0.7-0.3-1.2-1.2-0.9-1.9 c0.3-0.7,1.1-1.1,1.9-0.7c3,1.2,6,2.4,9.1,3.5c0.8,0.2,1.2,1.1,0.9,1.8C134.2,234.6,133.5,235,132.9,234.9z M232.6,248.6 c-0.1,0-0.2-0.1-0.4-0.1c-1.3-0.5-2.5-1.1-3.8-1.6c-1.8-0.7-3.6-1.6-5.3-2.4c-0.7-0.3-1.1-1.2-0.7-1.9c0.4-0.7,1.2-1,1.9-0.7 c1.7,0.8,3.4,1.6,5.1,2.3c1.2,0.5,2.5,1.1,3.8,1.6c0.7,0.3,1.2,1.2,0.9,1.9C233.9,248.4,233.3,248.7,232.6,248.6z M318.7,259.6 c-0.7-0.1-1.2-0.6-1.2-1.2c-0.1-0.8,0.4-1.5,1.2-1.6c3.2-0.4,6.3-0.9,9.4-1.5c0.8-0.2,1.6,0.3,1.7,1.2c0.1,0.7-0.3,1.6-1.1,1.6 c-3.2,0.6-6.4,1.1-9.6,1.5C318.9,259.7,318.8,259.7,318.7,259.6z M114.7,227.4c-0.1,0-0.3-0.1-0.4-0.2c-3-1.4-5.9-2.9-8.8-4.4 c-0.7-0.4-1-1.2-0.7-2c0.4-0.7,1.2-1,2-0.6c2.9,1.5,5.8,3,8.8,4.4c0.7,0.3,1.1,1.2,0.7,1.9C115.9,227.2,115.3,227.5,114.7,227.4z  M218.2,241.5c-0.5-0.1-0.9-0.4-1.2-0.8c-0.4-0.7,0-1.6,0.7-1.9c2.8-1.2,5.6-2.7,8-4.5c0.7-0.5,1.5-0.3,2,0.3 c0.5,0.7,0.4,1.6-0.3,2c-2.7,1.9-5.5,3.5-8.5,4.8C218.7,241.5,218.5,241.5,218.2,241.5z M215,240.1c-0.2,0-0.4-0.1-0.6-0.2 c-3-1.8-5.8-3.7-8.2-5.7c-0.7-0.5-0.8-1.4-0.3-2.1c0.5-0.6,1.4-0.7,2-0.2c2.4,1.9,5.1,3.7,8,5.4c0.7,0.4,0.9,1.3,0.6,2 C216.1,239.9,215.6,240.1,215,240.1z M337.6,256c-0.6-0.1-1.1-0.5-1.2-1.1c-0.2-0.7,0.2-1.6,1-1.7c1.4-0.4,3-0.7,4.4-1.2 c1.6-0.5,3.2-0.9,4.8-1.5c0.7-0.2,1.6,0.2,1.9,0.9s-0.1,1.6-0.9,1.8c-1.6,0.5-3.2,1-4.8,1.5c-1.4,0.4-3,0.8-4.5,1.2 C337.9,256,337.7,256,337.6,256z M97.3,218.2c-0.2,0-0.4-0.1-0.5-0.2c-2.8-1.6-5.6-3.4-8.4-5.2c-0.7-0.4-0.9-1.3-0.4-2 c0.4-0.7,1.3-0.8,2-0.4c2.7,1.7,5.5,3.5,8.3,5.1c0.7,0.4,0.9,1.3,0.6,2C98.4,218.1,97.8,218.3,97.3,218.2z M199.7,227.8 c-0.4-0.1-0.7-0.2-0.9-0.5c-2.3-2.6-4.3-5.4-5.8-8.3c-0.4-0.7-0.1-1.6,0.6-1.9c0.7-0.3,1.6-0.1,2,0.7c1.4,2.6,3.3,5.3,5.4,7.7 c0.5,0.6,0.5,1.5-0.1,2.1C200.6,227.8,200.2,227.9,199.7,227.8z M355.8,250.2c-0.5-0.1-0.9-0.4-1.2-0.9c-0.3-0.7,0-1.6,0.7-1.9 c2.9-1.2,5.9-2.4,8.7-3.8c0.7-0.3,1.6,0,2,0.7s0.1,1.6-0.7,1.9c-2.9,1.4-5.9,2.6-8.8,3.8C356.3,250.2,356,250.2,355.8,250.2z  M80.8,207.5c-0.2,0-0.4-0.2-0.7-0.2c-2.7-1.9-5.4-4-7.9-6c-0.7-0.5-0.7-1.4-0.3-2.1c0.5-0.6,1.4-0.7,2-0.2c2.5,2,5.1,4,7.7,5.9 c0.7,0.5,0.8,1.4,0.4,2C81.8,207.4,81.3,207.6,80.8,207.5z M233.6,230.5c-0.3-0.1-0.5-0.2-0.8-0.3c-0.6-0.5-0.7-1.5-0.1-2.1 c2.1-2.4,3.8-4.9,5.1-7.5c0.4-0.7,1.2-1,2-0.7c0.7,0.3,1,1.2,0.7,1.9c-1.4,2.9-3.2,5.6-5.4,8.2C234.5,230.4,234,230.6,233.6,230.5 z M373,242c-0.4-0.1-0.9-0.3-1.1-0.7c-0.4-0.7-0.2-1.6,0.5-2c2.7-1.5,5.4-3.1,8.1-4.9c0.7-0.4,1.6-0.2,2,0.4 c0.4,0.7,0.3,1.6-0.4,2c-2.7,1.7-5.4,3.4-8.2,4.9C373.6,242,373.3,242,373,242z M191.1,210.7c-0.7-0.1-1.2-0.6-1.2-1.2 c-0.4-2.7-0.4-5.4-0.1-8.1c0.1-0.7,0.2-1.3,0.3-2s0.9-1.2,1.7-1.1c0.8,0.2,1.3,0.9,1.2,1.7c-0.1,0.6-0.2,1.2-0.3,1.8 c-0.3,2.4-0.2,4.9,0.1,7.2c0.1,0.8-0.4,1.5-1.2,1.6C191.3,210.7,191.2,210.7,191.1,210.7z M241.5,213.5c-0.8-0.1-1.4-0.8-1.3-1.6 c0.2-2.1,0.2-4.1-0.1-6.2c-0.1-0.9-0.4-1.9-0.7-2.8c-0.2-0.7,0.2-1.6,0.9-1.7c0.8-0.2,1.6,0.2,1.8,1.1c0.3,1.1,0.6,2.1,0.7,3.2 c0.3,2.3,0.4,4.6,0.1,6.8C243,213.1,242.3,213.7,241.5,213.5L241.5,213.5z M389,231.7c-0.4-0.1-0.7-0.2-0.9-0.6 c-0.5-0.7-0.4-1.6,0.2-2c2.5-1.9,5-3.8,7.4-5.8c0.6-0.5,1.5-0.4,2,0.2c0.5,0.6,0.5,1.5-0.1,2.1c-2.4,2.1-4.9,4-7.5,5.9 C389.8,231.7,389.4,231.8,389,231.7z M194.7,192.3c-0.2,0-0.4-0.1-0.6-0.2c-0.7-0.4-0.9-1.3-0.4-2c1.9-2.9,4.3-5.2,7.3-6.8 c0.7-0.4,1.6-0.2,2,0.6c0.4,0.7,0.2,1.6-0.5,2c-2.5,1.5-4.7,3.5-6.4,6C195.8,192.2,195.2,192.4,194.7,192.3z M236.1,195.4 c-0.4-0.1-0.7-0.2-0.9-0.6c-1.9-2.4-4.2-4.6-6.8-6.4c-0.7-0.5-0.9-1.4-0.4-2c0.4-0.7,1.4-0.8,2-0.3c2.9,2,5.4,4.4,7.5,7 c0.5,0.7,0.4,1.6-0.2,2C236.9,195.4,236.6,195.5,236.1,195.4z M403.4,219.5c-0.3-0.1-0.6-0.2-0.9-0.4c-0.6-0.6-0.6-1.5,0-2.1 c2.2-2.2,4.4-4.4,6.4-6.8c0.5-0.6,1.4-0.7,2-0.1c0.6,0.5,0.7,1.5,0.1,2.1c-2.1,2.4-4.3,4.7-6.6,6.9 C404.3,219.4,403.9,219.5,403.4,219.5z M210.6,183.1c-0.7-0.1-1.2-0.7-1.3-1.3c-0.1-0.8,0.5-1.5,1.3-1.6c3.3-0.2,6.7,0.2,10.1,1.3 c0.8,0.2,1.2,1.1,1,1.8s-1,1.2-1.8,0.9c-3-1-6.2-1.4-9-1.2C210.9,183.1,210.8,183.1,210.6,183.1z M415.9,205.3 c-0.2,0-0.5-0.2-0.7-0.3c-0.7-0.5-0.8-1.4-0.3-2.1c1.9-2.5,3.7-5.1,5.4-7.7c0.4-0.7,1.3-0.8,2-0.4c0.7,0.4,0.9,1.3,0.4,2 c-1.7,2.6-3.5,5.3-5.5,7.8C417,205.1,416.5,205.3,415.9,205.3z M426.2,189.4c-0.1,0-0.4-0.1-0.5-0.2c-0.7-0.4-1-1.2-0.7-2 c1.5-2.8,2.9-5.6,4.1-8.4c0.3-0.7,1.2-1.1,1.9-0.7s1.1,1.2,0.8,1.9c-1.2,2.9-2.6,5.8-4.2,8.6C427.4,189.2,426.7,189.5,426.2,189.4 z M433.6,171.9c-0.1,0-0.1,0-0.3-0.1c-0.8-0.2-1.2-1.1-0.9-1.8c0.9-3,1.7-6.1,2.3-9.1c0.1-0.7,0.9-1.2,1.7-1.1 c0.8,0.2,1.3,1,1.2,1.7c-0.7,3.1-1.4,6.3-2.4,9.4C435,171.7,434.3,172,433.6,171.9z M437.3,153.2c-0.8-0.1-1.3-0.8-1.3-1.6 c0.2-3.1,0.3-6.3,0.1-9.4c-0.1-0.8,0.6-1.5,1.4-1.5s1.5,0.6,1.5,1.4c0.2,3.2,0.1,6.5-0.1,9.8C438.9,152.8,438.2,153.3,437.3,153.2 C437.4,153.2,437.3,153.2,437.3,153.2z M436.1,134.1c-0.6-0.1-1.1-0.6-1.2-1.2c-0.4-1.6-0.7-3.2-1.2-4.8c-0.4-1.4-0.9-2.9-1.4-4.3 c-0.3-0.7,0.1-1.6,0.8-1.8c0.7-0.2,1.6,0.2,1.9,0.9c0.6,1.5,1.1,3,1.5,4.4c0.5,1.6,0.9,3.4,1.3,5c0.1,0.7-0.4,1.6-1.1,1.6 C436.4,134.1,436.3,134.1,436.1,134.1z M341.8,107.4c-0.1,0-0.3-0.1-0.4-0.2c-0.7-0.3-1-1.2-0.7-1.9c1.4-2.9,3.2-5.6,5.5-8.2 c0.5-0.6,1.4-0.6,2-0.1c0.6,0.6,0.7,1.5,0.1,2.1c-2.1,2.3-3.8,4.9-5.1,7.5C343.1,107.3,342.5,107.5,341.8,107.4z M429.1,116 c-0.4-0.1-0.9-0.3-1.1-0.7c-1.6-2.7-3.5-5.4-5.5-7.8c-0.5-0.7-0.4-1.6,0.2-2c0.7-0.5,1.5-0.3,2,0.2c2.1,2.6,4.1,5.4,5.7,8.2 c0.4,0.7,0.2,1.6-0.5,2C429.7,116,429.4,116.1,429.1,116z M354.2,93.4c-0.4-0.1-0.7-0.2-1-0.7c-0.5-0.7-0.4-1.6,0.3-2 c2.7-1.8,5.6-3.4,8.7-4.6c0.7-0.3,1.6,0.1,1.9,0.8c0.4,0.7,0,1.6-0.7,1.9c-2.9,1.2-5.6,2.6-8.1,4.4 C354.9,93.4,354.6,93.4,354.2,93.4z M416.7,100.9c-0.3-0.1-0.6-0.2-0.8-0.4c-2.4-2.1-4.9-4.1-7.6-5.8c-0.7-0.4-0.9-1.3-0.4-2 c0.4-0.7,1.3-0.8,2-0.4c2.7,1.8,5.4,3.9,8,6.2c0.6,0.6,0.7,1.5,0.1,2.1C417.7,100.9,417.2,100.9,416.7,100.9z M371.8,86.3 c-0.6-0.1-1.1-0.6-1.2-1.2c-0.1-0.7,0.3-1.6,1.1-1.6c3.3-0.6,6.7-0.8,9.9-0.7c0.8,0,1.4,0.7,1.4,1.5s-0.7,1.4-1.4,1.4 c-3.1-0.1-6.2,0.1-9.3,0.7C372.2,86.4,372,86.4,371.8,86.3z M400.3,90.1c-0.1,0-0.3-0.1-0.4-0.1c-3-1.3-5.9-2.3-9-3 c-0.8-0.2-1.3-1-1.2-1.7c0.1-0.7,0.9-1.2,1.7-1.1c3.2,0.8,6.4,1.9,9.5,3.2c0.7,0.3,1.1,1.2,0.8,1.9 C401.6,89.9,401,90.2,400.3,90.1z" />
          <Path d="M339.4,121.4c-0.5-0.1-0.9-0.4-1.2-0.8c-0.7-1.4-1.4-2.7-2.3-4c-0.5-0.7-0.4-1.6,0.3-2 c0.6-0.4,1.4-0.3,1.9,0.2c0.1-0.7,0.8-1.2,1.5-1.1c0.8,0.1,1.4,0.8,1.3,1.6c-0.1,1.5-0.1,3,0,4.5c0.1,0.7-0.4,1.3-1.1,1.5 C339.7,121.4,339.5,121.4,339.4,121.4z" />
          <Path d="M468.3,284.8L468.3,284.8c-3.2-0.5-6.4-1.1-9.5-1.6c-0.8-0.2-1.4-0.9-1.2-1.6s0.9-1.3,1.7-1.2 c3.1,0.6,6.3,1.2,9.4,1.6c0.8,0.2,1.4,0.8,1.3,1.6C469.8,284.4,469.1,284.9,468.3,284.8z M477.7,286.2c-0.8-0.1-1.4-0.8-1.3-1.6 c0.1-0.8,0.8-1.3,1.6-1.2c3.1,0.4,6.3,0.7,9.5,1.1c0.8,0.1,1.4,0.8,1.4,1.6c-0.1,0.8-0.7,1.4-1.5,1.3 C484.2,286.9,481,286.6,477.7,286.2C477.8,286.2,477.7,286.2,477.7,286.2z M449.4,281.3L449.4,281.3c-3.2-0.7-6.4-1.4-9.5-2.1 c-0.8-0.2-1.3-1-1.2-1.7c0.1-0.7,0.9-1.2,1.7-1.1c3.1,0.7,6.2,1.5,9.3,2.1c0.8,0.2,1.3,0.9,1.2,1.7 C450.8,280.9,450.2,281.4,449.4,281.3z M496.8,288.1c-0.7-0.1-1.3-0.7-1.3-1.5s0.7-1.4,1.5-1.3c3.2,0.2,6.4,0.4,9.5,0.5 c0.8,0,1.4,0.7,1.4,1.5s-0.7,1.4-1.4,1.4c-3.2-0.2-6.4-0.3-9.6-0.6C496.9,288.1,496.9,288.1,496.8,288.1z M430.7,276.8 c-0.1,0-0.1,0-0.1,0c-3.1-0.8-6.2-1.7-9.3-2.6c-0.8-0.2-1.2-1.1-1-1.8c0.2-0.7,1-1.2,1.8-1c3,0.9,6.2,1.8,9.2,2.6 c0.8,0.2,1.2,1,1.1,1.7C432.2,276.5,431.4,276.9,430.7,276.8z M515.9,288.8c-0.7-0.1-1.2-0.7-1.3-1.4c0-0.8,0.6-1.4,1.4-1.4 c3.2,0,6.4,0,9.5,0c0.8,0,1.4,0.7,1.5,1.4c0.1,0.8-0.6,1.5-1.4,1.5c-3.2,0.1-6.4,0.1-9.6,0C516,288.8,516,288.8,515.9,288.8z  M412.3,271.2c-0.1,0-0.1,0-0.2-0.1c-3-1-6.2-2.1-9.1-3.2c-0.8-0.2-1.2-1.1-0.9-1.8c0.2-0.7,1.1-1.2,1.8-0.8c3,1.1,6,2.1,9,3.1 c0.8,0.2,1.2,1.1,1,1.8C413.6,270.9,413,271.4,412.3,271.2z M534.9,288.5c-0.7-0.1-1.2-0.7-1.3-1.3c-0.1-0.8,0.5-1.5,1.3-1.5 c3.1-0.2,6.3-0.3,9.5-0.6c0.8-0.1,1.5,0.5,1.6,1.3s-0.5,1.5-1.3,1.6c-3.2,0.2-6.4,0.4-9.6,0.6 C535.1,288.6,535.1,288.6,534.9,288.5z M394.2,264.7c-0.1,0-0.2-0.1-0.4-0.1c-3-1.2-6-2.4-9-3.7c-0.7-0.3-1.1-1.2-0.8-1.9 s1.2-1.1,1.9-0.7c2.9,1.2,5.9,2.5,8.9,3.6c0.7,0.3,1.2,1.2,0.9,1.9C395.5,264.4,394.8,264.8,394.2,264.7z M553.9,287.1 c-0.7-0.1-1.2-0.6-1.2-1.2c-0.1-0.8,0.4-1.5,1.2-1.6c3.1-0.3,6.3-0.7,9.4-1.2c0.8-0.1,1.5,0.4,1.7,1.2c0.1,0.8-0.4,1.5-1.2,1.6 c-3.1,0.4-6.3,0.8-9.5,1.2C554.2,287.1,554,287.1,553.9,287.1z M376.4,257c-0.1,0-0.3-0.1-0.4-0.1c-2.9-1.3-5.9-2.8-8.8-4.2 c-0.7-0.3-1-1.2-0.7-1.9c0.4-0.7,1.2-1,2-0.7c2.8,1.4,5.8,2.8,8.7,4.1c0.7,0.3,1.1,1.2,0.8,1.9C377.7,256.9,377,257.2,376.4,257z  M359.1,248.5c-0.1,0-0.4-0.1-0.5-0.2c-2.8-1.6-5.7-3.1-8.5-4.7c-0.7-0.4-0.9-1.3-0.6-2c0.4-0.7,1.2-0.9,2-0.5 c2.7,1.6,5.6,3.1,8.4,4.7c0.7,0.4,1,1.2,0.7,2C360.3,248.3,359.6,248.5,359.1,248.5z M342.3,238.8c-0.2,0-0.4-0.1-0.6-0.2 c-2.7-1.7-5.5-3.5-8.2-5.2c-0.7-0.4-0.9-1.3-0.4-2c0.4-0.7,1.3-0.8,2-0.4c2.7,1.7,5.4,3.5,8.1,5.2c0.7,0.4,0.9,1.3,0.5,2 C343.4,238.7,342.9,238.9,342.3,238.8z M326.1,228.2c-0.2,0-0.4-0.1-0.7-0.2c-2.7-1.9-5.3-3.8-7.9-5.7c-0.7-0.5-0.8-1.4-0.4-2 c0.4-0.7,1.4-0.7,2-0.2c2.5,1.9,5.1,3.8,7.8,5.7c0.7,0.5,0.9,1.4,0.4,2C327.2,228.1,326.6,228.3,326.1,228.2z M310.7,216.6 c-0.2,0-0.5-0.2-0.7-0.3c-1-0.8-2-1.6-3-2.5c-1.5-1.2-3-2.5-4.4-3.7c-0.7-0.5-0.7-1.4-0.2-2.1c0.5-0.6,1.4-0.7,2-0.1 c1.4,1.2,2.9,2.5,4.3,3.7c1,0.8,2,1.6,3,2.5c0.7,0.5,0.7,1.4,0.3,2.1C311.6,216.5,311.1,216.7,310.7,216.6z M296,204 c-0.3-0.1-0.6-0.2-0.8-0.4c-2.5-2.3-4.8-4.6-6.9-6.9c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.5,1.5-0.5,2,0.1c2.1,2.2,4.4,4.5,6.8,6.8 c0.6,0.6,0.7,1.5,0.1,2.1C296.9,203.9,296.4,204.1,296,204z M282.7,189.9c-0.4-0.1-0.7-0.2-0.9-0.6c-2.1-2.6-4.1-5.3-5.9-7.8 c-0.4-0.7-0.3-1.6,0.4-2s1.6-0.2,2,0.4c1.7,2.6,3.6,5.1,5.7,7.6c0.5,0.7,0.4,1.6-0.2,2C283.5,189.8,283.1,190,282.7,189.9z  M271.9,173.9c-0.4-0.1-0.9-0.3-1.1-0.8c-1.6-3-2.9-5.9-4.1-8.9c-0.3-0.7,0.1-1.6,0.9-1.8c0.7-0.2,1.6,0.2,1.9,0.9 c1.1,2.9,2.4,5.8,3.9,8.6c0.4,0.7,0.1,1.6-0.6,1.9C272.5,173.9,272.2,174,271.9,173.9z M265.4,156c-0.6-0.1-1.2-0.6-1.2-1.2 c-0.7-3.2-1-6.4-1.1-9.6c0-0.8,0.6-1.4,1.4-1.4s1.4,0.7,1.5,1.5c0.1,3,0.4,6.2,1.1,9.1c0.1,0.8-0.4,1.5-1.2,1.6 C265.6,156,265.5,156,265.4,156z M264.8,137.2L264.8,137.2c-0.9-0.2-1.4-0.9-1.3-1.6c0.5-3.2,1.3-6.3,2.4-9.3 c0.3-0.7,1.1-1.1,1.9-0.8c0.7,0.3,1.2,1.2,0.9,1.9c-1,2.8-1.7,5.8-2.2,8.8C266.3,136.9,265.6,137.3,264.8,137.2z M271.2,119.8 c-0.2,0-0.4-0.1-0.6-0.2c-0.7-0.4-0.9-1.3-0.4-2c1.7-2.7,3.8-5.2,6.2-7.4c0.6-0.6,1.5-0.5,2,0.1c0.6,0.6,0.6,1.5,0,2.1 c-2.2,2.1-4.1,4.4-5.7,6.9C272.3,119.6,271.7,119.9,271.2,119.8z M284.7,107.1c-0.4-0.1-0.9-0.3-1.1-0.7c-0.4-0.7-0.1-1.6,0.5-2 c2.7-1.5,5.8-2.6,9.1-3.5c0.8-0.2,1.6,0.2,1.8,1.1c0.2,0.7-0.2,1.6-1,1.7c-3,0.7-5.9,1.8-8.5,3.2 C285.3,107.1,285,107.2,284.7,107.1z M330,110.5c-0.2,0-0.4-0.2-0.7-0.2c-2.4-1.7-5.1-3.2-8.1-4.4c-0.7-0.3-1.2-1.2-0.9-1.9 c0.3-0.7,1.1-1.1,1.9-0.8c3.3,1.3,6.2,2.9,8.8,4.8c0.7,0.5,0.8,1.4,0.4,2C331.1,110.3,330.6,110.6,330,110.5z M302.8,102.6 c-0.7-0.1-1.2-0.7-1.3-1.4c-0.1-0.8,0.6-1.5,1.4-1.5c3.3-0.1,6.6,0.2,9.8,0.7c0.8,0.2,1.4,0.9,1.2,1.6c-0.1,0.7-0.8,1.3-1.6,1.2 l0,0c-3-0.5-6.2-0.7-9.3-0.7C303,102.6,302.9,102.6,302.8,102.6z" />
          <Path d="M572.8,284.5c-0.6-0.1-1.1-0.6-1.2-1.2c-0.1-0.7,0.4-1.6,1.1-1.6c1.6-0.2,3.1-0.6,4.7-0.8 c0.8-0.2,1.6,0.3,1.7,1.2c0.1,0.7-0.3,1.6-1.1,1.6c-1.6,0.3-3.2,0.6-4.8,0.8C573.1,284.5,572.9,284.5,572.8,284.5z" />
        </G>
      </G>
    </Svg>
  );
}
