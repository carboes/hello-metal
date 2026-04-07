import { useCallback, useEffect, useState } from 'react';

import { API } from '../constants';

interface UseDogImageResult {
  imageUrl: string | null;
  loading: boolean;
  error: boolean;
  fetch: () => void;
}

export function useDogImage(): UseDogImageResult {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await globalThis.fetch(API.DOG_RANDOM_IMAGE);
      const data = await res.json();
      setImageUrl(data.message);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { imageUrl, loading, error, fetch };
}
