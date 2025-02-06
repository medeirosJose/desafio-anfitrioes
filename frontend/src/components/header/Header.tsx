import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Image,
  IconButton,
  useBreakpointValue,
  Link,
} from '@chakra-ui/react';
import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseTrigger,
} from '@/components/ui/drawer';
import { Avatar } from '@/components/ui/avatar';

import logo from '../../assets/logo.png';
import avatarImg from '../../assets/avatar.jpg';
import houseArt from '../../assets/house.svg';
import { IoMenu } from 'react-icons/io5';

/**
 * Componente de cabeçalho
 * @returns {ReactNode} Header
 */

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Box
      bg='whiteAlpha.900'
      px={{ base: 4, sm: 16 }}
      py={4}
      boxShadow='0 2px 10px rgba(0, 0, 0, 0.1)'
      position='sticky'
      left={0}
      right={0}
      zIndex={10}
      transition='top 0.3s ease'
      top={showHeader ? 0 : '-100px'}
    >
      <Flex align='center' justify='space-between'>
        <Link href='/'>
          <Image src={logo} alt='Logo' height={{ base: 8, sm: 12 }} />
        </Link>

        {isMobile ? (
          <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <IconButton aria-label='Abrir menu' variant='ghost'>
                <IoMenu />
              </IconButton>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader></DrawerHeader>
              <DrawerBody
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    alignItems: 'center',
                  }}
                >
                  <Avatar name='José Eduardo' src={avatarImg} size='lg' />
                  <Button asChild variant='ghost' width='100%'>
                    <a href='/'>Acomodações</a>
                  </Button>
                  <Button asChild variant='ghost' width='100%'>
                    <a href='/liked'>Salvos</a>
                  </Button>
                </Box>
                <Image src={houseArt} alt='House' width='80%' opacity={0.7} />
              </DrawerBody>
              <DrawerCloseTrigger />
            </DrawerContent>
          </DrawerRoot>
        ) : (
          <>
            <Flex align='center' gap={4} alignItems='center'>
              <Button asChild variant='ghost'>
                <a href='/'>Acomodações</a>
              </Button>
              <Button asChild variant='ghost'>
                <a href='/liked'>Salvos</a>
              </Button>
              <Avatar name='José Eduardo' src={avatarImg} />
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
