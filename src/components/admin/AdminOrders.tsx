
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Package, Calendar, User, Search, MessageCircle, MapPin, Phone, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:product_id (
            id, name, image_urls
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (statusFilter) query = query.eq('status', statusFilter);
    if (search) {
      query = query.or(`id.ilike.%${search}%,user_id.ilike.%${search}%`);
    }

    if (dateRange.from) query = query.gte('created_at', dateRange.from);
    if (dateRange.to) query = query.lte('created_at', dateRange.to);

    const { data, error } = await query;
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
      setOrders([]);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdating(orderId);
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      await fetchOrders();
      toast({ title: "Order status updated" });
    } catch {
      toast({ title: "Error", description: "Could not update status", variant: "destructive" });
    } finally {
      setUpdating(null);
    }
  };

  const handleWhatsAppContact = (order: any) => {
    const deliveryAddress = order.delivery_address;
    let message = `📦 *Order Update - #${order.id.slice(0, 8)}*\n\n`;
    message += `Dear Customer,\n\n`;
    message += `Your order for ₹${order.total_amount} is being processed.\n\n`;
    message += `*Order Status:* ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}\n\n`;
    
    if (deliveryAddress?.phone) {
      message += `We will contact you shortly for delivery confirmation.\n\n`;
      message += `Thank you for choosing us! 🙏`;
      
      const whatsappUrl = `https://wa.me/91${deliveryAddress.phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      toast({
        title: "No Phone Number",
        description: "Customer phone number not available for WhatsApp",
        variant: "destructive",
      });
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const handleBulkStatusUpdate = async (status: string) => {
    const selected = orders.filter(o => o._checked);
    if (selected.length === 0) return;
    for (const order of selected) {
      await updateOrderStatus(order.id, status);
    }
    fetchOrders();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap mb-4">
        <Input placeholder="Search by order ID or user ID" value={search}
          onChange={e => setSearch(e.target.value)} className="w-[200px]" />
        <Select value={statusFilter} onValueChange={v => setStatusFilter(v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            {ORDER_STATUSES.map(s =>
              <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
            )}
          </SelectContent>
        </Select>
        <Input type="date" value={dateRange.from} onChange={e => setDateRange(d => ({ ...d, from: e.target.value }))} />
        <Input type="date" value={dateRange.to} onChange={e => setDateRange(d => ({ ...d, to: e.target.value }))} />
        <Button variant="outline" onClick={fetchOrders}>
          <Search className="h-4 w-4" /> Filter
        </Button>
        <Select onValueChange={handleBulkStatusUpdate}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Bulk Status Update" />
          </SelectTrigger>
          <SelectContent>
            {ORDER_STATUSES.map(s =>
              <SelectItem key={s} value={s}>Set All to {s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      {orders.length === 0 ?
        <div className="text-gray-500 text-center">No orders found</div>
        :
        <div className="space-y-3">
          {orders.map((order, idx) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="flex gap-2 items-center">
                    <input type="checkbox"
                      checked={!!order._checked} onChange={e => {
                        setOrders(os => os.map((o, i) => i === idx ? { ...o, _checked: e.target.checked } : o));
                      }} />
                    <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                  <div>
                    <span className="mr-2 text-gray-500 text-xs">{new Date(order.created_at).toLocaleString()}</span>
                    <span className="font-bold text-lg">₹{order.total_amount}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Basic Order Info */}
                  <div className="flex gap-4 items-center flex-wrap">
                    <div className="flex gap-2 items-center">
                      <User className="h-4 w-4" />
                      <span className="text-sm text-gray-500">User: {order.user_id.slice(0, 8)}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Package className="h-4 w-4" />
                      <span className="text-sm">Items: {order.order_items?.length || 0}</span>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {order.delivery_address && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">Delivery Address</span>
                      </div>
                      <div className="text-sm space-y-1">
                        {order.delivery_address.street && (
                          <div>{order.delivery_address.street}</div>
                        )}
                        <div>
                          {order.delivery_address.city}
                          {order.delivery_address.state && `, ${order.delivery_address.state}`}
                        </div>
                        {order.delivery_address.pincode && (
                          <div>PIN: {order.delivery_address.pincode}</div>
                        )}
                        {order.delivery_address.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <span>{order.delivery_address.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Order Items Collapsible */}
                  <Collapsible 
                    open={expandedOrders.has(order.id)} 
                    onOpenChange={() => toggleOrderExpansion(order.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-between">
                        <span>View Order Items</span>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      {order.order_items?.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <img 
                            src={item.product?.image_urls?.[0] || '/placeholder.svg'} 
                            alt={item.product?.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="font-medium">{item.product?.name}</div>
                            <div className="text-sm text-gray-500">
                              Qty: {item.quantity} × ₹{item.price_per_item} = ₹{(item.quantity * item.price_per_item).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t">
                    {/* WhatsApp Button */}
                    {order.delivery_address?.phone && (
                      <Button
                        onClick={() => handleWhatsAppContact(order)}
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        WhatsApp
                      </Button>
                    )}
                    
                    {/* Status Update Buttons */}
                    {ORDER_STATUSES.filter(s => s !== order.status).map(s => (
                      <Button
                        key={s}
                        onClick={() => updateOrderStatus(order.id, s)}
                        size="sm"
                        variant="outline"
                        disabled={updating === order.id}
                      >
                        Mark as {s}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      }
    </div>
  );
};

export default AdminOrders;
