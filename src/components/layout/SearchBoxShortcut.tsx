import hotkeys from 'hotkeys-js';
import React, { useEffect } from 'react';

export default function SearchBoxShortcut() {
  useEffect(() => {
    hotkeys('command+K', function (event, handler) {
      event.preventDefault();
      document.getElementById('search-field')?.focus();
    });
    return () => {
      hotkeys.unbind('command+K');
    };
  }, []);

  return (
    <div>
      <span className="hidden sm:block text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 rounded-md w-9">
        <span className="sr-only">Press </span>
        <kbd className="font-sans">
          <span title="Command">⌘</span>
        </kbd>
        <span className="sr-only"> and </span>
        <kbd className="font-sans">K</kbd>
        <span className="sr-only"> to search</span>
      </span>
    </div>
  );
}
