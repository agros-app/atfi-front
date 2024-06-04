import styles from './ownerProfile.module.scss';
import ProfileImage from "@/components/profileImage/profileImage";
import Lollo from "@/assets/Images/lollo.jpeg";

type OwnerProfileProps = {
    image?: string;
    name: string;
    job: string;
    linkedinLink?: string;
}


export default function OwnerProfile(
    {   image,
        name,
        job,
        linkedinLink
    }: OwnerProfileProps) {
    return (
        <div className={styles.container}>
            <ProfileImage size={210} icon={Lollo.src} grayFilter={true}/>
            <div className={styles.data}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.job}>{job}</p>
            </div>
        </div>
    )
}
