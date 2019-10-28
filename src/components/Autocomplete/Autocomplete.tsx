import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import classNames from "classnames";
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { search } from "../../service/api-functions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        autocompletecontainer: {
            borderLeft: "1px solid #0e0e0e26",
            borderRight: "1px solid #0e0e0e26",
            borderBottom: "1px solid #0e0e0e26",
            background: "#fffffe",
            padding: "10px",
            marginTop: "1px",
            width: "99%",
            marginLeft: "4px",
            maxHeight: "300px",
            overflow: "auto"
        },
        paddingnull: {
            "&:hover":{
                cursor: "pointer"
            },
            paddingBottom: 0,
            paddingTop: 0
        },
        hidden: {
            display: "none"
        }
    }),
);

interface IAutocomplete {
    value: string,
    onSelect: (concept:any)=>{},
    className: string
}

const Autocomplete: React.FunctionComponent<IAutocomplete> = ({ value, onSelect, className }) => {
    const classes = useStyles();
    const [resultdata, setResultdata] = useState<any[]>([])

    const startsearch: any = async () => {
        const response = await search(value);
        setResultdata(response.data.items)
    }

    useEffect(
        () => {
            console.log("value: "+value);
            
            if(value.trim() !== "")
                startsearch()
        
        },
        [value]
    );

    return (
        <>
            <Grid className={classNames(classes.autocompletecontainer,{hidden:resultdata.length > 0}, className)}>
                <List dense={true}>
                    {resultdata.map((x: any) => {
                        return (
                            <ListItem className={classes.paddingnull} key={x.descriptionId} onClick={()=>{onSelect(x)}}>
                                <ListItemText
                                    primary={x.term}
                                />
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
        </>
    )
}

export default Autocomplete;