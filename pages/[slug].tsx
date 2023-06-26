import React from 'react';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Params = {
    params: {
        slug: string;
    };
};

export const getServerSideProps = async ({ params }: Params) => {
    try {
        const { slug } = params;
        const url = await prisma.shortLink.findUnique({
            where: { slug },
        });

        if (url) {
            return {
                redirect: {
                    destination: url.longUrl,
                    permanent: false,
                },
            };
        } else {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
    } catch (error) {
        console.error(error);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
};

const Link: React.FC = () => {
    return (
        <div>
            Redirecting...
        </div>
    );
};

export default Link;
