import {Graph} from "./fetchGraph";

export const fetchData = async (
  url: string,
  query?: Record<string, any>
): Promise<Graph> => {

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

    const data: Graph = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchData:", error);
    throw error;
  }
}

