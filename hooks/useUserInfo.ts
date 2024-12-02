import {useEffect, useState} from "react";
import {User} from "@/types/api";
import {getUserInfo} from "@/lib/api";

const useUserInfo  = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User>({
        id: 0,
        name: "",
        lastName: "",
        email: "",
        withProvider: false,
        photoURL: "",
        role: "",
        cuit: "",
        phone:"",
        country: "",
        city: "",
        address: "",
        state: "",
        walletDisplayable: false
    });

    useEffect(() => {
        getUserInfo()
            .then((user) => setUser(user))
            .finally(() => setIsLoading(false));
    }, []);

    return { user, isLoading };
}

export default useUserInfo;