import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  useClipboard,
  useMediaQuery,
  Grid,
} from '@chakra-ui/react';
import { FaLink } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  setSlug,
  setLoading,
  setError,
  setLongUrl,
} from '../store/shortLink';
import CustomUrlModal from './CustomUrlModal';

interface ShortLinkFormProps {
  customUrl: string | null;
}

const ShortLinkForm: React.FC<ShortLinkFormProps> = ({ customUrl }) => {
  const dispatch = useDispatch();
  const { longUrl, slug, loading, error } = useSelector(
    (state: RootState) => state.shortLink
  );
  const { hasCopied, onCopy } = useClipboard(
    customUrl ? `${window.location.origin}/${customUrl}` : ''
  );
  const [showCustomUrlModal, setShowCustomUrlModal] = useState(false);
  const [isLargerThanMobile] = useMediaQuery('(min-width: 480px)');

  useEffect(() => {
    const origin = window.location.origin;
  }, []);

  const handleLongUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLongUrl(e.target.value));
    dispatch(setError(null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setError(null));
    dispatch(setLoading(true));

    const urlPattern = /^(https?|http):\/\/[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    if (!urlPattern.test(longUrl)) {
      dispatch(setError('Invalid URL'));
      dispatch(setLoading(false));
      return;
    }

    try {
      const response = await fetch('/api/short-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, longUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setSlug(data.slug));
        setShowCustomUrlModal(true);
      } else {
        const errorData = await response.json();
        dispatch(setError(errorData.error));
      }
    } catch (error) {
      dispatch(setError('An error occurred'));
    }
    dispatch(setLoading(false));
  };

  const closeModal = () => {
    dispatch(setLongUrl(''));
    dispatch(setSlug(''));
    setShowCustomUrlModal(false);
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={10} p={4} border="1px solid #ccc" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor="longUrl">Long URL</FormLabel>
          <Input
            type="text"
            id="longUrl"
            height="3.5rem"
            value={longUrl}
            onChange={handleLongUrlChange}
            placeholder="Enter the long URL"
          />
          <Grid
            templateColumns={{ base: '1fr', md: '1fr 1fr' }}
            gap={4}
            alignItems="start"
            mt={4}
            minWidth="max-content"
          >
            <div>
              <FormLabel htmlFor="domain">Domain</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  height="3.5rem"
                  value="https://url.gillyhuga.com/"
                  isDisabled
                  w="100%"
                  bg="gray.200"
                />
              </InputGroup>
            </div>
            <div>
              <FormLabel htmlFor="slug">Custom Slug</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  id="slug"
                  value={slug}
                  height="3.5rem"
                  onChange={(e) => dispatch(setSlug(e.target.value))}
                  placeholder="Enter a custom slug (optional)"
                  width="100%"
                  flexShrink="0"
                />
              </InputGroup>
            </div>
          </Grid>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <Button
          leftIcon={<FaLink />}
          colorScheme="teal"
          variant="solid"
          rounded="md"
          size="lg"
          height="3.5rem"
          fontSize="1.2rem"
          type="submit"
          isLoading={loading}
          mt={4}
        >
          Shorten URL
        </Button>
      </form>
      {customUrl && (
        <CustomUrlModal
          isOpen={showCustomUrlModal}
          onClose={closeModal}
          customUrl={customUrl}
          onCopy={onCopy}
          hasCopied={hasCopied}
          isLargerThanMobile={isLargerThanMobile}
        />
      )}
    </Box>
  );
};

export default ShortLinkForm;
