
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import TypingEffect from '../components/TypingEffect';
import LogoSlider from '../components/LogoSlider';
import TestimonialSlider from '../components/TestimonialSlider';
import Kickstart from '../components/Kickstart';
import MatrixBackground from '../components/MatrixBackground';

const HomePage: React.FC = () => {
  const { data } = useCMS();
  const publishedCaseStudies = data.caseStudies.filter(cs => cs.status === 'published');
  const primaryColor = data.settings.primaryColor;

  return (
    <div className="bg-black text-white">
      <Kickstart />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
        <MatrixBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 font-mono">John Lam</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">I Build Digital Systems That Turn Attention Into Revenue.</p>
          <div className="text-lg md:text-xl h-8 font-mono" style={{ color: primaryColor }}>
            <TypingEffect
              phrases={[
                'Performance-driven growth strategy',
                'Digital marketing expert',
                'AI & Automation',
              ]}
              typingSpeed={120}
              deletingSpeed={60}
              delay={2500}
            />
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
         <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight font-mono text-glow" style={{ color: primaryColor }}>// About_Me</h2>
        </div>
        <div className="card-border p-8">
            <p className="text-gray-300 text-lg leading-relaxed">{data.settings.aboutMe}</p>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8 font-mono text-glow" style={{ color: primaryColor }}>// Brands_I've_Worked_With</h2>
        <LogoSlider />
      </section>

      {/* Services Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight font-mono text-glow" style={{ color: primaryColor }}>// Services</h2>
          <p className="text-gray-400 mt-2">Driving growth through tailored strategies.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {data.services.map(service => (
            <div key={service.id} className="card-border p-8 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-3 font-mono" style={{ color: primaryColor }}>{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight font-mono text-glow" style={{ color: primaryColor }}>// Testimonials</h2>
            <p className="text-gray-400 mt-2">Results and relationships I'm proud of.</p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight font-mono text-glow" style={{ color: primaryColor }}>// Case_Studies</h2>
          <p className="text-gray-400 mt-2">Proven results from real-world challenges.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {publishedCaseStudies.slice(0, 2).map(cs => (
            <Link to={`/case-studies/${cs.slug}`} key={cs.id} className="group block card-border rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2">
              <img src={cs.coverImage} alt={cs.title} className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 font-mono" style={{ color: primaryColor }}>{cs.title}</h3>
                <p className="text-gray-300 mb-4">{cs.shortDescription}</p>
                <span className="font-semibold font-mono" style={{ color: primaryColor }}>Read Case Study &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/case-studies" className="inline-block text-black font-semibold py-3 px-6 rounded-lg transition-all" style={{backgroundColor: primaryColor, boxShadow: `0 0 20px 0 ${primaryColor}55`}}>
                View All Case Studies
            </Link>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight font-mono text-glow" style={{ color: primaryColor }}>// Contact_Me</h2>
            <p className="text-gray-400 mt-2">Let's discuss how I can help you achieve your growth goals.</p>
          </div>
          <ContactForm />
        </div>
      </section>
      
      <style jsx global>{`
        .bg-grid-gray-700\\[\\[0\\.1\\]\\] {
          background-image: linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};


const ContactForm: React.FC = () => {
    const { data } = useCMS();
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('https://formspree.io/f/xlgekvwo', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert('There was an error submitting your form. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was a network error submitting your form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center card-border p-8 rounded-lg">
                <h3 className="text-2xl font-semibold" style={{ color: data.settings.primaryColor }}>Thank You!</h3>
                <p className="text-gray-300 mt-2">Your message has been sent successfully. I'll get back to you shortly.</p>
            </div>
        );
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6 card-border p-8">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 font-mono">Name</label>
                <input type="text" id="name" name="name" required className="mt-1 block w-full bg-black border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 border" style={{'--tw-ring-color': data.settings.primaryColor, borderColor: 'rgba(255,255,255,0.2)'} as React.CSSProperties}/>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 font-mono">Email</label>
                <input type="email" id="email" name="_replyto" required className="mt-1 block w-full bg-black border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 border" style={{'--tw-ring-color': data.settings.primaryColor, borderColor: 'rgba(255,255,255,0.2)'} as React.CSSProperties}/>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 font-mono">Message</label>
                <textarea id="message" name="message" rows={4} required className="mt-1 block w-full bg-black border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 border" style={{'--tw-ring-color': data.settings.primaryColor, borderColor: 'rgba(255,255,255,0.2)'} as React.CSSProperties}></textarea>
            </div>
            <div>
                <button type="submit" disabled={isSubmitting} className="w-full font-semibold py-3 px-6 rounded-lg transition-all text-black disabled:opacity-50" style={{backgroundColor: data.settings.primaryColor, boxShadow: `0 0 20px 0 ${data.settings.primaryColor}55`}}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </div>
        </form>
    );
};

export default HomePage;
