import React, { useEffect } from 'react';

export default function LegacyRedirect({ to }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace(to);
    }
  }, [to]);

  return (
    <main className="container margin-vert--xl">
      <h1>This documentation page has moved</h1>
      <p>The page has a new canonical location.</p>
      <p><a href={to}>Continue to the updated page</a></p>
    </main>
  );
}
