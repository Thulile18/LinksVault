import { useState, useEffect } from 'react';
import type { LinkItem } from './Types';

interface LinkFormProps {
  onSave: (data: { title: string; url: string; description: string; tags: string[] }) => void;
  editingLink: LinkItem | null;
  onCancelEdit: () => void;
}

export default function LinkForm({ onSave, editingLink, onCancelEdit }: LinkFormProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title);
      setUrl(editingLink.url);
      setDescription(editingLink.description);
      setTags(editingLink.tags.join(', ')); 
    } else {
    
      setTitle('');
      setUrl('');
      setDescription('');
      setTags('');
    }
  }, [editingLink]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url || !description) return;

    const formattedUrl = url.trim().startsWith('http://') || url.trim().startsWith('https://')
      ? url.trim()
      : `https://${url.trim()}`;

    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    onSave({ title, url: formattedUrl, description, tags: tagArray });
  };

  return (
    <form onSubmit={handleSubmit} className="link-form">
      <h3>{editingLink ? 'Edit Vault Item' : 'Add New Link'}</h3>
      
      <div>
        <label>Title *</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>URL *</label>
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} required />
      </div>
      <div>
        <label>Description *</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Tags (comma-separated)</label>
        <input type="text" value={tags} onChange={e => setTags(e.target.value)} />
      </div>
      
      <div className="form-buttons" style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={{ flex: 1 }}>
          {editingLink ? 'Update Vault Item' : 'Save to Vault'}
        </button>
        {editingLink && (
          <button type="button" onClick={onCancelEdit} style={{ backgroundColor: '#8924a8' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

