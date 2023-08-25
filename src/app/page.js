import Navbar from "../components/navbar";
import { ParamsProvider } from "../../store/context";
import './globals.css';

export default function Home() {
  return (
    <>
      <ParamsProvider>
        <Navbar />
      </ParamsProvider>
    </>
  )
}
