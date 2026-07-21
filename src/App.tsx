import { useState, useEffect } from 'react'; 
import type { LinkItem } from './Types'; 
import LinkForm from './LinkForm';   
import LinkList from './LinkList';   
import './App.css';

function App() {
  const [links, setLinks] = useState<LinkItem[]>(() => {
    const savedLinks = localStorage.getItem('links_vault');
    return savedLinks ? JSON.parse(savedLinks) : [];
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  
  
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);

  useEffect(() => {
    localStorage.setItem('links_vault', JSON.stringify(links));
  }, [links]);

  
  const handleSaveLink = (linkData: { title: string; url: string; description: string; tags: string[] }) => {
    if (editingLink) {
     
      setLinks((prevLinks) =>
        prevLinks.map((link) => (link.id === editingLink.id ? { ...link, ...linkData } : link))
      );
      setEditingLink(null); 
    } else {
      
      const newLink: LinkItem = {
        id: crypto.randomUUID(),
        ...linkData
      };
      setLinks((prevLinks) => [newLink, ...prevLinks]);
    }
  };

  const handleDeleteLink = (idToFilter: string) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== idToFilter));
    
    if (editingLink?.id === idToFilter) setEditingLink(null);
  };

  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    return (
      link.title.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query) ||
      link.description.toLowerCase().includes(query) ||
      link.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="app-container">
      <h1> Links Vault</h1>
      
      <LinkForm 
        onSave={handleSaveLink} 
        editingLink={editingLink} 
        onCancelEdit={() => setEditingLink(null)} 
      />
      
      <div className="list-section">
        <h2>Your Collection</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title, tag, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <LinkList 
          links={filteredLinks} 
          onDelete={handleDeleteLink} 
          onEdit={setEditingLink} 
        />
      </div>
    </div>
  );
}

export default App;

