import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from "react-query";
import { Input } from "src/components/Form/Input";
import { Header } from "src/components/Header";
import { Menu } from "src/components/Sidebar/Menu";
import { saveUser } from 'src/controllers/saveUser';
import { queryClient } from "src/services/queryClient";
import { Library } from "src/util/readOnly";
import { withSSRAuth } from "src/util/withSSRAuth";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    password: yup
        .string()
        .min(4, "Password deve conter no mínimo 4 caracteres")
        .required("Password inválido"),
    email: yup
        .string()
        .min(8, "Email deve conter no mínimo 8 caracteres")
        .email('Email inválido')
        .required("E-mail inválido"),
    name: yup
        .string()
        .min(3, "Nome deve conter no mínimo 3 caracteres")
        .required("Nome inválido"),
    password_confirmation: yup
        .string()
        .oneOf([
            null, yup.ref('password')
        ], "As senhas precisam ser iguais")
});


type CreateUserFormData = {
    id: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}


const CreateUser: NextPage = () => {

    const router = useRouter();

    const createUser = useMutation(async (user: CreateUserFormData) => {
        const newUser = await saveUser(user)
        return newUser
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(Library.QUERYKEY)
        }
    });

    const { register, formState: { errors, isValid, isSubmitting }, handleSubmit, reset } = useForm<CreateUserFormData>({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await createUser.mutateAsync(values);
        reset();
        router.push('/users');
    };


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

                <Box
                    as="form"
                    onSubmit={handleSubmit(handleCreateUser)}
                    flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>

                    <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input label="Nome Completo" type="text"  {...register("name")} error={errors.name} />
                            <Input type="email" label="E-mail"  {...register("email")} error={errors.email} />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input type="password" label="Senha" {...register("password")} error={errors.password} autoComplete="on" />
                            <Input type="password" label="Confirmação da senha" {...register("password_confirmation")} error={errors.password_confirmation} autoComplete="on" />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button colorScheme="pink" type="submit" isLoading={isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>

    );
}

export default CreateUser


export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {

    return {
        props: {

        }
    }
}, {
    permissions: ['users.create'],
    roles: ['administrator']
})