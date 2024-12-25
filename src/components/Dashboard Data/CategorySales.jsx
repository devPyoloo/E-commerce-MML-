import ReactApexChart from 'react-apexcharts';
import api from '../../utils/apiInterceptors';
import { useQuery } from '@tanstack/react-query';

const fetchCategorySales = async () => {
  try {
    const { data } = await api.get("http://localhost:8080/api/v1/admin/category-sales");
    console.log("Response Data: ", data);
    return data;
    
  } catch (error) {
    console.error("An error occured", error);
    throw Error;
  }
}

const CategorySales = () => {

  const { data } = useQuery({
    queryKey: ["categorySales"],
    queryFn: fetchCategorySales,
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: true
  });

  const allCategories = [
    "Skincare",
    "Makeup",
    "Fragrance",
    "Haircare",
    "Bodycare",
    "Supplements"
  ]
  
  const categoryCounts = allCategories.map((cat) => {
    const match = data?.find(item => item.category === cat);
    return match ? match.categoryCount : 0
  })


  
  

  const donutOptions = {
    chart: {
      type: 'donut',
    },
    labels: allCategories,
    colors: [
      '#509dff', // Light Blue - Skincare
      '#ffea50', // Light Yellow - Makeup
      '#ff50d5', // Light Pink - Fragrance
      '#8d50ff', // Light Purple - Haircare
      '#50ff82', // Light Green - Bodycare
      '#ffad50'  // Light Orange - Supplements
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
  };

  return (
    <div className="bg-white drop-shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Sales by Category</h2>
      <ReactApexChart options={donutOptions} series={categoryCounts} type="donut" height={250} />
    </div>
  );
};

export default CategorySales;
