import { Box, Flex, HStack, Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { AccountLayout } from '../../../layouts';
import { NextPageWithLayout } from '../../_app';
import { Select } from 'chakra-react-select';
import { reactSelectStyles } from '../../../styles';
import { useAccountPage } from '../../../hooks';

const AccountPage: NextPageWithLayout = () => {
  const {
    accountPageState: { },
    accountPageMethods: { },
  } = useAccountPage();

  return (
    <>
    </>
  );
};

AccountPage.getLayout = (page: ReactElement) => {
  return <AccountLayout tab="task">{page}</AccountLayout>;
};

export default AccountPage;
