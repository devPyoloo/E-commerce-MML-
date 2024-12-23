import ReactApexChart from 'react-apexcharts';
import api from '../utils/apiInterceptors';
import { useQuery } from '@tanstack/react-query';

const fetchMonthlyRevenueData = async () => {
  try {
    const { data } = await api.get("http://localhost:8080/api/v1/admin/monthly-revenue");
    console.log("Response Data: ", data);
    return data;
    
  } catch (error) {
    console.error("An error occured", error);
    throw Error;
    
  }
}

const SalesChart = () => {

  const { data } = useQuery({
    queryKey: ["salesData"],
    queryFn: fetchMonthlyRevenueData,
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: true
  });

  // Initialize months and revenues with default values (0)
  let months = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, 3, ..., 12]
  let revenues = Array(12).fill(0); // Set all months' revenues to 0 by default
  let monthlyTotal = Array(12).fill(0); // Set all months' totals to 0 by default

  // Map the fetched data to the appropriate months, revenue, and total values
  data.forEach((item) => {
    const monthIndex = item.month - 1; // Adjust for zero-based index
    revenues[monthIndex] = item.monthlyRevenue; // Set revenue for the month
    monthlyTotal[monthIndex] = item.total; // Set total for the month
  });

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: months.map((month) => {
       return new Date(0, month - 1).toLocaleString('en-US', { month: 'short' })
      }),
      title: {
        text: 'Months'
      }
    },
    yaxis: {
      title: {
        text: 'Sales (in USD)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val}`,
      },
    },
    legend: {
      show: true,
      position: 'top', // Position: top, bottom, left, right
    }
  };

  const series = [
    {
      name: 'Revenue',
      data: revenues,
    },
    {
      name: 'Monthly Total',
      data: monthlyTotal,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
      <ReactApexChart options={chartOptions} series={series} type="bar" height={350} />
    </div>
  );
};

export default SalesChart;
