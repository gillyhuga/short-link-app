import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ShortLinkForm from '../components/ShortLinkForm';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import QnaAccordion from '../components/QnaAccordion';
import Features from '../components/Features';
import Footer from '../components/Footer';

export default function Home() {
  const customUrl = useSelector((state: RootState) => state.shortLink.slug);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <ShortLinkForm customUrl={customUrl} />
      <Features />
      <QnaAccordion />
      <Footer />
    </div>
  );
}
