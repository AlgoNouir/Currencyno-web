import Header from "@/components/header";
import { useAppSelector } from "@/store/HOCs";
import { useRouter } from "next/router";

export default function ProductPage() {
    const router = useRouter();
    const productId = router.query.product;

    if (typeof productId === "string") {
        const product = useAppSelector((store) => store.products).find(
            (p) => p.id === parseInt(productId)
        );
        if (product !== undefined) {
            return (
                <div className="space-y-5">
                    <Header />
                    <div></div>
                </div>
            );
        }
    }
}
