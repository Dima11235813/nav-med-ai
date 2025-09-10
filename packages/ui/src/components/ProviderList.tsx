import React from 'react';
import { Provider } from '@nav-med-ai/types';
import ProviderCard from './ProviderCard';

interface ProviderListProps {
  providers: Provider[];
}

const ProviderList: React.FC<ProviderListProps> = ({ providers }) => {
  return (
    <div className="space-y-4">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
};

export default ProviderList;
