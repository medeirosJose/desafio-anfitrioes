import { useEffect, useState } from 'react';
import HouseGrid from '@/components/house_grid/HouseGrid';
import EmptyState from '@/components/empty_state/EmptyState';
import { Box, Heading, Text } from '@chakra-ui/react';

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
        <EmptyState
          title='Você ainda não favoritou nenhuma acomodação.'
          subtitle='Descubra lugares incríveis e salve seus favoritos para acessá-los mais tarde!'
          showButton={true}
          buttonText='Explorar acomodações'
          buttonLink='/'
        />
      ) : (
        <>
          <Box
            pt={4}
            px={{ base: 4, sm: 8, md: 16 }}
            width='full'
            textAlign='left'
          >
            <Heading as='h1' size='xl' fontWeight='bold' color='secondary.400'>
              Acomodações Favoritas
            </Heading>
            <Text fontSize='sm' color='gray.600' mt={2}>
              Aqui estão as casas que você marcou como favoritas!
            </Text>
          </Box>
          <HouseGrid houses={houses} isLoading={isLoading} />
        </>
      )}
    </>
  );
};

export default Liked;
