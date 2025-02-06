import { Box, Input, HStack, List } from '@chakra-ui/react';
import { InputGroup } from '@/components/ui/input-group';
import { LuSearch } from 'react-icons/lu';
import { useState, useEffect, useRef } from 'react';

/**
 * Componente de barra de pesquisa
 *
 * @property {Function} onSearch - Função de busca
 * @property {string} cidade - Cidade a ser buscada
 *
 * @returns {ReactNode} Barra de pesquisa
 */

interface SearchBarProps {
  onSearch: (cidade: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [cidade, setCidade] = useState('');
  const [complete, setComplete] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setSelectedIndex(null);

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      if (selectedIndex === null || selectedIndex === complete.length - 1) {
        setSelectedIndex(0);
      } else {
        setSelectedIndex((prevIndex) => (prevIndex ?? 0) + 1);
      }
    } else if (event.key === 'ArrowUp') {
      if (selectedIndex === 0 || selectedIndex === null) {
        setSelectedIndex(complete.length - 1);
      } else {
        setSelectedIndex((prevIndex) => (prevIndex ?? 0) - 1);
      }
    } else if (event.key === 'Enter') {
      if (complete.length === 1) {
        selectCidade(complete[0]);
      } else if (selectedIndex !== null) {
        selectCidade(complete[selectedIndex]);
      }
    }
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
              ref={inputRef}
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
              onKeyDown={handleKeyDown}
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
          width='50%'
          mt={1}
        >
          {complete.map((cidade, index) => (
            <List.Item
              _marker={{ color: 'transparent' }}
              key={cidade}
              p={2}
              cursor='pointer'
              _hover={{ backgroundColor: 'gray.200' }}
              onClick={() => selectCidade(cidade)}
              backgroundColor={selectedIndex === index ? 'gray.200' : 'white'}
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
