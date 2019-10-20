import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { search } from "../../service/api-functions";
import ResultPanel from "../ResultPanel/ResultPanel";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import {IConcept} from "../../models/IConcept";

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
        }
    }),
);

const SearchPanel: React.FunctionComponent = () => {
    const classes = useStyles();
    const [searchterm, setSearchterm] = useState("");
    const [resultdata, setResultdata] = useState<IConcept[] | null>(null)
    const [loading, setLoading] = useState(false)

    const handleChange: any = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchterm(event.target.value)
    }

    const searchsubmit: any = async (event: React.FormEvent<HTMLInputElement>) => {
        setLoading(true);
        event.preventDefault();
        const response = await search(searchterm);
        console.log(response);
        setResultdata(response.data.items)
        setLoading(false);
    }

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
                        <IconButton className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </form>
            </Grid>
            {loading ? <Grid container justify="center" alignItems="center" className={classes.progressContainer}>
                <CircularProgress className={classes.progress} />
            </Grid> : null}

            {resultdata !== null && !loading ? <ResultPanel data={resultdata} terms={searchterm} /> : null}
        </>
    )
}

export default SearchPanel;