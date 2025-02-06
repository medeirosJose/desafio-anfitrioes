import { useEffect, useState } from 'react';
import HouseGrid from '@/components/house_grid/HouseGrid';
import SearchBar from '@/components/search_bar/SearchBar';
import Hero from '@/components/hero/Hero';

import { House } from '../../types/house';

/**
 * Página inicial
 * @returns {ReactNode} Página inicial
 */

const Home = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cidade, setCidade] = useState('');

  useEffect(() => {
    async function fetchHouses() {
      setIsLoading(true);

      try {
        const url = cidade
          ? `http://127.0.0.1:8000/acomodacoes?cidade=${encodeURIComponent(
              cidade
            )}`
          : 'http://127.0.0.1:8000/acomodacoes/';

        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar dados');
        const data: House[] = await response.json();
        setHouses(data);
      } catch (error) {
        console.error('Erro ao buscar casas:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHouses();
  }, [cidade]); // Dispara a busca sempre que `cidade` mudar

  return (
    <>
      <Hero />
      <SearchBar onSearch={setCidade} />
      <HouseGrid houses={houses} isLoading={isLoading} />
    </>
  );
};

export default Home;
