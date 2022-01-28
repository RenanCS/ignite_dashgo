import { Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { PaginationItemProps } from "./interface";

export const PaginationItem: React.FC<PaginationItemProps> = ({ number, isCurrent = false }) => {

    const renderButtonCurrent = useCallback(() => {
        return <Button
            size="sm"
            fontSize="xs"
            width="4"
            colorScheme="pink"
            disabled
            _disabled={{ bgColor: 'pink.500', cursor: 'default' }}
        >
            {number}
        </Button>
    }, [number])

    const renderButtonDefault = useCallback(() => {
        return <Button
            size="sm"
            fontSize="xs"
            width="4"
            bg="gray.700"
            _hover={{ bg: 'gray.500' }}
        >
            {number}
        </Button>
    }, [number])


    return (
        <>
            {isCurrent ?
                renderButtonCurrent :
                renderButtonDefault
            }
        </>
    );
}