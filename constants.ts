
import { CMSData } from './types';

export const ADMIN_CREDENTIALS = {
  username: 'john.lam.admin',
  password: 'PortfolioPassword123!',
};

export const INITIAL_CMS_DATA: CMSData = {
  logos: [
    { id: '1', name: 'GlaxoSmithKline (GSK)', logoUrl: 'https://i.imgur.com/eQ9h4Lp.png', visible: true, websiteUrl: 'https://www.gsk.com' },
    { id: '2', name: 'Sanlorenzo', logoUrl: 'https://i.imgur.com/00H8T8u.png', visible: true, websiteUrl: 'https://www.sanlorenzoyacht.com' },
    { id: '3', name: 'Bluegame', logoUrl: 'https://i.imgur.com/R3pTQb4.png', visible: true, websiteUrl: 'https://www.bluegame.it' },
    { id: '4', name: 'Fairline', logoUrl: 'https://i.imgur.com/y88z9Q0.png', visible: true, websiteUrl: 'https://www.fairline.com' },
    { id: '5', name: 'Bombardier', logoUrl: 'https://i.imgur.com/WbZ518X.png', visible: true, websiteUrl: 'https://bombardier.com' },
    { id: '6', name: 'Gulfstream', logoUrl: 'https://i.imgur.com/PfyY63e.png', visible: true, websiteUrl: 'https://www.gulfstream.com' },
    { id: '7', name: 'Dassault Falcon', logoUrl: 'https://i.imgur.com/9C3B6a8.png', visible: true, websiteUrl: 'https://www.dassaultfalcon.com' },
    { id: '8', name: 'O2H2O', logoUrl: 'https://i.imgur.com/c6k2gB5.png', visible: true, websiteUrl: '#' },
    { id: '9', name: 'Globetrotter', logoUrl: 'https://i.imgur.com/4zYf3fC.png', visible: true, websiteUrl: '#' },
    { id: '10', name: 'S&S Group', logoUrl: 'https://i.imgur.com/8QzF1S2.png', visible: true, websiteUrl: '#' },
    { id: '11', name: 'FE Credit', logoUrl: 'https://i.imgur.com/g0t5T6e.png', visible: true, websiteUrl: 'https://www.fecredit.com.vn' },
  ],
  services: [
    { id: '1', title: 'Marketing Consultant', description: 'Create a bespoke story for your brand to reach the right audience.' },
    { id: '2', title: 'Performance Marketing', description: 'Get your brand & products in front of the right users through digital advertising.' },
    { id: '3', title: 'AI Website', description: 'Deploy websites designed to convert customers using modern AI-driven workflows.' },
  ],
  textTestimonials: [
    { id: '1', author: 'Jane Doe', company: 'CEO, Tech Startup', text: "John's strategies doubled our lead generation in just one quarter. His data-led approach is a game-changer.", visible: true },
    { id: '2', author: 'Mark Robinson', company: 'Marketing Director, Enterprise Corp', text: "Working with John was a pleasure. He seamlessly integrated with our team and delivered outstanding results.", visible: true },
    { id: '4', author: 'Alex Johnson', company: 'CTO, Innovate Inc.', text: "The performance marketing campaigns John architected were flawless. We saw an immediate 300% ROI.", visible: true },
    { id: '5', author: 'Emily White', company: 'Founder, Eco Goods', text: "He built us an AI-powered website that not only looks fantastic but converts visitors into loyal customers. Incredible work.", visible: true },
  ],
  videoTestimonials: [
    { id: '3', author: 'Sarah Chen', company: 'Founder, E-commerce Brand', videoUrl: 'https_//www.youtube.com/embed/dQw4w9WgXcQ'.replace('_',''), text: "Watch Sarah's testimonial on how we scaled her brand.", visible: true },
    { id: '6', author: 'David Lee', company: 'VP of Growth, FinTech Solutions', videoUrl: 'https_//www.youtube.com/embed/dQw4w9WgXcQ'.replace('_',''), text: "Our user acquisition cost was slashed by 50% thanks to John's expertise.", visible: true },
  ],
  caseStudies: [
    {
      id: '1',
      slug: 'luxury-yacht-market-penetration',
      title: 'Luxury Yacht Market Penetration',
      shortDescription: 'How we increased market share for a premier yachting brand in a competitive landscape.',
      coverImage: 'https://picsum.photos/seed/yacht/800/600',
      context: 'A leading luxury yacht manufacturer wanted to expand its presence in the Asia-Pacific market, facing stiff competition from established local and international players.',
      problem: 'The primary challenge was low brand recognition and a lack of qualified leads from the target demographic in the APAC region.',
      approach: 'We developed a multi-channel digital strategy focusing on high-net-worth individuals. This included targeted social media campaigns on LinkedIn and exclusive lifestyle platforms, content marketing centered around the yachting lifestyle, and partnerships with luxury event organizers.',
      outcome: 'Achieved a 150% increase in qualified leads within the first year. Brand search volume in target countries grew by 80%, establishing a strong foothold in the market.',
      status: 'published',
      galleryImages: [
        { id: 'g1-1', url: 'https://picsum.photos/seed/yacht-gallery1/800/600', caption: 'Initial campaign creative.' },
        { id: 'g1-2', url: 'https://picsum.photos/seed/yacht-gallery2/800/600', caption: 'Data dashboard showing lead growth.' },
      ]
    },
    {
      id: '2',
      slug: 'e-commerce-ai-conversion-optimization',
      title: 'E-commerce AI Conversion Optimization',
      shortDescription: 'Boosting sales for an online retailer by implementing an AI-driven personalization engine.',
      coverImage: 'https://picsum.photos/seed/ecommerce/800/600',
      context: 'An e-commerce brand with high traffic was struggling with a low conversion rate. The user experience was generic and did not cater to individual shopper preferences.',
      problem: 'The goal was to increase the conversion rate and average order value without a massive website overhaul.',
      approach: 'We integrated an AI-powered personalization engine that analyzed user behavior in real-time. It delivered personalized product recommendations, dynamic content, and tailored promotional offers across the website and email campaigns.',
      outcome: 'The conversion rate improved by 35% within six months. Average order value saw a 20% uplift, and customer engagement metrics soared.',
      status: 'published',
      galleryImages: [
        { id: 'g2-1', url: 'https://picsum.photos/seed/ecom-gallery1/800/600', caption: 'A/B test results for the new recommendation engine.' },
        { id: 'g2-2', url: 'https://picsum.photos/seed/ecom-gallery2/800/600', caption: 'Personalized email campaign example.' },
        { id: 'g2-3', url: 'https://picsum.photos/seed/ecom-gallery3/800/600', caption: 'Heatmap showing increased user engagement.' },
      ]
    },
     {
      id: '3',
      slug: 'draft-case-study',
      title: 'Draft Case Study (Not Visible)',
      shortDescription: 'This is a draft and should not appear on the public site.',
      coverImage: 'https://picsum.photos/seed/draft/800/600',
      context: 'This is draft content.',
      problem: 'This is draft content.',
      approach: 'This is draft content.',
      outcome: 'This is draft content.',
      status: 'draft',
    },
  ],
  settings: {
    primaryColor: '#39ff14', // A vibrant green
    sliderSpeed: 50, // in seconds
    metaTitle: 'John Lam - Digital Growth Marketing',
    metaDescription: 'Expert growth strategist driving results for startups and enterprises with performance marketing and data-led decision making.',
    aboutMe: "I’m John Lam, a digital growth marketing consultant with half a decade of experience working at the intersection of strategy, performance, and technology. I help established brands and startups shape clear narratives, reach the right audiences, and convert attention into measurable growth through performance marketing, AI-powered websites, and data-led decision making. My experience spans brand building, paid media, and conversion-focused digital systems, with a strong focus on scalability and long-term impact.",
  },
  navLinks: [
    { id: '1', label: 'Home', path: '/' },
    { id: '2', label: 'Case Studies', path: '/case-studies' },
    { id: '3', label: 'Contact', path: '/contact' },
  ]
};