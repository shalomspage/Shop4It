import IndividualOrder from "../order/IndividualOrder";

const Orders = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Purchased Orders</h2>
      <div className="space-y-4">
        <IndividualOrder />
        <IndividualOrder />
      </div>
    </div>
  );
};

export default Orders;
