"use client"
import Button from "@/components/button/button";
import TextField from "@/components/textField/textField";
import {useState} from "react";
import {ethers} from "ethers";
import mockUSDT from "@/abis/MockUSDT.json";

export default function WalletConnect() {

    const [amount, setAmount] = useState(0)

    const isValidInvestment = () => {
        return amount > 0;
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