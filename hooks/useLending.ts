import { useState } from 'react';
import { ethers } from 'ethers';
import {useWeb3} from "@/context/web3Modal";
import toast from 'react-hot-toast';

interface ContractObject {
    address: string;
    abi: any;
}

const isNumberPositive = (amount: string) => {
    const numberAmount = Number(amount);
    return !isNaN(numberAmount) && numberAmount > 0;
}

const useLending = () => {
    const [loading, setLoading] = useState(false);
    const { isConnected } = useWeb3();

    const approveToken = async (amount: ethers.BigNumber, tokenContract: ethers.Contract, lendingAddress: string) => {
        try {
            const tx = await tokenContract.approve(lendingAddress, amount);
            await tx.wait();
            toast.success('Token aprobado con éxito');
            return true;
        } catch (error) {
            toast.error('Error al aprobar el token');
            console.error('Error al aprobar el token:', error);
            setLoading(false)
            return false;
        }
    };

    const investInLending = async (
        amount: string,
        mockUSDTObject: ContractObject,
        lendingObject: ContractObject
    ) => {
        if (!isConnected) {
            toast('Primero debes conectar tu wallet',{
                icon: '⚠️',
            });
            return;
        }
        setLoading(true);
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(mockUSDTObject.address, mockUSDTObject.abi, signer);
        const lendingContract = new ethers.Contract(lendingObject.address, lendingObject.abi, signer);

        if (!lendingContract || !isNumberPositive(amount)) {
            toast.error('Monto de inversión no válido');
            console.error('Monto de inversión no válido');
            setLoading(false);
            return;
        }

        const amountInWei = ethers.utils.parseUnits(amount, 6);
        const approvalSuccess = await approveToken(amountInWei, tokenContract, lendingObject.address);

        if (!approvalSuccess) {
            toast.error('La aprobación del token falló o fue rechazada');
            setLoading(false);
            return;
        }

        try {
            const transaction = await lendingContract.invest(amountInWei, { gasLimit: 2000000 });
            toast.success('Inversión enviada con éxito');
            console.log(transaction);

            const receipt = await transaction.wait();
            if (receipt.status === 1) {
                toast.success('Inversión completada con éxito');
                console.log('Transaction was successful:', receipt);
            } else {
                toast.error('La transacción falló');
                console.error('Transaction failed:', receipt);
            }
            return transaction;
        } catch (error) {
            toast.error('Error al invertir en el lending');
            console.error('Error al invertir en el lending:', error);
        } finally {
            setLoading(false);
        }
    };

    const regretInvestment = async (amount: string, lendingObject: ContractObject) => {
        setLoading(true);
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const lendingContract = new ethers.Contract(lendingObject.address, lendingObject.abi, signer);

        if (!lendingContract || !isNumberPositive(amount)) {
            toast.error('Monto de inversión no válido');
            console.error('Monto de inversión no válido');
            setLoading(false);
            return;
        }

        try {
            const amountInWei = ethers.utils.parseUnits(amount, 6);
            const transaction = await lendingContract.regretInvestment(amountInWei, { gasLimit: 2000000 });
            toast.success('Inversión retirada con éxito');
            console.log(transaction);
            setLoading(false);
            return transaction;
        } catch (error) {
            toast.error('Error al retirar la inversión');
            console.error('Error al retirar la inversión:', error);
            setLoading(false);
        }
    };

    const claimReturns = async (lendingObject: ContractObject) => {
        setLoading(true);
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const lendingContract = new ethers.Contract(lendingObject.address, lendingObject.abi, signer);

        if (!lendingContract) {
            toast.error('Contrato de lending no válido');
            console.error('Contrato de lending no válido');
            setLoading(false);
            return;
        }

        try {
            const transaction = await lendingContract.claimReturns({ gasLimit: 2000000 });
            toast.success('Retornos reclamados con éxito');
            console.log(transaction);
            setLoading(false);
            return transaction;
        } catch (error) {
            toast.error('Error al reclamar los retornos');
            console.error('Error al reclamar los retornos:', error);
            setLoading(false);
        }
    };

    return { approveToken, investInLending, regretInvestment, claimReturns, loading };
};

export default useLending;
