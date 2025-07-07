import AddProductForm from '@/components/AddProductForm';

const AdminPage = () => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <AddProductForm />
    </div>
  );
};

export default AdminPage;
