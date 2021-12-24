import ChartBar from './ChartBar';
import './Chart.css';

const Chart = props => {
  // The components that use the Chart component pass how many data points (bars) with the values they want to display
  // The chart fill will be calculated based on the max value of the data points
  const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
  const totalMaximun = Math.max(...dataPointValues);
  return (
    <div className="chart">
      {props.dataPoints.map(dataPoint => (
        <ChartBar
          key={dataPoint.label} // Each ChartBar will have a unique label
          value={dataPoint.value}
          maxValue={totalMaximun}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
