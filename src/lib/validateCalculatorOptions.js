export const validateCalculatorSelections = async (options, selectedServices) => {

    const error = {};
    if (options.types.length < 1) {
        error.types = "Please select your project type";
    }
    if (options.number.length < 1) {
        error.number = "Please select number of page you need";
    }
    if (options.pages.length < 1 && selectedServices == "Web Development") {
        error.pages = "Please select pages you need";
    }
    if (options.brand.length < 1) {
        error.brand = "Please select colors";
    }
    if (options.technology.length < 1) {
        error.technology = "Please select technology you want";
    }
    if (options.appPlatform.length < 1 && selectedServices == "App Development") {
        error.appPlatform = "Please select platform type";
    }
    if (options.completed.length < 1) {
        error.completed = "Please select desire time frame";
    }
    if (selectedServices == "Web Development" && options.domain==undefined) {
        error.domain = "Please confirm about domain";
    }
    if (selectedServices == "Web Development" && options.domain && options.domainDetails.domainName == "") {
        error.domain = "Please tell me your desire domain name";
    }
    
    if (options.hosting==undefined) {
        error.hosting = "Please confirm about hosting";
    }  
    if (options.mail==undefined) {
        error.email = "Please confirm about official mail";
    }
    if (options.mail && options.officialMailDetails.officialMailName == "") {
        error.email = "Please tell me your desire email name";
    }

    if ((options.logo==undefined && options.createLogo==undefined)) {
        error.logo = "Please select anything about logo";
    }
    if (options.logo && options.logoDetails.logoImg == "") {
        error.logo = "Please upload your logo or re-upload it";
    }  
    // if ((!options.logo && !options.createLogo)||(!options.logo && !options.logoDetails.logoToBeCreated)) {
    //     error.logo = "Please upload your logo or re-upload it";
    // }
    if (selectedServices == "App Development" && options.ApiNeeded == undefined) {
        error.apiDocs = "Please confirm about api docs";
    }
    if (options.issue == "") {
        error.issue = "Write your requirements or issue in details";
    }
    return error;

}