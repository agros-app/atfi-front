import {ethers} from "ethers";

interface ContractObject {
    address: string;
    abi: any;
}

const approveToken = async (amount: ethers.BigNumber, tokenContract: ethers.Contract, lendingAddress: string) => {
    try {
        const tx = await tokenContract.approve(lendingAddress, amount);
        await tx.wait();
        console.log('Token aprobado con éxito');
        return true;
    } catch (error) {
        console.error('Error al aprobar el token:', error);
        return false;
    }
};

const isNumberPositive = (amount: string) => {
    const numberAmount = Number(amount);
    return !isNaN(numberAmount) && numberAmount > 0;
}

export const investInLending = async (
    amount: string,
    mockUSDTObject: ContractObject,
    lendingObject: ContractObject,
) => {

    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(mockUSDTObject.address, mockUSDTObject.abi, signer);
    const lendingContract = new ethers.Contract(lendingObject.address, lendingObject.abi, signer);

    if (!lendingContract || !isNumberPositive(amount)) {
        console.error('Monto de inversión no válido');
        return;
    }

    const amountInWei = ethers.utils.parseUnits(amount, 6);
    const approvalSuccess = await approveToken(amountInWei, tokenContract, lendingObject.address);

    if (!approvalSuccess) {
        console.log('La aprobación del token falló o fue rechazada');
        return;
    }

    try {
        return await lendingContract.invest(amountInWei, {gasLimit: 6000000});
    } catch (error) {
        console.error('Error al invertir en el lending:', error);
    }
};

export const regretInvestment = async (amount: string, lendingObject: ContractObject) => {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const lendingContract = new ethers.Contract(lendingObject.address, lendingObject.abi, signer);

    if (!lendingContract || !isNumberPositive(amount)) {
        console.error('Monto de inversión no válido');
        return;
    }

    try {
        const amountInWei = ethers.utils.parseUnits(amount, 6);
        const transaction = await lendingContract.regretInvestment(amountInWei, { gasLimit: 2000000 });
    } catch (error) {
        console.error('Error al retirar la inversión:', error);
    }
}

export const claimReturns = async (lendingObject: ContractObject) => {
    const lendingContract = new ethers.Contract(lendingObject.address, lendingObject.abi);

    if (!lendingContract) {
        console.error('Contrato de lending no válido');
        return;
    }

    try {
        const transaction = await lendingContract.claimReturns();
    } catch (error) {
        console.error('Error al reclamar los retornos:', error);
    }
}

