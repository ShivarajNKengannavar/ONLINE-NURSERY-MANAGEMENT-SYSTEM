import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Package, Heart, Trash2 } from 'lucide-react';

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getUserOrders } = useOrder();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const userOrders = user ? getUserOrders(user.id) : [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name}</p>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center gap-2 text-xs sm:text-sm">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:block">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:block">Wishlist</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <p className="text-lg bg-muted p-3 rounded-md">{user.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <p className="text-lg bg-muted p-3 rounded-md">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Account Type</label>
                        <p className="text-lg capitalize bg-muted p-3 rounded-md">{user.role}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Member Since</label>
                        <p className="text-lg bg-muted p-3 rounded-md">
                          {user.joinDate || new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button className="w-full sm:w-auto">Edit Profile</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>Track your orders and purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userOrders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Start shopping to see your orders here
                        </p>
                        <Button asChild>
                          <a href="/plants">Start Shopping</a>
                        </Button>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Items</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {userOrders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">#{order.id.slice(-6)}</TableCell>
                                <TableCell>{order.items.length} items</TableCell>
                                <TableCell>₹{order.total}</TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(order.status)}>
                                    {order.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{order.date}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                    <CardDescription>Your saved plants and products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No items in wishlist</h3>
                        <p className="text-muted-foreground mb-4">
                          Save your favorite plants to see them here
                        </p>
                        <Button asChild>
                          <a href="/plants">Browse Plants</a>
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wishlistItems.map((item) => (
                          <div key={item.id} className="border rounded-lg p-4 space-y-2">
                            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-muted-foreground text-sm">{item.category}</p>
                            <div className="flex justify-between items-center">
                              <span className="font-bold">₹{item.price}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromWishlist(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
