
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  stock?: number;
}

const ProductManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    image: '',
    category: '',
    description: '',
    stock: 0
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Load products from localStorage with persistence
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const stored = localStorage.getItem('admin-products');
      if (stored) {
        return JSON.parse(stored);
      }
      
      // Initial products if none exist
      const initialProducts = [
        { 
          id: 1, 
          name: 'Snake Plant', 
          price: 899, 
          image: '/placeholder.svg', 
          category: 'Indoor Plants', 
          description: 'Perfect low-maintenance plant for beginners', 
          stock: 25 
        },
        { 
          id: 2, 
          name: 'Monstera Deliciosa', 
          price: 1299, 
          image: '/placeholder.svg', 
          category: 'Indoor Plants', 
          description: 'Popular houseplant with split leaves', 
          stock: 15 
        },
        { 
          id: 3, 
          name: 'Peace Lily', 
          price: 799, 
          image: '/placeholder.svg', 
          category: 'Indoor Plants', 
          description: 'Beautiful flowering indoor plant', 
          stock: 20 
        },
      ];
      
      localStorage.setItem('admin-products', JSON.stringify(initialProducts));
      return initialProducts;
    }
  });

  const addProductMutation = useMutation({
    mutationFn: async (product: typeof newProduct) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      return { ...product, id: newId };
    },
    onSuccess: (newProduct) => {
      const updatedProducts = [...products, newProduct];
      localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
      queryClient.setQueryData(['admin-products'], updatedProducts);
      queryClient.invalidateQueries({ queryKey: ['admin-product-count'] });
      setIsAddDialogOpen(false);
      setNewProduct({ name: '', price: 0, image: '', category: '', description: '', stock: 0 });
      toast({ title: 'Product added successfully' });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: async (product: Product) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return product;
    },
    onSuccess: (updatedProduct) => {
      const updatedProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
      localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
      queryClient.setQueryData(['admin-products'], updatedProducts);
      setEditingProduct(null);
      toast({ title: 'Product updated successfully' });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (productId: number) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return productId;
    },
    onSuccess: (deletedId) => {
      const updatedProducts = products.filter(p => p.id !== deletedId);
      localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
      queryClient.setQueryData(['admin-products'], updatedProducts);
      queryClient.invalidateQueries({ queryKey: ['admin-product-count'] });
      toast({ title: 'Product deleted successfully' });
    }
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      toast({ title: 'Please fill all required fields', variant: 'destructive' });
      return;
    }
    addProductMutation.mutate(newProduct);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    if (!editingProduct.name || !editingProduct.category || editingProduct.price <= 0) {
      toast({ title: 'Please fill all required fields', variant: 'destructive' });
      return;
    }
    updateProductMutation.mutate(editingProduct);
  };

  const handleDeleteProduct = (productId: number, productName: string) => {
    if (confirm(`Are you sure you want to delete "${productName}"?`)) {
      deleteProductMutation.mutate(productId);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading products...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Manage your plant inventory</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Enter the details for the new product</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Indoor Plants">Indoor Plants</SelectItem>
                      <SelectItem value="Outdoor Plants">Outdoor Plants</SelectItem>
                      <SelectItem value="Seeds">Seeds</SelectItem>
                      <SelectItem value="Tools">Tools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                    placeholder="Enter stock quantity"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Enter product description"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    placeholder="/placeholder.svg"
                  />
                </div>
                <Button 
                  onClick={handleAddProduct} 
                  className="w-full"
                  disabled={addProductMutation.isPending}
                >
                  {addProductMutation.isPending ? 'Adding...' : 'Add Product'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProduct(product)}
                        disabled={updateProductMutation.isPending}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        disabled={deleteProductMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {products.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No products found. Add your first product to get started.
          </div>
        )}
      </CardContent>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product details</DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <Label htmlFor="edit-name">Product Name *</Label>
                <Input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Price (₹) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  min="1"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <Select 
                  value={editingProduct.category} 
                  onValueChange={(value) => setEditingProduct({...editingProduct, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Indoor Plants">Indoor Plants</SelectItem>
                    <SelectItem value="Outdoor Plants">Outdoor Plants</SelectItem>
                    <SelectItem value="Seeds">Seeds</SelectItem>
                    <SelectItem value="Tools">Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-stock">Stock Quantity</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  min="0"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                />
              </div>
              <Button 
                onClick={handleUpdateProduct} 
                className="w-full"
                disabled={updateProductMutation.isPending}
              >
                {updateProductMutation.isPending ? 'Updating...' : 'Update Product'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProductManagement;
