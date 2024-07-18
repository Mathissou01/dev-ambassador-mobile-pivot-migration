import React, { useRef, useState } from 'react';
import Animated, { Easing, useAnimatedProps, interpolate } from 'react-native-reanimated';
import { Path } from 'react-native-svg';

interface AnimatedSloganProps {
  d: string;
  progress: Animated.SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ['#E20613', '#FF8D00', '#0086CD', '#B1A285'];
// Animation epaisseur de trait
const AnimatedSlogan = ({ d, progress }: AnimatedSloganProps) => {
  const stroke = colors[Math.round(Math.random() * (colors.length - 1))];
  const [length, setLength] = useState(0);
  const ref = useRef<typeof AnimatedPath>(null);
  const animatedBGProps = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.bezier(0.61, 1, 0.88, 1).factory()(progress.value),
    fillOpacity: progress.value,
  }));
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.bezier(0.37, 0, 0.63, 1).factory()(progress.value),
  }));
  // Animation rempplissage avec delay
  const delay = 1000; // Delay in milliseconds (0.5 seconds)
  const animatedFillProps = useAnimatedProps(() => {
    if (progress.value < delay / 3000) {
      return {
        fillOpacity: 0, // Set initial fill opacity to 0
      };
    }

    const duration = 2000; // Duration in milliseconds (3 seconds)
    const fillOpacity = interpolate(progress.value - delay / 3000, [0, 1], [0, 0.8], 'clamp');
    const animatedOpacity = interpolate(progress.value - delay / 3000, [0, 1], [0, 1], 'clamp');
    const timeElapsed = duration * animatedOpacity;
    const fillOpacityWithTime = Math.min(fillOpacity, timeElapsed / duration);

    return {
      fillOpacity: fillOpacityWithTime,
    };
  });
  return (
    <>
      {/* Paramètre des traits du svg */}
      <AnimatedPath
        animatedProps={animatedBGProps}
        stroke={stroke}
        d={d}
        strokeWidth={3}
        strokeDasharray={length}
        fill={'#000'}
      />
      <AnimatedPath
        animatedProps={animatedProps}
        onLayout={() => {
          if (ref.current) {
            setLength(ref.current.getTotalLength());
          }
        }}
        ref={ref}
        d={d}
        stroke={'#000'}
        strokeWidth={3}
        strokeDasharray={length}
        fill="none"
      />
      <AnimatedPath
        animatedProps={animatedFillProps}
        d={d}
        fill={'#000'}
        fillOpacity={0} // Set initial fill opacity to 0
      />
    </>
  );
};
export default AnimatedSlogan;
