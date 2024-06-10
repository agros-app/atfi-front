import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from "@/context/web3Modal";
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
        const toastId = toast.loading('Aprobando token...');
        try {
            const tx = await tokenContract.approve(lendingAddress, amount);
            await tx.wait();
            toast.success('Token aprobado con éxito', { id: toastId });
            return true;
        } catch (error) {
            toast.error('Error al aprobar el token', { id: toastId });
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
        const toastId = toast.loading('Generando inversión...');
        if (!isConnected) {
            toast('Primero debes conectar tu wallet', {
                icon: '⚠️',
                id: toastId
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
            toast.error('Monto de inversión no válido', { id: toastId });
            setLoading(false);
            return;
        }

        const amountInWei = ethers.utils.parseUnits(amount, 6);
        const approvalSuccess = await approveToken(amountInWei, tokenContract, lendingObject.address);

        if (!approvalSuccess) {
            toast.error('La aprobación del token falló o fue rechazada', { id: toastId });
            setLoading(false);
            return;
        }

        try {
            toast.loading('Invirtiendo...', { id: toastId })
            const transaction = await lendingContract.invest(amountInWei, { gasLimit: 2000000 });
            toast.success('Inversión enviada con éxito', { id: toastId });
            console.log(transaction);

            const receipt = await transaction.wait();
            if (receipt.status === 1) {
                toast.success('Inversión completada con éxito', { id: toastId });
                console.log('Transaction was successful:', receipt);
            } else {
                toast.error('La transacción falló', { id: toastId });
                console.error('Transaction failed:', receipt);
            }
            return transaction;
        } catch (error) {
            toast.error('Error al invertir en el lending', { id: toastId });
            console.error('Error al invertir en el lending:', error);
        } finally {
            setLoading(false);
        }
    };

    const regretInvestment = async (amount: string, lendingObject: ContractObject) => {
        setLoading(true);
        const toastId = toast.loading('Retirando inversión...');
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const lendingContract = new ethers.Contract(lendingObject.address, lendingObject.abi, signer);

        if (!lendingContract || !isNumberPositive(amount)) {
            toast.error('Monto de inversión no válido', { id: toastId });
            console.error('Monto de inversión no válido');
            setLoading(false);
            return;
        }

        try {
            const amountInWei = ethers.utils.parseUnits(amount, 6);
            const transaction = await lendingContract.regretInvestment(amountInWei, { gasLimit: 2000000 });
            toast.success('Inversión retirada con éxito', { id: toastId });
            console.log(transaction);
            setLoading(false);
            return transaction;
        } catch (error) {
            toast.error('Error al retirar la inversión', { id: toastId });
            console.error('Error al retirar la inversión:', error);
            setLoading(false);
        }
    };

    const claimReturns = async (lendingObject: ContractObject) => {
        setLoading(true);
        const toastId = toast.loading('Reclamando retornos...');
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const lendingContract = new ethers.Contract(lendingObject.address, lendingObject.abi, signer);

        if (!lendingContract) {
            toast.error('Contrato de lending no válido', { id: toastId });
            console.error('Contrato de lending no válido');
            setLoading(false);
            return;
        }

        try {
            const transaction = await lendingContract.claimReturns({ gasLimit: 2000000 });
            toast.success('Retornos reclamados con éxito', { id: toastId });
            console.log(transaction);
            setLoading(false);
            return transaction;
        } catch (error) {
            toast.error('Error al reclamar los retornos', { id: toastId });
            console.error('Error al reclamar los retornos:', error);
            setLoading(false);
        }
    };

    return { approveToken, investInLending, regretInvestment, claimReturns, loading };
};

export default useLending;
