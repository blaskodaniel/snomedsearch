import React, { useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid';
import { IMockConceptData } from "../../models/IConcept";
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import Drawer from '@material-ui/core/Drawer';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ListIcon from '@material-ui/icons/List';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import Filter from "../Filter/Filter";


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
        pointer: {
            "&:hover": { cursor: "pointer" }
        },
        input: {
            marginLeft: theme.spacing(1),
            width: '100%',
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        bucket: {
            "&:hover": {
                cursor: "pointer"
            },
            paddingBottom: 0,
            paddingTop: 0,
            background: "#e5e9fb",
            maxWidth: "200px",
            marginBottom: "5px"
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
        listitemtitle: {
            margin: 0
        },
        highlighttext: {
            color: "#8036e2",
            fontWeight: "bold"
        },
        flexContainer: {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        flexChild: {
            alignSelf: "stretch",
            flexGrow: 1,
            margin: "5px"
        },
        filterbtn: {
            "&:hover": {
                cursor: "pointer"
            },
            position: "absolute",
            top: "20px",
            height: "30px",
            background: "#1f1f1e33",
            left: "0px",
            padding: "3px"
        },
        drawerstyle:{
            "& div.MuiDrawer-paper":{
                padding: "15px",
                width: "233px"
            }
        }
    }),
);

interface IResultPanel {
    data: IMockConceptData[],
    terms: string,
    width: Breakpoint
}

export interface IGroupedList {
    data: IMockConceptData[],
    name: string
}

const ResultPanel: React.FunctionComponent<IResultPanel> = ({ data, terms, width }) => {
    const classes = useStyles();
    const [isListmode, setIsListmode] = useState(true)
    const [groupedList, setgroupedList] = useState<IGroupedList[]>([])
    const [list] = useState<IMockConceptData[]>(data)
    const [bucketFilter, setbucketFilter] = useState("")
    const [openDrawer, setopenDrawer] = useState(false)

    const highlightwords = (word: string) => {
        const searchterms = terms.trim().split(" ").map((x: string) => x.toLowerCase());
        const text = word.trim().split(" ");
        const highlightwords = text.map((x: string, y: number) => {
            if (searchterms.includes(x.toLowerCase())) {
                return (<span key={y} className={classes.highlighttext}>{" "}{x}{" "}</span>)
            } else {
                return (<React.Fragment key={y}>{" "}{x}{" "}</React.Fragment>)
            }
        })

        return highlightwords;
    }

    const groupBy = (key: any) => (array: IMockConceptData[]) =>
        array.reduce(
            (objectsByKeyValue: any, obj: any) => ({
                ...objectsByKeyValue,
                [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
            }),
            {}
        );

    const bucketfilterfunc = (element: IMockConceptData) => {
        if (element.source.toLowerCase() === bucketFilter.toLowerCase()) {
            return element
        }
    }

    const toggleDrawer = () => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setopenDrawer(!openDrawer);
    };

    useEffect(() => {
        const groupByBucket = groupBy('source');
        const __groupedlist = groupByBucket(data)
        let newlist = [];
        for (let akt in __groupedlist) {
            newlist.push({
                name: akt,
                data: __groupedlist[akt]
            })
        }
        setgroupedList(newlist)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                        result length: {data.length}
                    </Typography>
                    <Grid container direction="row" justify="flex-end" alignItems="flex-start">
                        <ListIcon className={classes.pointer} onClick={() => setIsListmode(true)} />
                        <ViewComfyIcon className={classes.pointer} onClick={() => setIsListmode(false)} />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        {isWidthUp('md', width) ? 
                        <Filter groupedList={groupedList} setbucketFilter={setbucketFilter} /> : null}
                        <Grid item xs={12} md={9}>
                            <div>
                                <List className={isListmode ? "" : classes.flexContainer} dense={true}>
                                    {list.map((x: any) => {
                                        if (!bucketfilterfunc(x) && bucketFilter !== "") {
                                            return null
                                        }
                                        return (
                                            <div key={x.conceptId} className={classNames(isListmode ? "" : classes.flexChild, classes.listitem)}>
                                                <div>
                                                    <p className={classes.listitemtitle}>{highlightwords(x.pt.term)}</p>
                                                    <span>Score: {x.score}</span> | <span>Bucket: {x.source}</span>
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
                </Grid>
            </Grid>
            {isWidthDown('sm', width) ?
                <div className={classes.filterbtn} onClick={toggleDrawer()}>
                    <KeyboardArrowRightIcon />
                </div>
                :
                null}
            <Drawer className={classes.drawerstyle} open={openDrawer} onClose={toggleDrawer()}>
                <Filter groupedList={groupedList} setbucketFilter={setbucketFilter} />
            </Drawer>
        </>
    )
}

export default withWidth()(ResultPanel);