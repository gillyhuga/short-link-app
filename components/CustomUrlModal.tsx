import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Link,
    Flex,
    Text,
    IconButton,
    Button,
    Box,
} from '@chakra-ui/react';
import { FaCopy } from 'react-icons/fa';

interface CustomUrlModalProps {
    customUrl: string | null;
    isOpen: boolean;
    onClose: () => void;
    onCopy: () => void;
    hasCopied: boolean;
    isLargerThanMobile: boolean;
}

const CustomUrlModal: React.FC<CustomUrlModalProps> = ({
    customUrl,
    isOpen,
    onClose,
    onCopy,
    hasCopied,
    isLargerThanMobile,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>✨ Your Link is Ready!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex my={4} p={2} rounded={'lg'} bg="gray.100" alignItems="center" justifyContent="space-between">
                        <Box>
                            <Text fontWeight="bold">Short Link:</Text>
                            <Link href={customUrl ? `${window.location.origin}/${customUrl}` : '#'}>
                                {window.location.origin}/{customUrl}
                            </Link>
                        </Box>
                        {isLargerThanMobile ? (
                            <Button
                                leftIcon={<FaCopy />}
                                size="sm"
                                colorScheme={hasCopied ? 'green' : 'teal'}
                                onClick={onCopy}
                                variant="outline"
                            >
                                {hasCopied ? 'Copied!' : 'Copy Link'}
                            </Button>
                        ) : (
                            <IconButton
                                aria-label="Copy Link"
                                size="sm"
                                variant="outline"
                                onClick={onCopy}
                                colorScheme={hasCopied ? 'green' : 'teal'}
                                icon={<FaCopy />}
                            />
                        )}
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomUrlModal;
