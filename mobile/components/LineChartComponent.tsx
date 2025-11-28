import { Colors, GlobalStyles } from "@/constants/theme";
import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface LineChartComponentProps {
  data1?: number[];
  data2?: number[];
  data3?: number[];
  legend1?: string;
  legend2?: string;
  legend3?: string;
  color1?: string;
  color2?: string;
  color3?: string;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data1 = [100, 300, 200, 500, 400, 700, 600],
  data2 = [200, 400, 350, 600, 550, 800, 750],
  data3 = [150, 250, 300, 400, 450, 650, 700],
  legend1 = "Push up",
  legend2 = "Sit up",
  legend3 = "Squat",
  color1 = Colors.tertiary, // Cyan
  color2 = "#FF6B6B", // Red
  color3 = "#4ECDC4", // Teal
}) => {
  const screenWidth = Dimensions.get("window").width;

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: data1,
        color: (opacity = 1) => color1,
        strokeWidth: 3,
      },
      {
        data: data2,
        color: (opacity = 1) => color2,
        strokeWidth: 3,
      },
      {
        data: data3,
        color: (opacity = 1) => color3,
        strokeWidth: 3,
      },
    ],
    legend: [legend1, legend2, legend3],
  };

  const chartConfig = {
    backgroundColor: Colors.primary,
    backgroundGradientFrom: Colors.primary,
    backgroundGradientTo: Colors.primary,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(57, 62, 70, ${opacity})`,
    labelColor: (opacity = 1) => Colors.quarternary,
    style: {
      borderRadius: 0,
      fontFamily: GlobalStyles.fontRegular, // apply theme font where supported
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
    },
    propsForBackgroundLines: {
      stroke: "#393E46",
      strokeWidth: 1,
      opacity: 0.3,
    },
    // pass label text props (chart-kit forwards these to labels)
    propsForLabels: {
      fontFamily: GlobalStyles.fontRegular,
    },
  };

  return (
    <View style={{ width: "100%", paddingVertical: 20, alignItems: "center" }}>
      {/* Chart */}
      <LineChart
        data={chartData}
        width={screenWidth * 1}
        height={300}
        chartConfig={chartConfig}
        bezier
        style={{
          borderRadius: 0,
        }}
        withVerticalLines
        withHorizontalLines
        withInnerLines
        withOuterLines
        withVerticalLabels
        withHorizontalLabels
        fromZero
        segments={10}
        yAxisSuffix=""
        yAxisInterval={100}
      />
    </View>
  );
};

export default React.memo(LineChartComponent);
