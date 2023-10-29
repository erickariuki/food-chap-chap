import React from "react";
import HomeRegister from "./HomeRegister";
import GettingStarted from "./Gettingstarted";
import WhyChoose from "./WhyChoose";
import FAQs from "./FAQs";

function LandingPage() {
  const landingPageStyling = {
    margin: "5em 10px",
  };
  return (
    <div style={landingPageStyling}>
      <HomeRegister />
      <WhyChoose />
      <GettingStarted />
      <FAQs />
    </div>
  );
}

export default LandingPage;
