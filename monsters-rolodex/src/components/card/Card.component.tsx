import { Monster } from "../../App";
import {Component} from "react";

type CardProps = {
    monster: Monster;
}

const Card = ({monster}: CardProps) =>{
    const {name, email, id} = monster
    return(
        <div key={id} className='card-container'>
            <img alt={`monster ${name}`} src={`https://robohash.org/${id}?set=set2&size=180x180`} />
            <h2>{name}</h2>
            <p>{email}</p>
        </div> 
    )
}

export default Card