'use client';

import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';

// Ensures Emotion styles are streamed on the server and match on the client
// with Next.js App Router to avoid hydration mismatches.
export function EmotionCacheProvider({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() => {
    const cache = createCache({ key: 'css', prepend: true });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    const { key, inserted } = cache;
    let styles = '';
    const names: string[] = [];
    for (const name in inserted) {
      if (name === 'global') continue;
      names.push(name);
      styles += inserted[name];
    }

    return (
      <style
        data-emotion={`${key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}