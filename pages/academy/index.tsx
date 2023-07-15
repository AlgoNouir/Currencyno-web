import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import Banner from "@/components/UI/banner";
import ProductLists from "@/components/store/productsList";
import { useAppSelector } from "@/store/HOCs";

export default function MainPage() {
    const products = useAppSelector((store) => store.products);
    return (
        <div className="flex flex-col items-center pt-36">
            <Header />
            <Footer />
        </div>
    );
}
