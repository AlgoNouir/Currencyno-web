import Banner from "@/components/UI/banner";
import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";

export default function MainPage() {
    return (
        <div className="flex flex-col items-center pt-36 bg-fixPattern">
            <Header />
            <div className="p-5 space-y-5 container">
                <Banner images={[""]} />
                <Banner images={[""]} />
                <Banner images={[""]} />
                <Banner images={[""]} />
                <Banner images={[""]} />
            </div>
            <Footer />
        </div>
    );
}
