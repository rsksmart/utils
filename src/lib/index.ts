import { getBtcPrivateKey, getRskAddress, privateKeyToRskFormat } from './utils'

window.onload = () => {
  const rskBtn = <HTMLButtonElement>document.getElementById('toRskBtn')
  const toRskInput = <HTMLInputElement>document.getElementById('toRskInput')
  let toRskResult = <HTMLDivElement>document.getElementById('toRskResult')

  const btcBtn = <HTMLButtonElement>document.getElementById('toBtcBtn')
  const toBtcInput = <HTMLInputElement>document.getElementById('toBtcInput')
  let toBtcResult = <HTMLDivElement>document.getElementById('toBtcResult')

  const networkSelect = <HTMLSelectElement>document.getElementById('btcNetwork')

  rskBtn.addEventListener('click', function () {
    try {
      const rskPrivateKey = toRskInput.value
      const privateKeyInRskFormat = privateKeyToRskFormat(rskPrivateKey)
      const rskAddress = getRskAddress(rskPrivateKey)

      toRskResult.innerHTML = `
        <div class="result">
          <div>
            <strong>RSK Private Key:</strong>
            <pre>${privateKeyInRskFormat}</pre>
          </div>
          <div>
            <strong>RSK Address:</strong>
            <pre>0x${rskAddress}</pre>
          </div>
        </div>
      `
    } catch (err) {
      toRskResult.innerHTML = `<pre class="error">${err.message}</pre>`
    }
  })

  btcBtn.addEventListener('click', function () {
    try {
      const btcPrivateKey = toBtcInput.value
      if (btcPrivateKey === '') throw new Error('Invalid RSK private key value')

      const btcKey = getBtcPrivateKey(networkSelect.value, btcPrivateKey)
      toBtcResult.innerHTML = `
        <div class="result">
          <strong>BTC Private Key:</strong>
          <pre>${btcKey}</pre>
        </div>
      `
    } catch (err) {
      toBtcResult.innerHTML = `<pre class="error">${err.message}</pre>`
    }
  })
}
