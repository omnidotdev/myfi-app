import { useCallback, useEffect, useState } from "react";

import type { TagGroup } from "@/features/tags/types/tag";
import { API_URL } from "@/lib/config/env.config";

/**
 * Fetch tag groups (with nested tags) for the active book
 */
const useTagGroups = (bookId: string | null) => {
  const [tagGroups, setTagGroups] = useState<TagGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTagGroups = useCallback(async () => {
    if (!bookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/tags/groups?bookId=${bookId}`);

      if (!res.ok) return;

      const data = await res.json();

      setTagGroups(data.groups ?? []);
    } catch {
      // Degrade gracefully when tags are unavailable
    } finally {
      setIsLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchTagGroups();
  }, [fetchTagGroups]);

  return { tagGroups, isLoading };
};

export default useTagGroups;
