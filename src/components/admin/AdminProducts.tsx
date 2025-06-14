import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import EnhancedProductForm from './EnhancedProductForm';
import WorkflowDashboard from './WorkflowDashboard';
import SampleDataSeeder from './SampleDataSeeder';

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

  const handleWorkflowStatusChange = async (productId: string, newWorkflowStatus: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ workflow_status: newWorkflowStatus })
        .eq('id', productId);

      if (error) throw error;

      await fetchProducts();
      toast({
        title: "Success",
        description: `Workflow status updated to ${newWorkflowStatus}`,
      });
    } catch (error) {
      console.error('Error updating workflow status:', error);
      toast({
        title: "Error",
        description: "Failed to update workflow status",
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

  const getWorkflowStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      pending_review: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      published: 'bg-green-100 text-green-800'
    };
    return (
      <Badge className={colors[status] || 'bg-gray-100 text-gray-800'}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  const workflowStats = {
    draft: products.filter((p: any) => p.workflow_status === 'draft').length,
    pending_review: products.filter((p: any) => p.workflow_status === 'pending_review').length,
    approved: products.filter((p: any) => p.workflow_status === 'approved').length,
    published: products.filter((p: any) => p.workflow_status === 'published').length,
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="products">Products Management</TabsTrigger>
        <TabsTrigger value="workflow">Workflow Dashboard</TabsTrigger>
        <TabsTrigger value="sample-data">Sample Data</TabsTrigger>
      </TabsList>

      <TabsContent value="products">
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
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedProduct ? 'Edit Product' : 'Add New Product'}
                    </DialogTitle>
                  </DialogHeader>
                  <EnhancedProductForm 
                    product={selectedProduct}
                    onSuccess={handleFormSuccess}
                    onCancel={() => setIsFormOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Workflow Status Overview */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="flex items-center p-4">
                  <Edit className="h-8 w-8 text-gray-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{workflowStats.draft}</p>
                    <p className="text-gray-600">Draft</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-4">
                  <Clock className="h-8 w-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{workflowStats.pending_review}</p>
                    <p className="text-gray-600">Pending Review</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-4">
                  <CheckCircle className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{workflowStats.approved}</p>
                    <p className="text-gray-600">Approved</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-4">
                  <AlertTriangle className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{workflowStats.published}</p>
                    <p className="text-gray-600">Published</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Health Score</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Workflow</TableHead>
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
                      <div className="flex flex-col gap-1">
                        <Badge variant={product.health_score >= 7 ? 'default' : 'secondary'}>
                          {product.health_score}/10
                        </Badge>
                        {product.auto_health_score && (
                          <span className="text-xs text-gray-500">
                            Auto: {product.auto_health_score}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.stock_quantity}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>{getWorkflowStatusBadge(product.workflow_status || 'draft')}</TableCell>
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
                        
                        {product.workflow_status === 'pending_review' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleWorkflowStatusChange(product.id, 'approved')}
                              className="text-green-600"
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleWorkflowStatusChange(product.id, 'rejected')}
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
      </TabsContent>

      <TabsContent value="workflow">
        <WorkflowDashboard />
      </TabsContent>

      <TabsContent value="sample-data">
        <SampleDataSeeder />
      </TabsContent>
    </Tabs>
  );
};

export default AdminProducts;
