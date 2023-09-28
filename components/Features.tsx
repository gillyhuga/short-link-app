import { Container, Box, chakra, Text, SimpleGrid, Flex, useColorModeValue } from '@chakra-ui/react';
import { FaDatabase, FaPencilAlt, FaLink } from 'react-icons/fa';

interface IFeature {
    heading: string;
    content: string;
    icon: JSX.Element;
}

const features: IFeature[] = [
    {
        heading: 'URL Shortening',
        content: 'Quickly generate concise links from long URLs for easy sharing.',
        icon: <FaLink size={28} />
    },
    {
        heading: 'Customizable Links',
        content: 'Personalize short links with custom aliases or slugs.',
        icon: <FaPencilAlt size={28} />
    },
    {
        heading: 'Stored Database',
        content: 'Save shortened URLs in a database for future reference and management.',
        icon: <FaDatabase size={28} />
    }
];

const Features = () => {
    return (
        <Container maxW="6xl" p={{ base: 5, md: 10 }}>
            <chakra.h3 fontSize="4xl" fontWeight="bold" mb={20} textAlign="center">
                Streamlined URL Sorting for Enhanced Productivity
            </chakra.h3>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10} mb={4}>
                {features.map((feature, index) => (
                    <Box
                        key={index}
                        bg={useColorModeValue('gray.100', 'gray.700')}
                        p={6}
                        rounded="lg"
                        textAlign="center"
                        pos="relative"
                    >
                        <Flex
                            p={2}
                            w="max-content"
                            color="white"
                            bg="teal.500"
                            rounded="md"
                            margin="0 auto"
                            pos="absolute"
                            left={0}
                            right={0}
                            top="-1.5rem"
                            boxShadow="lg"
                        >
                            {feature.icon}
                        </Flex>
                        <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
                            {feature.heading}
                        </chakra.h3>
                        <Text fontSize="md" mt={4}>
                            {feature.content}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default Features;
