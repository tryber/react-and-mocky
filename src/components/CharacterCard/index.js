import React from 'react'
import './styles.css'
class CharacterCard extends React.Component {
    render(){
        const { character : {name, image, status}} = this.props
        return(
            <article className='card'>
                <img alt={name} src={image} />
                <h3 className='card-name'>{name}</h3>
                <p className='card-status'>{status}</p>
            </article>
        )
    }
}
export default CharacterCard;