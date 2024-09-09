import mongoose from 'mongoose';

const priceCalculator = new mongoose.Schema({
    types: [{
        name: { type: String, enum: ["Informative", "Dynamic", "E-commerce", "Corporate"] },
        value: [{
            country: { type: String, enum: ["India", "UK", "US", "Canada", "Australia", "Bangladesh"] },
            price: {
                app: { type: Number, required: true },
                web: { type: Number, required: true },
            }
        }]
    }],
    number: [{
        name: { type: String, enum: ["1-4", "5-8", "9-20", "20-25", "Unlimited"] },
        value: [{
            country: { type: String, enum: ["India", "UK", "US", "Canada", "Australia", "Bangladesh"] },
            price: {
                app: { type: Number, required: true },
                web: { type: Number, required: true },
            }
        }]
    }],
    pages: [{
        name: { type: String, },
        value: [{
            country: { type: String, enum: ["India", "UK", "US", "Canada", "Australia", "Bangladesh"] },
            price: {
                app: { type: Number, required: true },
                web: { type: Number, required: true },
            }
        }]
    }],
    requirements: [{
        name: { type: String, },
        value: [{
            country: { type: String, enum: ["India", "UK", "US", "Canada", "Australia", "Bangladesh"] },
            price: {
                app: { type: Number, required: true },
                web: { type: Number, required: true },
            }
        }]
    }],
    appPlatform: [
        {
            name: { type: String, enum: ["Android", "IOS", "WEB", "All of the Above"] },
            value: [{
                country: { type: String, enum: ["India", "UK", "US", "Canada", "Australia", "Bangladesh"] },
                value: {
                    app: { type: Number, required: true },
                    web: { type: Number, required: true },
                }
            }]
        }
    ],
    domainDetails: {
        domain: {
            type: Boolean,
            default: false
        },
        domainName: {
            type: String,
            required: function () {
                return this.domain === true;
            }
        }
    },
    hosting: {
        type: String,
    },

    officialMail: {
        type: Boolean,
        default: false
    },
    logoDetails: {
        logo: {
            type: Boolean,
            default: false
        },
        logoImg: {
            type: String,
            required: function () {
                return this.logo === true;
            }
        },
        isLogoNeeded: {
            type: Boolean,
        },

    },
    brand: [
        {
            name: { type: String, },
            value: [{
                country: { type: String, enum: ["India", "UK", "US", "Canada", "Australia", "Bangladesh"] },
                price: {
                    app: { type: Number, required: true },
                    web: { type: Number, required: true },
                }
            }]
        }
    ],
    technology: [
        {
            name: { type: String, },
            value: [{
                country: { type: String, enum: ["India", "UK", "US", "Canada", "Australia", "Bangladesh"] },
                price: {
                    app: { type: Number, required: true },
                    web: { type: Number, required: true },
                }
            }]
        }
    ],
    completed: [
        {
            name: { type: String, enum: ["15 Days", "1 Month", "1-3 months", "3-6 months", "Flexible"] },
            value: [{
                country: { type: String, enum: ["India", "UK", "US", "Canada", "Australia", "Bangladesh"] },
                price: {
                    app: { type: Number, required: true },
                    web: { type: Number, required: true },
                }
            }]
        }
    ],
    budget: {
        type: String,
    },
    additionalDetails: {
        additionalNotes: {
            type: String,
        },
        additionalFile: {
            type: String,
        }
    },

}, {
    timestamps: true,
},
    {
        versionKey: false,
    });

const Price = mongoose.models.Price || mongoose.model('Price', priceCalculator);

export default Price;