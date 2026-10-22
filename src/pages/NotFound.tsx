import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NotFoundPage } from "@/kit";

const NotFound = () => (
  <div className="font-serif" style={{ backgroundColor: "#FDFCFA" }}>
    <NotFoundPage header={<Navbar forceScrolled />} footer={<Footer />} />
  </div>
);

export default NotFound;
