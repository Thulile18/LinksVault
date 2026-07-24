import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import LinkForm from './Components/LinkForm'; 
import LinkList from './Components/LinkList';
import type { Link, LinkFormData } from './Types';

export default function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<string>('');

  useEffect(() => {
    const savedLinks = localStorage.getItem('links');
    
    if (savedLinks !== null && savedLinks !== '') {
      try {
        const parsedLinks = JSON.parse(savedLinks);
        setLinks(parsedLinks);
      } catch (error) {
        setLinks([]);
      }
    } else {
      setLinks([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  const triggerNotification = (message: string, type: string) => {
    setAlertMessage(message);
    setAlertType(type);
    
    setTimeout(() => {
      setAlertMessage('');
      setAlertType('');
    }, 3000);
  };

  const addLink = (formData: LinkFormData) => {
    const rawTags = formData.tags.split(',');
    const cleanTags: string[] = [];

    for (let i = 0; i < rawTags.length; i++) {
      const currentTag = rawTags[i].trim();
      if (currentTag !== '') {
        cleanTags.push(currentTag);
      }
    }

    const newLinkObject: Link = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      url: formData.url.trim(),
      description: formData.description.trim(),
      tags: cleanTags,
      createdAt: new Date().toISOString()
    };

    const updatedLinksList = [newLinkObject, ...links];
    setLinks(updatedLinksList);
    
    triggerNotification('Link saved successfully!', 'success');
  };

  const deleteLink = (id: string) => {
    const keptLinks: Link[] = [];

    for (let i = 0; i < links.length; i++) {
      if (links[i].id !== id) {
        keptLinks.push(links[i]);
      }
    }

    setLinks(keptLinks);
    triggerNotification('Link deleted successfully!', 'success');
  };

  const updateLink = (id: string, updatedData: Partial<Link>) => {
    const freshLinksList: Link[] = [];

    for (let i = 0; i < links.length; i++) {
      const currentLink = links[i];

      if (currentLink.id === id) {
        const changedLink: Link = {
          id: currentLink.id,
          title: updatedData.title !== undefined ? updatedData.title : currentLink.title,
          url: updatedData.url !== undefined ? updatedData.url : currentLink.url,
          description: updatedData.description !== undefined ? updatedData.description : currentLink.description,
          tags: updatedData.tags !== undefined ? updatedData.tags : currentLink.tags,
          createdAt: currentLink.createdAt
        };
        freshLinksList.push(changedLink);
      } else {
        freshLinksList.push(currentLink);
      }
    }

    setLinks(freshLinksList);
    triggerNotification('Link updated successfully!', 'success');
  };

  const getFilteredLinks = () => {
    const matchedLinks: Link[] = [];
    const lowerSearch = searchTerm.toLowerCase();

    for (let i = 0; i < links.length; i++) {
      const item = links[i];

      const titleMatches = item.title.toLowerCase().includes(lowerSearch);
      const descMatches = item.description.toLowerCase().includes(lowerSearch);
      const urlMatches = item.url.toLowerCase().includes(lowerSearch);

      let tagMatches = false;
      for (let j = 0; j < item.tags.length; j++) {
        if (item.tags[j].toLowerCase().includes(lowerSearch)) {
          tagMatches = true;
        }
      }

      if (titleMatches || descMatches || urlMatches || tagMatches) {
        matchedLinks.push(item);
      }
    }

    return matchedLinks;
  };

  const currentDisplayList = getFilteredLinks();

  return (
    <div className="app">
      <Header />
      
      {alertMessage !== '' && (
        <div className={`notification ${alertType}`}>
          {alertMessage}
        </div>
      )}

      <div className="container">
        <div className="left-section">
          <LinkForm onAddLink={addLink} />
        </div>
        
        <div className="right-section">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          
          <div className="link-count">
            {currentDisplayList.length === 1 ? '1 link found' : `${currentDisplayList.length} links found`}
          </div>
          
          <LinkList 
            links={currentDisplayList} 
            onDelete={deleteLink}
            onUpdate={updateLink}
          />
        </div>
      </div>
    </div>
  );
}
