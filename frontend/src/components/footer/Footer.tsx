import { Box, Text, Stack, Highlight } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { LuExternalLink } from 'react-icons/lu';

/**
 * Componente de rodapé
 * @returns {ReactNode} Footer
 */

const Footer = () => {
  return (
    <Box
      bg='whiteAlpha.900'
      px={4}
      py={4}
      width='100%'
      boxShadow='0 -2px 10px rgba(0, 0, 0, 0.1)'
      textAlign='center'
      mt='auto'
    >
      <Stack align='center'>
        <Text>© {new Date().getFullYear()}</Text>
        <Text textStyle={'xs'}>
          Implementação de Software por{' '}
          <Link variant='underline' href='https://medeirosjose.dev/'>
            <Highlight
              query={['José Eduardo Medeiros Jochem']}
              styles={{ px: '0.5', bg: 'text.100' }}
            >
              {' José Eduardo Medeiros Jochem '}
            </Highlight>
            <LuExternalLink />
          </Link>
        </Text>
        <Text fontStyle='xs'></Text>
      </Stack>
    </Box>
  );
};

export default Footer;
