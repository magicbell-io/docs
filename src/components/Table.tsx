import React from 'react';

export default function Table({ children }: { children: JSX.Element }) {
  return (
    <div className="overflow-hidden border border-gray-200 rounded-md my-4">
      <table>{children}</table>
    </div>
  );
}
