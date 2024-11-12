import useSWR, { SWRConfiguration } from "swr";
import { clientFetcher } from "@/utils/api";

export function useApi<T>(url: string, config?: SWRConfiguration) {
  const { data, ...rest } = useSWR(url, (url) => clientFetcher<T>(url), config);
  const apiData = data?.data;

  return { data: apiData, ...rest };
}
