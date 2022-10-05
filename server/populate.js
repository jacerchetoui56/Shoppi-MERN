const { men } = require('./data')
const express = require('express')
const Product = require('./models/product.model')

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'ddc2xavzq',
    api_key: '945514382798224',
    api_secret: 'Q-UG41Uwn2FPtjA4OWAcVvMXWCk',
});
// cloudinary.uploader.upload('./images/authors/chanel.png')
//     .then((result) => console.log('success => ', result.url))
//     .catch((err) => console.log(err))


const manImages = [
    "http://res.cloudinary.com/ddc2xavzq/image/upload/v1664662314/yqjllrarpjpg6dbar6lr.jpg",
    "http://res.cloudinary.com/ddc2xavzq/image/upload/v1664662317/qbmaibxo3lgdi200n42k.jpg",
    "http://res.cloudinary.com/ddc2xavzq/image/upload/v1664662319/wa4ycf8lxk7pzgr24y6e.jpg",
    "http://res.cloudinary.com/ddc2xavzq/image/upload/v1664662322/pfgn3rl1rstwg1lddmfd.jpg",
    "http://res.cloudinary.com/ddc2xavzq/image/upload/v1664662324/gpln7sunp9wmrhca1787.jpg",
    "http://res.cloudinary.com/ddc2xavzq/image/upload/v1664662326/e0atdfwdwaolocxwjzdf.jpg"

]

async function mentoDB() {
    for (let i = 1; i <= 4; i++) {
        try {
            const result = await cloudinary.uploader.upload(`./images/blogs/blog${i}.webp`)
            console.log(result.url)
        } catch (err) {
            console.log(err)
        }
    }
}
mentoDB()

async function addOne() {
    const product = await Product.create({ ...men[0], image: manImages[0] })
    console.log(product._id)
}

try {
    // addOne()
} catch (err) {
    console.log(err)
}