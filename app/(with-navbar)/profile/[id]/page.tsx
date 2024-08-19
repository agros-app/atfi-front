import SideBar from "@/app/(with-navbar)/profile/[id]/components/sideBar/sideBar";
import styles from "./page.module.scss";
import ProfileBanner from "@/app/(with-navbar)/profile/[id]/components/profileBanner/profileBanner";
import PersonalData from "@/app/(with-navbar)/profile/[id]/components/personalData/personalData";
import HomeData from "@/app/(with-navbar)/profile/[id]/components/personalData/homeData";

export default function ProfilePage()
{
    return(
        <div className={styles.screenDivision}>
        <div className={styles.leftHandSide}>
            <SideBar />
        </div>
        <div className={styles.mainContent}>
            <ProfileBanner/>
            <PersonalData />
            <HomeData />
        </div>
        </div>
    )
}