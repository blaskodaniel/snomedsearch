import React, { useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { concept, conceptbyid } from "../../service/api-functions";
import ResultPanel from "../ResultPanel/ResultPanel";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IMockConceptData } from "../../models/IConcept";
import { useDelaySearch } from "../../hooks/useDelaySearch";
import Autocomplete from "../Autocomplete/Autocomplete";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            textAlign: 'center',
            padding: '10px'
        },
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center'
        },
        input: {
            marginLeft: theme.spacing(1),
            width: '100%',
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        progress: {
            margin: theme.spacing(2)
        },
        progressContainer: {
            height: '75vh'
        },
        hidden:{
            display: "none"
        }
    }),
);

const SearchPanel: React.FunctionComponent = () => {
    const classes = useStyles();
    const [searchterm, setSearchterm] = useState("");
    const [showautocomplete, setshowautocomplete] = useState(false)
    const [resultdata, setResultdata] = useState<IMockConceptData[] | null>(null)
    const [loading, setLoading] = useState(false)

    const delayedSearchTerm = useDelaySearch(searchterm, 500);

    const handleChange: any = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchterm(event.target.value)
        if(event.target.value !== ""){
            setshowautocomplete(true)
        }else{
            setshowautocomplete(false)
        }
    }

    const searchoncept: any = async (concept: any) => {
        setLoading(true);
        const response = await conceptbyid(concept.conceptId);
        console.log(response);
        setResultdata(response.data)
        setLoading(false);
        setshowautocomplete(false)
    }

    const startsearch: any = async () => {
        setLoading(true);
        const response = await concept(searchterm);
        console.log(response);
        setResultdata(response.data.items)
        setLoading(false);
    }

    const searchsubmit: any = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        startsearch()
    }

    useEffect(
        () => {
            if (delayedSearchTerm) {
                startsearch(searchterm)
            } else {
                setResultdata([]);
            }
        },
        [delayedSearchTerm]
    );

    return (
        <>
            <Grid item xs={12}>
                <Typography className={classes.title} variant="h5" gutterBottom>
                    SNOMED CT Concept search widget
                </Typography>
                <form noValidate autoComplete="off" onSubmit={searchsubmit}>
                    <Paper className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search concept"
                            value={searchterm}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'search concept' }}
                        />
                        <IconButton className={classes.iconButton} aria-label="search" onClick={startsearch}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Autocomplete className={showautocomplete ? "" : classes.hidden} value={searchterm} onSelect={(concept: string)=>searchoncept(concept)} />
                </form>
            </Grid>
            {loading ? <Grid container justify="center" alignItems="center" className={classes.progressContainer}>
                <CircularProgress className={classes.progress} />
            </Grid> : null}

            {resultdata !== null && !loading && resultdata.length !== 0 ? <ResultPanel data={resultdata} terms={searchterm} />
                :
                resultdata !== null && resultdata.length === 0 && !loading ? <Grid container justify="center" alignItems="center">
                    <Grid item>
                        <p>No results</p>
                    </Grid>
                </Grid> : null
            }
        </>
    )
}

export default SearchPanel;