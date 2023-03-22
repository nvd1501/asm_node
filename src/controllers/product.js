

import Product from "../models/product";
import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
});

export const getAll = async(req, res) =>{
    try {
        
        const data = await Product.find();
        if(data.length === 0){
            return res.json({
                message: "Không có sản phẩm "
            });
        }
        return res.json(data);
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};

export const get = async(req, res) =>{
    try {
        
        const data = await Product.findOne({_id: req.params.id});
        if(!data){
            return res.json({
                message: "Không có sản phẩm "
            });
        }
        return res.json(data);
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};

export const create = async(req, res) =>{
    try {
        const body = req.body;
        const { error } = productSchema.validate(body);
        if(error){
            return res.json({
                message: error.details[0].message,
            });
        }
        const data = await Product.create(body);
        if(data.length === 0){
            return res.json({
                message: "Thêm sản phẩm thất bại"
            });
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};

export const remove = async(req, res) =>{
    try {
        
        const data = await Product.findByIdAndDelete(req.params.id);
        if(!data){
            return res.json({
                message: "Không có sản phẩm để xóa"
            });
        }
        return res.json({
            message: "Xóa sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};

export const update = async(req, res) =>{
    try {
        
        const data = await Product.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true,
        });
        if(!data){
            return res.json({
                message: "Update sản phẩm thất bại"
            });
        }
        return res.json({
            message: "Update sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};