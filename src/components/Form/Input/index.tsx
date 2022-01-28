import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { InputProps } from "./interface";

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
    = ({ name, label, error = null, ...rest }, ref) => {
        return (
            <FormControl isInvalid={!!error}>
                {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

                <ChakraInput
                    name={name}
                    id={name}
                    type="email"
                    focusBorderColor="pink.500"
                    bgColor="gray.900"
                    variant="filled"
                    _hover={{
                        bgColor: 'gray.900'
                    }}
                    size="lg"
                    ref={ref}
                    {...rest}
                />

                {!!error && (
                    <FormErrorMessage>
                        {error.message}
                    </FormErrorMessage>
                )}
            </FormControl>
        );
    }

export const Input = forwardRef(InputBase);