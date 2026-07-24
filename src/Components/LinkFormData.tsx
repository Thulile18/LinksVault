import React, { useState } from 'react';

interface LinkData {
  title: string;
  url: string;
  description: string;
  tags: string;
}

interface LinkFormProps {
  onAddLink: (link: LinkData) => void;
}

export default function LinkForm({ onAddLink }: LinkFormProps) {
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title === '' || url === '' || description === '') {
      setErrorMessage('Please fill out all the required fields');
      return; 
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setErrorMessage('The URL must start with http:// or https://');
      return;
    }

    setErrorMessage('');

    const newLink: LinkData = {
      title: title,
      url: url,
      description: description,
      tags: tags
    };

    onAddLink(newLink);

    setTitle('');
    setUrl('');
    setDescription('');
    setTags('');
  };

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <h2>Add New Link</h2>
      
        <p className="error-message" style={{ color: 'red', fontWeight: 'bold' }}>
          {errorMessage}
        </p>
      )}

      <div className="form-group">
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter title here" 
        />
      </div>

      <div className="form-group">
        <label>URL:</label>
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="https://example.com" 
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Write a brief description..." 
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Tags (Optional):</label>
        <input 
          type="text" 
          value={tags} 
          onChange={(e) => setTags(e.target.value)} 
          placeholder="e.g. react, school, tutorial" 
        />
      </div>

      <button type="submit" className="submit-btn">
        Save Link
      </button>
    </form>
  );
}

