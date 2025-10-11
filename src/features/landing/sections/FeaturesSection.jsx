'use client';
import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { featuresData } from '@/data/featuresData';

export default function FeaturesSection() {

  return (
    <div className="mb-24 lg:mb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuresData.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            gradient={feature.gradient}
            bgColor={feature.bgColor}
          />
        ))}
      </div>
    </div>
  );
}