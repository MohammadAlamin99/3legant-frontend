import Announcedbar from "@/components/Announcedbar";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import SearchComonent from "@/components/search/searchComonent";

export default function Page() {
    return (
        <>
            <Announcedbar />
            <NavMenu />
            <SearchComonent/>
            <Footer />
        </>
    );
}

