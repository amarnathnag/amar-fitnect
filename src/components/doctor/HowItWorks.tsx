
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Choose an Expert",
      description: "Select a doctor or specialist based on your health needs."
    },
    {
      number: 2,
      title: "Book a Slot",
      description: "Select a convenient date and time for your consultation."
    },
    {
      number: 3,
      title: "Pay Securely",
      description: "Complete your booking with our secure payment system."
    },
    {
      number: 4,
      title: "Connect Online",
      description: "Join the video call at your appointment time for your consultation."
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-800/30 p-8 rounded-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-3">How It Works</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Our online consultation process is designed to be simple, secure, and effective.
        </p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-health-primary font-bold">{step.number}</span>
            </div>
            <h3 className="font-medium mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
