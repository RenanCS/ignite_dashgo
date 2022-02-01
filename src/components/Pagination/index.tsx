import { Box, Stack, Text } from "@chakra-ui/react";
import { genertePagesArray } from "src/util/genertePagesArray";
import { Library } from "src/util/readOnly";
import { PaginationProps } from "./interface";
import { PaginationItem } from "./PaginationItem";


export const Pagination: React.FC<PaginationProps> = ({
    totalCountOfRegisters,
    registersPerPage = 10,
    currentPage = 1,
    onPageChange
}) => {

    const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

    const previousPages = currentPage > 1
        ? genertePagesArray(currentPage - 1 - Library.SIBLIGNSCOUNT, currentPage - 1)
        : []

    const nextPages = currentPage < lastPage
        ? genertePagesArray(currentPage, Math.min(currentPage + Library.SIBLIGNSCOUNT, lastPage))
        : []

    return (
        <Stack
            direction={["column", "row"]}
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
            <Stack direction="row" spacing="2">
                {currentPage > (1 + Library.SIBLIGNSCOUNT) && (
                    <>
                        <PaginationItem onPageChange={onPageChange} number={1} />
                        {currentPage > (2 + Library.SIBLIGNSCOUNT) &&
                            <Text color="gray.300" width="8" textAlign="center">...</Text>
                        }
                    </>
                )}

                {previousPages && previousPages.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} />

                })}

                <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

                {nextPages && nextPages.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
                })}

                {(currentPage + Library.SIBLIGNSCOUNT) < lastPage && (
                    <>
                        {(currentPage + 1 + Library.SIBLIGNSCOUNT) < lastPage && <Text>...</Text>}
                        <PaginationItem onPageChange={onPageChange} number={lastPage} />
                    </>
                )}
            </Stack>
        </Stack>
    );
}