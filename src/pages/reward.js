import React/*, { useState, useEffect, useCallback }*/ from "react";
import Header from "../components/header";
import { useBlockchainContext } from "../context";
import { useWallet } from "use-wallet";
// import { NotificationManager } from "react-notifications";
import { Grid, Container } from "@mui/material";
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import { Pager } from "@progress/kendo-react-data-tools";
import '@progress/kendo-theme-default/dist/all.css';

function Home() {
    // datas
    const wallet = useWallet();
    const [state] = useBlockchainContext();

    console.log("state.histories", state.histories);

    const [page, setPage] = React.useState({
        skip: 0,
        take: 3,
    });
    const { skip, take } = page;

    const handlePageChange = (e) => {
        setPage({
            skip: e.skip,
            take: e.take,
        });
    };

    return (
        <div>
            <Header />
            <Container >
                <div className="RoundInfoCard">
                    <ListView
                        data={state.histories.slice(skip, skip + take)}
                        item={CardItem}
                        style={{
                            width: "100%",
                        }}
                        header={CardHeader}
                    />
                    <Pager
                        skip={skip}
                        take={take}
                        onPageChange={handlePageChange}
                        total={state.histories.length}
                    />

                </div>
            </Container>
        </div>
    );
}

export default Home;

const CardHeader = () => {
    return (
        <ListViewHeader
            className="pl-4 pb-2 pt-2"
        >
            <Grid container className="text-center">
                <Grid item xs={6} sm={6} md={2.4} className="x-font3-red">
                    Rate
                </Grid>
                <Grid item xs={6} sm={6} md={2.4} className="x-font3-red">
                    Data
                </Grid>
                <Grid item xs={6} sm={6} md={2.4} className="x-font3-red">
                    Player
                </Grid>
                <Grid item xs={6} sm={6} md={2.4} className="x-font3-yellow">
                    amount
                </Grid>
                <Grid item xs={6} sm={6} md={2.4} className="x-font3-yellow">
                    Tx
                </Grid>
            </Grid>
            <div className="space-line"></div>
        </ListViewHeader>
    );
};

const CardItem = (props) => {
    const [state] = useBlockchainContext();
    // const [rate, setRate] = React.useState(1)
    let item = props.dataItem;
    console.log(state.players)
    // for (let i = 1; i <= state.histories.length - 1; i++) {
    //     setRate(i);
    // }

    try {
        let rate = 1;
        rate += 1;
        if (rate > state.histories.length) { return }
        var date = new Date(item.data)
        return (
            <Grid container className="text-center">
                <Grid item xs={6} sm={6} md={2.4} className="x-font4-white">
                    {item.rate}
                </Grid>
                <Grid item xs={6} sm={6} md={2.4} className="x-font4-white">
                    {date.toDateString()}
                </Grid>
                <Grid item xs={6} sm={6} md={2.4} className="x-font4-white">
                    {item.user}
                </Grid>
                <Grid item xs={6} sm={6} md={2.4} className="x-font4-white">
                    {item.amount / 10 ** 18}
                </Grid>
                <Grid item xs={6} sm={6} md={2.4} className="x-font4-white">
                    {item.txhash.slice(0, 5) + "..." + item.txhash.slice(-5)}
                </Grid>
            </Grid>
        )
    } catch (err) {
        return (<div>

        </div>)
    }
}