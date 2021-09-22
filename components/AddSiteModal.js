import {
  Button,
  FormControl, FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import {useRef} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import useSWR, {useSWRConfig} from 'swr';
import {createSite} from "@/lib/db";
import {useAuth} from "@/lib/auth";

const schema = yup.object().shape({
  name: yup.string().required(),
  url: yup.string().url().required(),
});

const AddSiteModal = ({children}) => {
  const { mutate } = useSWRConfig()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });
  const {user} = useAuth();
  const toast = useToast();
  const onSubmit = ({name, url}) => {
    const newSite = {
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      name,
      url
    };
    createSite(newSite);

    toast({
      title: "Success!",
      description: "We've added your site.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onClose();
    reset();

    mutate(
      '/api/sites',
      async (data) => {
        return { sites: [...data.sites, newSite] };
      },
      false);
  };

  const initialRef = useRef()

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        {children}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay/>
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton/>
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.name?.message}>
              <FormLabel fontWeight="medium">Name</FormLabel>
              <Input ref={initialRef} placeholder="My site" {...register("name")} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.url?.message}>
              <FormLabel fontWeight="medium">Link</FormLabel>
              <Input placeholder="https://mysite.com" {...register("url", {required: true})} />
              <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">Cancel</Button>
            <Button colorScheme="teal" fontWeight="medium" type="submit">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default AddSiteModal;