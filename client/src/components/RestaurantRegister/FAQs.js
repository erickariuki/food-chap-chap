import React, { useState } from 'react';

function FAQs() {
  const [faqs, setFAQs] = useState([
    {
      question: 'What is FoodChapChap?',
      answer: 'FoodChapChap is an on-demand platform that connects restaurants with customers, offering a convenient and efficient dining experience. Customers can pre-order their favorite meals, reducing wait times and enhancing their dining experience.'
    },
    {
      question: 'How can I sign up as a customer?',
      answer: 'To sign up as a customer, visit our website and look for the "Sign Up" button. Follow the registration process by providing your details, accepting our terms and conditions, and you’re all set!'
    },
    {
      question: 'How can I sign up my restaurant on FoodChapChap?',
      answer: 'If you’re a restaurant owner interested in joining FoodChapChap, reach out to our team. We will guide you through an onboarding process where you can provide your business information, menu details, and customize your settings.'
    },
    {
      question: 'Can I customize my restaurant menu on FoodChapChap?',
      answer: 'Yes, you can easily customize your restaurants menu on our platform. You can add, modify, or remove menu items to suit your offerings and pricing preferences.'
    },
    {
      question: 'How do I receive and manage orders from customers?',
      answer: 'Once your restaurant is set up on FoodChapChap, you can start receiving orders from customers. The platform offers order management tools that help you track and process orders efficiently.'
    },
    {
      question: 'What are the benefits of loyalty programs on FoodChapChap?',
      answer: 'Loyalty programs allow you to reward your most loyal customers with points, discounts, and gift cards. This helps in building lasting relationships and encourages repeat business.'
    },
    {
      question: 'How can I get insights into my restaurant’s performance?',
      answer: 'You can use the platform’s reporting tools to gain valuable insights into your restaurant’s performance. This includes tracking sales, identifying popular dishes, and evaluating the effectiveness of promotions.'
    }
  ]);

  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>
            <button>{faq.question}</button>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQs;
