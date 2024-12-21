import ReactApexChart from 'react-apexcharts';

const SalesChart = () => {
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
      data: [1200, 1900, 3000, 5000, 2400, 3500],
    },
    {
      name: 'Expenses',
      data: [800, 1200, 1800, 2500, 1300, 2000],
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
