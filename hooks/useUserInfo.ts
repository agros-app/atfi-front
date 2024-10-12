import {useEffect, useState} from "react";
import {User} from "@/types/api";
import {getUserInfo} from "@/lib/api";

const useUserInfo  = () => {
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
        state: ""
    });

    useEffect(() => {
        getUserInfo().then((user) => setUser(user));
    }, []);

    return { user };
}

export default useUserInfo;