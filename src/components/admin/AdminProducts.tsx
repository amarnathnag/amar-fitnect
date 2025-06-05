
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProductForm from './ProductForm';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (productId: string, newStatus: 'active' | 'inactive' | 'pending_approval') => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ status: newStatus })
        .eq('id', productId);

      if (error) throw error;

      await fetchProducts();
      toast({
        title: "Success",
        description: `Product status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update product status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      await fetchProducts();
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: 'default',
      pending_approval: 'secondary',
      inactive: 'destructive'
    };
    return <Badge variant={variants[status] as any}>{status.replace('_', ' ')}</Badge>;
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Products Management</CardTitle>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedProduct(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
              </DialogHeader>
              <ProductForm 
                product={selectedProduct}
                onSuccess={handleFormSuccess}
                onCancel={() => setIsFormOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Health Score</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image_urls?.[0] || '/placeholder.svg'}
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.brand}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.category?.replace('_', ' ')}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>
                  <Badge variant={product.health_score >= 7 ? 'default' : 'secondary'}>
                    {product.health_score}/10
                  </Badge>
                </TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsFormOpen(true);
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    
                    {product.status === 'pending_approval' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(product.id, 'active')}
                          className="text-green-600"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(product.id, 'inactive')}
                          className="text-red-600"
                        >
                          <XCircle className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminProducts;
