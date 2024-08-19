"use client"
import Button from "@/components/button/button";
import TextField from "@/components/textField/textField";
import {useState} from "react";
import mockUSDT from "@/contracts/mockUSDT.json";
import lending from "@/contracts/lendingTest.json";
import {useWeb3} from "@/context/web3Modal";
import {investInLending, regretInvestment} from "@/utils/contractInteractions/user";

export default function WalletConnect() {

    const [amount, setAmount] = useState<number>(0);

    const {connectWallet} = useWeb3();

    const handleInvest = async () => {
        await investInLending(amount.toString(), mockUSDT, lending);
    }

    const handleRegret = async () => {
        await regretInvestment(amount.toString(), lending);
    }

    return (
        <div style={{maxWidth: '500px', padding: '32px'}}>
            <TextField onChange={(e) => setAmount(parseInt(e.target.value))}
                       label={'Invest'}
                       type={'number'}
                       placeholder={'Select amount'}
                       name={'Invest'}
            />
            <div style={{display: 'flex', gap: '16px', marginTop: '16px'}}>
                <Button size={'md'} onClick={handleInvest}>Invest</Button>
                <Button size={'md'} onClick={handleRegret}>Regret</Button>
                <Button size={'md'} onClick={connectWallet}>Connect Wallet</Button>
            </div>
        </div>
    );
}