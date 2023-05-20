import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link } from "react-router-dom";

import { useState } from 'react';
import { TDeck } from './api/getDecks';


import './header.css';

type HeaderProps = {
    decks: TDeck,
    selectedDeck: string,
    setSelectedDeck: (deck: string) => void
}

const Header: React.FC<HeaderProps> = ({decks, selectedDeck, setSelectedDeck}) => {

    const handleChange = (event: SelectChangeEvent) => {
        // console.log('selectedDeck: ', selectedDeck);
      setSelectedDeck(event.target.value as string);
    };

    console.log('inside Header, decks: ', decks)

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar className="appbar">
            <Toolbar className="toolbar">
                <Link to="/" style={{color: 'black'}} onClick={() => {setSelectedDeck("")}}>CoolestFlashCardsEver</Link>
                <FormControl sx={{width: '30%'}}>
                    <InputLabel id="demo-simple-select-label">Decks</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedDeck}
                        label="Deck"
                        onChange={handleChange}
                    >
                        {decks.map((deck)=> 
                            <MenuItem value={deck.title} key={deck._id} >
                                <Link to={`decks/${deck._id}`} style={{width: '100%', color: 'black'}} >{deck.title}</Link>
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        </Box>
    )
}

export default Header