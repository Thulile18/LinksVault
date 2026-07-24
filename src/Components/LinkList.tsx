import React from 'react';
import type { Link } from '../Types';  
import LinkItem from './LinkItem';

  links: Link[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedLink: Partial<Link>) => void;
}

export default function LinkList({ links, onDelete, onUpdate }: LinkListProps) {
  
  if (links.length === 0) {
    return (
      <div className="empty-state">
        <p> No links saved yet. Start adding your favorite links </p>
      </div>
    );
  }

  return (
    <div className="link-list">
      {links.map((link: Link) => {
        return (
          <LinkItem
            key={link.id}
            link={link}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
}
