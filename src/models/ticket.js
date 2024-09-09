//src/models/ticket.js
import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema(
    {
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'userId is required'],
        },
        pricingEnquiryDetailsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pricingEnquiryDetails',
            required: [true, 'pricingEnquiryDetailsId is required'],
        },
        status: {
            type: String,
            enum: ['Open', 'In Progress', 'Closed'],
            default: 'Open',
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium',
        },
        progress: {
            type: String,
            enum: ['In Progress', 'Completed'],
            default: 'Completed',
        },
         
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Ticket = mongoose.models.ticket || mongoose.model('ticket', TicketSchema);

export default Ticket;



//

// import mongoose from 'mongoose';

// const TicketSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'user',
//             required: [true, 'userId is required'],
//         },
//         pricingEnquiryDetailsId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'pricingEnquiryDetails',
//             required: [true, 'pricingEnquiryDetailsId is required'],
//         },
//         status: {
//             type: String,
//             enum: ['Open', 'In Progress', 'Closed'],
//             default: 'Open',
//         },
//         priority: {
//             type: String,
//             enum: ['Low', 'Medium', 'High'],
//             default: 'Medium',
//         },
//         queryType: { // New field for query type
//             type: String,
//             enum: [
//                 'Order Status',
//                 'Delivery Issues',
//                 'Product Information',
//                 'Pricing Inquiries',
//                 'Returns & Exchanges',
//                 'General Inquiry'
//             ],
//             default: 'General Inquiry',
//         },
//     },
//     {
//         timestamps: true,
//         versionKey: false,
//     }
// );

// const Ticket = mongoose.models.ticket || mongoose.model('ticket', TicketSchema);

// export default Ticket;