import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Link } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store";
import { setCustomUrl, setLoading } from '../store/shortLink';

export default function Home() {
  const dispatch = useDispatch();
  const [longUrl, setLongUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  const loading = useSelector((state: RootState) => state.shortLink.loading);
  const customUrl = useSelector((state: RootState) => state.shortLink.customUrl);

  const handleLongUrlChange = (e) => {
    setLongUrl(e.target.value);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));

    const urlPattern = /^(https?|http):\/\/[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    if (!urlPattern.test(longUrl)) {
      setError('Invalid URL');
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
        dispatch(setCustomUrl(data.slug));
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('An error occurred');
    }

    dispatch(setLoading(false));
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={10} p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor="longUrl">Long URL</FormLabel>
          <Input
            type="text"
            id="longUrl"
            value={longUrl}
            onChange={handleLongUrlChange}
            placeholder="Enter the long URL"
          />
          <FormLabel htmlFor="slug" mt={4}>
            Custom Slug
          </FormLabel>
          <InputGroup>
            <InputLeftAddon children='https://url.gillyhuga.com/' />
            <Input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter a custom slug (optional)"
            />
          </InputGroup>

          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={loading} type="submit">
          Create Short Link
        </Button>
      </form>
      {customUrl && (
        <Box mt={4} p={2} bg="gray.100">
          <strong>Short Link:</strong> <Link href={`${window.location.origin}/${customUrl}`}>{window.location.origin}/{customUrl}</Link>
        </Box>
      )}
    </Box>
  );
}
