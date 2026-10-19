import React from 'react';
import { useProducts } from '../contexts/ProductContext';
import Layout from '../components/layout/Layout';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryGrid from '../components/home/CategoryGrid';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import PlantCareTips from '../components/home/PlantCareTips';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const HomePage: React.FC = () => {
  const { getFeaturedProducts, getBestSellers, getNewArrivals } = useProducts();

  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  return (
    <Layout>
      <HeroBanner />
      <FeaturedProducts products={featuredProducts} />
      <CategoryGrid />
      <BestSellers products={bestSellers} />
      <NewArrivals products={newArrivals} />
      <PlantCareTips />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default HomePage;
