import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useWalletAccountId } from '../core/hooks';

export const useAccountPage = () => {
  const router = useRouter();
  const { accountId: walletAccountId } = useWalletAccountId();

  const accountId = useMemo(
    () => router.query.accountId as string,
    [router.query.accountId]
  );

  const isOwner = useMemo(
    () => router.query.accountId === walletAccountId,
    [router.query.accountId, walletAccountId]
  );


  return {
    accountPageState: {
      isOwner,
      accountId
    },
    accountPageMethods: {},
  };
};
