module.exports = func => (req,res,next) => 
        prompt.resolve(func(req,res,next))
            .catch(next)
