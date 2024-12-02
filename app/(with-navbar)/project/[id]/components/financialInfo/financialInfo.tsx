'use client'
import styles from './financialInfo.module.scss'
import ProgressBar from '@/components/progressBar/progressBar'
import Button from '@/components/button/button'
import TextIndexComponent from '../TextIndexComponent/textIndexComponent'
import TextField from '@/components/textField/textField'
import useLending from '@/hooks/useLending'
import { FormEventHandler, useEffect, useState } from 'react'
import mockUSDT from '@/contracts/mockUSDT.json'
import lending from '@/contracts/lendingTest.json'
import { investByProjectId, regretInvestment as regret } from '@/lib/api'

type FinancialInfoProps = {
  projectId: number
  isProducer: boolean
  campaignEnded: boolean
  currentAmount: number
  goalAmount: number
  minAmount: number
  country: string
  seed: string
  area: number
  contractAdress: string
  returnsDate: string
}

export default function FinancialInfo({
  projectId,
  isProducer,
  campaignEnded,
  currentAmount,
  goalAmount,
  minAmount,
  country,
  seed,
  area,
  contractAdress,
  returnsDate,
}: FinancialInfoProps) {
  console.log(contractAdress)
  const { investInLending, disburseFunds, loading, regretInvestment,  claimReturns, injectFunds } =
    useLending(contractAdress!!)
  const percentage = Math.floor((currentAmount / goalAmount) * 100)
  const [collected, setCollected] = useState(currentAmount)
  const [amount, setAmount] = useState<number>(0)

  useEffect(() => {
    setCollected(currentAmount)
  }, [currentAmount])

  const handleInvest: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    // @ts-ignore
    const amount = parseInt(event.target.amount.value)
    console.log('invirtiendo en el contrato', contractAdress)
    await investInLending(
      amount.toString(),
      mockUSDT,
      contractAdress,
      lending,
      projectId
    )
    setCollected(Math.floor(currentAmount + amount))
    // @ts-ignore  typescript is not recognizing the reset method
    event.target.reset()
  }

  function capitalizeFirstLetter(string?: string) {
    if (!string) return '' // Maneja casos donde string sea undefined o null
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const handleRegret = async () => {
    console.log("amoutn", amount)
    await regretInvestment(amount.toString(), lending, async () => await regret(projectId, amount));
    setCollected(Math.floor(currentAmount - amount))
  }

  const handelInject = async () => {
    console.log("amount", amount)
    await injectFunds(amount.toString(),  mockUSDT, contractAdress, lending);
  }

  const handleClaimReturns = async () => {
    await claimReturns(lending)
  }

  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <h3 className={styles.title}>Total Recaudado</h3>
        <div className={styles.amount}>
          <TextIndexComponent
            text={`$${collected} USD`}
            percentage={`${percentage}`}
            subtext={`Meta: $${goalAmount} USD`}
          />
          <div className={styles.progressBar}>
            <ProgressBar
              collected={collected}
              goal={goalAmount}
              height={15}
            />
          </div>
        </div>
        <ul className={styles.leaders}>
          <li>
            {/*Only shows the principal seed*/}
            <span>Tipo de cosecha</span>
            <span>{capitalizeFirstLetter(seed)}</span>
          </li>
          <li>
            <span>Ubicación</span>
            <span>{capitalizeFirstLetter(country)}</span>
          </li>
          <li>
            <span>Tamaño</span>
            <span>{`${area} Ha`}</span>
          </li>
          <li>
            <span>Retornos</span>
            <span>{`${returnsDate}`}</span>
          </li>

          {/*<li>*/}
          {/*  <span>Roi estimado *</span>*/}
          {/*  <span>11,2%</span>*/}
          {/*</li>*/}
        </ul>
        <form className={styles.form} onSubmit={handleInvest}>
          <TextField
              placeholder="Monto a invertir"
            name="amount"
            type="number"
            // @ts-ignore
            min={minAmount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
          <small>*Minimo de inversión: ${minAmount}</small>
          {!isProducer && (
            < div style={{marginTop: '16px'}}>
              <Button
                  // @ts-ignore
                  type={'submit'} fill disabled={loading}>
                Invertir
              </Button>
              < div style={{marginTop: '16px'}}>
                <Button disabled={loading} variant={'secondary'} fill onClick={handleRegret}>
                Revertir inversión
                </Button>
              </div>
            </div>
          )}
        </form>
        {isProducer && (
            <div style={{marginTop: '16px'}}>
              <Button fill onClick={disburseFunds}>
                Retirar fondos
              </Button>
              <div style={{marginTop: '16px'}}>
                <Button fill onClick={handelInject} variant={'secondary'}>
                Inyectar retornos
              </Button>
            </div>
          </div>
        )}
        {campaignEnded && (
          <div style={{ marginTop: '16px' }}>
            <Button fill onClick={handleClaimReturns}>
              Retirar ganancias
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
