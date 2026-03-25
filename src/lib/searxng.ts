import axios from 'axios';
import { getSearxngApiEndpoint } from '../config';

interface SearxngSearchOptions {
  categories?: string[];
  engines?: string[];
  language?: string;
  pageno?: number;
}

interface SearxngSearchResult {
  title: string;
  url: string;
  img_src?: string;
  thumbnail_src?: string;
  thumbnail?: string;
  content?: string;
  author?: string;
  iframe_src?: string;
}

type UnresponsiveEngine = [string, string];

export const searchSearxng = async (
  query: string,
  opts?: SearxngSearchOptions,
) => {
  const searxngURL = getSearxngApiEndpoint();

  const url = new URL(`${searxngURL}/search?format=json`);
  url.searchParams.append('q', query);

  if (opts) {
    Object.keys(opts).forEach((key) => {
      if (Array.isArray(opts[key])) {
        url.searchParams.append(key, opts[key].join(','));
        return;
      }
      url.searchParams.append(key, opts[key]);
    });
  }

  const res = await axios.get(url.toString());

  const results: SearxngSearchResult[] = res.data.results;
  const suggestions: string[] = res.data.suggestions;
  const unresponsiveEngines: UnresponsiveEngine[] =
    res.data.unresponsive_engines || [];

  const requestedEngines =
    opts?.engines?.map((engine) => engine.trim().toLowerCase()) || [];
  const unresponsiveRequestedEngines = unresponsiveEngines.filter(([engine]) =>
    requestedEngines.includes(engine.toLowerCase()),
  );

  if (
    requestedEngines.length > 0 &&
    results.length === 0 &&
    unresponsiveRequestedEngines.length === requestedEngines.length
  ) {
    const details = unresponsiveRequestedEngines
      .map(([engine, reason]) => `${engine}: ${reason}`)
      .join(', ');

    throw new Error(
      `SearXNG engines unavailable (${details}). This is usually caused by CAPTCHA or anti-bot blocking.`,
    );
  }

  return { results, suggestions, unresponsiveEngines };
};
