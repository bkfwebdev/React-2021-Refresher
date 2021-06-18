import React from 'react';
import PropTypes from 'prop-types';

const Button = ({color,text,onClick}) => {
    return (
         <button 
         style = {{backgrounColor:color}} 
         className = 'btn'
         onClick = {onClick}>
         {text}
         </button>
    )
}

Button.defaulProps = {
    color : "steelblue"
}

Button.propTypes = {
    text : PropTypes.string,
    color : PropTypes.string,
    onClick : PropTypes.func
}


export default Button