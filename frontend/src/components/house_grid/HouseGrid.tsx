import React from 'react';
import { Grid, Box, Skeleton } from '@chakra-ui/react';
import HouseCard from '../house_card/HouseCard';
import EmptyState from '../empty_state/EmptyState';

interface House {
  id: number;
  nome: string;
  imagem: string;
  preco_noite: number;
  localizacao: string;
}

interface HouseGridProps {
  houses: House[];
  isLoading: boolean;
}

const HouseGrid: React.FC<HouseGridProps> = ({ houses, isLoading }) => {
  return (
    <Box
      p={4}
      px={{
        base: 4,
        sm: 8,
        md: 16,
      }}
      mb={'4rem'}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      {!isLoading && houses.length > 0 ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={6}
          w='full'
          maxW='container.xxl'
          mx='auto'
        >
          {houses.map((house) => (
            <HouseCard
              key={house.id}
              id={house.id}
              nome={house.nome}
              imagem={house.imagem}
              preco_noite={house.preco_noite}
              localizacao={house.localizacao}
            />
          ))}
        </Grid>
      ) : null}

      {!isLoading && houses.length === 0 ? (
        <Box>
          <EmptyState
            title='Não encontramos nenhum resultado.'
            subtitle='Tente buscar por outra cidade!'
            showButton={false}
            minHeight='30vh'
          />
        </Box>
      ) : null}

      {isLoading ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={6}
          w='full'
          maxW='container.xxl'
          mx='auto'
        >
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} height='400px' borderRadius='xl' />
            ))}
        </Grid>
      ) : null}
    </Box>
  );
};

export default HouseGrid;
