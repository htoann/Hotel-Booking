import Header from "../components/layout";
import Head from "next/head";
import {Offers, Search} from "../components/homepage";

export default function Home() {
    return (
        <>
            <Head>
                <title>Booking</title>
            </Head>
            <div className="flex flex-col mx-auto">
                <Header/>
                <Search/>
                <Offers/>
            </div>
        </>
    );
}
