import { Box, Button, Checkbox, Flex, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { getUsers } from "controllers/getUsers";
import { NextPage } from "next";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "src/components/Header";
import { Heading } from "src/components/Heading";
import { Pagination } from "src/components/Pagination";
import { Menu } from "src/components/Sidebar/Menu";
import { useQuery } from "react-query";

const Users: NextPage = () => {

    const { data, isLoading, error } = useQuery('users', async () => {
        const users = await getUsers();
        return users;
    })

    const isWideVersion = useBreakpointValue({
        base: false,
        md: true
    })

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
                        <Heading />

                        <Link href="/users/create" passHref>
                            <Button as="a" size="sm" fontSize="sm" colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                                Criar novo
                            </Button>
                        </Link>
                    </Flex>
                    {
                        isLoading ?
                            (<Flex justify="center"><Spinner /></Flex>) :
                            error ? (
                                <Flex justify="center">
                                    <Text>Falhaao obter dados do usuário</Text>
                                </Flex>
                            ) :
                                (
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
                                                <Tr>
                                                    <Td px={["4", "4", "6"]}>
                                                        <Checkbox colorScheme="pink" />
                                                    </Td>
                                                    <Td>
                                                        <Box>
                                                            <Text fontWeight="bold">Renan Carvalho</Text>
                                                            <Text fontSize="sm" color="gray.300">rcsti.dev@gmail.com</Text>
                                                        </Box>
                                                    </Td>
                                                    {isWideVersion &&
                                                        <Td>
                                                            04 de Abril, 2021
                                                        </Td>
                                                    }
                                                    <Td>
                                                        <Button as="a" size="sm" fontSize="sm" colorScheme="purple"
                                                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}>
                                                            {isWideVersion && 'Editar'}
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td px={["4", "4", "6"]}>
                                                        <Checkbox colorScheme="pink" />
                                                    </Td>
                                                    <Td>
                                                        <Box>
                                                            <Text fontWeight="bold">Renan Carvalho</Text>
                                                            <Text fontSize="sm" color="gray.300">rcsti.dev@gmail.com</Text>
                                                        </Box>
                                                    </Td>
                                                    {isWideVersion &&
                                                        <Td>
                                                            04 de Abril, 2021
                                                        </Td>
                                                    }
                                                    <Td>
                                                        <Button as="a" size="sm" fontSize="sm" colorScheme="purple"
                                                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}>
                                                            {isWideVersion && 'Editar'}
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td px={["4", "4", "6"]}>
                                                        <Checkbox colorScheme="pink" />
                                                    </Td>
                                                    <Td>
                                                        <Box>
                                                            <Text fontWeight="bold">Renan Carvalho</Text>
                                                            <Text fontSize="sm" color="gray.300">rcsti.dev@gmail.com</Text>
                                                        </Box>
                                                    </Td>
                                                    {isWideVersion &&
                                                        <Td>
                                                            04 de Abril, 2021
                                                        </Td>
                                                    }
                                                    <Td>

                                                        <Button as="a" size="sm" fontSize="sm" colorScheme="purple"
                                                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}>
                                                            {isWideVersion && 'Editar'}
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                        <Pagination />
                                    </>
                                )
                    }
                </Box>
            </Flex >
        </Box >

    );
}

export default Users