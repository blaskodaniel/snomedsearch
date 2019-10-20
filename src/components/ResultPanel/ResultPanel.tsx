import React from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import {IConcept} from "../../models/IConcept";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            textAlign: 'left',
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
        listitem: {
            background: "#f3f3f3",
            borderRadius: "4px",
            marginBottom: "5px",
            border: "1px solid #0000001c",
            padding: "6px 14px",
            boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
            "&:hover": {
                background: "#ffffff",
                cursor: "pointer"
            }
        },
        listitemtitle:{
            margin: 0
        },
        highlighttext:{
            color: "#8036e2",
            fontWeight: "bold"
        }
    }),
);

interface IResultPanel {
    data: IConcept[],
    terms: string
}

const ResultPanel: React.FunctionComponent<IResultPanel> = ({ data, terms }) => {
    const classes = useStyles();

    const highlightwords = (word: string) => {
        const searchterms = terms.trim().split(" ").map((x:string) => x.toLowerCase());
        const text = word.trim().split(" ");
        const highlightwords = text.map((x:string, y:number)=>{
            if(searchterms.includes(x.toLowerCase())){
                return (<span key={y} className={classes.highlighttext}>{" "}{x}{" "}</span>)
            }else{
                return (<React.Fragment key={y}>{" "}{x}{" "}</React.Fragment>)
            }
        })

        return highlightwords;
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                        result length: {data.length}
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        Search result:
                    </Typography>
                    <div>
                        <List dense={true}>
                            {data.map((x: any) => {
                                return (
                                    <div key={x.conceptId} className={classes.listitem}>
                                        <div>
                                            <p className={classes.listitemtitle}>{highlightwords(x.pt.term)}</p>
                                        </div>
                                        <div>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {x.definitionStatus}
                                            </Typography>
                                        </div>
                                    </div>
                                )
                            })}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default ResultPanel;