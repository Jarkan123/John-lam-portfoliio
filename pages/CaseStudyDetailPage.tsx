
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext.tsx';

const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useCMS();
  const navigate = useNavigate();
  const caseStudy = data.caseStudies.find(cs => cs.slug === slug && cs.status === 'published');
  const primaryColor = data.settings.primaryColor;

  useEffect(() => {
    if (!caseStudy) {
      navigate('/case-studies');
    }
    window.scrollTo(0, 0);
  }, [caseStudy, navigate]);

  if (!caseStudy) {
    return null;
  }

  return (
    <div className="bg-black text-white">
      <div className="relative h-96">
        <img src={caseStudy.coverImage} alt={caseStudy.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-mono">{caseStudy.title}</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">{caseStudy.shortDescription}</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <div className="prose prose-invert prose-lg max-w-none prose-h2:font-bold prose-h2:text-3xl prose-h2:border-l-4 prose-h2:pl-4 prose-p:text-gray-300 prose-h2:font-mono" style={{'--tw-prose-bullets': primaryColor, '--tw-prose-links': primaryColor, '--tw-prose-quotes': primaryColor} as React.CSSProperties}>
          <h2 style={{ borderColor: primaryColor, color: primaryColor }}>// Context</h2>
          <p dangerouslySetInnerHTML={{ __html: caseStudy.context }} />

          <h2 style={{ borderColor: primaryColor, color: primaryColor }}>// Problem</h2>
          <p dangerouslySetInnerHTML={{ __html: caseStudy.problem }} />
          
          <h2 style={{ borderColor: primaryColor, color: primaryColor }}>// Approach</h2>
          <p dangerouslySetInnerHTML={{ __html: caseStudy.approach }} />
          
          <h2 style={{ borderColor: primaryColor, color: primaryColor }}>// Outcome</h2>
          <p dangerouslySetInnerHTML={{ __html: caseStudy.outcome }} />
        </div>
        
        {caseStudy.galleryImages && caseStudy.galleryImages.length > 0 && (
            <div className="mt-16 border-t border-gray-700/50 pt-12">
                 <h2 className="text-3xl font-bold font-mono mb-8 text-center" style={{ color: primaryColor, textShadow: '0 0 8px currentColor' }}>// Project_Gallery</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {caseStudy.galleryImages.map(image => (
                        <div key={image.id} className="card-border p-2">
                            <img src={image.url} alt={image.caption} className="w-full object-cover"/>
                            <p className="text-center text-sm text-gray-400 mt-2 font-mono p-2">{image.caption}</p>
                        </div>
                    ))}
                 </div>
            </div>
        )}
        
        <div className="text-center mt-16 border-t border-gray-700/50 pt-8">
            <Link to="/case-studies" className="inline-block text-black font-semibold py-3 px-6 rounded-lg transition-all" style={{backgroundColor: primaryColor, boxShadow: `0 0 20px 0 ${primaryColor}55`}}>
                &larr; Back to Case Studies
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetailPage;