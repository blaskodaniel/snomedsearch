import React, { Dispatch, SetStateAction } from 'react'
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import uuidv1 from "uuid/v1";
import { IGroupedList } from '../ResultPanel/ResultPanel'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bucket: {
            "&:hover": {
                cursor: "pointer"
            },
            paddingBottom: 0,
            paddingTop: 0,
            background: "#e5e9fb",
            maxWidth: "200px",
            marginBottom: "5px"
        }
    }),
);

interface IFilter{
    groupedList: IGroupedList[],
    setbucketFilter: Dispatch<SetStateAction<string>>
}

const Filter: React.FunctionComponent<IFilter> = ({groupedList,setbucketFilter}) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={3}>
            <List>
                {groupedList.map(x => {
                    return (
                        <ListItem className={classes.bucket} key={uuidv1()} onClick={() => setbucketFilter(x.name)}>
                            <ListItemText
                                primary={x.name}
                                secondary={`Total length: ${x.data.length}`}
                            />
                        </ListItem>)
                })}
            </List>
            <List>
                <ListItem className={classes.bucket} onClick={() => setbucketFilter("")}>
                    <ListItemText
                        primary="All result"
                        secondary=""
                    />
                </ListItem>
            </List>
        </Grid>
    )

}

export default Filter