import { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Image,
  IconButton,
  useBreakpointValue,
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

const Header = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      bg='whiteAlpha.900'
      px={{ base: 4, sm: 16 }}
      py={4}
      boxShadow='0 2px 10px rgba(0, 0, 0, 0.1)'
    >
      <Flex align='center' justify='space-between'>
        <Image src={logo} alt='Logo' height={{ base: 8, sm: 12 }} />

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
