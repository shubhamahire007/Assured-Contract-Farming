import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="prose prose-sm max-w-none p-4 border rounded-md bg-gray-50 max-h-48 overflow-y-auto">
      <h4>Platform Terms of Service</h4>
      <p>
        This agreement (the "Contract") is entered into by and between the Farmer and the Buyer (collectively, the "Parties") facilitated by AgriSure (the "Platform").
      </p>
      <ol>
        <li>
          <strong>Agreement:</strong> The Parties agree to the terms specified in this contract regarding the crop, quantity, price, and completion date.
        </li>
        <li>
          <strong>Payment:</strong> Payment shall be made by the Buyer to the Farmer upon successful pickup and inspection of the goods, unless otherwise specified.
        </li>
        <li>
          <strong>Platform Liability:</strong> AgriSure acts solely as a facilitator and is not liable for any breach of contract by either party.
        </li>
      </ol>
      <p>
        By checking the box below, both Parties acknowledge that they have read, understood, and agree to be bound by these terms.
      </p>
    </div>
  );
};

export default TermsAndConditions;