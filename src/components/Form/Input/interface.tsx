import { InputProps as ChakraInputProps } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends ChakraInputProps {
    name: string;
    label: string;
    error?: FieldError;
}