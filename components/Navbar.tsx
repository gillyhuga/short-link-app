import React from 'react';
import {
    Box,
    Flex,
    HStack,
    Link,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import { RiFlashlightFill } from 'react-icons/ri';
import { FaGithub } from 'react-icons/fa';

const GITHUB_REPO_LINK = 'https://github.com/gillyhuga/short-link-app';

export default function Navbar() {
    return (
        <Box px={4} bg={useColorModeValue('white', 'gray.800')}>
            <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
                <Icon as={RiFlashlightFill} h={8} w={8} />
                <HStack spacing={2} alignItems="center">
                    <Link href={GITHUB_REPO_LINK} isExternal>
                        <Flex
                            as="button"
                            p="0.6rem"
                            rounded="lg"
                            cursor="pointer"
                            _hover={{ bg: useColorModeValue('gray.300', 'gray.600') }}
                            bg={useColorModeValue('gray.200', 'gray.700')}
                            justify="center"
                        >
                            <Icon as={FaGithub} />
                        </Flex>
                    </Link>
                </HStack>
            </Flex>
        </Box>
    );
}


