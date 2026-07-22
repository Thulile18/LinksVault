import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import LinkForm from './Components/LinkFormData';
import LinkList from './Components/LinkList';
import type { Link, LinkFormData } from './Types/Types';

const App: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const storedLinks = localStorage.getItem('links');
    if (storedLinks) {
      try {
        setLinks(JSON.parse(storedLinks));
      } catch (error) {
        console.error('Error loading links:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addLink = (formData: LinkFormData) => {
    const newLink: Link = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      url: formData.url.trim(),
      description: formData.description.trim(),
      tags: formData.tags ? formData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [],
      createdAt: new Date().toISOString(),
    };

    setLinks(prev => [newLink, ...prev]);
    showNotification('Link saved successfully!', 'success');
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter((link: Link) => link.id !== id));
    showNotification('Link deleted successfully!', 'success');
  };

  const updateLink = (id: string, updatedData: Partial<Link>) => {
    setLinks(prev =>
      prev.map((link: Link) =>
        link.id === id ? { ...link, ...updatedData } : link
      )
    );
    showNotification('Link updated successfully!', 'success');
  };

  const filteredLinks = links.filter((link: Link) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      link.title.toLowerCase().includes(searchLower) ||
      link.description.toLowerCase().includes(searchLower) ||
      link.url.toLowerCase().includes(searchLower) ||
      link.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="app">
      <Header />
      
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="container">
        <div className="left-section">
          <LinkForm onAddLink={addLink} />
        </div>
        
        <div className="right-section">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <div className="link-count">
            {filteredLinks.length} {filteredLinks.length === 1 ? 'link' : 'links'} found
          </div>
          <LinkList 
            links={filteredLinks} 
            onDelete={deleteLink}
            onUpdate={updateLink}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
