require ("./db");
const Product = require ("./src/models/Products")
import express, { Request, Response, NextFunction, Application } from "express";

interface error {
    status: number;
    message: string;
  }

const productTest = new Product ({
    name: "laptop",
    description: "lenovo 6th generation",
    price: 1399
})

productTest.save((err: error, document:Response)=> {
    if(err) console.log(err)
    console.log(document)
})
