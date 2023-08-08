import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter,
} from '@chakra-ui/react';
import { CheckCircle } from 'lucide-react';

type StatusProps = {
  onConfirm: () => void;
  value: boolean;
};

function Status({ value, onConfirm }: StatusProps) {
  const options = [
    {
      message: 'Apakah anda telah melakukan pembayaran',
      color: 'green',
      buttonTitle: 'Sudah',
    },
    {
      message: 'Apakah anda belum melakukan pembayaran',
      color: 'red',
      buttonTitle: 'Belum',
    },
  ];

  const { message, color, buttonTitle } = options[Number(value)];

  return (
    <Popover>
      <PopoverTrigger>
        {value ? (
          <Button variant="ghost" colorScheme="green" size="xs">
            <CheckCircle height={15} width={15} />
          </Button>
        ) : (
          <Button colorScheme="red" size="xs">
            Belum Dibayar
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader
          paddingX={5}
          paddingY={3}
          textAlign="left"
          fontWeight="semibold"
        >
          Konfirmasi Pembayaran
        </PopoverHeader>
        <PopoverBody whiteSpace="normal" textAlign="left" padding={5}>
          {message}
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <Button colorScheme={color} onClick={onConfirm}>
            {buttonTitle}
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default Status;
