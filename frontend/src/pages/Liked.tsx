import { useEffect, useState } from 'react';
import HouseGrid from '@/components/house_grid/HouseGrid';

interface House {
  id: number;
  nome: string;
  imagem: string;
  preco_noite: number;
  localizacao: string;
}

const Liked = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHouses() {
      try {
        const response = await fetch('http://127.0.0.1:8000/acomodacoes/');
        if (!response.ok) throw new Error('Erro ao buscar dados');
        const data: House[] = await response.json();

        // filtra apenas as casas favorited no localStorage
        // melhor fazer assim do que salvar os dados da casa no localStorage, visto que pode sofrer alteracoes
        const likedHouses = data.filter(
          (house) => localStorage.getItem(`favorited_${house.id}`) === 'true'
        );

        setHouses(likedHouses);
      } catch (error) {
        console.error('Erro ao buscar casas:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHouses();
  }, []);

  return <HouseGrid houses={houses} isLoading={isLoading} />;
};

export default Liked;
