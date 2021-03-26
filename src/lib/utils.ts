import { decode, encode } from 'bs58'
import wallet from 'ethereumjs-wallet'
import { sha256 } from 'js-sha256'

function hexToBytes(hex: string) {
  if (hex.length % 2 === 1) throw new Error("hexToBytes can't have a string with an odd number of characters.")
  if (hex.indexOf('0x') === 0) hex = hex.slice(2)
  return hex.match(/../g).map(function (x) {
    return parseInt(x, 16)
  })
}

export function keyBtcToRskInBytes(privKeyAsExportedByBitcoinDumpPrivateKey: string) {
  const decodedKey = decode(privKeyAsExportedByBitcoinDumpPrivateKey)
  const privateKeyBytes = decodedKey.slice(1, decodedKey.length - 5)
  return privateKeyBytes
}

export function privateKeyToRskFormat(btcPrivateKey: string) {
  const privateKeyBytes = keyBtcToRskInBytes(btcPrivateKey)
  const privateKeyInRskFormat = Buffer.from(privateKeyBytes).toString('hex')
  return privateKeyInRskFormat
}

export function getRskAddress(btcPrivateKey: string) {
  const myWallet = wallet.fromPrivateKey(Buffer.from(keyBtcToRskInBytes(btcPrivateKey)))
  const addressInRskFormat = myWallet.getAddress()
  return addressInRskFormat.toString('hex')
}

export function getBtcPrivateKey(btcNetwork = 'TEST_NET', rskAddress: string) {
  const addressBytes = hexToBytes(rskAddress)

  const prefix = btcNetwork === 'MAIN_NET' ? 0x80 : 0xef

  const partialResult = [prefix, ...addressBytes, 0x01]

  var check = hexToBytes(sha256(hexToBytes(sha256(partialResult))))
  const checks = [0, 1, 2, 3].map((i) => check[i])

  const result = [...partialResult, ...checks]

  return encode(result)
}
