const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref: "User"

    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref:"Course",
    },
});

// export const Course = mongoose.model("Course",courseSchema);
module.exports = mongoose.model('Purchase', purchaseSchema);
