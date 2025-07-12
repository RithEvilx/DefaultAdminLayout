import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Box, Button, Field, Flex, Heading, Image, Input } from "@chakra-ui/react";
// Import Image
import Logo from "@/assets/img/rithevil-logo.webp";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { email: "admin@gmail.com", password: "" } });

  const onSubmit = (data: FormValues) => {
    if (data.email === "admin@gmail.com" && data.password === "1") {
      localStorage.setItem("isAdmin", "true"); // Mark as logged in
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" minH="100dvh" bg="#fafafa" px="1rem" position="relative">
      <Link to="/">
        <Flex justifyContent="center" alignItems="center" bg="#000" rounded="md" boxSize="100px" mb="1rem" padding="0.5rem">
          <Image src={Logo} width="100%" height="100%" alt="logo" loading="lazy" />
        </Flex>
      </Link>
      <Box w="100%" maxW="400px" p="1.5rem" bg="#fff" borderRadius="md" shadow="sm" fontFamily="NunitoSans">
        <Heading fontSize="1.75rem" fontWeight="bold" mb="1.5rem" textAlign="center">
          {t("login")}
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="1.5rem">
            <Field.Root invalid={!!errors.email} position="relative">
              <Field.Label position="absolute" top="-0.65rem" left="1rem" fontSize="0.75rem" px="0.25rem" bg="white" zIndex="1" color="blue.500">
                {t("email")}
              </Field.Label>
              <Input
                type="email"
                rounded="sm"
                pl="1rem"
                border="1px solid"
                borderColor="blue.300"
                _focusVisible={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
                {...register("email", { required: t("email_address_is_required") })}
              />
              {errors.email && (
                <Field.ErrorText color="red.500" fontSize="xs" mt="0.5rem">
                  {errors.email.message}
                </Field.ErrorText>
              )}
            </Field.Root>
            <Field.Root invalid={!!errors.password} position="relative">
              <Field.Label position="absolute" top="-0.65rem" left="1rem" fontSize="0.75rem" px="0.25rem" bg="white" zIndex="1" color="blue.500">
                {t("password")}
              </Field.Label>
              <Input
                type="password"
                rounded="sm"
                pl="1rem"
                border="1px solid"
                borderColor="blue.300"
                _focusVisible={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
                {...register("password", { required: t("password_is_required") })}
              />
              {errors.password && (
                <Field.ErrorText color="red.500" fontSize="xs" mt="0.5rem">
                  {errors.password.message}
                </Field.ErrorText>
              )}
            </Field.Root>
          </Flex>

          <Button mt="1.5rem" w="100%" h="3rem" bg="black" color="white" _hover={{ bg: "gray.800" }} rounded="sm" type="submit">
            {t("continue")}
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
