import { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { GradientPinkBlue } from '@visx/gradient';
import { Bar, Pie } from '@visx/shape';

// render grow room chart information
const renderGraph = (): JSX.Element => {
  return (
    <svg
      width={300}
      height={300}
      style={{ backgroundColor: '#fff', borderRadius: '2em', margin: 'auto' }}
    >
      {/* <GradientPinkBlue
          id="pieFill"
          style={{ height: '100%', width: '100%' }}
        /> */}
      <Bar
        fill="visx-pie-gradient"
        width={60}
        height={300}
        x={50}
        stroke="#ffffff"
        strokeWidth={1}
        rx={5}
      />
    </svg>
  );
};
