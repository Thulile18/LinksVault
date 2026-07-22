import React, { useState } from 'react';
import type { LinkFormData } from '../Types/Types';

interface LinkFormProps {
  onAddLink: (link: LinkFormData) => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ onAddLink }) => {
  const [formData, setFormData] = useState<LinkFormData>({
    title: '',
    url: '',
    description: '',
    tags: '',
  });

  const [errors, setErrors] = useState<Partial<LinkFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    const fieldName = name as keyof LinkFormData;

    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<LinkFormData> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!formData.url.match(/^https?:\/\/.+/)) {
      newErrors.url = 'Please enter a valid URL (start with http:// or https://)';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onAddLink(formData);
      setFormData({
        title: '',
        url: '',
        description: '',
        tags: '',
      });
    }
  };

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <h2>Add New Link</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter link title"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="url">URL *</label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com"
          className={errors.url ? 'error' : ''}
        />
        {errors.url && <span className="error-message">{errors.url}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the link"
          className={errors.description ? 'error' : ''}
          rows={3}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (optional)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g., react, tutorial, coding (comma separated)"
        />
      </div>

      <button type="submit" className="submit-btn">
        Save Link
      </button>
    </form>
  );
};

export default LinkForm;
