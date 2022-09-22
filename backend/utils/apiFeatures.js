class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.fine({ ...keyword });
        return this;
    }

    filter(){

        const queryCopy = { ...this.queryStr };

        

        //Removing fields from the query
        const removerFields = ['keyword', 'limit', 'page']
        removerFields.forEach(el => delete queryCopy[e1]);

        // Advance filter for price, rating etc
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)b/g, match => `$${match}` )

        this.query= this.query.find(JSON.parse(queryCopy));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage -1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}
module.exports = APIFeatures