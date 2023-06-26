
import type { AppProps } from 'next/app';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { store } from "../store";
import { Provider } from 'react-redux';
import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <ChakraProvider>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </ChakraProvider>
    );
};

export default MyApp;