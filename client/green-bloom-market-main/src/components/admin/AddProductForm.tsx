import React, { useState } from 'react';

const AddProductForm = () => {
  const [form, setForm] = useState({
    id: Date.now(),
    name: '',
    price: '',
    image: '',
    category: '',
    description: '',
    stock: '',
    rating: '',
    inStock: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const existing = JSON.parse(localStorage.getItem('admin-products') || '[]');
    const updated = [...existing, { ...form, price: parseFloat(form.price), stock: parseInt(form.stock), rating: parseFloat(form.rating), id: Date.now() }];
    localStorage.setItem('admin-products', JSON.stringify(updated));
    alert('Product added successfully!');
  };

  return (
    <div className="p-4 space-y-2">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
      <input type="text" name="price" placeholder="Price" onChange={handleChange} className="border p-2 w-full" />
      <input type="text" name="image" placeholder="Image URL" onChange={handleChange} className="border p-2 w-full" />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} className="border p-2 w-full" />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
      <input type="text" name="stock" placeholder="Stock" onChange={handleChange} className="border p-2 w-full" />
      <input type="text" name="rating" placeholder="Rating" onChange={handleChange} className="border p-2 w-full" />
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Add Product</button>
    </div>
  );
};

export default AddProductForm;
