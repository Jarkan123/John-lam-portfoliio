
import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

const ContactPage: React.FC = () => {
  const { data } = useCMS();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const primaryColor = data.settings.primaryColor;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
        const response = await fetch("https://formspree.io/f/xlgekvwo", {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            setSubmitted(true);
        } else {
            alert('There was an error sending your message. Please try again.');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        alert('There was a network error sending your message. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight font-mono" style={{color: primaryColor}}>// Contact_Me</h1>
        <p className="mt-4 text-lg text-gray-400">Have a project in mind or just want to chat? I'd love to hear from you.</p>
      </div>
      
      {submitted ? (
        <div className="text-center card-border p-12 rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold" style={{color: primaryColor}}>Message Sent!</h3>
          <p className="text-gray-300 mt-4 text-lg">Thank you for reaching out. I will get back to you as soon as possible.</p>
        </div>
      ) : (
        <div className="card-border p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 font-mono">Full Name</label>
              <input type="text" id="name" name="name" required className="block w-full bg-black border rounded-md shadow-sm py-3 px-4 text-lg focus:outline-none focus:ring-2" style={{'--tw-ring-color': primaryColor, borderColor: 'rgba(255,255,255,0.2)'} as React.CSSProperties} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 font-mono">Email Address</label>
              <input type="email" id="email" name="_replyto" required className="block w-full bg-black border rounded-md shadow-sm py-3 px-4 text-lg focus:outline-none focus:ring-2" style={{'--tw-ring-color': primaryColor, borderColor: 'rgba(255,255,255,0.2)'} as React.CSSProperties} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 font-mono">Your Message</label>
              <textarea id="message" name="message" rows={5} required className="block w-full bg-black border rounded-md shadow-sm py-3 px-4 text-lg focus:outline-none focus:ring-2" style={{'--tw-ring-color': primaryColor, borderColor: 'rgba(255,255,255,0.2)'} as React.CSSProperties}></textarea>
            </div>
            <div>
              <button type="submit" disabled={isSubmitting} className="w-full text-lg font-semibold py-3 px-6 rounded-lg transition-all text-black disabled:opacity-50" style={{backgroundColor: primaryColor, boxShadow: `0 0 20px 0 ${primaryColor}55`}}>
                {isSubmitting ? 'Sending...' : 'Send Your Message'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
