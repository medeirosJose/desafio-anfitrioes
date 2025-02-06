import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Box,
  Image,
  Text,
  Spinner,
  Button,
  IconButton,
  Icon,
  VStack,
  Flex,
} from '@chakra-ui/react';
import { IoHeart, IoHeartOutline, IoHome } from 'react-icons/io5';
import { Toaster, toaster } from '@/components/ui/toaster';
import { BreadcrumbLink, BreadcrumbRoot } from '@/components/ui/breadcrumb';

import { House } from '../../types/house';

/**
 * Página de detalhes da acomodação
 * @property {string} id - ID da acomodação
 *
 * @returns {ReactNode} Detalhes da acomodação
 */
const HouseDetail = () => {
  const { id } = useParams();
  const [house, setHouse] = useState<House | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isFavorited = localStorage.getItem(`favorited_${id}`) === 'true';
  const [favorited, setFavorited] = useState<boolean>(isFavorited);

  const toggleFavorite = () => {
    setFavorited((prev) => {
      const newFavorited = !prev;
      localStorage.setItem(`favorited_${id}`, newFavorited.toString());
      return newFavorited;
    });
  };

  useEffect(() => {
    async function fetchHouse() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/acomodacoes/${id}`);
        if (!response.ok) throw new Error('Acomodação não encontrada');
        const data: House = await response.json();
        setHouse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHouse();
  }, [id]);

  if (isLoading) {
    return <Spinner size='xl' />;
  }

  if (!house) {
    return <Text>Erro ao carregar acomodação</Text>;
  }

  return (
    <Box
      p={4}
      maxW={{ base: '100%', md: '60%' }}
      mx='auto'
      px={{ base: 6, md: 0 }}
      display='flex'
      flexDirection={{ base: 'column', md: 'column' }}
      gap={6}
    >
      <BreadcrumbRoot>
        <BreadcrumbLink href='/'>
          {' '}
          <IoHome />
          Acomodações
        </BreadcrumbLink>
        <BreadcrumbLink href={`/house/${id}`}>{house.name}</BreadcrumbLink>
      </BreadcrumbRoot>
      <Box position='relative' flex={{ md: 1 }}>
        <Image
          src={house.image}
          alt={house.name}
          borderRadius='lg'
          width='100%'
          height={{ base: 'auto', md: '400px' }}
          objectFit='cover'
        />

        <IconButton
          position='absolute'
          top='2'
          right='2'
          size='md'
          backgroundColor={'transparent'}
          _hover={{
            transform: 'scale(1.2)',
          }}
          onClick={toggleFavorite}
          rounded={'full'}
          aria-label='Salvar'
          display={{ base: 'flex', md: 'none' }}
        >
          {favorited ? (
            <IoHeart color='#ff4750' />
          ) : (
            <IoHeartOutline color='gray.600' />
          )}
        </IconButton>
      </Box>

      <VStack flex={1} align='start'>
        <Flex
          width='100%'
          justify='space-between'
          align='center'
          display={{ base: 'none', md: 'flex' }}
        >
          <Text fontSize='3xl' fontWeight='bold' color='gray.800'>
            {house.name}
          </Text>
          <Button
            variant='ghost'
            size='md'
            onClick={toggleFavorite}
            _hover={{ bg: 'gray.100' }}
          >
            <Icon
              as={favorited ? IoHeart : IoHeartOutline}
              color={favorited ? 'red.500' : 'gray.600'}
            />
            {favorited ? 'Salvo' : 'Salvar'}
          </Button>
        </Flex>

        <Text
          fontSize='3xl'
          fontFamily={'body'}
          color='gray.800'
          display={{ base: 'block', md: 'none' }}
        >
          {house.name}
        </Text>

        <Flex
          direction={{ base: 'column', md: 'row' }}
          width='100%'
          gap={6}
          mb={'6rem'}
        >
          <VStack align='start' flex={1}>
            <Text fontSize='lg' color='gray.700' fontFamily={'body'}>
              {house.location}
            </Text>

            <Text
              fontSize='md'
              color='gray.600'
              lineHeight='1.6'
              fontFamily={'body'}
            >
              Esta incrível acomodação oferece conforto e estilo para sua
              estadia. Localizada em uma área privilegiada, você terá acesso a
              comodidades modernas, como Wi-Fi rápido, cozinha equipada e uma
              vista deslumbrante. Perfeita para famílias, casais ou viajantes
              solitários que buscam uma experiência única.
            </Text>
          </VStack>

          <VStack align='start' flex={1}>
            <Text
              fontSize='2xl'
              fontWeight='semibold'
              color='secondary.400'
              fontFamily={'heading'}
            >
              R$ {house.price_night.toFixed(2)} / noite
            </Text>
            <Button
              colorScheme='teal'
              size='lg'
              width='100%'
              mt={4}
              fontFamily={'heading'}
              _hover={{ bg: '#ff8b3b' }}
              onClick={() =>
                toaster.create({
                  description: 'Reserva realizada!',
                  type: 'success',
                })
              }
            >
              Reservar Agora
            </Button>
          </VStack>
        </Flex>
        <Toaster />
      </VStack>
    </Box>
  );
};

export default HouseDetail;
