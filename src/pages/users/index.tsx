import { Box, Button, Checkbox, Flex, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { useCallback, useContext, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "src/components/Header";
import { Heading } from "src/components/Heading";
import { Pagination } from "src/components/Pagination";
import { Menu } from "src/components/Sidebar/Menu";
import { AuthContext } from "src/contexts/AuthContext";
import { getUser } from "src/controllers/getUser";
import { meUser } from "src/controllers/meUser";
import { setupApiClient } from "src/services/axios/autentication";
import { useUsers } from "src/services/hooks/useUser";
import { queryClient } from "src/services/queryClient";
import { Library } from "src/util/readOnly";
import { withSSRAuth } from "src/util/withSSRAuth";


const Users: NextPage = () => {

    const { isAuthenticated } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1)
    const { data, isLoading, error, isFetching } = useUsers(currentPage);

    const isWideVersion = useBreakpointValue({
        base: false,
        md: true
    })

    const handlePerfetchUser = useCallback(async (userId: number) => {
        await queryClient.prefetchQuery(['user', String(userId)], async () => {
            return await getUser(userId)
        },
            {
                staleTime: Library.TIMEFRESHUSER
            });
    }, [])

    const renderTable = (): JSX.Element => {
        if (isLoading) {
            return (<Flex justify="center"><Spinner /></Flex>);
        }
        else if (error) {
            return (
                <Flex justify="center">
                    <Text>Falha ao obter dados do usuário</Text>
                </Flex>
            )
        }
        else {
            return (
                <>
                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                                    <Checkbox colorScheme="pink" />
                                </Th>
                                <Th>
                                    Usuário
                                </Th>
                                {isWideVersion &&
                                    <Th>
                                        Data Cadastro
                                    </Th>
                                }

                                <Th>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.users.map(user => (
                                    <Tr key={user.id}>
                                        <Td px={["4", "4", "6"]}>
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Link color="purple.400" onMouseEnter={() => handlePerfetchUser(user.id)}>
                                                    <Text fontWeight="bold">{user.name}</Text>
                                                </Link>
                                                <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                            </Box>
                                        </Td>
                                        {isWideVersion &&
                                            <Td>
                                                {user.createdAt}
                                            </Td>
                                        }
                                        <Td>
                                            <Button as="a" size="sm" fontSize="sm" colorScheme="purple"
                                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}>
                                                {isWideVersion && 'Editar'}
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                    <Pagination
                        totalCountOfRegisters={data.totalCount}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )
        }
    }



    return (
        <Box>
            <Header />

            <Flex
                w="100%"
                maxWidth={1480}
                my="6"
                mx="auto"
                px="6">

                <Menu />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading isFetching={!isLoading && isFetching} />

                        <NextLink href="/users/create" passHref>
                            <Button as="a" size="sm" fontSize="sm" colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                                Criar novo
                            </Button>
                        </NextLink>
                    </Flex>
                    {
                        renderTable()
                    }
                </Box>
            </Flex >
        </Box >

    );
}

export default Users


export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupApiClient(ctx);

    const authenticated = await meUser(apiClient);
    console.log(authenticated);


    return {
        props: {

        }
    }
})