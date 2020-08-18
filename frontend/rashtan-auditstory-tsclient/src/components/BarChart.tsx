import React from "react";
import { Chart, Axis, Tooltip, Interval } from "bizcharts";

const colors = [
  "#008FFB",
  "#00E396",
  "#FEB019",
  "#FF4560",
  "#775DD0",
  "#13D8AA",
  "#D7263D",
  "#F86624",
  "#7D02EB"
];

export const createColorSet = (data: any[], xField: string) => {
  const colorSet: { [id: string]: string } = {};
  data.forEach((d, i) => (colorSet[d[xField]] = colors[i]));

  return colorSet;
};

interface Props {
  data: any[];

  xField: string;
  yField: string;
  xTitle: string;
  yTitle: string;
}

const BarChart: React.FC<Props> = ({
  xTitle,
  yTitle,
  data,
  xField,
  yField,
  ...rest
}) => {
  const colorSet = createColorSet(data, xField);

  const scale: { [id: string]: any } = {};
  scale[xField] = { alias: xTitle };
  scale[yField] = { alias: yTitle };

  return (
    <Chart data={data} autoFit height={300} width={400} scale={scale} {...rest}>
      <Axis name={xField} title />
      <Axis name={yField} title />
      <Tooltip />
      <Interval
        position={`${xField}*${yField}`}
        color={[xField, (value: any) => colorSet[value]]}
      />
    </Chart>
  );
};

export default BarChart;
