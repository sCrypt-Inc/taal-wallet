import bsv, { Mnemonic } from 'bsv';
import 'bsv/mnemonic';
import { validate, Network } from 'bitcoin-address-validation';
import { broadcast, getTx, getUnspent } from '../features/wocApi';
import { ApiResponse, ErrorCodeEnum, ParsedTokenDetails, PKFullType, UTXO, UTXOWithAmount } from '../types';
import { WocApiError } from './errors/wocApiError';
import { getErrorMessage } from './generic';
import { networkList } from '../constants/networkList';
import { addrScriptRegex, stasScriptRegex } from '../constants';

const SATS_PER_BITCOIN = 1e8;

type SendBsvOptions = {
  srcAddress: string;
  dstAddress: string;
  privateKeyHash: string;
  network: string;
  satoshis: number;
  minChange?: number;
};

// const sighash = bsv.crypto.Signature.SIGHASH_ALL | bsv.crypto.Signature.SIGHASH_FORKID;

export const isValidAddress = (addr: string, network: string) => validate(addr, network as Network);

export const bitcoinToSatoshis = (amount: number) => Math.round(amount * SATS_PER_BITCOIN);
export const satoshisToBitcoin = (satoshis: number) => satoshis / SATS_PER_BITCOIN;

export const utxoAmount2satoshis = ({ amount, ...utxo }: UTXOWithAmount): UTXO => {
  return {
    ...utxo,
    satoshis: bitcoinToSatoshis(amount),
  };
};

export const createBSVTransferTransaction = async ({
  srcAddress,
  dstAddress,
  privateKeyHash,
  network,
  satoshis,
  // minChange is used to make sure that change is gonna be at least this size
  minChange = 0,
}: SendBsvOptions) => {
  if (!isValidAddress(srcAddress, network)) {
    throw new Error(`Invalid source address: ${srcAddress}`);
  }
  if (satoshis < 1) {
    throw new Error('Satoshis must be greater than zero');
  }
  if (!isValidAddress(dstAddress, network)) {
    throw new Error(`Invalid destination address: ${dstAddress}`);
  }
  const { data: unspentList } = await getUnspent(srcAddress, { forceRefetch: true });
  if (!unspentList?.length) {
    throw new Error('No funds available');
  }

  const totalRequiredAmount = satoshis + minChange;
  let totalUtxoAmount = 0;
  const utxos: bsv.Transaction.IUnspentOutput[] = [];

  const { data: unspentTx } = await getTx(unspentList[0].tx_hash);
  // TODO: check that op return scripts still work
  const script = unspentTx?.vout[unspentList[0].tx_pos].scriptPubKey.hex;

  // loop through all unspent outputs and add to utxo list until we have enough value
  for (let i = 0; i < unspentList.length; i++) {
    const unspent = unspentList[i];
    if (totalUtxoAmount < totalRequiredAmount) {
      totalUtxoAmount += unspent.value;
      utxos.push(
        new bsv.Transaction.UnspentOutput({
          txId: unspent.tx_hash,
          outputIndex: unspent.tx_pos,
          address: srcAddress,
          script,
          satoshis: unspent.value,
        }).toObject()
      );
    } else {
      break;
    }
  }

  console.log({ utxos, unspentTx, totalRequiredAmount });

  if (totalUtxoAmount < totalRequiredAmount) {
    throw new Error('Insufficient funds');
  }

  return (
    new bsv.Transaction()
      .from(utxos)
      .to(dstAddress, satoshis)
      // TODO: create new address for change
      .change(srcAddress)
      .sign(privateKeyHash)
  );
};

type MergeSplitOptions = {
  myAddress: string;
  satoshis: number;
  minChange: number;
  network: string;
  privateKeyHash: string;
};

export const mergeSplit = async ({
  myAddress,
  satoshis,
  minChange,
  network,
  privateKeyHash,
}: MergeSplitOptions) => {
  // TODO: fix this
  // sometimes it returns single output

  const {
    success,
    data: { tx, txid },
  } = await sendBSV({
    satoshis,
    minChange,
    srcAddress: myAddress,
    dstAddress: myAddress,
    network,
    privateKeyHash,
  });

  if (!success) {
    throw new Error('Failed to merge split');
  }

  const result = tx.outputs.map((output, i) => {
    const unspentOutput = new bsv.Transaction.UnspentOutput({
      txId: txid,
      outputIndex: i,
      address: myAddress,
      script: tx.outputs[0].script.toHex(),
      satoshis: output.satoshis,
    });

    // @ts-expect-error actually it returns UTXOWithAmount
    const utxoObject = unspentOutput.toObject() as UTXOWithAmount;

    return utxoAmount2satoshis(utxoObject);
  });
  if (result.length !== 2) {
    console.log('MergeSplit failed', { result, satoshis, minChange });
    throw new Error('MergeSplit failed');
  }
  console.log('MergeSplit result', result, { satoshis, minChange });
  return result;
};

