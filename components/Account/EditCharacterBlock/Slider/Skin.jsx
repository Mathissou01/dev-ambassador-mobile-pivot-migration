import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      data-name="Calque 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 284.88 383.85"
      stroke={props.color || "black"}
      {...props}
    >
      <Path
        d="M1062.71 348.08c-1.5 1.08-3 1.29-4.5 0z"
        transform="translate(-817.65 -348.08)"
        fill={props.color || "black"}
        stroke={props.color || "black"}
      />
      <Path
        d="M1067.2 348.08c-1.25 1.2-2.5 1.05-3.74 0z"
        transform="translate(-817.65 -348.08)"
        fill={props.color || "black"}
        stroke={props.color || "black"}
      />
      <Path
        d="M848.94 731.28a4.47 4.47 0 013.85.65H849a1 1 0 00-.06-.65zM857.29 731.93a4.47 4.47 0 013.85-.65.92.92 0 00-.1.65z"
        transform="translate(-817.65 -348.08)"
        fill={props.color || "black"}
        stroke={props.color || "black"}
      />
      <Path
        d="M1075.3 350.09c-2.41-.8-4.9-1.34-7.35-2h-.75a4.05 4.05 0 01-3.74 0h-.75a5.76 5.76 0 01-4.5 0h-.75c-13.21 2.52-22.32 11.18-31.16 20.44-8.54 8.94-17.54 17.44-26.13 26.34-2.27 2.35-3.42 2.08-5.46-.12-4.33-4.67-8.93-9.1-13.47-13.56-4.33-4.24-8.12-4.29-12.36-.1q-10.54 10.4-20.94 20.93c-4 4.09-4 8 0 12.08 4.55 4.64 9 9.34 13.83 13.73 2.34 2.15 2.12 3.29 0 5.46q-51.66 51.44-103.18 103a20.85 20.85 0 00-5.63 9.06c-2.83 9.68-5.4 19.51-14.09 26a2.74 2.74 0 00-.44.6c-6.75 9.46-7.93 19.6-2.77 30s14 15.7 25.57 15.93a27.3 27.3 0 0021.28-9.34c3.39-3.69 7.14-6.48 12.11-7.49 11.47-2.31 19.91-9.05 28-17.29 31.33-31.93 63.16-63.35 94.7-95 2.25-2.26 3.39-2.2 5.47.06 4.23 4.59 8.77 8.9 13.2 13.3 4.63 4.57 8.36 4.65 12.9.16q10.26-10.14 20.4-20.42c4.37-4.43 4.37-8.19 0-12.63-4.55-4.64-9.06-9.32-13.82-13.73-2.11-2-1.92-3 0-4.93 12.34-12.21 25-24.19 36.7-37 19.4-21.02 10.3-54.46-16.87-63.48zm-68.16 127.74q-20.52 20.26-40.81 40.74a5.4 5.4 0 01-4.14 2c-21.59-.07-43.19 0-64.78-.06a4.78 4.78 0 01-1-.2l-.76-.93a17 17 0 003-2q36.85-36.75 73.58-73.63c2.23-2.25 3.32-2.16 5.47 0q14.49 14.88 29.37 29.4c1.93 1.85 1.93 2.85.07 4.68zm45.56-.6a147.1 147.1 0 00-8.47 8.47c-1.39 1.5-2.18 1.31-3.56-.06q-37.8-38-75.74-75.76c-1.32-1.31-1.74-2.11-.16-3.56 2.94-2.69 5.68-5.61 8.51-8.43.51-.51 1.07-1 1.72-1.55.71.63 1.27 1.1 1.78 1.61q37.89 37.88 75.78 75.73c1.31 1.32 1.7 2.12.14 3.55zm28.61-73.93c-12.11 12.78-24.8 25-37.2 37.52-1.27 1.28-2 1.27-3.28 0q-15.43-15.57-31-31c-1.41-1.4-1.38-2.17 0-3.55 12.25-12.13 24.4-24.37 36.65-36.5 4.65-4.6 10.44-6.64 17.8-6.72 9.18.69 16.9 5.09 21 14.46s3.02 18.41-3.97 25.79zM890.77 684.94c-6.42-20.15-18-37.65-29.85-54.9-3.07-4.47-8.91-4.27-12 .28-11.19 16.36-21.65 33.12-28.8 51.76-9.05 23.59 8.35 46.48 28.84 49.2 1.2.71 2.68-.24 3.85.65h4.5c1.17-.89 2.65.06 3.85-.65 21.23-2.48 36.23-25.55 29.61-46.34zm-22.72 27.78a22.16 22.16 0 01-26.18-.11 21.19 21.19 0 01-8.11-24.08c4.2-12.47 11-23.62 17.72-34.85 1-1.71 2.13-3.35 3.59-5.63 8.25 13.4 16.37 26.2 21.28 40.66 3.02 8.88-.47 18.46-8.3 24.01z"
        transform="translate(-817.65 -348.08)"
        fill={props.color || "black"}
        stroke={props.color || "black"}
      />
    </Svg>
  )
}

export default SvgComponent