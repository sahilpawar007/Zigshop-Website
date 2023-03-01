class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ?{
            name:{
                // regex = regular expression  --(Mongodb operator)
                $regex:this.queryStr.keyword,
                // small i means its case sensitive like if you search ABC it you give you both result in capital and small too
                $options: "i",
            }
        }:{}

        this.query = this.query.find({ ...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}

        // Removing some fields for category
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach(key=>delete queryCopy[key]);

        // Filter for Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

        // this.query is Product.find()
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;