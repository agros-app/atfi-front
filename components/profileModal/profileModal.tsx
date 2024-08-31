import styles from './profileModal.module.scss';
import ProfileImage from "@/components/profileImage/profileImage";
import {useWeb3} from "@/context/web3Modal";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {User} from "@/types/api";

type ProfileModalProps = {
    closeModal: () => void;
    user: User
}

export default function ProfileModal({closeModal,user}: ProfileModalProps) {

    const router = useRouter();

    const { connectWallet, disconnectWallet, isConnected } = useWeb3();
    const handleWallet = () => {
        if (isConnected) {
            disconnectWallet();
        } else {
            connectWallet();
        }
    };

    const logOut = async () => {
        await fetch("/api/auth/sign-out");
        router.push("/")
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.profile}>
                    <ProfileImage src={"/owners/nico.jpg"} size={60}></ProfileImage>
                    <div className={styles.data}>
                        <h3 className={styles.title}>{`${user.name} ${user.lastName}`}</h3>
                        <p className={styles.email}>{user.email}</p>
                    </div>
                </div>
            </div>
            <div className={styles.innerContainer}>
                {/*THE LINK IS HARDCODED*/}
                <Link href='/profile' className={styles.row} onClick={closeModal}>
                    <img src={"/controls.svg"} alt="controles"/>
                    <p className={styles.text}>Configuración</p>
                </Link>
                <div className={styles.row} onClick={handleWallet}>
                    <img src={"/billetera.svg"} alt="billetera"/>
                    <p className={styles.text}>Tus billeteras</p>
                </div>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.row} onClick={logOut}>
                    <img src={"/salir.svg"} alt="salir"/>
                    <p className={styles.redText}>Salir</p>
                </div>
            </div>
        </div>
    )
}