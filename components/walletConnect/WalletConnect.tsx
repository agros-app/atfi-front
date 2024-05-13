"use client"
import Button from "@/components/button/button";
import TextField from "@/components/textField/textField";
import {useState} from "react";
import mockUSDT from "@/contracts/MockUSDT.json";
import lending from "@/contracts/lendingTest.json";
import {useWeb3} from "@/context/web3Modal";
import {investInLending} from "@/utils/contractInteractions/user";

export default function WalletConnect() {

    const [amount, setAmount] = useState<number>(0);

    const { connectWallet } = useWeb3();

    const handleInvest = async () => {
        await investInLending(amount.toString(), mockUSDT, lending);
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
            <Button size={'md'} onClick={connectWallet}>Connect Wallet</Button>
        </div>
    );
}