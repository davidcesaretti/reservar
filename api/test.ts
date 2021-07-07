require ("./db");
const Property = require ("./src/models/Properties")


export const createdTest = async () => {

    const propertyTest = new Property ({
        name: "hostal",
        adress: "Av P. Sherman 42",
        price: 54.999
    })
    
   const productSave=  await propertyTest.save()
    console.log(productSave)
}

// createdTest()
