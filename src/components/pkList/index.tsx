import { FC } from 'react';
import styled from 'styled-components';
import { routes } from '@/src/constants/routes';
import { setActivePk } from '@/src/features/pkSlice';
import { useAppSelector } from '@/src/hooks';
import { navigateTo } from '@/src/utils/navigation';
import { Button } from '@/src/components/button';
import { store } from '@/src/store';
import { PKType } from '@/src/types';
import dayjs from 'dayjs';
import { WalletPlusIcon } from '../svg/walletPlusIcon';
import { createToast } from '@/src/utils/toast';
import { getBalance } from '@/src/features/wocApiSlice';
import { isNull } from '@/src/utils/generic';
import { AnchorLink } from '../anchorLink';
import { Dl, Li, Ul } from '@/components/generic/styled';
import { RoundIconWrapper } from '../generic/RoundIconWrapper';

type Props = {
  className?: string;
};

export const PKList: FC<Props> = ({ className }) => {
  const { map } = useAppSelector(state => state.pk);

  const setCurrentPK = (pk: PKType) => {
    store.dispatch(setActivePk(pk.address));
    history.back();
  };

  const _getBalance = async (address: string) => {
    const toast = createToast('Fetching balance...');
    const result = await getBalance([address]).catch(err => {
      toast.error(err);
      return null;
    });
    if (!isNull(result)) {
      toast.success('Balance fetched successfully');
    }
  };

  const list = Object.values(map).filter(item => item.path !== 'm');

  const deriveCta = (
    <ButtonStyled onClick={() => navigateTo(routes.DERIVE_PK)}>
      <WalletPlusIcon />
      Create a new Wallet
    </ButtonStyled>
  );

  if (!list || !list.length) {
    return (
      <div>
        <h3>No Wallets found</h3>
        {deriveCta}
      </div>
    );
  }

  return (
    <Wrapper className={className}>
      <h1>
        <RoundIconWrapper>
          <WalletPlusIcon />
        </RoundIconWrapper>
        Your Wallets
      </h1>

      {!list.length && (
        <div>
          <p>No Wallets found.</p>
        </div>
      )}

      {deriveCta}

      {!!list.length && (
        <Ul>
          {list.map(item => (
            <Li key={item.address}>
              <Dl>
                <dt>Name:</dt>
                <dd>{item.name}</dd>
                <dt>Address:</dt>
                <dd>{item.address}</dd>
                <dt>Path:</dt>
                <dd>{item.path}</dd>
                <dt>Balance:</dt>
                <dd>
                  {Number.isInteger(item.balance.amount)
                    ? `${item.balance.amount?.toLocaleString()} satoshis`
                    : 'unknown'}{' '}
                  (
                  <AnchorLink href="#" onClick={() => _getBalance(item.address)}>
                    refresh
                  </AnchorLink>
                  )
                </dd>
                {item.balance.updatedAt && (
                  <>
                    <dt>Updated:</dt>
                    <dd>{dayjs(item.balance.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</dd>
                  </>
                )}
              </Dl>
              <Button size="sm" onClick={() => setCurrentPK(item)}>
                Select
              </Button>
            </Li>
          ))}
        </Ul>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  //
`;

const ButtonStyled = styled(Button)`
  width: 100%;
`;
