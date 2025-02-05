import { FC } from 'react';
import styled from 'styled-components';
import { Button } from '../button';
import { Form } from '../generic/form/form';
import { FormInput } from '../generic/form/formInput';
import { Row } from '../generic/row';
import { useAppDispatch, useAppSelector } from '@/src/hooks';
import { createToast } from '@/src/utils/toast';
import { db } from '@/src/db';
import { navigateTo } from '@/src/utils/navigation';
import { routes } from '@/src/constants/routes';
import { derivePk, restorePK } from '@/src/utils/blockchain';
import { appendPK, setActivePk } from '@/src/features/pkSlice';

type Props = {
  className?: string;
};

export const DerivePk: FC<Props> = ({ className }) => {
  const { rootPk, map: walletList } = useAppSelector(state => state.pk);
  const dispatch = useAppDispatch();

  const onSubmit = async data => {
    const toast = createToast('Creating a new wallet...');
    if (!rootPk) {
      toast.error('Please select a root PK');
      return;
    }

    try {
      const rootKey = restorePK(rootPk.privateKeyHash);
      const derivationPathLastIndex = (await db.getKeyVal('derivationPath.lastIndex')) || 0;
      const path = `0'/0/${derivationPathLastIndex + 1}`;

      const {
        address,
        name,
        path: fullPath,
      } = derivePk({
        rootKey,
        name: data.name.trim(),
        path,
      });

      dispatch(
        appendPK({
          address,
          name,
          path: fullPath,
          balance: {
            satoshis: null,
            updatedAt: null,
          },
        })
      );
      dispatch(setActivePk(address));

      navigateTo(routes.HOME);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Wrapper className={className}>
      <h1>Create a new wallet</h1>
      <Form onSubmit={onSubmit} options={{ defaultValues: { name: '' } }} data-test-id="">
        <Row>
          <FormInput
            name="name"
            label="Name"
            maxLength={40}
            options={{
              required: 'Wallet name is required',
              validate: value => {
                const existingWallet = Object.values(walletList).find(
                  item => item.name.toLowerCase() === value.trim().toLowerCase()
                );
                if (existingWallet) {
                  return 'Wallet with this name already exists';
                }
              },
            }}
          />
        </Row>
        <Button type="submit" variant="primary">
          Next
        </Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  //
`;
