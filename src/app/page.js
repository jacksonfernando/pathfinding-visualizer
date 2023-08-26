import Navbar from "@/components/navbar";
import { ParamsProvider } from "../../store/context";
import './globals.css';
import Grid from "@/components/grid";

export default function Home() {
  return (
    <>
      <ParamsProvider>
        <Navbar />
        tolol
        <Grid />
      </ParamsProvider>
    </>
  )
}
