'use client'
import { useWeb3 } from '@/context/web3Modal'
import Button from '../button/button'

export default function WalletButton() {
  const { connectWallet, disconnectWallet, isConnected } = useWeb3()
  const handleClick = () => {
    if (isConnected) {
      disconnectWallet()
    } else {
      connectWallet()
    }
  }
  return (
    <Button onClick={handleClick} size="md" variant="secondary">
      {isConnected ? 'Desconectar' : 'Conectar'} billetera
    </Button>
  )
}
