import React from "react";

import { makeStyles } from "@mui/styles";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Drawer from '@mui/material/Drawer';
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles({
    paper: {
        background: "#fff2c5"
    }
});

const FavList = (props) => {

    const classes = useStyles();

    return (
        <Drawer
            classes={{ paper: classes.paper }}
            anchor="right"
            open={props.open}
            onClose={props.onToggle}
        >
            <Box
                sx={{width: 285}}
                role="presentation"
                onKeyDown={props.onToggle}>
                <List>
                    {props.favorites.map(x =>
                        <ListItem button key={x.id}
                                  secondaryAction={
                                      <IconButton onClick={() => props.onHandleDelete(x)} aria-label="delete">
                                          <DeleteIcon />
                                      </IconButton>
                                  }>
                            <ListItemIcon>
                                <img alt={x.alt_description} src={x.urls.thumb} />
                            </ListItemIcon>
                        </ListItem>
                    )}
                </List>
            </Box>
        </Drawer>
    )
};

export default FavList;
