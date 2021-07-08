import { dataAirbnb } from "./db";
require ("./db");
const Property = require ("./src/models/Properties")


export const createdTest = async () => {

    dataAirbnb.find({})
    .limit(100)
    .then((data:any) => console.log(data[1].summary))

    //         new Property({
    //             name: x.name,
    //             summary: x.summary,
    //             type:x.property_type,



    //         })
            
            
            
            
            
    //         ));




    //     const propertyTest = new Property ({
            
    //     })
        
    // const productSave=  await propertyTest.save()
    //     console.log(productSave)
}

// createdTest()
