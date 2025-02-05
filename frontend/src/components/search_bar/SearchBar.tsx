import { Box, Input, HStack, List } from '@chakra-ui/react';
import { InputGroup } from '@/components/ui/input-group';
import { LuSearch } from 'react-icons/lu';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (cidade: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [cidade, setCidade] = useState('');
  const [complete, setComplete] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);

  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/cidades/');
        const data = await response.json();
        setCidades(data);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      }
    };
    fetchCidades();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCidade(value);
    onSearch(value);

    if (value) {
      const filtro = cidades.filter((cidade) =>
        cidade.toLowerCase().includes(value.toLowerCase())
      );
      setComplete(filtro);
    } else {
      setComplete([]);
    }
  };

  const selectCidade = (cidadeSelecionada: string) => {
    setCidade(cidadeSelecionada);
    setComplete([]);
    onSearch(cidadeSelecionada);
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
      id='search-bar'
    >
      <HStack gap='4' width='full' position='relative'>
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
          </>
        </InputGroup>
      </HStack>
      {complete.length > 0 && (
        <List.Root
          position='absolute'
          zIndex='10'
          backgroundColor='white'
          boxShadow='md'
          borderRadius='md'
          width='50%'
          mt={1}
        >
          {complete.map((cidade) => (
            <List.Item
              key={cidade}
              p={2}
              cursor='pointer'
              _hover={{ backgroundColor: 'gray.100' }}
              onClick={() => selectCidade(cidade)}
            >
              {cidade}
            </List.Item>
          ))}
        </List.Root>
      )}
    </Box>
  );
};

export default SearchBar;
