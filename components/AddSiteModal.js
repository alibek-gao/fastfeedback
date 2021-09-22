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
  useDisclosure
} from "@chakra-ui/react";
import {useRef} from "react";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {createSite} from "@/lib/db";

const schema = yup.object().shape({
  site: yup.string().required(),
  url: yup.string().url().required(),
});

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => {
    createSite(data).then(() => {
      console.log('123');
    });
  };

  const initialRef = useRef()

  return (
    <>
      <Button onClick={onOpen} variant="solid" size="md" fontWeight="medium">Add your first site</Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.site?.message}>
              <FormLabel fontWeight="medium">Name</FormLabel>
              <Input ref={initialRef} placeholder="My site" {...register("site")} />
              <FormErrorMessage>{errors.site?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.url?.message}>
              <FormLabel fontWeight="medium">Link</FormLabel>
              <Input placeholder="https://mysite.com" {...register("url", { required: true })} />
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