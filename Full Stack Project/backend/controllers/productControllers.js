const { responseReturn } = require("../utilities/response");
const categoryModel = require("../models/categoryModel");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;

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

        cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.CLOUD_KEY,
          api_secret: process.env.CLOUD_SECRET,
          secure: true,
        });

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
}

module.exports = new productControllers();
