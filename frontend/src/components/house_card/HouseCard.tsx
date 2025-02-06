import { Card, Image, Stack, Text, Box, IconButton } from '@chakra-ui/react';
import { IoHeart } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Propriedades do componente de card de casa
 * @property {number} id - ID da casa
 * @property {string} name - Nome da casa
 * @property {string} image - URL da imagem da casa
 * @property {number} price_night - Preço da casa por noite
 * @property {string} location - Localização da casa
 *
 * @returns {ReactNode} Componente de card de casa
 */

interface HouseCardProps {
  id: number;
  name: string;
  image: string;
  price_night: number;
  location: string;
}

const HouseCard: React.FC<HouseCardProps> = ({
  id,
  name,
  image,
  price_night,
  location,
}) => {
  const navigate = useNavigate();
  // Verifica no localStorage se a casa foi favoritada
  const isFavorited = localStorage.getItem(`favorited_${id}`) === 'true';
  const [favorited, setFavorited] = useState<boolean>(isFavorited);

  // Função para alternar o estado de favoritado
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // impede que o cique no ícone de favoritar tambem clique no card
    setFavorited((prev) => {
      const newFavorited = !prev;
      localStorage.setItem(`favorited_${id}`, newFavorited.toString());
      return newFavorited;
    });
  };

  return (
    <Card.Root
      width='100%'
      overflow='hidden'
      borderRadius='lg'
      onClick={() => navigate(`/house/${id}`)}
      _hover={{
        cursor: 'pointer',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box position='relative' height='20rem'>
        <Image
          src={image}
          alt={name}
          objectFit='cover'
          width='100%'
          height='100%'
          transition='transform 0.3s ease-in-out'
          _hover={{ transform: 'scale(1.02)' }}
        />
        {/* Botão de favoritar */}
        <IconButton
          position='absolute'
          top='2'
          right='2'
          size='md'
          backgroundColor={'transparent '}
          _hover={{
            scale: 1.2,
          }}
          onClick={toggleFavorite}
          rounded={'full'}
        >
          {favorited ? <IoHeart color='#ff4750' /> : <IoHeartOutline />}
        </IconButton>
      </Box>
      <Card.Body p='4' fontFamily={'body'}>
        <Stack>
          <Text fontSize='sm' color='gray.600'>
            {location}
          </Text>
          <Text fontWeight='semibold' fontSize='lg'>
            {name}
          </Text>
          <Text fontWeight='bold' color='secondary.400' fontFamily={'heading'}>
            R$ {price_night.toFixed(2)} / noite
          </Text>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default HouseCard;
