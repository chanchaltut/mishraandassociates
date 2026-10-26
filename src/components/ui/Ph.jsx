import React from 'react';
import { SITE } from '../../data/site';
import { isPlaceholder } from '../../lib/format';

/**
 * Renders text, highlighting it when it is a [placeholder] in demo mode,
 * so the client can see at a glance which content still needs their input.
 */
export default function Ph({ children, as = 'span', className = '' }) {
  const Tag = as;
  if (SITE.demoMode && isPlaceholder(children)) {
    return (
      <Tag className={`ph ${className}`} title="Placeholder — to be provided">
        {children}
      </Tag>
    );
  }
  return className ? <Tag className={className}>{children}</Tag> : <>{children}</>;
}
