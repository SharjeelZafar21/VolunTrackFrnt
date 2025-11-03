import Navbar from "@/components/navbar";

export default function Home (){
    return(
        <>
          <Navbar />
            <section className="text-center mt-10">
                <h1  className="text-4xl font-bold text-teal-700">
                    Welcome to VolunTrack
                </h1>
                <p className="mt-4 text-gray-600">
                    Connect with local volunteering opportunities
                </p>
            </section>
        </>
    );
}