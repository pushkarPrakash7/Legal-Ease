import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import civilImg from "../assets/civil.jpg";
import corporateImg from "../assets/corporate.jpg";
import crimialImg from "../assets/criminal.jpeg";
import environmentImg from "../assets/enviroment.png";
import intellectualImg from "../assets/intellectual.jpg";
import laborImg from "../assets/labor.jpg";
import familyImg from "../assets/family.jpg";
import taxImg from "../assets/tax.webp";



function Department() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 3000, min: 1324 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1324, min: 1005 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1005, min: 700 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 700, min: 0 },
            items: 1
        }
    };
    const departmentData = [
        {
            name: "Criminal Law",
            image: crimialImg
        },
        {
            name: "Civil Law",
            image: civilImg
        },
        {
            name: "Family Law",
            image: familyImg
        },
        {
            name: "Property Law",
            image: intellectualImg
        },
        {
            name: "Enviromental",
            image: environmentImg
        },
        {
            name: "Labor Law",
            image: laborImg
        },
        {
            name: "Corporate Law",
            image: corporateImg
        },
        {
            name: "Tax Law",
            image: taxImg
        }
    ]
    return (
        <div className="mx-4 md:mx-12 lg:mx-24 my-12">
            <h1 className="text-2xl md:text-4xl text-secondary font-bold mb-4 text-center">Departments</h1>
            <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile","tablet"]}>
                {departmentData.map((dept,index)=>{
                    return (
                        <div key={index} className="relative justify-center items-center flex mt-4">
                            <img className="rounded-lg h-64 w-64" src={dept.image} alt={dept.name} />
                            <h2 className="w-48 h-12 rounded-3xl absolute left-26 top-48 bg-white text-center uppercase font-bold text-lg p-2">{dept.name}</h2>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default Department
