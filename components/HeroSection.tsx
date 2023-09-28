import * as React from 'react';
import { chakra, Stack, Text, Box } from '@chakra-ui/react';

const HeroSection = () => {
    return (
        <div>
            <Stack p={{ base: 8, sm: 14 }} direction="column" spacing={6} alignItems="center">
                <Box py={2} px={3} bg="teal" w="max-content" color="white" rounded="md" fontSize="sm">
                    <Stack direction={{ base: 'column', sm: 'row' }}>
                        <Text fontWeight="bold">Shorten Your URLs Quickly! 🚀</Text>
                    </Stack>
                </Box>
                <chakra.h1
                    fontSize={{ base: '4xl', sm: '5xl' }}
                    fontWeight="bold"
                    textAlign="center"
                    maxW="600px"
                >
                    Easily Shorten URLs{' '}
                    <chakra.span color="teal" bg="linear-gradient(transparent 50%, #83e9e7 50%)">
                        with our service
                    </chakra.span>
                </chakra.h1>
                <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
                    Our URL shortening service provides a simple and convenient way to shorten long URLs
                    for easy sharing and tracking.
                </Text>
            </Stack>
        </div>
    );
};

export default HeroSection;
