import { useEffect, useState } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import HouseGrid from '@/components/house_grid/HouseGrid';
import emptyImage from '@/assets/empty.svg';

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

        // Filtra apenas as casas favorited no localStorage
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

  return (
    <>
      {houses.length === 0 ? (
        <Box
          p={4}
          px={{ base: 4, sm: 8, md: 16 }}
          minHeight='90vh'
          textAlign='center'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Image src={emptyImage} />
          <Text mt={4} fontSize='lg' fontWeight='medium'>
            Você ainda não favoritou nenhuma acomodação.
          </Text>
          <Text fontSize='md' color='gray.600'>
            Descubra lugares incríveis e salve seus favoritos para acessá-los
            mais tarde!
          </Text>
          <Text mt={4} fontSize='md'>
            <Link to='/' style={{ color: '#3182CE', fontWeight: 'bold' }}>
              Explorar acomodações
            </Link>
          </Text>
        </Box>
      ) : (
        <HouseGrid houses={houses} isLoading={isLoading} />
      )}
    </>
  );
};

export default Liked;
