'use client'
import styles from './page.module.scss'
import ProfileBanner from '@/app/(with-navbar)/profile/components/profileBanner/profileBanner'
import PersonalData from '@/app/(with-navbar)/profile/components/personalData/personalData'
import HomeData from '@/app/(with-navbar)/profile/components/personalData/homeData'
import PasswordData from '@/app/(with-navbar)/profile/components/personalData/passwordData'
import useSession from '@/hooks/useSession'

export default function ProfilePage() {
  const { userData: user } = useSession()
  return (
    <div className={styles.screenDivision}>
      {/* <div className={styles.leftHandSide}>
                <SideBar />
            </div> */}
      <div className={styles.mainContent}>
        <ProfileBanner />
        <PersonalData
          name={user?.name ?? ''}
          lastName={user?.lastName ?? ''}
          cuit={user?.cuit ?? ''}
          phone={user?.phone ?? ''}
          country={user?.country ?? ''}
        />
        <HomeData
          country={user?.country ?? ''}
          city={user?.city ?? ''}
          state={user?.state ?? ''}
          address={user?.address ?? ''}
        />
        <PasswordData />
      </div>
    </div>
  )
}
