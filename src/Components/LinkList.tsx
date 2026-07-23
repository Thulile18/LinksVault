import React from 'react';
import type { Link } from '../Types';  
import LinkItem from './LinkItem';

interface LinkListProps {
  links: Link[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedLink: Partial<Link>) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, onDelete, onUpdate }) => {
  
  if (links.length === 0) {
    return (
      <div className="empty-state">
        <p> No links saved yet. Start adding your favorite links </p>
      </div>
    );
  }

  return (
    <div className="link-list">
      {links.map((link: Link) => (
        <LinkItem
          key={link.id}
          link={link}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default LinkList;