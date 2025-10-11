'use client';
import React from 'react';
import ContentCard from '../components/ContentCard';
import Connector from '../components/Connector';
import { contentItems } from '@/data/contentItems';

export default function ContentPreviewSection() {

  return (
    <div className="mb-24 lg:mb-32">
      <div className="text-center mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          See Your Feed in Action
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
          Experience how PersonalFeed brings all your content together
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {contentItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="relative">
              <ContentCard
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                gradientColors={item.gradientColors}
              />
              {item.hasConnector && index < contentItems.length - 1 && (
                <Connector gradient={item.connectorGradient} />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}