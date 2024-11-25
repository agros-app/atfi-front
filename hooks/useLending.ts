"use client";
import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from "@/context/web3Modal";
import toast from 'react-hot-toast';
import lendingContract from "@/contracts/lendingTest.json";
import lendingFactory from "@/contracts/lendingFactory.json";
import {investByProjectId} from "@/lib/api";

interface ContractObject {
    address: string;
    abi: any;
}


const isNumberPositive = (amount: string) => {
    const numberAmount = Number(amount);
    return !isNaN(numberAmount) && numberAmount > 0;
}

const useLending = (contractAddress?: string) => {
    const [loading, setLoading] = useState(false);
    const { isConnected } = useWeb3();

    const approveToken = async (amount: ethers.BigNumber, tokenContract: ethers.Contract) => {
        const toastId = toast.loading('Aprobando token...');
        try {
            const tx = await tokenContract.approve(contractAddress, amount);
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
        contractAddress: string,
        lendingObject: ContractObject,
        projectId: number
    ) => {
        if (contractAddress === '' || contractAddress === undefined || contractAddress === null) {
            toast.error('Dirección del contrato no válida');
            return;
        }
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
        console.log(contractAddress)
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(mockUSDTObject.address, mockUSDTObject.abi, signer);
        const lendingContract = new ethers.Contract(contractAddress, lendingObject.abi, signer);

        if (!lendingContract || !isNumberPositive(amount)) {
            toast.error('Monto de inversión no válido', { id: toastId });
            setLoading(false);
            return;
        }

        const amountInWei = ethers.utils.parseUnits(amount, 6);
        const approvalSuccess = await approveToken(amountInWei, tokenContract);

        if (!approvalSuccess) {
            toast.error('La aprobación del token falló o fue rechazada', { id: toastId });
            setLoading(false);
            return;
        }

        try {
            toast.loading('Invirtiendo...', { id: toastId })
            console.log(amountInWei)
            const transaction = await lendingContract.invest(amountInWei, { gasLimit: 2000000 });
            console.log(transaction);
            const receipt = await transaction.wait();
            //await investByProjectId(projectId, Number(amount));
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

    const regretInvestment = async (amount: string, lendingObject: ContractObject, updateDb: () => {}) => {
        setLoading(true);
        const toastId = toast.loading('Retirando inversión...');
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const lendingContract = new ethers.Contract(contractAddress!!, lendingObject.abi, signer);

        if (!lendingContract || !isNumberPositive(amount)) {
            toast.error('Monto de inversión no válido', { id: toastId });
            console.error('Monto de inversión no válido');
            setLoading(false);
            return;
        }

        try {
            const amountInWei = ethers.utils.parseUnits(amount, 6);
            const transaction = await lendingContract.regretInvestment(amountInWei, { gasLimit: 2000000 });
            await updateDb();
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
        const lendingContract = new ethers.Contract(contractAddress!!, lendingObject.abi, signer);

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

    const disburseFunds = async () => {
        setLoading(true);
        const toastId = toast.loading('Retirando fondos...');
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const lendingInstance = new ethers.Contract(contractAddress!!, lendingContract.abi, signer);

        if (!isConnected) {
            toast('Primero debes conectar tu wallet', {
                icon: '⚠️',
                id: toastId
            });
            return;
        }

        if (!lendingInstance) {
            toast.error('Contrato de lending no válido', { id: toastId });
            console.error('Contrato de lending no válido');
            setLoading(false);
            return;
        }

        try {
            const transaction = await lendingInstance.disburseFunds({ gasLimit: 2000000 });
            const receipt = await transaction.wait();
            if (receipt.status === 1) {
                toast.success('Fondos retirados con éxito', { id: toastId });
            } else {
                toast.error('Los fondos no pudieron ser retirados', { id: toastId });
            }
            setLoading(false);
            return transaction;
        } catch (error) {
            toast.error('Error al retirar los fondos', {id: toastId});
            console.error('Error al retirar los fondos:', error);
            setLoading(false);
        }

    }

    const approveProject = async (projectId: number) => {
        setLoading(true);
        const toastId = toast.loading('Aprobando proyecto...');
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const lendingInstance = new ethers.Contract(lendingFactory.address, lendingFactory.abi, signer);


        if (!isConnected) {
            toast('Primero debes conectar tu wallet', {
                icon: '⚠️',
                id: toastId
            });
            return;
        }

        if (!lendingInstance) {
            toast.error('Contrato de lending no válido', { id: toastId });
            console.error('Contrato de lending no válido');
            setLoading(false);
            return;
        }

        try {
            const transaction = await lendingInstance.approveProject(projectId, { gasLimit: 2000000 });
            toast.success('Proyecto aprobado con éxito', { id: toastId });
            console.log(transaction);
            setLoading(false);
            return transaction;
        } catch (error) {
            toast.error('Error al aprobar el proyecto', {id: toastId});
            console.error('Error al aprobar el proyecto:', error);
            setLoading(false);
        }
    }

    const proposeLending = async (
        amountNeededInUSDT: string,
        minimumFundingAmount: string,
        fundingDeadline: number,
        returnPeriodStart: number,
        lendingName: string,
        producerAddress: string,
    ) => {
        setLoading(true);
        const toastId = toast.loading('Proponiendo proyecto...');

        try {
            //@ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const lendingInstance = new ethers.Contract(lendingFactory.address, lendingFactory.abi, signer);

            if (!isConnected) {
                toast.error('Primero debes conectar tu wallet', { id: toastId });
                setLoading(false);
                return;
            }

            if (!lendingInstance) {
                toast.error('Contrato de lending no válido', { id: toastId });
                console.error('Contrato de lending no válido');
                setLoading(false);
                return;
            }

            if (!ethers.utils.isAddress(producerAddress)) {
                toast.error('Dirección de productor inválida', { id: toastId });
                setLoading(false);
                return;
            }

            // Conversión de valores a USDT (con 6 decimales)
            const amountNeededInWei = ethers.utils.parseUnits(amountNeededInUSDT, 6); // Convertir USDT a 6 decimales
            const minimumFundingInWei = ethers.utils.parseUnits(minimumFundingAmount, 6);

            const transaction = await lendingInstance.proposeLending(
                amountNeededInWei, // Monto necesario
                minimumFundingInWei, // Monto mínimo
                fundingDeadline, // Fecha límite para el financiamiento (timestamp UNIX)
                returnPeriodStart, // Inicio del periodo de devolución (timestamp UNIX)
                lendingName, // Nombre del proyecto
                producerAddress, // Dirección del productor
                { gasLimit: 2000000 }
            );
            toast.success('Propuesta creada con éxito', { id: toastId });
            console.log(transaction);
            setLoading(false);
            return transaction;
        } catch (error) {
            console.error('Error al proponer lending:', error);
            toast.error('Error al proponer el proyecto', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return { approveToken, investInLending, regretInvestment, claimReturns, disburseFunds, loading, proposeLending };
};

export default useLending;
