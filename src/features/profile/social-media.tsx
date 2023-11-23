import { usePostSosmed, useUpdateSosmed } from '../../hooks/useProfile.hook';
import { Circle, Grid, HStack, Heading, Input, VStack } from '@chakra-ui/react';
import {
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  MessageCircle,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { InitialSosmedProps } from '../../types/Profile';

type Props = {
  initialValues: InitialSosmedProps[];
};

type SosmedList =
  | 'facebook'
  | 'instagram'
  | 'twitter'
  | 'linkedin'
  | 'whatsapp';

const SocialMedia = ({ initialValues }: Props) => {
  const { register, watch, setValue } = useForm({
    defaultValues: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      whatsapp: '',
    },
  });

  useEffect(() => {
    if (initialValues) {
      initialValues.forEach((item) => {
        if (item.jenis_kontak && typeof item.jenis_kontak === 'string') {
          const jenis_kontak = item.jenis_kontak as SosmedList;
          setValue(jenis_kontak, item.kontak);
        }
      });
    }
  }, [initialValues]);

  const postSosmed = usePostSosmed();
  const updateSosmed = useUpdateSosmed();

  const handleAddSosmed = (sosmed: string, value: string) => {
    const isFound = initialValues.find((item) => item.jenis_kontak === sosmed);
    if (isFound) {
      updateSosmed.mutate({
        id: isFound.id,
        jenis_kontak: sosmed,
        kontak: value,
      });
    } else {
      postSosmed.mutate({ jenis_kontak: sosmed, kontak: value });
    }
  };

  return (
    <>
      <VStack gap={5} marginTop={5}>
        <Heading as="h3" fontSize="1.3rem" w="full" color="gray.700">
          Social Media
        </Heading>
        <Grid
          gridTemplateColumns={{ lg: 'repeat(2,1fr)', base: '1fr' }}
          w="full"
          gap={6}
        >
          <HStack gap={4}>
            <Circle size="40px" bgColor="#4267B2" color="white">
              <Facebook width="17px" height="17px" />
            </Circle>
            <Input
              placeholder="Facebook"
              {...register('facebook')}
              onBlur={() => handleAddSosmed('facebook', watch('facebook'))}
            />
          </HStack>
          <HStack gap={4}>
            <Circle size="40px" bgColor="#1DA1F2" color="white">
              <Twitter width="17px" height="17px" />
            </Circle>
            <Input
              placeholder="Twitter"
              {...register('twitter')}
              onBlur={() => handleAddSosmed('twitter', watch('twitter'))}
            />
          </HStack>
          <HStack gap={4}>
            <Circle size="40px" bgColor="#0A66C2" color="white">
              <Linkedin width="17px" height="17px" />
            </Circle>
            <Input
              placeholder="Linked In"
              {...register('linkedin')}
              onBlur={() => handleAddSosmed('linkedin', watch('linkedin'))}
            />
          </HStack>
          <HStack gap={4}>
            <Circle
              size="40px"
              bgGradient="linear(to-tr, #FD1D1D,#E1306C,#C13584,)"
              color="white"
            >
              <Instagram width="17px" height="17px" />
            </Circle>
            <Input
              placeholder="Instagram"
              {...register('instagram')}
              onBlur={() => handleAddSosmed('instagram', watch('instagram'))}
            />
          </HStack>
        </Grid>
      </VStack>
      <VStack gap={5} marginTop={5}>
        <Heading as="h3" fontSize="1.3rem" w="full" color="gray.700">
          Kontak Penawaran
        </Heading>
        <Grid
          gridTemplateColumns={{ lg: 'repeat(2,1fr)', base: '1fr' }}
          w="full"
          gap={6}
        >
          <HStack gap={4}>
            <Circle size="40px" bgColor="#4267B2" color="white">
              <MessageCircle width="17px" height="17px" />
            </Circle>
            <Input
              placeholder="Whatsapp"
              {...register('whatsapp')}
              onBlur={() => handleAddSosmed('whatsapp', watch('whatsapp'))}
            />
          </HStack>
        </Grid>
      </VStack>
    </>
  );
};

export default SocialMedia;
