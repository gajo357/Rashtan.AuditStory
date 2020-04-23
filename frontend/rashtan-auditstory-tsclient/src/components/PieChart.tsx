import React from "react";
import { Chart, Geom, Tooltip, Coord, Label } from "bizcharts";
import { createColorSet } from "./BarChart";

interface Props {
  data: any[];

  xField: string;
  yField: string;
}

const PieChart: React.FC<Props> = ({ data, xField, yField, ...rest }) => {
  const colorSet = createColorSet(data, xField);
  return (
    <Chart data={data} forceFit height={300} width={400} {...rest}>
      <Coord type="theta" />
      <Tooltip showTitle={false} />
      <Geom
        type="intervalStack"
        position={yField}
        color={[xField, (value) => colorSet[value]]}
      >
        <Label content={xField} />
      </Geom>
    </Chart>
  );
};

export default PieChart;
