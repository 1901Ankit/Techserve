import mongoose from 'mongoose';

const QueryTicketSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'userId is required'],
        },
        queryType: {
            type: String,
            enum: [
                'Order Status', 
                'Delivery Issues', 
                'Product Information', 
                'Pricing Inquiries', 
                'Returns & Exchanges'
            ],
            required: [true, 'queryType is required'],
        },
        queryDetails: {
            type: String,
            default: '', // Default to an empty string if no details are provided
        }
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt timestamps
        versionKey: false, // Disable the version key (__v)
    }
);

const QueryTicket = mongoose.models.queryTicket || mongoose.model('queryTicket', QueryTicketSchema);

export default QueryTicket;
