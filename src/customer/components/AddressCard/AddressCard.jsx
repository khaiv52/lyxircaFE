import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <p className="font-bold">{address?.firstName} {address?.lastName}</p>
        <p>{address?.state}, {address?.streetAddress}, {address?.zipCode}</p>
      </div>
      <div className="space-y-1">
        <p className="font-bold">Phone Number</p>
        <p>{address?.phoneNumber}</p>
      </div>
    </div>
  );
};

export default AddressCard;
