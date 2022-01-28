import type { NextPage } from 'next'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { Input } from 'src/components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


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
});

type SignInFormData = {
  email: string;
  password: string;
}

const SignIn: NextPage = () => {

  const { register, formState: { errors, isValid, isSubmitting }, handleSubmit } = useForm<SignInFormData>({
    mode: "onChange",
    resolver: yupResolver(validationSchema)
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(values);
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >

      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input type="email" label="E-mail" error={errors.email} {...register("email")} />
          <Input type="password" label="Senha" error={errors.password}  {...register("password")} autoComplete="on" />

        </Stack>

        <Button
          disabled={!isValid}
          type="submit"
          mt="6"
          colorScheme="pink"
          isLoading={isSubmitting}
        >Entrar</Button>

      </Flex>

    </Flex >
  )
}

export default SignIn
