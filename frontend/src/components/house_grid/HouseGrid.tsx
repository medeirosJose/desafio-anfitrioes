import React, { useState } from 'react';
import { Grid, Box, Skeleton, Button, HStack } from '@chakra-ui/react';
import HouseCard from '../house_card/HouseCard';
import EmptyState from '../empty_state/EmptyState';
import { IoChevronForwardSharp } from 'react-icons/io5';
import { IoChevronBackSharp } from 'react-icons/io5';

import { House } from '../../../types/house';

/**
 * Componente de grid de casas
 * @property {House[]} houses - Lista de elementos do tipo casa
 * @property {boolean} isLoading - Indica se a lista de casas está sendo carregada
 *
 * @returns {ReactNode} Grid de casas
 */

interface HouseGridProps {
  houses: House[];
  isLoading: boolean;
}

const HouseGrid: React.FC<HouseGridProps> = ({ houses, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHouses = houses.slice(indexOfFirstItem, indexOfLastItem);

  // funções de navegação entre as páginas
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToHouses();
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToHouses();
    }
  };

  // função para scroll suave até o elemento #houses
  const scrollToHouses = () => {
    const element = document.getElementById('search-bar');
    if (element) {
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 40,
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  const totalPages = Math.ceil(houses.length / itemsPerPage);

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
      {!isLoading && currentHouses.length > 0 ? (
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
          {currentHouses.map((house) => (
            <HouseCard
              key={house.id}
              id={house.id}
              name={house.name}
              image={house.image}
              price_night={house.price_night}
              location={house.location}
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

      {!isLoading && houses.length > 0 && totalPages > 1 ? (
        <HStack mt={'2rem'}>
          <Button onClick={prevPage} disabled={currentPage === 1}>
            <IoChevronBackSharp />
          </Button>
          <Button onClick={nextPage} disabled={currentPage === totalPages}>
            <IoChevronForwardSharp />
          </Button>
        </HStack>
      ) : null}
    </Box>
  );
};

export default HouseGrid;
