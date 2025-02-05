import { Card, Image, Stack, Text, Box, IconButton } from '@chakra-ui/react';
import { IoHeart } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HouseCardProps {
  id: number;
  nome: string;
  imagem: string;
  preco_noite: number;
  localizacao: string;
}

const HouseCard: React.FC<HouseCardProps> = ({
  id,
  nome,
  imagem,
  preco_noite,
  localizacao,
}) => {
  const navigate = useNavigate();

  // Verifica no localStorage se a casa foi favoritada
  const isFavorited = localStorage.getItem(`favorited_${id}`) === 'true';
  const [favorited, setFavorited] = useState<boolean>(isFavorited);

  // Função para alternar o estado de favoritado
  const toggleFavorite = () => {
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
          src={imagem}
          alt={nome}
          objectFit='cover'
          width='100%'
          height='100%'
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
            {localizacao}
          </Text>
          <Text fontWeight='semibold' fontSize='lg'>
            {nome}
          </Text>
          <Text fontWeight='bold' color='secondary.400' fontFamily={'heading'}>
            R$ {preco_noite.toFixed(2)} / noite
          </Text>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default HouseCard;