export const sendBSV = async ({
  srcAddress,
  dstAddress,
  privateKeyHash,
  network,
  satoshis,
  // minChange is used to make sure that change is gonna be at least this size
  minChange = 0,
}: SendBsvOptions): Promise<ApiResponse<{ txid: string; tx: bsv.Transaction }>> => {
  console.log('sendBSV', { srcAddress, dstAddress, privateKeyHash, network, satoshis, minChange });

  if (!isValidAddress(srcAddress, network)) {
    throw new Error(`Invalid source address: ${srcAddress}`);
  }
  if (!isValidAddress(dstAddress, network)) {
    throw new Error(`Invalid destination address: ${dstAddress}`);
  }

  const tx = await createBSVTransferTransaction({
    srcAddress,
    dstAddress,
    privateKeyHash,
    network,
    satoshis,
    minChange,
  });

  console.log(
    'createBSVTransferTransaction',
    {
      srcAddress,
      dstAddress,
      privateKeyHash,
      network,
      satoshis,
      minChange,
    },
    tx
  );

  try {
    const result = await broadcast(tx.toString());
    if ('data' in result && /^[0-9a-fA-F]{64}$/.test(result.data)) {
      return {
        success: true,
        data: {
          tx,
          txid: result.data,
        },
      };
    } else if ('error' in result) {
      console.log('tx broadcast error', result.error);
      throw new WocApiError(result.error);
    }
  } catch (e) {
    console.warn(e);
    return {
      success: false,
      error: {
        errorCode: ErrorCodeEnum.UNKNOWN_ERROR,
        message: getErrorMessage(e, 'Unknown error'),
      },
    };
  }
};

export const createHDPrivateKey = ({
  mnemonic,
  networkId,
  password,
}: {
  mnemonic: Mnemonic;
  networkId: string;
  password: string;
}) => {
  const network = networkList.find(item => item.id === networkId);

  const mSeed = mnemonic.toSeed(password);
  const rootKey = bsv.HDPrivateKey.fromSeed(mSeed, network.envName);

  // another way of doing the same thing
  // const hDPrivateKey2 = mnemonic.toHDPrivateKey(password, network);
  // var copy_of_child_0_1_2h = hDPrivateKey2.deriveChild("m/0/1/2'");

  // const child_0_1_2h = rootPrivateKey
  //   .deriveChild(0)
  //   .deriveChild(1)
  //   .deriveChild(2, true);

  return {
    pkInstance: rootKey,
  };
};

export const derivePk = ({
  name,
  rootKey: rootKeyInput,
  path,
}: {
  name?: string;
  rootKey: string | bsv.HDPrivateKey;
  path: string;
}): PKFullType => {
  const rootKey = typeof rootKeyInput === 'string' ? restorePK(rootKeyInput) : rootKeyInput;
  const network = rootKey.network.name;
  // m / purpose' / coin_type' / account' / change / address_index
  // m / 44 / 236 / 0' / 0 / 0
  const pathSegments = path.split('/');
  if (pathSegments.length === 3) {
    pathSegments.unshift('m', "44'", "236'");
  }

  const fullPath = pathSegments.join('/');

  if (pathSegments.length !== 6) {
    throw new Error(`Invalid path: ${fullPath}`);
  }

  const key = rootKey.deriveChild(fullPath);
  const address = key.publicKey.toAddress(network as bsv.Networks.Type).toString();

  return {
    address,
    privateKeyHash: key.privateKey.toString(),
    publicKeyHash: key.publicKey.toString(),
    path: fullPath,
    name: name || `Wallet-${pathSegments[5]}`,
    balance: {
      updatedAt: null,
      satoshis: null,
    },
  };
};

export const restorePK = (privateKeyHash: string) => bsv.HDPrivateKey.fromString(privateKeyHash);

export const generateMnemonic = () => bsv.Mnemonic.fromRandom();

export const rebuildMnemonic = (phrase: string) => bsv.Mnemonic.fromString(phrase);

export const isValidMnemonic = (phrase: string) => bsv.Mnemonic.isValid(phrase);

export const parseTokenTx = (txData: string | bsv.Transaction): ParsedTokenDetails => {
  const tx = txData instanceof bsv.Transaction ? txData : new bsv.Transaction(txData);
  return parseScript(tx.outputs[0].script);
};

export const parseStasTx = (txData: string | bsv.Transaction, network: string) => {
  const tx = txData instanceof bsv.Transaction ? txData : new bsv.Transaction(txData);
  const tokenScript = tx.outputs[0].script;

  const {
    groups: { addr: pkHash, data: dataHex, flags },
  } = tokenScript.toHex().match(stasScriptRegex);

  const addr = bsv.Address.fromPublicKeyHash(Buffer.from(pkHash, 'hex'), network as bsv.Networks.Type);

  const isFungible = flags === '0100';

  const script = bsv.Script.fromHex(dataHex);
  const symbol = script.chunks[0].buf?.toString('utf8');
  const dataString = script.chunks[1]?.buf?.toString('utf8');
  const data = dataString ? JSON.parse(dataString) : null;

  return {
    addr: addr.toString(),
    symbol,
    data,
    isFungible,
  };
};

export const parseScript = (scriptData: string | bsv.Script) => {
  const script = scriptData instanceof bsv.Script ? scriptData : bsv.Script.fromString(scriptData);
  return JSON.parse(script.chunks[6].buf?.toString('utf8')) as ParsedTokenDetails;
};

export const parseRecipientListFromTx = (txData: string | bsv.Transaction, network: string) => {
  const tx = txData instanceof bsv.Transaction ? txData : new bsv.Transaction(txData);
  const recipientList = [];

  tx.outputs.forEach((output, index) => {
    const { script } = output;

    // skip change output
    if (script.isPublicKeyHashOut()) {
      return;
    }

    const { groups } = script.toHex().match(addrScriptRegex);
    const addr = bsv.Address.fromPublicKeyHash(Buffer.from(groups.addr, 'hex'), network as bsv.Networks.Type);

    recipientList.push({
      address: addr.toString(),
      isStandard: script.isStandard(),
      satoshis: output.satoshis,
      index,
    });
  });

  return recipientList;
};
