import styles from './hero_image.module.scss'
import FavoriteWallet from '@/app/(landing)/investor/agriculture/components/favourite_wallet/favourite_wallet'

export default function HeroImage() {
  return (
    <div>
      <img
        alt={'Hero image'}
        className={styles.image}
        src="/investors/agriculture/wheat.png"
      />
      <div className={styles.favoriteWallet}>
        <FavoriteWallet />
      </div>
    </div>
  )
}
