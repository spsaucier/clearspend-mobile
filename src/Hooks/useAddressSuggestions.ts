import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

export type Suggestion = {
  primary_line: string;
  city: string;
  state: string;
  zip_code: string;
};

export interface SuggestionsResponse {
  id?: string;
  suggestions: Suggestion[];
  object?: string;
}

async function getAddresses(addressString: string) {
  const headers = {
    Authorization: 'Basic bGl2ZV9lMGY2MDlkM2MwZTk3NzYxYTQ0OTE2MGQ5NGE4NWRmNWU0NTo=',
  };

  const params = {
    address_prefix: addressString,
    geo_ip_sort: 'true',
  };

  const requestOptions = {
    headers,
  };
  return axios.post('https://api.lob.com/v1/us_autocompletions', params, requestOptions);
}

export { getAddresses };

const MIN_CHARS = 4;

const isValid = (search: string) => search && search.length >= MIN_CHARS;

export const useAddressSuggestions = () => {
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');
  const { refetch, data, ...rest } = useQuery<SuggestionsResponse, Error>(
    ['suggestions', search],
    () => getAddresses(search).then((res) => res.data),
    { enabled: false },
  );

  useEffect(() => {
    if (isValid(search) && search !== prevSearch) {
      refetch();
    }
  }, [prevSearch, search, refetch]);

  const setSearchAndPrevious = (newSearch: string) => {
    setPrevSearch(search);
    setSearch(newSearch);
  };

  return {
    ...rest,
    suggestions: data?.suggestions || [],
    setSearch: setSearchAndPrevious,
    search,
  };
};
