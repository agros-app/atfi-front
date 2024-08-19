import styles from './favourite_wallet.module.scss'

export default function FavoriteWallet() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Usá tu billetera favorita:</div>

      <div className={styles.division}>
        <div className={styles.firstRow}>
          <img src={'/wallets/ripio.png'} alt="Ripio" className={styles.icon} />
          <img
            src={'/wallets/binance_black.png'}
            alt="Binance"
            className={styles.binanceIcon}
          />
        </div>
        <div className={styles.secondRow}>
          <img
            src={'/wallets/MetaMask.png'}
            alt="Metamask"
            className={styles.metamaskIcon}
          />
          <img
            src={'/wallets/okx-1.svg'}
            alt="OKX"
            className={styles.okxIcon}
          />
        </div>
      </div>
      <div className={styles.amountMore}>
        <div className={styles.moreWallets}>+420</div>
      </div>
    </div>
  )
}
