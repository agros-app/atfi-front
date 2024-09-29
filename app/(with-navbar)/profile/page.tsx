"use client";
import SideBar from "@/app/(with-navbar)/profile/components/sideBar/sideBar";
import styles from "./page.module.scss";
import ProfileBanner from "@/app/(with-navbar)/profile/components/profileBanner/profileBanner";
import PersonalData from "@/app/(with-navbar)/profile/components/personalData/personalData";
import HomeData from "@/app/(with-navbar)/profile/components/personalData/homeData";
import useUserInfo from "@/hooks/useUserInfo";

export default function ProfilePage()
{
    const {user} = useUserInfo();
    return(
        <div className={styles.screenDivision}>
            <div className={styles.leftHandSide}>
                <SideBar />
            </div>
            <div className={styles.mainContent}>
                <ProfileBanner user={user}/>
                <PersonalData user={user}/>
                <HomeData country={user.country} />
            </div>
        </div>
    )
}