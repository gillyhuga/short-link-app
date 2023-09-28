import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    chakra,
    Container,
} from '@chakra-ui/react';

const qnaData = [
    {
        question: 'What is a URL shortener?',
        answer: "A URL shortener transforms long URLs into shorter links that redirect to the intended destination, often allowing customization for branding and readability, potentially increasing click rates.",
    },
    {
        question: 'How do I use a URL shortener?',
        answer: 'Using a URL shortener is easy. You simply input a long URL, and the tool generates a shorter link that you can share with others.',
    },
    {
        question: 'Can I track the performance of short URLs?',
        answer: 'Yes, many URL shorteners provide analytics to track click-through rates and other data to monitor the performance of your short links.',
    },
    {
        question: 'Are short URLs permanent?',
        answer: 'The permanence of short URLs depends on the URL shortening service you use. Some services allow you to set expiration dates for short links, while others offer permanent links.',
    },
    {
        question: 'Is it safe to click on short URLs?',
        answer: 'In general, short URLs from reputable sources are safe to click. However, be cautious when clicking on short links from unknown or suspicious sources, as they may lead to harmful websites.',
    },
];

const QnaAccordion = () => {
    return (
        <Container maxW="6xl" p={{ base: 5, md: 10 }}>
            <chakra.h3 fontSize="4xl" fontWeight="bold" textAlign="center">
                FAQ
            </chakra.h3>
            <chakra.h2 fontSize="2xl" fontWeight="bold" mb={10} textAlign="center">
                Frequently Asked Questions
            </chakra.h2>
            <Accordion allowToggle>
                {qnaData.map((qna, index) => (
                    <AccordionItem key={index}>
                        {({ isExpanded }) => (
                            <>
                                <h2>
                                    <AccordionButton
                                        _hover={{ bg: 'gray.100' }}
                                        fontSize="xl"
                                        padding="16px"
                                    >
                                        <Box as="span" flex="1" textAlign="left">
                                            {qna.question}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel
                                    pb={4}
                                    _expanded={{
                                        bg: 'gray.100',
                                        borderRadius: 'md',
                                        boxShadow: 'md',
                                        padding: '16px',
                                    }}
                                >
                                    {qna.answer}
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
                ))}
            </Accordion>
        </Container>
    );
};

export default QnaAccordion;
