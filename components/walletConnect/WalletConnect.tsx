"use client"
import Button from "@/components/button/button";
import TextField from "@/components/textField/textField";
import {useState} from "react";

export default function WalletConnect() {

    const [amount, setAmount] = useState(0)

    const handleInvest = () => {
        console.log('Investing', amount)
    }

    return (
        <div style={{maxWidth: '300px'}}>
            <TextField onChange={(e) => setAmount(parseInt(e.target.value))}
                       label={'Invest'}
                       type={'number'}
                       placeholder={'Select amount'}
                       name={'Invest'}
            />
            <Button size={'md'} onClick={handleInvest}>Invest</Button>
        </div>
    );
}