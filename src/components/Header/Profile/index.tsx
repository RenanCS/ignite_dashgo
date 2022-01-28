import { Flex, Box, Text, Avatar } from "@chakra-ui/react"
import { ProfileProsps } from './interface';

export const Profile: React.FC<ProfileProsps> = ({ showProfileData = true }) => {
    return (

        <Flex
            align="center">

            {showProfileData &&
                <Box
                    mr="4"
                    textAlign="right"
                >
                    <Text>
                        Renan Carvalho
                    </Text>
                    <Text
                        color="gray.300"
                        fontSize="small">
                        rcsti.dev@gmail.com
                    </Text>
                </Box>
            }
            <Avatar
                size="md"
                name="Renan Carvalho"
                src="https://github.com/RenanCS.png" />
        </Flex>

    )
}