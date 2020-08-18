import React from "react";
import {
  Chart,
  Tooltip,
  Coordinate,
  Axis,
  Interval,
  Interaction
} from "bizcharts";
import { createColorSet } from "./BarChart";

interface Props {
  data: any[];

  xField: string;
  yField: string;
}

const PieChart: React.FC<Props> = ({ data, xField, yField, ...rest }) => {
  const colorSet = createColorSet(data, xField);
  return (
    <Chart data={data} autoFit height={300} width={400} {...rest}>
      <Coordinate type="theta" />
      <Tooltip showTitle={false} />
      <Axis visible={false} />

      <Interval
        position={yField}
        color={[xField, value => colorSet[value]]}
        adjust="stack"
        style={{
          lineWidth: 1,
          stroke: "#fff"
        }}
        label={[
          "count",
          {
            content: data => {
              return `${data.item}: ${data.percent * 100}%`;
            }
          }
        ]}
      />
      <Interaction type="element-single-selected" />
    </Chart>
  );
};

export default PieChart;
