import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, Box, Button, CloseButton, Dialog, Flex, Image, Menu, Portal, RadioGroup, SimpleGrid, Span, Text } from "@chakra-ui/react";
// Import Logo
import Logo from "@/assets/img/rithevil-logo.webp";
// Import Icons
import EN from "@/assets/icons/en-icon.png";
import KH from "@/assets/icons/kh-icon.png";
// Component
import { Tooltip } from "@/components/ui/tooltip";
// Icons
import { RiMenuUnfold2Line, RiMenuUnfoldLine } from "react-icons/ri";
import { LuChevronsUpDown, LuLayoutDashboard } from "react-icons/lu";
import { LiaBoxSolid } from "react-icons/lia";
import { GoTag } from "react-icons/go";
import { MdLogout, MdOutlineSettings } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";

import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";

const MotionBox = motion.create(Box);

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openDesktopMenu, setOpenDesktopMenu] = useState(true);
  const [openMobileMenu, setOpenMobileMenu] = useState(true);

  const navItemStyle = ({ isActive }: { isActive: boolean }) => ({
    align: "center",
    gap: "0.5rem",
    borderRadius: "0.25rem",
    px: "0.75rem",
    py: "0.5rem",
    color: isActive ? "#fff" : "#000",
    fontWeight: isActive ? "bold" : "normal",
    bg: isActive ? "#2e3095" : "transparent",
    transition: "all 0.3s",
    _hover: {
      bg: "#5758a9",
      color: "#fff",
    },
  });

  const navItemList = [
    {
      label: "Dashboard",
      icon: <LuLayoutDashboard />,
      url: "/admin/dashboard",
    },
    {
      label: "Product",
      icon: <LiaBoxSolid />,
      url: "/admin/product",
    },
    {
      label: "Category",
      icon: <GoTag />,
      url: "/admin/category",
    },
  ];

  const [isLangDialogOpen, setIsLangDialogOpen] = useState(false);
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const storedValue = localStorage.getItem("language");
    if (storedValue) {
      setLanguage(storedValue);
      changeLanguage(storedValue);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRadioChange = (newValue: any) => {
    const valueStr = typeof newValue === "string" ? newValue : newValue?.value;

    if (typeof valueStr === "string") {
      setLanguage(valueStr);
      localStorage.setItem("language", valueStr);
      changeLanguage(valueStr);
    } else {
      console.warn("Unexpected radio value:", newValue);
    }
  };

  return (
    <SimpleGrid position="sticky" top="0" left="0" color="#0b1215" boxShadow="sm">
      {/* Desktop Menu */}
      <Box display={{ base: "none", lg: "block" }}>
        {openDesktopMenu ? (
          <AnimatePresence>
            <MotionBox
              overflow="hidden"
              initial={{ width: 250, opacity: 0 }}
              animate={{ width: 250, opacity: 1 }}
              exit={{ width: 55, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Flex direction="column" width="250px" paddingInline="0.85rem" gap="0.75rem" pt="1.2rem">
                <Flex direction="column-reverse" gap="0.75rem" alignItems="center" justifyContent="space-between" width="100%">
                  <Flex justifyContent="center" width="100%" onClick={() => navigate("/")} bg="#000" rounded="md">
                    <Image src={Logo} alt="logo" height="100px" />
                  </Flex>
                  <Flex width="100%" justifyContent="flex-end" fontSize="2rem" cursor="pointer" onClick={() => setOpenDesktopMenu(!openDesktopMenu)}>
                    <RiMenuUnfold2Line />
                  </Flex>
                </Flex>
                <Flex direction="column" as="ul" gap="0.25rem">
                  <Text display="none" fontWeight="bold" fontSize="2xl" mb="0.35rem" pl="0.35rem">
                    Setting
                  </Text>
                  {navItemList.map((item, index) => (
                    <NavLink to={item.url} key={index}>
                      {({ isActive }) => (
                        <Flex as="li" {...navItemStyle({ isActive })} _hover={{ bg: "#5758a9", color: "#fff" }}>
                          <Flex justifyContent="center" alignItems="center" gap="0.5rem" height="100%">
                            <Box fontSize="1.5rem">{item.icon}</Box>
                            <Span>{item.label}</Span>
                          </Flex>
                        </Flex>
                      )}
                    </NavLink>
                  ))}
                </Flex>
                <Box position="absolute" bottom="0" left="0" paddingInline="0.85rem" mb="0.75rem" width="100%">
                  <SimpleGrid width="100%">
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <Flex
                          width="100%"
                          color="#000"
                          _hover={{ bg: "#5758a9", color: "#fff" }}
                          transition="all 0.3s"
                          alignItems="center"
                          justifyContent="space-between"
                          padding="0.5rem 0.75rem"
                          rounded="md"
                          border="1px solid #c5c5c5"
                        >
                          <Flex justifyContent="center" alignItems="center" gap="0.5rem" height="100%">
                            <Box>
                              <MdOutlineSettings size="1.5rem" />
                            </Box>
                            <Span>{t("setting")}</Span>
                          </Flex>
                          <LuChevronsUpDown size="1.25rem" />
                        </Flex>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content width="225px">
                            <Box>
                              <Menu.Item value="language" onSelect={() => setIsLangDialogOpen(true)}>
                                <Flex
                                  width="100%"
                                  alignItems="center"
                                  bg="#fff"
                                  gap="0.75rem"
                                  color="#000"
                                  padding="0.5rem 0.75rem"
                                  _hover={{ bg: "#5758a9", color: "#fff" }}
                                  transition="all 0.3s"
                                >
                                  <IoLanguage size="1.25rem" />
                                  <Text>{t("languages")}</Text>
                                </Flex>
                              </Menu.Item>
                              <Menu.Item value="logout" width="100%">
                                <Flex
                                  width="100%"
                                  alignItems="center"
                                  bg="#fff"
                                  gap="0.75rem"
                                  color="red"
                                  padding="0.5rem 0.75rem"
                                  _hover={{ bg: "#5758a9", color: "#fff" }}
                                  transition="all 0.3s"
                                  onClick={() => {
                                    localStorage.removeItem("isAdmin");
                                    navigate("/admin/login");
                                  }}
                                >
                                  <MdLogout size="1.25rem" /> {t("logout")}
                                </Flex>
                              </Menu.Item>
                            </Box>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </SimpleGrid>
                </Box>
              </Flex>
            </MotionBox>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <MotionBox
              overflow="hidden"
              initial={{ width: 55, opacity: 0 }}
              animate={{ width: 55, opacity: 1 }}
              exit={{ width: 250, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <Flex direction="column" width="55px" paddingInline="0.5rem" gap="2rem" pt="0.1rem">
                <Flex justifyContent="center" alignItems="center">
                  <Box fontSize="2rem" cursor="pointer" mt="1.2rem" onClick={() => setOpenDesktopMenu(!openDesktopMenu)}>
                    <RiMenuUnfoldLine />
                  </Box>
                </Flex>
                <Flex direction="column" as="ul" gap="0.25rem">
                  {navItemList.map((item, index) => (
                    <NavLink to={item.url} key={index}>
                      {({ isActive }) => (
                        <Tooltip content={item.label} showArrow positioning={{ placement: "right" }} openDelay={0} closeDelay={100}>
                          <Flex as="li" {...navItemStyle({ isActive })} _hover={{ bg: "#5758a9", color: "#fff" }}>
                            <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
                              <Box fontSize="1.5rem">{item.icon}</Box>
                            </Flex>
                          </Flex>
                        </Tooltip>
                      )}
                    </NavLink>
                  ))}
                </Flex>
                <Box position="absolute" bottom="0" left="0" paddingInline="0.5rem" mb="0.75rem" width="100%">
                  <SimpleGrid width="100%">
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <Box>
                          <Tooltip content={t("setting")} positioning={{ placement: "right" }} showArrow>
                            <Flex
                              align="center"
                              gap="0.5rem"
                              borderRadius="0.25rem"
                              px="0.25rem"
                              py="0.5rem"
                              color="#000"
                              bg="transparent"
                              transition="all 0.3s"
                              _hover={{
                                bg: "#5758a9",
                                color: "#fff",
                              }}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <MdOutlineSettings size="1.5rem" />
                            </Flex>
                          </Tooltip>
                        </Box>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content>
                            <Box>
                              <Menu.Item value="language" onSelect={() => setIsLangDialogOpen(true)}>
                                <Flex
                                  width="100%"
                                  alignItems="center"
                                  bg="#fff"
                                  gap="0.75rem"
                                  color="#000"
                                  px="0.75rem"
                                  py="0.5rem"
                                  _hover={{
                                    bg: "#000",
                                    color: "#2e3095",
                                  }}
                                  transition="all 0.3s"
                                >
                                  <IoLanguage size="1.25rem" />
                                  <Text>{t("languages")}</Text>
                                </Flex>
                              </Menu.Item>
                              <Menu.Item value="logout" width="100%">
                                <Flex
                                  width="100%"
                                  alignItems="center"
                                  bg="#fff"
                                  gap="0.75rem"
                                  color="red"
                                  padding="0.5rem 0.75rem"
                                  _hover={{
                                    bg: "#000",
                                    color: "#fff",
                                  }}
                                  transition="all 0.3s"
                                  onClick={() => {
                                    localStorage.removeItem("isAdmin");
                                    navigate("/admin/login");
                                  }}
                                >
                                  <MdLogout size="1.25rem" /> {t("logout")}
                                </Flex>
                              </Menu.Item>
                            </Box>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </SimpleGrid>
                </Box>
              </Flex>
            </MotionBox>
          </AnimatePresence>
        )}
      </Box>
      {/* Mobile Menu */}
      <Box display={{ base: "block", lg: "none" }}>
        {openMobileMenu ? (
          <AnimatePresence>
            <MotionBox
              overflow="hidden"
              initial={{ width: 55, opacity: 0 }}
              animate={{ width: 55, opacity: 1 }}
              exit={{ width: 250, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <Flex direction="column" width="55px" paddingInline="0.5rem" gap="2rem" pt="0.1rem">
                <Flex justifyContent="center" alignItems="center">
                  <Box fontSize="2rem" cursor="pointer" mt="1.2rem" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                    <RiMenuUnfoldLine />
                  </Box>
                </Flex>
                <Flex direction="column" as="ul" gap="0.25rem">
                  {navItemList.map((item, index) => (
                    <NavLink to={item.url} key={index}>
                      {({ isActive }) => (
                        <Tooltip content={item.label} showArrow positioning={{ placement: "right" }} openDelay={0} closeDelay={100}>
                          <Flex as="li" {...navItemStyle({ isActive })} _hover={{ bg: "#5758a9", color: "#fff" }}>
                            <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
                              <Box fontSize="1.5rem">{item.icon}</Box>
                            </Flex>
                          </Flex>
                        </Tooltip>
                      )}
                    </NavLink>
                  ))}
                </Flex>
                <Box position="absolute" bottom="0" left="0" paddingInline="0.5rem" mb="0.75rem" width="100%">
                  <SimpleGrid width="100%">
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <Box>
                          <Tooltip content={t("setting")} positioning={{ placement: "right" }} showArrow>
                            <Flex
                              align="center"
                              gap="0.5rem"
                              borderRadius="0.25rem"
                              px="0.25rem"
                              py="0.5rem"
                              color="#000"
                              bg="transparent"
                              transition="all 0.3s"
                              _hover={{
                                bg: "#5758a9",
                                color: "#fff",
                              }}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <MdOutlineSettings size="1.5rem" />
                            </Flex>
                          </Tooltip>
                        </Box>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content>
                            <Box>
                              <Menu.Item value="language" onSelect={() => setIsLangDialogOpen(true)}>
                                <Flex
                                  width="100%"
                                  alignItems="center"
                                  bg="#fff"
                                  gap="0.75rem"
                                  color="#000"
                                  px="0.75rem"
                                  py="0.5rem"
                                  _hover={{
                                    bg: "#000",
                                    color: "#2e3095",
                                  }}
                                  transition="all 0.3s"
                                >
                                  <IoLanguage size="1.25rem" />
                                  <Text>{t("languages")}</Text>
                                </Flex>
                              </Menu.Item>
                              <Menu.Item value="logout" width="100%">
                                <Flex
                                  width="100%"
                                  alignItems="center"
                                  bg="#fff"
                                  gap="0.75rem"
                                  color="red"
                                  padding="0.5rem 0.75rem"
                                  _hover={{
                                    bg: "#000",
                                    color: "#fff",
                                  }}
                                  transition="all 0.3s"
                                  onClick={() => {
                                    localStorage.removeItem("isAdmin");
                                    navigate("/admin/login");
                                  }}
                                >
                                  <MdLogout size="1.25rem" /> {t("logout")}
                                </Flex>
                              </Menu.Item>
                            </Box>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </SimpleGrid>
                </Box>
              </Flex>
            </MotionBox>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <MotionBox
              overflow="hidden"
              initial={{ width: 250, opacity: 0 }}
              animate={{ width: 250, opacity: 1 }}
              exit={{ width: 55, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Flex direction="column" width="250px" paddingInline="0.85rem" gap="0.75rem" pt="1.2rem">
                <Flex direction="column-reverse" gap="0.75rem" alignItems="center" justifyContent="space-between" width="100%">
                  <Flex justifyContent="center" width="100%" onClick={() => navigate("/")} bg="#000" rounded="md">
                    <Image src={Logo} alt="logo" height="100px" />
                  </Flex>
                  <Flex width="100%" justifyContent="flex-end" fontSize="2rem" cursor="pointer" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                    <RiMenuUnfold2Line />
                  </Flex>
                </Flex>
                <Flex direction="column" as="ul" gap="0.25rem">
                  <Text display="none" fontWeight="bold" fontSize="2xl" mb="0.35rem" pl="0.35rem">
                    Setting
                  </Text>
                  {navItemList.map((item, index) => (
                    <NavLink to={item.url} key={index}>
                      {({ isActive }) => (
                        <Flex as="li" {...navItemStyle({ isActive })} _hover={{ bg: "#5758a9", color: "#fff" }}>
                          <Flex justifyContent="center" alignItems="center" gap="0.5rem" height="100%">
                            <Box fontSize="1.5rem">{item.icon}</Box>
                            <Span>{item.label}</Span>
                          </Flex>
                        </Flex>
                      )}
                    </NavLink>
                  ))}
                </Flex>
                <Box position="absolute" bottom="0" left="0" paddingInline="0.85rem" mb="0.75rem" width="100%">
                  <SimpleGrid width="100%">
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <Flex
                          width="100%"
                          color="#000"
                          _hover={{ bg: "#5758a9", color: "#fff" }}
                          transition="all 0.3s"
                          alignItems="center"
                          justifyContent="space-between"
                          padding="0.5rem 0.75rem"
                          rounded="md"
                          border="1px solid #c5c5c5"
                        >
                          <Flex justifyContent="center" alignItems="center" gap="0.5rem" height="100%">
                            <Box>
                              <MdOutlineSettings size="1.5rem" />
                            </Box>
                            <Span>{t("setting")}</Span>
                          </Flex>
                          <LuChevronsUpDown size="1.25rem" />
                        </Flex>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content width="225px">
                            <Box>
                              <Menu.Item value="language" onSelect={() => setIsLangDialogOpen(true)}>
                                <Flex
                                  width="100%"
                                  alignItems="center"
                                  bg="#fff"
                                  gap="0.75rem"
                                  color="#000"
                                  padding="0.5rem 0.75rem"
                                  _hover={{ bg: "#5758a9", color: "#fff" }}
                                  transition="all 0.3s"
                                >
                                  <IoLanguage size="1.25rem" />
                                  <Text>{t("languages")}</Text>
                                </Flex>
                              </Menu.Item>
                              <Menu.Item value="logout" width="100%">
                                <Flex
                                  width="100%"
                                  alignItems="center"
                                  bg="#fff"
                                  gap="0.75rem"
                                  color="red"
                                  padding="0.5rem 0.75rem"
                                  _hover={{ bg: "#5758a9", color: "#fff" }}
                                  transition="all 0.3s"
                                  onClick={() => {
                                    localStorage.removeItem("isAdmin");
                                    navigate("/admin/login");
                                  }}
                                >
                                  <MdLogout size="1.25rem" /> {t("logout")}
                                </Flex>
                              </Menu.Item>
                            </Box>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </SimpleGrid>
                </Box>
              </Flex>
            </MotionBox>
          </AnimatePresence>
        )}
      </Box>
      {/*//? Language Dialog */}
      <Dialog.Root open={isLangDialogOpen} onOpenChange={({ open }) => setIsLangDialogOpen(open)} placement="center" motionPreset="none">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content padding="1.25rem" gap="1.25rem">
              <Dialog.Header>
                <Dialog.Title>{t("choose_language")}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <RadioGroup.Root defaultValue={language} onValueChange={handleRadioChange}>
                  <Flex direction="column" gap="1rem">
                    <RadioGroup.Item value="kh">
                      <RadioGroup.ItemHiddenInput />
                      <Flex width="100%" justifyContent="space-between" alignItems="center">
                        <RadioGroup.ItemText>
                          <Flex alignItems="center" gap="0.5rem">
                            <Avatar.Root shape="full" size="lg">
                              <Avatar.Fallback name="Khmer" />
                              <Avatar.Image src={KH} />
                            </Avatar.Root>
                            <Text>{t("khmer")}</Text>
                          </Flex>
                        </RadioGroup.ItemText>
                        <RadioGroup.ItemIndicator />
                      </Flex>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="en">
                      <RadioGroup.ItemHiddenInput />
                      <Flex width="100%" justifyContent="space-between" alignItems="center">
                        <RadioGroup.ItemText>
                          <Flex alignItems="center" gap="0.5rem">
                            <Avatar.Root shape="full" size="lg">
                              <Avatar.Fallback name="English" />
                              <Avatar.Image src={EN} />
                            </Avatar.Root>
                            <Text>{t("english")}</Text>
                          </Flex>
                        </RadioGroup.ItemText>
                        <RadioGroup.ItemIndicator />
                      </Flex>
                    </RadioGroup.Item>
                  </Flex>
                </RadioGroup.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button px="0.5rem" onClick={() => setIsLangDialogOpen(false)}>
                  {t("close")}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </SimpleGrid>
  );
};

export default Sidebar;
