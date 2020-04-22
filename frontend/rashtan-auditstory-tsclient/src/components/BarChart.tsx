import React from "react";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";

interface Props {
  data: any[];

  xField: string;
  yField: string;
  xTitle: string;
  yTitle: string;
}

const colors = [
  "#008FFB",
  "#00E396",
  "#FEB019",
  "#FF4560",
  "#775DD0",
  "#13D8AA",
  "#D7263D",
  "#F86624",
  "#7D02EB",
];

const BarChart: React.FC<Props> = ({
  xTitle,
  yTitle,
  data,
  xField,
  yField,
}) => {
  const colorSet: { [id: string]: string } = {};
  data.forEach((d, i) => (colorSet[d[xField]] = colors[i]));

  const scale: { [id: string]: any } = {};
  scale[xField] = { alias: xTitle };
  scale[yField] = { alias: yTitle };

  return (
    <Chart data={data} forceFit height={300} scale={scale}>
      <Axis name={xField} title />
      <Axis name={yField} title />
      <Tooltip />
      <Geom
        type="interval"
        position={`${xField}*${yField}`}
        color={[xField, (value) => colorSet[value]]}
      />
    </Chart>
  );
};

export default BarChart;
