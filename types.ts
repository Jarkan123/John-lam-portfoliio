
export interface BrandLogo {
  id: string;
  name: string;
  logoUrl: string;
  visible: boolean;
  websiteUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface TextTestimonial {
  id: string;
  author: string;
  company: string;
  text: string;
  avatarUrl?: string;
  visible: boolean;
}

export interface VideoTestimonial {
  id: string;
  author: string;
  company: string;
  text: string; // Used for the description under the video
  videoUrl?: string;
  visible: boolean;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  coverImage: string;
  context: string;
  problem: string;
  approach: string;
  outcome: string;
  status: 'published' | 'draft';
  galleryImages?: Array<{
    id: string;
    url: string;
    caption: string;
  }>;
}

export interface SiteSettings {
  primaryColor: string;
  sliderSpeed: number;
  metaTitle: string;
  metaDescription: string;
  aboutMe: string;
}

export interface NavLink {
    id: string;
    label: string;
    path: string;
}

export interface CMSData {
  logos: BrandLogo[];
  services: Service[];
  textTestimonials: TextTestimonial[];
  videoTestimonials: VideoTestimonial[];
  caseStudies: CaseStudy[];
  settings: SiteSettings;
  navLinks: NavLink[];
}
