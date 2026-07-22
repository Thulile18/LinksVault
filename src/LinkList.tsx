import type { LinkItem } from './Types/Types';

interface LinkListProps {
  links: LinkItem[];
  onDelete: (id: string) => void;
  onEdit: (link: LinkItem) => void; 
}

export default function LinkList({ links, onDelete, onEdit }: LinkListProps) {
  if (links.length === 0) {
    return <p className="empty-message">Your vault is empty. Add your first link above!</p>;
  }

  return (
    <div className="link-grid">
      {links.map((link) => (
        <div key={link.id} className="link-card">
          <div className="card-body">
            <h3>{link.title}</h3>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="vault-url">
              {link.url}
            </a>
            <p className="vault-desc">{link.description}</p>
            
            {link.tags.length > 0 && (
              <div className="tags-container">
                {link.tags.map((tag, index) => (
                  <span key={index} className="tag-pill">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="card-actions" style={{ gap: '12px' }}>
            
            <button 
              className="delete-btn" 
              onClick={() => onEdit(link)} 
              style={{ color: '#4f46e5', background: 'none' }}
            >
               Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(link.id)}>
               Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
