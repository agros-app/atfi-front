import Button from "@/components/button/button";
import TextField from "@/components/textField/textField";
import {useState} from "react";
import useLending from "@/hooks/useLending";
import mockUSDT from "@/contracts/MockUSDT.json";
import lending from "@/contracts/lendingTest.json";
import {Loader} from "@/components/loader/loader";

type ProjectCardProps = {
    image: string;
    title: string;
    harvestType: string;
    location: string;
    endsIn: string;
    requiredAmount: string;
    raisedAmount: string;
};


export const ProjectCard = ({
                                image,
                                title,
                                harvestType,
                                location,
                                endsIn,
                                requiredAmount,
                                raisedAmount,
                            }: ProjectCardProps) => {

    const [amount, setAmount] = useState(0)

    const {investInLending, loading} = useLending()

    const handleInvest = async () => {
        await investInLending(amount.toString(), mockUSDT, lending);
        setAmount(0)
    }

    return (
        <div style={{display: 'flex', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.16)', maxWidth: '700px', height: '250px'}}>
            <div style={{maxWidth: '400px', minHeight: '100%', objectFit: 'cover'}}>
                <img style={{maxWidth: '100%', minHeight: '100%' , maxHeight: '100%', borderRadius: '10px'}} src={image} alt="project" />
            </div>
            <div style={{padding: '8px 12px', width: '100%', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h4>{title}</h4>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <p>Tipo de cultivo:</p>
                    <p>{harvestType}</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <p>Ubicacion:</p>
                    <p>{location}</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <p>Finaliza en:</p>
                    <p>{endsIn}</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <p>${requiredAmount}</p>
                </div>
                <ProgressBar />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <p>Monto recaudado:</p>
                    <p>${raisedAmount}</p>
                </div>
                <div style={{border: '1px dashed #bfbfbf', width: '80%', margin: '6px auto'}}/>
                <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <TextField
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        type={'number'}
                        placeholder={'Elija un monto'}
                        name={'Invest'}
                    />
                    <Button
                        onClick={handleInvest}
                        size={"md"}
                        variant={"primary"}
                        disabled={loading}
                    >
                        {!loading ? 'Invertir' : <Loader />}
                    </Button>
                    <Button
                        size={"md"}
                        variant={"outlined"}
                    >
                        Detalles
                    </Button>
                </div>
            </div>
        </div>
    )
}

const ProgressBar = () => {
    const progressBarStyle = {
        width: `50%`,
        height: '100%',
        backgroundColor: '#9bd35b',
        transition: 'width 1s ease',
    };

    const containerStyle = {
        width: '80%',
        height: '40px',
        backgroundColor: '#e0e0df',
        borderRadius: '16px',
        overflow: 'hidden',
        margin: 'auto',
    };

    return (
        <div style={containerStyle}>
            <div style={progressBarStyle}></div>
        </div>
    );

}

