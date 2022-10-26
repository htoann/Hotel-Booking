import Header from "../components/layout";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Booking</title>
            </Head>
            <div className="flex mx-auto">
                <Header/>
            </div>
        </>
    );
}
