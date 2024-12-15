"use client";
import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from "@/context/web3Modal";
import toast from 'react-hot-toast';
import lendingContract from "@/contracts/lendingTest.json";
import lendingFactory from "@/contracts/lendingFactory.json";
import { ProjectDetailInfo } from '@/types/api';

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
    const { isConnected, walletAddress } = useWeb3();

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

    const injectFunds = async (
        amount: string,
        mockUSDTObject: ContractObject,
        contractAddress: string,
        lendingObject: ContractObject,
    ) => {
        if (!contractAddress) {
            toast.error('Dirección del contrato no válida');
            return;
        }

        const toastId = toast.loading('Inyectando retornos...');
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
        const lendingContract = new ethers.Contract(contractAddress, lendingObject.abi, signer);

        if (!lendingContract || !isNumberPositive(amount)) {
            toast.error('Monto no válido', { id: toastId });
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
            const transaction = await lendingContract.injectReturns(amountInWei, { gasLimit: 2000000 });
            const receipt = await transaction.wait();
            if (receipt.status === 1) {
                toast.success('Inversión completada con éxito', { id: toastId });
            } else {
                toast.error('La transacción falló', { id: toastId });
            }
            return transaction;
        } catch (error) {
            toast.error('Error al inyectar fondos en el lending', { id: toastId });
            console.error('Error al inyectar fondos en el lending:', error);
        } finally {
            setLoading(false);
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
            const receipt = await transaction.wait();
            if (receipt.status === 1) {
                toast.success('Inversión completada con éxito', { id: toastId });
            } else {
                toast.error('La transacción falló', { id: toastId });
            }
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

    const disburseFunds = async (ammount: number) => {
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

        if (ammount === 0) {
            return toast('El monto no puede ser cero', {
                icon: '⚠️',
                id: toastId
            });
        }

        if (!lendingInstance) {
            toast.error('Contrato de lending no válido', { id: toastId });
            console.error('Contrato de lending no válido');
            setLoading(false);
            return;
        }

        try {
            const amountInWei = ethers.utils.parseUnits(ammount.toString(), 6);
            const transaction = await lendingInstance.disburseFunds(amountInWei, { gasLimit: 2000000 });
            const receipt = await transaction.wait();
            if (receipt.status === 1) {
                toast.success('Fondos retirados con éxito', { id: toastId });
            } else {
                toast.error('Los fondos no pudieron ser retirados', { id: toastId });
            }
            setLoading(false);
            return transaction;
        } catch (error) {
            toast.error('Error al retirar los fondos', { id: toastId });
            console.error('Error al retirar los fondos:', error);
            setLoading(false);
        }

    }

    const signRelease = async () => {
        setLoading(true);
        const toastId = toast.loading('Autorizando liberación...');
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
            const transaction = await lendingInstance.sign({ gasLimit: 2000000 });
            const receipt = await transaction.wait();
            if (receipt.status === 1) {
                toast.success('Firma exitosa', { id: toastId });
            } else {
                toast.error('No se pudo firmar el contrato', { id: toastId });
            }
            setLoading(false);
            return transaction;
        } catch (error) {
            toast.error('Error al liberar los fondos', { id: toastId });
            console.error('Error al liberar los fondos:', error);
            setLoading(false);
        }
    }

    // For now we'll leave it so that multisign is only done by admin + provider
    const approveProject = async (projectData: ProjectDetailInfo, providerAddress: string, producerAddress: string, fee: number) => {
        setLoading(true);
        const toastId = toast.loading('Aprobando proyecto...');
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', []) // Aseguramos la conexión
        const signer = provider.getSigner()


        const lendingInstance = new ethers.Contract(
            lendingFactory.address,
            lendingFactory.abi,
            signer
        );

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

        const params = [
            ethers.utils.parseUnits(projectData.amountNeed.toString(), 6),
            ethers.utils.parseUnits(projectData.minAmount.toString(), 6),
            // @ts-ignore
            new Date(projectData.endDate).getTime(),
            // @ts-ignore
            new Date(projectData.returnsDate).getTime(),
            projectData.name,
            producerAddress,
            [walletAddress, providerAddress],
            ethers.BigNumber.from(fee),
            providerAddress
        ]

        try {

            const gasEstimate = await lendingInstance.estimateGas.approveProposal(...params)

            const transaction = await lendingInstance.approveProposal(
                ...params,
                {
                    gasLimit: gasEstimate.mul(120).div(100) // Añadimos 20% de margen
                }
            )

            setLoading(false);
            const receipt = await transaction.wait();

            if (receipt.status === 1) {
                toast.success('Proyecto aprobado con éxito', { id: toastId })
            } else {
                throw new Error('La transacción falló')
            }
        } catch (error) {
            toast.error('Error al aprobar el proyecto', { id: toastId });
            console.error('Error al aprobar el proyecto:', error);
            setLoading(false);
        }
    }

    // const proposeLending = async (
    //     amountNeededInUSDT: string,
    //     minimumFundingAmount: string,
    //     fundingDeadline: number,
    //     returnPeriodStart: number,
    //     lendingName: string,
    // ) => {
    //     setLoading(true);
    //     const toastId = toast.loading('Proponiendo proyecto...');

    //     try {
    //         //@ts-ignore
    //         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //         const signer = provider.getSigner();
    //         const lendingInstance = new ethers.Contract(lendingFactory.address, lendingFactory.abi, signer);

    //         if (!isConnected) {
    //             toast.error('Primero debes conectar tu wallet', { id: toastId });
    //             setLoading(false);
    //             return;
    //         }

    //         if (!lendingInstance) {
    //             toast.error('Contrato de lending no válido', { id: toastId });
    //             console.error('Contrato de lending no válido');
    //             setLoading(false);
    //             return;
    //         }

    //         if (!ethers.utils.isAddress(walletAddress!!)) {
    //             toast.error('Dirección de productor inválida', { id: toastId });
    //             setLoading(false);
    //             return;
    //         }

    //         // Conversión de valores a USDT (con 6 decimales)
    //         const amountNeededInWei = ethers.utils.parseUnits(amountNeededInUSDT, 6); // Convertir USDT a 6 decimales
    //         const minimumFundingInWei = ethers.utils.parseUnits(minimumFundingAmount, 6);

    //         const transaction = await lendingInstance.proposeLending(
    //             amountNeededInWei, // Monto necesario
    //             minimumFundingInWei, // Monto mínimo
    //             fundingDeadline, // Fecha límite para el financiamiento (timestamp UNIX)
    //             returnPeriodStart, // Inicio del periodo de devolución (timestamp UNIX)
    //             lendingName, // Nombre del proyecto
    //             walletAddress, // Dirección del productor
    //             { gasLimit: 2000000 }
    //         );
    //         toast.success('Propuesta creada con éxito', { id: toastId });
    //         console.log(transaction);
    //         setLoading(false);
    //         return transaction;
    //     } catch (error) {
    //         console.error('Error al proponer lending:', error);
    //         toast.error('Error al proponer el proyecto', { id: toastId });
    //         setLoading(false);
    //         throw error;
    //     } finally {
    //         setLoading(false);
    //     }
    // };




    return { approveToken, investInLending, signRelease, regretInvestment, claimReturns, disburseFunds, loading, injectFunds, approveProject };
};

export default useLending;