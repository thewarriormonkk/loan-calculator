import { useState, useEffect } from 'react';
import axios from 'axios';

export interface CurrencyRate {
  currency: string;
  rate: number;
}

type UseFetchExchangeRatesResult = {
  data: CurrencyRate[];
  isLoading: boolean;
  error: string | null;
};


export const useFetchExchangeRates = (url: string): UseFetchExchangeRatesResult  => {
  const [data, setData] = useState<CurrencyRate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        url = import.meta.env.VITE_API_URL;
        setIsLoading(true);
        const response = await axios({
            method: "get",
            url,
        });

        // transform the data into the format we need
        const currencyRates  = Object.entries(response.data.conversion_rates || {}).map(
          ([currency, rate]) => ({
            currency,
            rate: Number(rate)
          })
        );

        setData(currencyRates);
        setError(null);
      } catch (err) {
        setError(axios.isAxiosError(err) 
          ? err.response?.data?.message || err.message 
          : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchExchangeRates;