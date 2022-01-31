import { Heading as HeadingChakra, Spinner } from '@chakra-ui/react';
import { HeadingProps } from './interface';
export const Heading: React.FC<HeadingProps> = ({ isFetching }) => {
    return (
        <HeadingChakra size="lg" fontWeight="normal">
            Usuários
            {
                isFetching && <Spinner size="sm" color="gray.500" ml="4" />
            }
        </HeadingChakra>
    )
}