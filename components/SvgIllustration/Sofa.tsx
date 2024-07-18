import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Sofa = ({ color }: SvgProps & Props): React.JSX.Element => (
  <Svg height={320} width={320} viewBox="0 0 512 512">
    <Path
      fill={color}
      d="M489.818 157.48c-13.675-13.691-32.689-22.19-53.564-22.19-1.349 0-2.682.034-4.006.107V99.401c.008-24.107-9.799-46.043-25.614-61.824-15.78-15.798-37.716-25.613-61.815-25.606H167.181c-24.107-.007-46.042 9.808-61.824 25.606-15.806 15.78-25.613 37.716-25.604 61.824v35.996a72.98 72.98 0 00-4.007-.107 75.59 75.59 0 00-53.563 22.19C8.5 171.147-.008 190.161 0 211.035a75.534 75.534 0 009.725 37.14c5.949 10.565 14.366 19.516 24.47 26.165.338 1.185.856 3.694 1.234 7.709.445 4.682.74 11.412.74 20.668v57.554a69.172 69.172 0 0020.29 48.972 69.086 69.086 0 0048.98 20.281h9.66l-5.595 70.504h29.661l20.142-70.504h193.378l20.158 70.504h29.653l-5.595-70.504h9.66c19.089.008 36.482-7.767 48.98-20.281a69.175 69.175 0 0020.29-48.972v-57.554c0-8.113.222-14.266.576-18.826.271-3.406.625-5.915.946-7.626.164-.848.329-1.481.461-1.925 10.095-6.648 18.512-15.6 24.47-26.165a75.603 75.603 0 009.717-37.14c-.001-20.874-8.501-39.888-22.183-53.555zM105.966 99.401c.008-16.949 6.828-32.163 17.928-43.278 11.116-11.1 26.337-17.929 43.286-17.937h177.638c16.949.008 32.162 6.837 43.286 17.937 11.1 11.115 17.912 26.329 17.928 43.278v42.192a75.497 75.497 0 00-23.334 15.888c-13.691 13.666-22.199 32.681-22.19 53.555v82.533c-.008 3.258-1.283 6.097-3.415 8.253-2.155 2.122-4.986 3.406-8.244 3.406H163.15c-3.258 0-6.089-1.284-8.244-3.406-2.131-2.156-3.406-4.994-3.423-8.253v-82.533c.017-20.874-8.499-39.889-22.182-53.555a75.497 75.497 0 00-23.334-15.888V99.401zm373.476 135.906a49.877 49.877 0 01-16.792 17.641 23.237 23.237 0 00-2.707 1.975 20.54 20.54 0 00-2.979 3.118c-1.653 2.148-2.871 4.6-3.759 7.191-1.35 3.924-2.139 8.302-2.724 14.226-.568 5.915-.88 13.386-.88 23.26v57.554c0 11.922-4.796 22.593-12.597 30.426-7.841 7.816-18.513 12.605-30.443 12.614H105.44c-11.93-.008-22.61-4.798-30.443-12.614-7.808-7.833-12.597-18.504-12.597-30.426v-57.554c0-8.598-.247-15.378-.675-20.89-.329-4.13-.765-7.561-1.349-10.564-.88-4.476-2.066-8.178-4.205-11.601-1.061-1.679-2.386-3.218-3.686-4.369a22.182 22.182 0 00-3.143-2.345 49.806 49.806 0 01-16.776-17.641c-4.048-7.183-6.344-15.402-6.352-24.272.008-13.716 5.529-26.016 14.513-35.018 9.002-8.985 21.294-14.497 35.018-14.505 13.724.008 26.016 5.52 35.017 14.505 8.977 9.002 14.497 21.302 14.514 35.018v82.533a37.776 37.776 0 0011.091 26.79 37.824 37.824 0 0026.782 11.091H348.85a37.827 37.827 0 0026.781-11.091 37.85 37.85 0 0011.1-26.79v-82.533c0-13.716 5.521-26.016 14.506-35.018 9.001-8.985 21.293-14.497 35.017-14.505 13.716.008 26.016 5.52 35.018 14.505 8.984 9.002 14.506 21.302 14.506 35.018 0 8.869-2.296 17.088-6.336 24.271z"
    />
    <Path
      fill={color}
      d="M205.383 137.725c6.968 0 12.629-5.661 12.629-12.621 0-6.978-5.661-12.63-12.629-12.63-6.97 0-12.622 5.652-12.622 12.63 0 6.961 5.652 12.621 12.622 12.621zM309.292 137.725c6.969 0 12.613-5.661 12.613-12.621 0-6.978-5.644-12.63-12.613-12.63-6.977 0-12.621 5.652-12.621 12.63-.001 6.961 5.643 12.621 12.621 12.621zM205.383 233.859c6.968 0 12.629-5.652 12.629-12.63 0-6.968-5.661-12.612-12.629-12.612-6.97 0-12.622 5.644-12.622 12.612 0 6.978 5.652 12.63 12.622 12.63zM309.292 233.859c6.969 0 12.613-5.652 12.613-12.63 0-6.968-5.644-12.612-12.613-12.612-6.977 0-12.621 5.644-12.621 12.612-.001 6.978 5.643 12.63 12.621 12.63z"
    />
  </Svg>
);

export default Sofa;