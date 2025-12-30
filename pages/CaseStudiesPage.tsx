
import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';

const CaseStudiesPage: React.FC = () => {
  const { data } = useCMS();
  const publishedCaseStudies = data.caseStudies.filter(cs => cs.status === 'published');
  const primaryColor = data.settings.primaryColor;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight font-mono" style={{color: primaryColor}}>// Case_Studies</h1>
        <p className="mt-4 text-lg text-gray-400">A showcase of successful projects and tangible results.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {publishedCaseStudies.map(cs => (
          <Link to={`/case-studies/${cs.slug}`} key={cs.id} className="group block card-border rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="relative">
              <img src={cs.coverImage} alt={cs.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-3 font-mono" style={{ color: primaryColor }}>{cs.title}</h2>
              <p className="text-gray-300 mb-4 line-clamp-3">{cs.shortDescription}</p>
              <span className="font-semibold inline-flex items-center font-mono" style={{ color: primaryColor }}>
                Read Full Study
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesPage;
