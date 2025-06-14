
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Calendar, MapPin, User, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  created_at: string;
  delivery_address: any;
  order_items: Array<{
    id: string;
    quantity: number;
    price_per_item: number;
    product: {
      id: string;
      name: string;
      image_urls: string[];
    };
  }>;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product:product_id (
              id,
              name,
              image_urls
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdating(orderId);
      
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Send email notification if confirming or shipping
      if (newStatus === 'confirmed' || newStatus === 'shipped') {
        await sendOrderEmail(orderId, newStatus);
      }

      await fetchOrders();
      toast({
        title: "Success",
        description: `Order ${newStatus} successfully`,
      });
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const sendOrderEmail = async (orderId: string, status: string) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      // Get user email
      const { data: userEmail } = await supabase.rpc('get_user_email', {
        user_uuid: order.user_id
      });

      if (!userEmail) {
        console.error('Could not get user email');
        return;
      }

      const orderItems = order.order_items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price_per_item
      }));

      const response = await fetch('/api/v1/send-order-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: order.id,
          userEmail: userEmail,
          userName: 'Customer', // You might want to get actual name from user profile
          orderTotal: order.total_amount,
          orderItems: orderItems,
          deliveryAddress: order.delivery_address,
          status: status
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      // Don't show error to user as order update was successful
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Package className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Order Management</h2>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-gray-500">Orders will appear here when customers place them</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      Order #{order.id.slice(0, 8)}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          ID: {order.user_id.slice(0, 8)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <p className="text-lg font-bold mt-2">₹{order.total_amount}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-2">Items:</h4>
                    <div className="space-y-2">
                      {order.order_items?.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <img
                            src={item.product?.image_urls?.[0] || '/placeholder.svg'}
                            alt={item.product?.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-grow">
                            <p className="font-medium text-sm">{item.product?.name}</p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity} × ₹{item.price_per_item}
                            </p>
                          </div>
                          <p className="font-semibold">
                            ₹{(item.quantity * item.price_per_item).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {order.delivery_address && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Delivery Address:
                      </h4>
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        <p>{order.delivery_address.street}</p>
                        <p>{order.delivery_address.city}, {order.delivery_address.state}</p>
                        <p>Pincode: {order.delivery_address.pincode}</p>
                        <p>Phone: {order.delivery_address.phone}</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    {order.status === 'pending' && (
                      <>
                        <Button
                          onClick={() => updateOrderStatus(order.id, 'confirmed')}
                          disabled={updating === order.id}
                          size="sm"
                        >
                          {updating === order.id ? 'Updating...' : 'Confirm Order'}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          disabled={updating === order.id}
                          size="sm"
                        >
                          Cancel Order
                        </Button>
                      </>
                    )}
                    {order.status === 'confirmed' && (
                      <Button
                        onClick={() => updateOrderStatus(order.id, 'shipped')}
                        disabled={updating === order.id}
                        size="sm"
                      >
                        {updating === order.id ? 'Updating...' : 'Mark as Shipped'}
                      </Button>
                    )}
                    {order.status === 'shipped' && (
                      <Button
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        disabled={updating === order.id}
                        size="sm"
                      >
                        {updating === order.id ? 'Updating...' : 'Mark as Delivered'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
