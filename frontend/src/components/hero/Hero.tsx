import { Box, Flex, Image, Text } from '@chakra-ui/react';
import heroImage from '../../assets/searchHouse.svg';

const Hero = () => {
  return (
    <Box bg='gray.200' py={16} px={6}>
      <Flex
        maxW='1200px'
        mx='auto'
        align='center'
        justify='space-between'
        flexDirection={{ base: 'column', md: 'row' }}
        gap={8}
      >
        <Box flex={1} position='relative' overflow='hidden' borderRadius='xl'>
          <Image
            src={heroImage}
            alt='Imagem de destino de férias'
            objectFit='cover'
            width='100%'
            height={{ base: '250px', md: '400px' }}
          />
        </Box>

        {/* Texto à direita */}
        <Box flex={1} textAlign={{ base: 'center', md: 'left' }} pl={{ md: 8 }}>
          <Text
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight='bold'
            fontFamily={'heading'}
            mb={6}
            color='gray.800'
            lineHeight='1.2'
          >
            Procurando um lugar para passar as férias?
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'md' }}
            color='gray.600'
            fontFamily={'body'}
            mb={8}
            lineHeight='1.6'
            textAlign='justify'
          >
            Encontre a acomodação perfeita para sua viagem! Seja uma casa
            aconchegante nas montanhas, um apartamento moderno na cidade ou uma
            cabana à beira-mar, nós temos opções que combinam com o seu estilo.
            Reserve com facilidade e viva experiências inesquecíveis.
          </Text>
          {/* <Button
            colorScheme='teal'
            size='lg'
            px={8}
            fontWeight='bold'
            _hover={{ bg: 'teal.600' }}
          >
            Explorar Destinos
          </Button> */}
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
