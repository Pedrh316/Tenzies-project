export default function Die(props){
    return (
        <button 
            className={`die ${props.isActived && 'die-actived'} ${props.isWrong && 'die-wrong'}`}
            onClick={() => props.handleClick(props.id)}
        >
            {props.number}
        </button>
    )
}