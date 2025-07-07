
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import UserManagement from '../components/admin/UserManagement';

const Admin = () => {
  const { user, logout, isAdmin, registeredUsers } = useAuth();
  const { orders } = useOrder();
  const navigate = useNavigate();

  // Get product count from localStorage with real-time updates
  const { data: productCount = 0 } = useQuery({
    queryKey: ['admin-product-count'],
    queryFn: () => {
      const products = localStorage.getItem('admin-products');
      return products ? JSON.parse(products).length : 0;
    },
    refetchInterval: 1000, // Refetch every second to keep count updated
  });

  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login');
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAdmin) {
    return null;
  }

  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name}</p>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl md:text-2xl">{productCount}</CardTitle>
                  <CardDescription>Total Products</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl md:text-2xl">{pendingOrders}</CardTitle>
                  <CardDescription>Pending Orders</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl md:text-2xl">{registeredUsers.length}</CardTitle>
                  <CardDescription>Registered Users</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Management Tabs */}
            <Tabs defaultValue="products" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products" className="text-xs sm:text-sm">Products</TabsTrigger>
                <TabsTrigger value="orders" className="text-xs sm:text-sm">Orders</TabsTrigger>
                <TabsTrigger value="users" className="text-xs sm:text-sm">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products">
                <ProductManagement />
              </TabsContent>
              
              <TabsContent value="orders">
                <OrderManagement />
              </TabsContent>
              
              <TabsContent value="users">
                <UserManagement />
              </TabsContent>
            </Tabs>

            {/* Supabase Integration Note */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Backend Integration</CardTitle>
                <CardDescription>
                  You're now connected to Supabase! The admin functionality is ready for backend integration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    The current admin dashboard uses persistent local storage. To enable full functionality:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Set up product, order, and user tables in Supabase</li>
                    <li>Configure Row Level Security (RLS) policies</li>
                    <li>Replace localStorage queries with Supabase queries</li>
                    <li>Enable real-time updates for order status changes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
