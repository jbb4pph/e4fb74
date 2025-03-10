export const fetchData = async <T>(
  url: string,
  query?: Record<string, any>
): Promise<T> => {

  try {
    const params: string = (() => {
      if (!query) return '';
      const p = new URLSearchParams(query);
      return `?${p.toString()}`;
    })();

    const response = await fetch(url + params);

    if (!response.ok) {
      throw new Error(
        `Server responded with HTTP ${response.status} - ${response.statusText}`
      );
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchData:", error);
    throw error;
  }
}

