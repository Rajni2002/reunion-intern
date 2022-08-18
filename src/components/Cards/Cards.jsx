import { Grid } from "@mui/material";
import React from "react";
import Pcard from "./Pcard/Pcard.jsx";

export default function Cards({proData, setProData}) {
    function giveStar(id){
        setProData(
            proData.map((item) => {
                item.like = (item.id) === id ? !(item.like) : item.like
              return item;
            })
          );
    }
    return (
        proData.length ? 
        <Grid container rowSpacing={5} spacing={{ xs: 2, md: 3 }} columns={3} sx={{width:'90%', marginTop: '1.5rem'}}>
            {proData.map((item) => (
                <Pcard data={item} key={item.id} giveStar={giveStar}/>
            ))}
        </Grid>
        :
        <h1 style={{color: 'grey'}}>Nothing in basket</h1>
    )
}