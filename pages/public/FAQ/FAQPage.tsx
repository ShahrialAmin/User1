import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I top up my game account?",
      answer: "Select your desired game/product, choose the package amount, enter your Player ID (UID) correctly, and proceed to payment. Once payment is confirmed, your account will be topped up instantly or within a few minutes depending on the service type."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bKash, Nagad, and Rocket. You can pay directly through our automated wallet system or use manual send money options as instructed on the checkout page."
    },
    {
      question: "How long does it take to receive my order?",
      answer: "For 'ID Code' based top-ups, it usually takes 1-5 minutes. For 'In-Game' (ID/Password) orders, it may take 10-30 minutes. Vouchers and Gift Cards are delivered instantly to your 'My Orders' page."
    },
    {
      question: "My order status is 'Completed' but I didn't get diamonds?",
      answer: "Please check if you entered the correct Player ID. If the ID was correct, try restarting your game. If you still haven't received it, please contact our WhatsApp support with your Order Serial Number."
    },
    {
      question: "Can I get a refund if I send money to the wrong number?",
      answer: "We are not responsible if you send money to a wrong number that does not belong to us. Always check the number displayed on our website before making a transaction."
    },
    {
      question: "Do you have 24/7 Support?",
      answer: "Yes, our automated system works 24/7. However, our manual support team is active from 9:00 AM to 12:00 AM daily via WhatsApp for resolving complex issues."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 text-indigo-600 mb-4">
            <HelpCircle size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-slate-500 font-medium mt-2">Have questions? We're here to help.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200 hover:border-indigo-600/30 hover:shadow-sm">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <span className="font-bold text-slate-800 text-base md:text-lg pr-4">{faq.question}</span>
              {openIndex === index ? (
                <div className="bg-indigo-50 p-1 rounded-lg text-indigo-600 flex-shrink-0">
                    <Minus size={20} />
                </div>
              ) : (
                <div className="bg-gray-50 p-1 rounded-lg text-gray-400 flex-shrink-0">
                    <Plus size={20} />
                </div>
              )}
            </button>
            
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-gray-50 bg-gray-50/30 font-medium text-sm md:text-base">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};