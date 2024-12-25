import CategorySales from "../components/Dashboard Data/CategorySales";
import MonthlySalesChart from "../components/Dashboard Data/MonthlySalesChart";

export default function AdminDashboard() {
  return (
    <main className="my-48">
      <h1>Admin Dashboard</h1>
      <section className="grid grid-cols-3 gap-x-8 mx-20">
        <MonthlySalesChart />
        <div>
          <CategorySales />
        </div>
      </section>
    </main>
  );
}
