import React from "react";
import { assets } from "../../assets/assets";

const Companies = () => {
  return (
    <div className="pt-16">
      <p className="text-base text-gray-500">Trusted by learners from</p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5">
        <img src={assets.microsoft_logo} className="w-20 md:w-28" alt="microsoft" />
        <img src={assets.walmart_logo} className="w-20 md:w-28" alt="walmart" />
        <img src={assets.accenture_logo} className="w-20 md:w-28" alt="accenture" />
        <img src={assets.adobe_logo} className="w-20 md:w-28" alt="adobe" />
        <img src={assets.paypal_logo} className="w-20 md:w-28" alt="pay-pall" />
      </div>
    </div>
  );
};

export default Companies;
