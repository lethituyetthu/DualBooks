const StatsCard = ({ title, amount, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between text-left space-x-4">
      <div>
        <p className="text-2xl font-itim  font-semibold text-primary-300">{title}</p>
        <p className="text-2xl font-bold text-primary-600">{amount}</p>
      </div>
      <span className="text-5xl mr-3">{icon}</span>
    </div>
  );
};
export default StatsCard ;