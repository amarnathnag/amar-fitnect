
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, RefreshCw, CheckCircle, Truck, Clock, XCircle } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_per_item: number;
  product: {
    id: string;
    name: string;
    brand: string;
    image_urls: string[];
  };
}

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  delivery_address: any;
  status: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

const OrdersSection = () => {
  const { orders, loading, refetch } = useOrders();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    const displayPrice = price > 1000 ? price / 100 : price;
    return displayPrice.toFixed(2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'shipped':
        return <Truck className="h-4 w-4 mr-1" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const handleStartShopping = () => {
    navigate('/marketplace');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          My Orders
        </CardTitle>
        <Button variant="outline" size="sm" onClick={refetch} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-500 mb-4">
              You haven't placed any orders yet. Start shopping for healthy products!
            </p>
            <Button onClick={handleStartShopping}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</h3>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <p className="text-lg font-bold text-green-600 mt-1">
                      ₹{formatPrice(order.total_amount)}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t pt-3">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">
                    Items ({order.order_items?.length || 0})
                  </h4>
                  <div className="space-y-2">
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <img
                          src={item.product?.image_urls?.[0] || '/placeholder.svg'}
                          alt={item.product?.name || 'Product'}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <p className="font-medium text-sm">{item.product?.name}</p>
                          <p className="text-xs text-gray-500">{item.product?.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Qty: {item.quantity}</p>
                          <p className="text-xs text-gray-500">₹{formatPrice(item.price_per_item)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                {order.delivery_address && (
                  <div className="border-t pt-3 mt-3">
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Delivery Address</h4>
                    <p className="text-sm text-gray-600">
                      {order.delivery_address.street}, {order.delivery_address.city}, {order.delivery_address.state} - {order.delivery_address.pincode}
                    </p>
                    <p className="text-sm text-gray-600">Phone: {order.delivery_address.phone}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersSection;
