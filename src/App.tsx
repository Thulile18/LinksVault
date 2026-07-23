import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import LinkForm from './Components/LinkFormData';
import LinkList from './Components/LinkList';
import type { Link, LinkFormData } from './Types';

function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    console.log(' Looking for saved links...');
    const savedLinks = localStorage.getItem('links');
    
    if (savedLinks) {
      try {
        const parsedLinks = JSON.parse(savedLinks);
        console.log(' Found', parsedLinks.length, 'saved links');
        setLinks(parsedLinks);
      } catch (error) {
        console.error(' Error reading saved links:', error);
        setLinks([]);
      }
    } else {
      console.log(' No saved links found');
      setLinks([]);
    }
  }, []);

  useEffect(() => {
    console.log(' Saving', links.length, 'links to localStorage');
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  function showNotification(message: string, type: 'success' | 'error') {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  function addLink(formData: LinkFormData) {
    console.log(' Adding new link...');
    
    const newLink: Link = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      url: formData.url.trim(),
      description: formData.description.trim(),
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      createdAt: new Date().toISOString(),
    };

    console.log(' New link:', newLink.title);
    setLinks([newLink, ...links]);
    showNotification('Link saved successfully!', 'success');
  }

  function deleteLink(id: string) {
    console.log(' Deleting link...');
    setLinks(links.filter(link => link.id !== id));
    showNotification('Link deleted successfully!', 'success');
  }

  function updateLink(id: string, updatedData: Partial<Link>) {
    console.log(' Updating link...');
    setLinks(
      links.map(link => {
        if (link.id === id) {
          return { ...link, ...updatedData };
        }
        return link;
      })
    );
    showNotification('Link updated successfully!', 'success');
  }

  const filteredLinks = links.filter(link => {
    const search = searchTerm.toLowerCase();
    return (
      link.title.toLowerCase().includes(search) ||
      link.description.toLowerCase().includes(search) ||
      link.url.toLowerCase().includes(search) ||
      link.tags.some(tag => tag.toLowerCase().includes(search))
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
            {filteredLinks.length} {filteredLinks.length === 1 ? 'link' : 'links'} 
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
}

export default App;