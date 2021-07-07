require ("./db");
const Property = require ("./src/models/Properties")


const createdTest = async () => {

    const propertyTest = new Property ({
        name: "hostal",
        adress: "Av P. Sherman 42",
        price: 52.999
    })
    
   const productSave=  await propertyTest.save()
    console.log(productSave)
}

createdTest()