import { FC, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../button';
import { CurrentPk } from '../currentPk';
import { useAppSelector } from '@/src/hooks';
import { createToast } from '@/src/utils/toast';
import { airdrop, getBalance } from '@/src/features/wocApiSlice';
import { formatNumber, isNull } from '@/src/utils/generic';
import { navigateTo } from '@/src/utils/navigation';
import { routes } from '@/src/constants/routes';
import { IconButton } from '../generic/icon-button';
import { RefreshIcon } from '../svg/refreshIcon';
import { Arrow } from '../svg/arrow';
import { BsvIcon } from '../svg/bsvIcon';
import { HistoryIcon } from '../svg/historyIcon';

type Props = {
  className?: string;
};

type TokenType = {
  balance: number;
  symbol: string;
};

export const Home: FC<Props> = ({ className }) => {
  const { activePk } = useAppSelector(state => state.pk);
  const [tokens, setTokens] = useState<TokenType[]>([]);

  const _airdrop = async () => {
    const toast = createToast('Requesting Airdrop...');
    if (!activePk?.address) {
      toast.error('Please select an Address first!');
      return;
    }
    // const success = await woc.airdrop(activePk.address).catch(toast.error);
    const success = await airdrop(activePk.address).catch(toast.error);

    if (success) {
      setTimeout(_getBalance, 5000);
      toast.success('Airdrop was successful!');
    }
  };

  const _getBalance = async () => {
    const toast = createToast('Fetching balance...');
    if (!activePk?.address) {
      toast.error('Please select an address');
      return;
    }
    const result = await getBalance([activePk.address]).catch(err => {
      toast.error(err);
      return null;
    });
    if (!isNull(result)) {
      toast.success('Balance fetched successfully');
    }
  };

  return (
    <Wrapper className={className}>
      <CurrentPk />
      <BalanceRow>
        <BsvIcon />
        <span>
          Balance:{' '}
          {typeof activePk?.balance?.amount === 'number'
            ? `${formatNumber(activePk?.balance?.amount)} Satoshis`
            : 'unknown'}
        </span>
        <IconButton onClick={_getBalance}>
          <RefreshIcon />
        </IconButton>
      </BalanceRow>
      <Ul>
        {tokens.map(({ balance, symbol }, idx) => (
          <li key={idx}>
            <span>{symbol}</span>
            <span>{balance} satoshis</span>
          </li>
        ))}
      </Ul>
      <ButtonWrapper>
        <Button onClick={() => navigateTo(routes.SEND_BSV)}>
          <Arrow />
          Send BSV
        </Button>
        <Button onClick={() => navigateTo(routes.RECEIVE_BSV)}>
          <Arrow direction="left" />
          Receive BSV
        </Button>
        <Button variant="success" onClick={_airdrop}>
          <Arrow direction="down" />
          Airdrop
        </Button>
        <Button variant="primary" onClick={() => navigateTo(routes.HISTORY)}>
          <HistoryIcon />
          History
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  //
`;

const BalanceRow = styled.div`
  background-color: ${({ theme }) => theme.color.neutral[100]};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm};
  display: flex;
  border-radius: 0.4rem;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  margin: ${props => props.theme.spacing.lg} 0;
  display: flex;
  align-items: center;

  span {
    position: relative;
    top: 0.1rem;
  }

  > svg {
    width: 1.5rem;
  }

  button {
    height: 1.2rem;
    width: 1.2rem;
    background-color: ${({ theme }) => theme.color.neutral[800]};
    color: #fff;
    border-radius: 50%;
  }
`;

const Ul = styled.ul`
  list-style: none;
  font-size: 1.2rem;
  padding: 0;

  li {
    display: flex;
    gap: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ccc;
    white-space: nowrap;
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  flex-direction: column;
  gap: 0.5rem;
`;
