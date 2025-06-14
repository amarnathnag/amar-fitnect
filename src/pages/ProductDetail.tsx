
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import ProductImageGallery from '@/components/product-detail/ProductImageGallery';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductDetailsTabs from '@/components/product-detail/ProductDetailsTabs';
import ProductDetailLoading from '@/components/product-detail/ProductDetailLoading';
import ProductNotFound from '@/components/product-detail/ProductNotFound';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) {
      navigate('/marketplace');
      return;
    }
    
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      console.log('Fetching product with ID:', id);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }
      
      console.log('Fetched product:', data);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      });
      navigate('/marketplace');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  if (loading) {
    return <ProductDetailLoading />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ProductImageGallery 
              images={product.image_urls || []} 
              productName={product.name} 
            />
            <ProductInfo 
              product={product} 
              onAddToCart={handleAddToCart} 
            />
          </div>

          <ProductDetailsTabs 
            product={product} 
            reviews={reviews} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
