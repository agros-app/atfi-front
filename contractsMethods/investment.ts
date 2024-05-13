'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {useParams} from "next/navigation";
import {Property} from "csstype";

// Define la función de aprobación
const approveToken = async (amount: ethers.BigNumber, tokenContract : ethers.Contract , lendingAddress : string) => {
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



const investInLending = async (amount: string, lendingAddress: string, LendingAbi:string, mockUsdtAddress: string, MockUsdtAbi: any) => {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(mockUsdtAddress, MockUsdtAbi, signer);
    const lendingContract = new ethers.Contract(lendingAddress, LendingAbi, signer);
    if (!lendingContract || !isNumberPositive(amount)) {
        console.error('Monto de inversión no válido');
        return;
    }
    const amountInWei = ethers.utils.parseUnits(amount, 6);
    const approvalSuccess = await approveToken(amountInWei, tokenContract, lendingAddress);
    if (!approvalSuccess) {
        console.log('La aprobación del token falló o fue rechazada');
        return;
    }
    try {
        const transaction = await lendingContract.invest(amountInWei);
        console.log(transaction);

    } catch (error) {
        console.error('Error al invertir en el lending:', error);
    }
};


const regretInvestment = async (amount: string, lendingAddress: string, LendingAbi:string) => {
    const lendingContract = new ethers.Contract(lendingAddress, LendingAbi);
    if (!lendingContract || !isNumberPositive(amount)) {
        console.error('Monto de inversión no válido');
        return;
    }
    try{
        const amountInWei = ethers.utils.parseUnits(amount, 6);
        const transaction = await lendingContract.regretInvestment(amountInWei);
        console.log(transaction);
    }
    catch (error) {
        console.error('Error al retirar la inversión:', error);
    }


}

const claimReturns = async (lendingAddress: string, LendingAbi:string) => {
    const lendingContract = new ethers.Contract(lendingAddress, LendingAbi);
    if (!lendingContract) {
        console.error('Contrato de lending no válido');
        return;
    }
    try {
        const transaction = await lendingContract.claimReturns();
        console.log(transaction);
    } catch (error) {
        console.error('Error al reclamar los retornos:', error);
    }
}


const isNumberPositive = (amount: string) => {
    const numberAmount = Number(amount);
    return !isNaN(numberAmount) && numberAmount > 0;
};

