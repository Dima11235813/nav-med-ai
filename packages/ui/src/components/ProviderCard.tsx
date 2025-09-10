import React from 'react';
import { Provider } from '@nav-med-ai/types';

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg">{provider.name}</h3>
      <p className="text-gray-600">{provider.specialty}</p>
      <p className="text-sm text-gray-500">{provider.location.city}, {provider.location.state}</p>
    </div>
  );
};

export default ProviderCard;
