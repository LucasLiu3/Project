const { responseReturn } = require("../utilities/response");
const categoryModel = require("../models/categoryModel");
const formidable = require("formidable");
const productModel = require("../models/productModel");
const reviewModel = require("../models/reviewModel");
const cloudinary = require("cloudinary").v2;
const moment = require("moment-timezone");
const {
  mongo: { ObjectId },
} = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

class productControllers {
  category_add = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "Something wrong, try again" });
      } else {
        let { name } = fields;
        let { image } = files;

        name = name.trim();
        const slug = name.split(" ").join("-");

        try {
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: "categorys",
          });
          if (result) {
            const category = await categoryModel.create({
              name,
              slug,
              image: result.url,
            });
            responseReturn(res, 201, {
              message: "New Category Added Successfully",
              category,
            });
          } else {
            responseReturn(res, 404, { error: "Image Upload Fail" });
          }
        } catch (err) {
          console.log(err);
          responseReturn(res, 500, { error: "Something wrong," });
        }
      }
    });
  };

  category_get = async (req, res) => {
    try {
      const categoryInfo = await categoryModel.find({}, "slug image");
      responseReturn(res, 200, { categoryInfo: categoryInfo });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  ///////////

  product_add = async (req, res) => {
    const form = formidable({ multiples: true });
    const { id } = req;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "Something wrong, try again" });
      } else {
        const {
          product,
          brand,
          category,
          stock,
          price,
          discount,
          description,
          shopName,
        } = fields;

        try {
          const imagesArray = Array.isArray(files.images)
            ? files.images
            : [files.images];
          const uploadPromises = imagesArray.map((each) =>
            cloudinary.uploader.upload(each.filepath, {
              folder: "products",
            })
          );

          const uploadResults = await Promise.all(uploadPromises);

          const uploadedImageUrls = uploadResults.map((result) => result.url);

          const newProduct = await productModel.create({
            sellerId: id,
            slug: product.trim().split(" ").join("-"),
            product,
            brand,
            category,
            stock: parseInt(stock),
            price: parseInt(price),
            discount,
            description: description.trim(),
            shopName,
            images: uploadedImageUrls,
          });

          return responseReturn(res, 201, {
            message: "New Product Created Successfully",
            product: newProduct,
          });
        } catch (err) {
          console.log(err);
          responseReturn(res, 500, { error: err.message });
        }
      }
    });
  };

  product_get = async (req, res) => {
    const { id } = req;
    try {
      const productInfo = await productModel.find({ sellerId: id });

      responseReturn(res, 200, { productInfo: productInfo });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  productsAll_get = async (req, res) => {
    try {
      const productInfo = await productModel.find({});

      responseReturn(res, 200, { productsAll: productInfo });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  products_one_get = async (req, res) => {
    const { productId } = req.params;

    try {
      const oneProductInfo = await productModel.findById(productId);
      responseReturn(res, 200, { oneProductInfo: oneProductInfo });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  products_one_update = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 404, {
          error: "Something went wrong, try again",
        });
      }

      const {
        productId,
        product,
        brand,
        category,
        stock,
        price,
        discount,
        description,
        oldImages,
      } = fields;

      try {
        const oldImagesList = oldImages.split(",");

        const { images } = await productModel.findById(productId);

        let newImageList = images.filter((image) =>
          oldImagesList.includes(image)
        );

        if (files.newImages) {
          const imagesArray = Array.isArray(files.newImages)
            ? files.newImages
            : [files.newImages];

          const uploadPromises = imagesArray.map((each) =>
            cloudinary.uploader.upload(each.filepath, {
              folder: "products",
            })
          );
          const uploadResults = await Promise.all(uploadPromises);
          const uploadedImageUrls = uploadResults.map((result) => result.url);

          newImageList = [...newImageList, ...uploadedImageUrls];
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
          productId,
          {
            product,
            brand,
            category,
            stock,
            price,
            discount,
            description,
            images: newImageList,
            slug: product.trim().split(" ").join("-"),
          },
          { new: true }
        );

        return responseReturn(res, 200, {
          message: "Product Updated Successfully",
          product: updatedProduct,
        });
      } catch (error) {
        console.log(error);
        return responseReturn(res, 500, { error: error.message });
      }
    });
  };

  update_review = async (req, res) => {
    const { productId, rating, review, name } = req.body;

    try {
      const tempDate = moment().tz("Pacific/Auckland").format("DD/MM/YYYY");

      await reviewModel.create({
        productId,
        rating,
        review,
        customerName: name,
        date: tempDate,
      });

      const reviews = await reviewModel.find({ productId });

      const totalRevewRating = reviews.reduce(
        (acu, cur) => acu + cur.rating,
        0
      );

      let productRating = 0;
      if (reviews.length !== 0) {
        productRating = (totalRevewRating / reviews.length).toFixed(1);
      }

      await productModel.findByIdAndUpdate(productId, {
        rating: productRating,
      });

      return responseReturn(res, 200, {
        message: "Review Submit Successfully",
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  get_reviews = async (req, res) => {
    const { productId } = req.params;

    try {
      const ratingGroup = await reviewModel.aggregate([
        {
          $match: {
            productId: {
              $eq: new ObjectId(productId),
            },
            rating: {
              $not: {
                $size: 0,
              },
            },
          },
        },
        {
          $unwind: "$rating",
        },
        {
          $group: {
            _id: "$rating",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let rating_review = [
        {
          rating: 5,
          sum: 0,
        },
        {
          rating: 4,
          sum: 0,
        },
        {
          rating: 3,
          sum: 0,
        },
        {
          rating: 2,
          sum: 0,
        },
        {
          rating: 1,
          sum: 0,
        },
      ];

      rating_review.map((each) =>
        ratingGroup.forEach((group) => {
          if (each.rating === group._id) each.sum = group.count;
        })
      );

      const allReivews = await reviewModel
        .find({
          productId,
        })
        .sort({ createdAt: -1 });

      return responseReturn(res, 200, {
        rating_review,
        reviews: allReivews,
        totalReview: allReivews.length,
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new productControllers();
