import type { Link } from '../Types'; 

interface LinkListProps {
  links: Link[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedLink: Partial<Link>) => void; 
}

export default function LinkList({ links, onDelete, onUpdate }: LinkListProps) {
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
                {link.tags.map((tag: string, index: number) => (
                  <span key={index} className="tag-pill">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="card-actions" style={{ gap: '12px' }}>
            <button 
              className="edit-btn"
              onClick={() => onUpdate(link.id, link)} 
              style={{ color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}
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
