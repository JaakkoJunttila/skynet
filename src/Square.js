import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';

function Square({ square, index, move, disabled }) {

    // Valittu ruutu välitetään parametrina annetun move() funtion kautta
    const handleClick = () => {
        move(index)
    }
    
    // 0, 1, 2 pelitilanteet muunnetaa helpommin tunnistettaviksi +, X, Y merkeiki.
    const editGame = () => {
        square === '0' ? square = '+' :
        square === '1' ? square = 'X' : square = '0'
        return square
    }

    // 4x4 ruutu saadaan aikaan lisäämällä jokaisen neljällä jaollisen indeksin väliin rivinvaihto.
    return (
        <>
        <Button sx={{ height: 56 }} onClick={handleClick} disabled={disabled}>{editGame(square)}</Button>
        {(index+1)%4 === 0 && <br/>}
        </>
    );
}

export default Square;