import { Box, Image, Text, Button } from '@chakra-ui/react';
import emptyImage from '@/assets/empty.svg';

/**
 * Componente de estado vazio
 *
 * @param {string} title - Título do estado vazio
 * @param {string} subtitle - Subtítulo do estado vazio
 * @param {boolean} showButton - Mostrar botão
 * @param {string} buttonText - Texto do botão
 * @param {string} buttonLink - Link do botão
 * @param {string} minHeight - Altura mínima do container
 *
 * @returns {ReactNode} Componente de estado vazio
 *
 */

interface EmptyStateProps {
  title: string;
  subtitle: string;
  showButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
  minHeight?: string;
}

const EmptyState = ({
  title,
  subtitle,
  showButton = false,
  buttonText = 'Explorar acomodações',
  buttonLink = '/',
  minHeight,
}: EmptyStateProps) => {
  return (
    <Box
      p={4}
      px={{ base: 4, sm: 8, md: 16 }}
      minHeight={minHeight || '100vh'}
      textAlign='center'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Image src={emptyImage} maxW='250px' />
      <Text mt={4} fontSize='lg' fontWeight='medium'>
        {title}
      </Text>
      <Text fontSize='md' color='gray.600'>
        {subtitle}
      </Text>
      {showButton && (
        <Button
          asChild
          variant='outline'
          color='#f1f1f1'
          bg={'secondary.400'}
          size='xl'
          mt={4}
        >
          <a href={buttonLink}>{buttonText}</a>
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
