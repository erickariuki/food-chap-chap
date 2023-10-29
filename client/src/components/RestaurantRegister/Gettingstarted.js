import React, { useEffect } from "react";
import "../css/gettingStarted.css";
import Aos from "aos";
import "aos/dist/aos.css";

function GettingStarted() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <div className="getting-started-wrapper">
      <div className="getting-started-step" data-aos="fade-right">
        <h2>Contact FoodChapChap</h2>
        <p>
          If you're a restaurant owner interested in joining FoodChapChap, start
          by reaching out to the FoodChapChap team. You can usually find contact
          information on their website or through online search.
        </p>
      </div>
      <div className="getting-started-step" data-aos="fade-left">
        <h2>Onboarding Process</h2>
        <p>
          FoodChapChap will guide you through an onboarding process, which
          includes providing your business information, menu details, and
          contact information.
        </p>
      </div>
      <div className="getting-started-step" data-aos="fade-right">
        <h2>Customize Your Settings</h2>
        <p>
          You can set your restaurant's availability, operating hours, delivery
          zones, and pricing preferences on the platform.
        </p>
      </div>
      <div className="getting-started-step" data-aos="fade-left">
        <h2>Test Transactions</h2>
        <p>
          Before going live, conduct test transactions to ensure the ordering
          process is functional and user-friendly.
        </p>
      </div>
      <div className="getting-started-step" data-aos="fade-right">
        <h2>Marketing and Promotion</h2>
        <p>
          Work with FoodChapChap to promote your restaurant on the platform.
          This may include featuring your restaurant in newsletters, social
          media posts, or advertising campaigns.
        </p>
      </div>
      <div className="getting-started-step" data-aos="fade-left">
        <h2>Start Receiving Orders</h2>
        <p>
          Once your restaurant is set up on FoodChapChap, you can start
          receiving orders from customers. The platform will help you manage and
          track these orders efficiently.
        </p>
      </div>
      <div className="getting-started-step" data-aos="fade-right">
        <h2>Engage with Customers</h2>
        <p>
          Interact with your customers through the platform, respond to reviews,
          and offer promotions to attract more business.
        </p>
      </div>
      <div className="getting-started-step" data-aos="fade-left">
        <h2>Loyalty Programs and Reports</h2>
        <p>
          Consider implementing loyalty programs to reward loyal customers. You
          can also use the platform's reporting tools to gain insights into your
          restaurant's performance.
        </p>
      </div>
      <div className="getting-started-step join">
        <h2>
          Join FoodChapChap Today and Revolutionize Your Restaurant Business!
        </h2>
        <p>
          With FoodChapChap, you're not just joining a platform; you're
          embracing a new way of doing business in the restaurant industry.
          Don't miss out on the opportunity to simplify your operations, delight
          your customers, and boost your revenue. Join us now and let's create a
          dining experience like no other.
        </p>
      </div>
    </div>
  );
}

export default GettingStarted;
