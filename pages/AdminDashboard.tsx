
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext.tsx';
import { BrandLogo, Service, TextTestimonial, VideoTestimonial, CaseStudy } from '../types.ts';

type AdminSection = 'settings' | 'logos' | 'services' | 'textTestimonials' | 'videoTestimonials' | 'caseStudies';

// --- Specialized Case Study Editor ---
const CaseStudyEditor: React.FC = () => {
    const { data, setData } = useCMS();
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(data.caseStudies);
    const [activeStudyId, setActiveStudyId] = useState<string | null>(caseStudies.length > 0 ? caseStudies[0].id : null);

    const handleUpdate = (id: string, field: keyof CaseStudy, value: any) => {
        setCaseStudies(prev => prev.map(cs => cs.id === id ? { ...cs, [field]: value } : cs));
    };
    
    const handleGalleryImageUpdate = (studyId: string, imageId: string, field: 'url' | 'caption', value: string) => {
        setCaseStudies(prev => prev.map(cs => {
            if (cs.id === studyId) {
                const updatedGallery = cs.galleryImages?.map(img => img.id === imageId ? { ...img, [field]: value } : img);
                return { ...cs, galleryImages: updatedGallery };
            }
            return cs;
        }));
    };
    
    const handleAddGalleryImage = (studyId: string) => {
        const newImage = { id: `g-${Date.now()}`, url: '', caption: '' };
        setCaseStudies(prev => prev.map(cs => cs.id === studyId ? { ...cs, galleryImages: [...(cs.galleryImages || []), newImage] } : cs));
    };

    const handleRemoveGalleryImage = (studyId: string, imageId: string) => {
        setCaseStudies(prev => prev.map(cs => {
            if (cs.id === studyId) {
                return { ...cs, galleryImages: cs.galleryImages?.filter(img => img.id !== imageId) };
            }
            return cs;
        }));
    };

    const handleSave = () => {
        setData(prev => ({ ...prev, caseStudies }));
        alert('Case Studies updated!');
    };

    const handleAddItem = () => {
        const slug = `new-case-study-${Date.now()}`;
        const newStudy: CaseStudy = {
            id: Date.now().toString(),
            title: 'New Case Study',
            slug: slug,
            shortDescription: '',
            coverImage: 'https://picsum.photos/seed/new/800/600',
            context: '',
            problem: '',
            approach: '',
            outcome: '',
            status: 'draft',
            galleryImages: []
        };
        setCaseStudies(prev => [...prev, newStudy]);
        setActiveStudyId(newStudy.id);
    };

    const handleDeleteItem = (id: string) => {
        if (window.confirm('Are you sure you want to delete this case study?')) {
            const updatedStudies = caseStudies.filter(cs => cs.id !== id);
            setCaseStudies(updatedStudies);
            if (activeStudyId === id) {
                setActiveStudyId(updatedStudies.length > 0 ? updatedStudies[0].id : null);
            }
        }
    };
    
    const activeStudy = caseStudies.find(cs => cs.id === activeStudyId);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Case Studies</h2>
                <div>
                    <button onClick={handleAddItem} className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 mr-4">Add New</button>
                    <button onClick={handleSave} className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">Save All Changes</button>
                </div>
            </div>

            <div className="flex -mx-4">
                <div className="w-1/3 px-4">
                    <div className="bg-gray-800 rounded-md p-4 h-full">
                        <h3 className="text-lg font-semibold mb-2">Entries</h3>
                        <ul className="space-y-1">
                            {caseStudies.map(cs => (
                                <li key={cs.id}>
                                    <button 
                                        onClick={() => setActiveStudyId(cs.id)}
                                        className={`w-full text-left p-2 rounded ${activeStudyId === cs.id ? 'bg-gray-700' : 'hover:bg-gray-900'}`}
                                    >
                                        {cs.title} <span className={`text-xs capitalize ${cs.status === 'published' ? 'text-green-400' : 'text-yellow-400'}`}>({cs.status})</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="w-2/3 px-4">
                    {activeStudy ? (
                        <div className="space-y-4 bg-gray-800 rounded-md p-4">
                             {/* --- Main Fields --- */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={activeStudy.title} onChange={e => handleUpdate(activeStudy.id, 'title', e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Slug</label>
                                    <input type="text" value={activeStudy.slug} onChange={e => handleUpdate(activeStudy.id, 'slug', e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                                    <input type="text" value={activeStudy.coverImage} onChange={e => handleUpdate(activeStudy.id, 'coverImage', e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <select value={activeStudy.status} onChange={e => handleUpdate(activeStudy.id, 'status', e.target.value as 'published' | 'draft')} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md">
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Short Description</label>
                                <textarea value={activeStudy.shortDescription} onChange={e => handleUpdate(activeStudy.id, 'shortDescription', e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" rows={3}></textarea>
                            </div>
                            
                            {(['context', 'problem', 'approach', 'outcome'] as const).map(field => (
                                <div key={field}>
                                    <label className="block text-sm font-medium capitalize mb-1">{field}</label>
                                    <textarea value={activeStudy[field]} onChange={e => handleUpdate(activeStudy.id, field, e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" rows={8}></textarea>
                                </div>
                            ))}

                            {/* --- Gallery Editor --- */}
                            <div className="pt-4 border-t border-gray-700">
                                <h4 className="text-lg font-semibold mb-2">Project Gallery</h4>
                                <div className="space-y-3">
                                    {activeStudy.galleryImages?.map(img => (
                                        <div key={img.id} className="grid grid-cols-12 gap-2 items-center">
                                            <div className="col-span-5">
                                                <input type="text" placeholder="Image URL" value={img.url} onChange={e => handleGalleryImageUpdate(activeStudy.id, img.id, 'url', e.target.value)} className="w-full p-1 bg-gray-600 border border-gray-500 rounded-md text-sm"/>
                                            </div>
                                            <div className="col-span-5">
                                                <input type="text" placeholder="Caption" value={img.caption} onChange={e => handleGalleryImageUpdate(activeStudy.id, img.id, 'caption', e.target.value)} className="w-full p-1 bg-gray-600 border border-gray-500 rounded-md text-sm"/>
                                            </div>
                                            <div className="col-span-2">
                                                <button onClick={() => handleRemoveGalleryImage(activeStudy.id, img.id)} className="w-full px-2 py-1 rounded-md text-white bg-red-600 hover:bg-red-700 text-xs">Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => handleAddGalleryImage(activeStudy.id)} className="mt-3 px-3 py-1 rounded-md text-white bg-gray-600 hover:bg-gray-500 text-sm">Add Image</button>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-700">
                                <button onClick={() => handleDeleteItem(activeStudy.id)} className="px-3 py-1 rounded-md text-white bg-red-600 hover:bg-red-700 text-sm">Delete This Case Study</button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-md p-4 h-full flex items-center justify-center">
                            <p>Select a case study to edit or add a new one.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Generic Editor for other sections ---
const GenericEditor = ({ section, title, fields }: { section: 'logos' | 'services' | 'textTestimonials' | 'videoTestimonials', title: string, fields: string[] }) => {
    const { data, setData } = useCMS();
    const [items, setItems] = useState<any[]>(data[section]);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        // A simple deep-ish comparison to see if changes have been made.
        if (JSON.stringify(items) !== JSON.stringify(data[section])) {
            setHasChanges(true);
        } else {
            setHasChanges(false);
        }
    }, [items, data, section]);

    const handleUpdate = (id: string, field: string, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSave = () => {
        setData(prev => ({ ...prev, [section]: items }));
        alert(`${title} updated!`);
        setHasChanges(false);
    };

    const handleAddItem = () => {
        const newItem: any = { id: Date.now().toString() };
        fields.forEach(field => {
          newItem[field] = field === 'visible' ? false : '';
        });
        setItems([...items, newItem]);
    };

    const handleDeleteItem = (id: string) => {
        if (window.confirm('Are you sure you want to delete this item? You must click "Save & Publish Changes" to make this permanent.')) {
            setItems(items.filter(item => item.id !== id));
        }
    };
    
    const renderInput = (item: any, field: string) => {
        const value = item[field];
        if (typeof value === 'boolean') {
            return <input type="checkbox" checked={value} onChange={(e) => handleUpdate(item.id, field, e.target.checked)} className="h-5 w-5 rounded" />;
        }
        if (field === 'description' || field === 'text') {
            return <textarea value={value} onChange={(e) => handleUpdate(item.id, field, e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" rows={3} />;
        }
        return <input type="text" value={value} onChange={(e) => handleUpdate(item.id, field, e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />;
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">{title}</h2>
                <button onClick={handleAddItem} className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700">Add New</button>
            </div>
            <div className="space-y-6">
                {items.map(item => (
                    <div key={item.id} className="p-4 bg-gray-800 rounded-md space-y-4">
                        {fields.map(field => (
                            <div key={field}>
                                <label className="block text-sm font-medium capitalize mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
                                {renderInput(item, field)}
                            </div>
                        ))}
                         <button onClick={() => handleDeleteItem(item.id)} className="px-3 py-1 rounded-md text-white bg-red-600 hover:bg-red-700 text-sm">Delete</button>
                    </div>
                ))}
            </div>
            <button 
                onClick={handleSave} 
                className={`mt-6 px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 ${hasChanges ? 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/50 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {hasChanges ? 'Save & Publish Changes' : `Save ${title}`}
            </button>
        </div>
    );
};

const SettingsEditor = () => {
    const { data, setData } = useCMS();
    const [settings, setSettings] = useState(data.settings);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        setSettings(prev => ({...prev, [name]: val}));
    };

    const handleSave = () => {
        setData(prev => ({...prev, settings}));
        alert('Settings saved!');
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Site Settings</h2>
            <div className="space-y-4 max-w-lg">
                <div>
                    <label className="block mb-1">Primary Color</label>
                    <input type="color" name="primaryColor" value={settings.primaryColor} onChange={handleChange} className="w-full h-10 p-1 bg-gray-700 border border-gray-600 rounded-md" />
                </div>
                <div>
                    <label className="block mb-1">Logo Slider Speed (seconds)</label>
                    <input type="number" name="sliderSpeed" value={settings.sliderSpeed} onChange={handleChange} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                </div>
                <div>
                    <label className="block mb-1">SEO Meta Title</label>
                    <input type="text" name="metaTitle" value={settings.metaTitle} onChange={handleChange} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                </div>
                <div>
                    <label className="block mb-1">SEO Meta Description</label>
                    <textarea name="metaDescription" value={settings.metaDescription} onChange={handleChange} rows={3} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                </div>
                <div>
                    <label className="block mb-1">About Me Section</label>
                    <textarea name="aboutMe" value={settings.aboutMe} onChange={handleChange} rows={8} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                </div>
                <button onClick={handleSave} className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">Save Settings</button>
            </div>
        </div>
    )
}

// --- Main Dashboard Component ---
const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { data } = useCMS();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>('settings');

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };
  
  const NavItem = ({ section, label }: {section: AdminSection, label: string}) => (
    <button 
        onClick={() => setActiveSection(section)}
        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeSection === section ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}
    >
        {label}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-4 space-y-2 flex flex-col flex-shrink-0">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <a href="/#/" target="_blank" rel="noopener noreferrer" 
            className="w-full text-center px-4 py-2 mb-4 rounded-md transition-colors font-semibold"
            style={{ backgroundColor: data.settings.primaryColor, color: '#000' }}
        >
            Visit Site
        </a>
        <NavItem section="settings" label="Site Settings" />
        <NavItem section="logos" label="Brand Logos" />
        <NavItem section="services" label="Services" />
        <NavItem section="textTestimonials"label="Text Testimonials" />
        <NavItem section="videoTestimonials" label="Video Testimonials" />
        <NavItem section="caseStudies" label="Case Studies" />
         <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-md hover:bg-red-800/50 text-red-400 mt-auto">
            Logout
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {activeSection === 'settings' && <SettingsEditor />}
        {activeSection === 'logos' && <GenericEditor section="logos" title="Brand Logos" fields={['name', 'logoUrl', 'websiteUrl', 'visible']} />}
        {activeSection === 'services' && <GenericEditor section="services" title="Services" fields={['title', 'description']} />}
        {activeSection === 'textTestimonials' && <GenericEditor section="textTestimonials" title="Text Testimonials" fields={['author', 'company', 'text', 'visible']} />}
        {activeSection === 'videoTestimonials' && <GenericEditor section="videoTestimonials" title="Video Testimonials" fields={['author', 'company', 'text', 'videoUrl', 'visible']} />}
        {activeSection === 'caseStudies' && <CaseStudyEditor />}
      </main>
    </div>
  );
};

export default AdminDashboard;