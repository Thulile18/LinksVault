import React, { useState } from 'react';
import type { Link } from '../Types'; 

interface LinkItemProps {
  link: Link;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedLink: Partial<Link>) => void;
}

export default function LinkItem({ link, onDelete, onUpdate }: LinkItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [editTitle, setEditTitle] = useState<string>(link.title);
  const [editUrl, setEditUrl] = useState<string>(link.url);
  const [editDescription, setEditDescription] = useState<string>(link.description);
  
  const [editTags, setEditTags] = useState<string>(link.tags.join(', '));

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const rawTags = editTags.split(',');
    const cleanTagsArray: string[] = [];

    for (let i = 0; i < rawTags.length; i++) {
      const trimmedTag = rawTags[i].trim();
      if (trimmedTag !== '') {
        cleanTagsArray.push(trimmedTag);
      }
    }

    onUpdate(link.id, {
      title: editTitle,
      url: editUrl,
      description: editDescription,
      tags: cleanTagsArray,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    
    setEditTitle(link.title);
    setEditUrl(link.url);
    setEditDescription(link.description);
    setEditTags(link.tags.join(', '));
  };

  if (isEditing === true) {
    return (
      <div className="link-item editing">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={editUrl}
          onChange={(e) => setEditUrl(e.target.value)}
          placeholder="URL"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description"
          rows={3}
        />
        <input
          type="text"
          value={editTags}
          onChange={(e) => setEditTags(e.target.value)}
          placeholder="Tags (comma separated)"
        />
        <div className="item-actions">
          <button onClick={handleSave} className="save-btn"> Save </button>
          <button onClick={handleCancel} className="cancel-btn"> Cancel </button>
        </div>
      </div>
    );
  }

  return (
    <div className="link-item">
      <div className="link-content">
        <h3>{link.title}</h3>
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-url">
          {link.url}
        </a>
        <p className="link-description">{link.description}</p>
        
        {link.tags.length > 0 && (
          <div className="link-tags">
            {link.tags.map((tag: string, index: number) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
        
        <small className="link-date">
          Added: {new Date(link.createdAt).toLocaleDateString()}
        </small>
      </div>
      <div className="item-actions">
        <button onClick={handleEdit} className="edit-btn"> Edit </button>
        <button onClick={() => onDelete(link.id)} className="delete-btn"> Delete </button>
      </div>
    </div>
  );
}

