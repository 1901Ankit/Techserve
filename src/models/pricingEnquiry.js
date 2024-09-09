import mongoose from 'mongoose';

const PricingEnquiryDetailsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'userId is required'],
            select: false,
        },
        serviceType: {
            type: String,
            enum: [
                "Blockchain Development",
                "SEO Optimization",
                "Software Development",
                "App Development",
                "Web Development",
                "Data Analysis",
                "Cyber Security",
            ],
            required: [true, 'serviceType is required'],
            // lowercase: true,
            // trim: true
        },
        currentCountry: {
            type: String,
            enum: ["India", "UK", "US", "Canada", "Australia", "Bangladesh"],
            required: [true, 'currentCountry is required'],
            // lowercase: true,
            // trim: true
        },
        selectedServiceDetails: {
            type: Object,
            required: [true, 'selectedServiceDetails is required'],
        },
        selectedServiceAndPriceDetails: {
            type: Array,
            required: [true, 'selectedServiceDetailsArray is required'],
        },
        contractDocumentId: {
            type: String,
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

const PricingEnquiryDetails = mongoose.models.pricingEnquiryDetails || mongoose.model('pricingEnquiryDetails', PricingEnquiryDetailsSchema);

export default PricingEnquiryDetails;



// {types: [{ type: String }],
// number: [{ type: String }],
// pages: [{ type: String }],
// requirements: [{ type: String }],
// brand: [{ type: String }],
// completed: [{ type: String }],
// technology: [{ type: String }],
// appPlatform: [{ type: String }],
// domainDetails: {
//   isDomainNeeded: { type: Boolean, default: false },
//   domainName: { type: String, default: "" }
// },
// officialMailDetails: {
//   isOfficialMailNeeded: { type: Boolean, default: false },
//   officialMailName: { type: String, default: "" }
// },
// isHostingNeeded: { type: Boolean, default: false },
// isApiDocsNeeded: { type: Boolean, default: false },
// logoDetails: {
//   isLogoNeeded: { type: Boolean, default: false },
//   logoToBeCreated: { type: Boolean, default: false },
//   logoImg: { type: String, default: "" }
// },
// budget: { type: Number, default: 0 },
// issue: { type: String, default: "" },
// referenceFile: [{type:String}]
// }