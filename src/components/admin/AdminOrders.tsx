
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Package, Calendar, User, Search } from 'lucide-react';
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
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <User className="h-4 w-4" />
                    <span className="text-sm text-gray-500">{order.user_id.slice(0, 8)}</span>
                  </div>
                  <div>
                    <span className="font-bold">Items:</span> {order.order_items?.length || 0}
                  </div>
                  <div className="flex flex-wrap gap-2 py-1">
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
