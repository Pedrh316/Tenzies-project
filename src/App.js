import React from 'react';
import Die from './components/Die';
import Header from './components/Header';
import './css/style.css';

export default function App(){
    
    let [diesData, setDiesData] = React.useState(generateDiesData);
    let [buttonStatus, setButtonStatus] = React.useState({
        handleClick:rollRound,
        name:'Roll'
    })
    let [activedDiesData, setActivedDiesData] = React.useState([]);
    
    function generateDiesData(){
        let arrDiesData = []
        for(let i = 1; i <= 10; i++){
            arrDiesData.push({
                id:i,
                number:randomNumber(),
                handleClick:activeDie,
                isActived:false,
                isWrong:false
            });
        }
        return arrDiesData;
    }
    
    function randomNumber(){
        return parseInt(Math.random() * 9) + 1;
    }
    
    function rollRound(){
        // let updatedDiesData = diesData.map(dieData => {
            //     if(dieData.isActived === false){
                //         dieData.number = randomNumber();
                //     }
        //     return dieData;
        // })
        setDiesData(prevDiesData => {
            return prevDiesData.map(dieData => {
                if(dieData.isActived === false){
                    dieData.number = randomNumber();
                }
                return dieData;
            })
        });
    }
    
    function activeDie(id){
        setDiesData(prevDiesData => prevDiesData.map(dieData => {
            if(dieData.id === id){
                dieData.isActived = true;                
                setActivedDiesData(prevActivedDiesData => ([...prevActivedDiesData, dieData]))
            }
            return dieData;
        }));
    }
    
    function resetGame(){
        setDiesData(prevValue => {
            return prevValue.map(dieData => ({...dieData, number:randomNumber(), isActived:false, isWrong:false }));
        });
        setActivedDiesData([]);
        setButtonStatus({handleClick:rollRound, name:'Roll'})
    }

    React.useEffect(() => {
        let isFinished = diesData.every(dieData => dieData.isActived === true);
        let isWrong = diesData.some(dieData => dieData.isWrong);
        if(isFinished || isWrong){
            setButtonStatus({handleClick:resetGame , name:'Restart'});
        }        
    }, [diesData]);    
    
    React.useEffect(() => {
        activedDiesData.map(activedDieData => {
            if(activedDieData.number !== activedDiesData[0].number){
                setDiesData(prevDiesData => prevDiesData.map(dieData => (
                    activedDieData.id === dieData.id ? {...dieData, isWrong:true} : dieData
                )))
            }            
        })
    }, [activedDiesData]);
    

    let dies = diesData.map(dieData => <Die key={dieData.id} {...dieData} />);
    
    return (
        <div className="gameContainer">
            <Header/>
            <main className="main">
                <div className="diesContainer">
                    {dies}
                </div>
                <button className="roll-btn" onClick={buttonStatus.handleClick}>{buttonStatus.name}</button>
            </main>
        </div>
    )
}