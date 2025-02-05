import { Box, Input, HStack, IconButton } from '@chakra-ui/react';
import { InputGroup } from '@/components/ui/input-group';
import { LuSearch, LuX } from 'react-icons/lu';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (cidade: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [cidade, setCidade] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCidade(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setCidade('');
    onSearch(''); // Envia string vazia para limpar a busca na Home
  };

  return (
    <Box
      mt={6}
      mb={2}
      mx='auto'
      maxW='container.sm'
      width={{
        base: '90%',
        sm: '50%',
      }}
    >
      <HStack gap='4' width='full'>
        <InputGroup
          flex='1'
          endElement={
            <LuSearch
              style={{
                marginRight: '1rem',
              }}
            />
          }
        >
          <>
            <Input
              value={cidade}
              onChange={handleSearch}
              ps='1.75em'
              placeholder='Buscar por cidade'
              fontFamily={'body'}
              borderRadius='full'
              borderColor='#fafafa'
              backgroundColor='#fafafa'
              _hover={{ borderColor: 'gray.200' }}
              _focus={{
                borderColor: 'gray.200',
                boxShadow: '0 0 0 1px gray.200',
              }}
            />
            {cidade && (
              <IconButton
                aria-label='Limpar busca'
                size='lg'
                onClick={clearSearch}
                variant='ghost'
                colorScheme='gray'
              >
                <LuX />
              </IconButton>
            )}
          </>
        </InputGroup>
      </HStack>
    </Box>
  );
};

export default SearchBar;
