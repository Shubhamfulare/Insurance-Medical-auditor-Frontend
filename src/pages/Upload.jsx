import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import DashboardPage from "../pages/layout/index";

export default function App() {
    const [images, setImages] = useState([]);

    const handleUploadSuccess = (data) => {
        setImages((prev) => [...prev, data]);
    };

    

    return (

        <DashboardPage>
            <div className="p-2">



                <h1 className="text-3xl font-bold mb-3 text-center text-black">
                  Autonomous Medical <span className="">Claim Auditor</span> 
                </h1>

                <div className="md:grid-cols-2 gap-6">

                    {/* Upload Box */}
                    <div className="bg-white shadow p-6 rounded">
                        <ImageUpload onUploadSuccess={handleUploadSuccess} />
                    </div>

                    {/* Processed Images List */}
                    {/* <div className="bg-white shadow p-6 rounded">
          <ImageList images={images} />
        </div> */}
                </div>
            </div>
        </DashboardPage>
    );
}
