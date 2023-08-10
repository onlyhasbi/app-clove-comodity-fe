import React from 'react';
import { Center, Switch } from '@chakra-ui/react';

type Props = {
  initialValue: boolean;
  getActiveValue: (value: boolean) => void;
};

export default function ActiveStatus({ initialValue, getActiveValue }: Props) {
  return (
    <Center>
      <Switch
        defaultChecked={initialValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          getActiveValue(e.target.checked)
        }
      />
    </Center>
  );
}
