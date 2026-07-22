import React, { useState } from 'react';
import type { Link } from '../Types'; 

interface LinkItemProps {
  link: Link;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedLink: Partial<Link>) => void;
}

const LinkItem: React.FC<LinkItemProps> = ({ link, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: link.title,
    url: link.url,
    description: link.description,
    tags: link.tags.join(', '),
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(link.id, {
      title: editData.title,
      url: editData.url,
      description: editData.description,
      tags: editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: link.title,
      url: link.url,
      description: link.description,
      tags: link.tags.join(', '),
    });
  };

  if (isEditing) {
    return (
      <div className="link-item editing">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Title"
        />
        <input
          type="text"
          value={editData.url}
          onChange={(e) => setEditData(prev => ({ ...prev, url: e.target.value }))}
          placeholder="URL"
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Description"
        />
        <input
          type="text"
          value={editData.tags}
          onChange={(e) => setEditData(prev => ({ ...prev, tags: e.target.value }))}
          placeholder="Tags (comma separated)"
        />
        <div className="item-actions">
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={handleCancel} className="cancel-btn">Cancel</button>
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
           {link.tags.map((tag, index: number) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
        <small className="link-date">Added: {new Date(link.createdAt).toLocaleDateString()}</small>
      </div>
      <div className="item-actions">
        <button onClick={handleEdit} className="edit-btn"> Edit</button>
        <button onClick={() => onDelete(link.id)} className="delete-btn"> Delete</button>
      </div>
    </div>
  );
};

export default LinkItem;

