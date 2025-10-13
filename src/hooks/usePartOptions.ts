/**
 * 파츠 옵션 관리 커스텀 훅
 */

import { useState, useEffect } from "react";
import type { PartItem } from "@/types/parts";
import type { PartCategory } from "@/constants/parts";
import { getAllPartOptions, getDefaultPartOptions } from "@/utils/partUtils";

interface UsePartOptionsReturn {
  partOptions: Record<PartCategory, PartItem[]>;
  loading: boolean;
  error: Error | null;
}

export function usePartOptions(): UsePartOptionsReturn {
  const [partOptions, setPartOptions] = useState<
    Record<PartCategory, PartItem[]>
  >({
    head: getDefaultPartOptions("head"),
    body: getDefaultPartOptions("body"),
    legs: getDefaultPartOptions("legs"),
    shoes: getDefaultPartOptions("shoes"),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPartOptions = async () => {
      try {
        setError(null);
        const options = await getAllPartOptions();

        if (isMounted) {
          setPartOptions(options);
        }
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to load part options");
        console.error("Failed to load part options:", error);

        if (isMounted) {
          setError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPartOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  return { partOptions, loading, error };
}
