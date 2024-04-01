import { LARGE_CHAR_MAX, MEDIUM_CHAR_MAX, SMALL_CHAR_MAX } from "../constant-variables";

/**
 * validateInvestigatorDetails is function that will validate the inputs on the InvestigatorDetailsForm form. It will return an object that packages the error messages of the form.
 * 
 * @param {Object}      characterDetails 
 * 
 * @returns {Object}
 */
export function validateInvestigatorDetails(characterDetails){
    const {name, age, gender, birthplace, residence} = characterDetails;
    const errMsgs = {
        hasError: false,
        nameErr: "",
        ageErr: "",
        genderErr: "",
        birthplaceErr: "",
        residenceErr: ""
    }

    // Name is required, is a string, and is limited to "Large" characters
    if(!name){
        errMsgs.nameErr = "Name field is required";
    }else if(name.length < LARGE_CHAR_MAX){
        errMsgs.nameErr = "The input exceeds its maximum number of characters";
    }

    // Age is required, is a number, integer above 0
    if(!age){
        errMsgs.ageErr = "Age field is required";
    }else if(isNaN(age)){
        errMsgs.ageErr = "Age must be a number";
    }else if(!Number.isInteger((Number(age)))){
        errMsgs.ageErr = "Age must be an integer number";
    }else if(Number(age) < 0){
        errMsgs.ageErr = "Age must be greater than 0";
    }

    // Gender is required, is a string, and is limited to "Small" characters
    if(!gender){
        errMsgs.genderErr = "Gender field is required";
    }else if(gender.length < SMALL_CHAR_MAX){
        errMsgs.genderErr = "The input exceeds its maximum number of characters";
    }

    // Birthplace is a string and is limited to "Medium" characters
    if(birthplace.length < MEDIUM_CHAR_MAX){
        errMsgs.birthplaceErr = "The input exceeds its maximum number of characters";
    }

    // Residence is a string and is limited to "Medium" characters
    if(residence.length < MEDIUM_CHAR_MAX){
        errMsgs.residenceErr = "The input exceeds its maximum number of characters";
    }

    // If any field has an error, then haError is true
    if(!!errMsgs.nameErr || !!errMsgs.ageErr || !!errMsgs.genderErr || !!errMsgs.birthplaceErr || !!errMsgs.residenceErr){
        errMsgs.hasError = true;
    }

    // Return the errMsgs object to give a report on what the validation check discovered
    return errMsgs;

}

/**
 * validateInvestigatorStats is function that will validate the inputs on the InvestigatorStatsForm form. It will return an object that packages the error messages of the form.
 * 
 * @param {Object}      characterStats 
 * 
 * @returns {Object}
 */
export function validateInvestigatorStats(characterStats){
    const {strength, dexterity, consitution, size, appearance, intelligence, education, power, luck} = characterStats;
    const errMsgs = {
        hasError: false,
        strError: "",
        dexError: "",
        conError: "",
        sizeError: "",
        appError: "",
        eduError: "",
        intError: "",
        powError: "",
        luckError: ""
      }

    /*This website only supports making "human" characters so a maximum of 99 is imposed on character statistics.
    Similarily, a minimum score of 1 is imposed on all statistics except Luck (as Luck can run out).
    All stats are required.
    All stats must be integer numbers.
    The calculated fields can are generated by the website and can be presumed correct.
    */
    errMsgs.strError = isProperNumberValue(strength, 1, 99);
    errMsgs.dexError = isProperNumberValue(dexterity, 1, 99);
    errMsgs.conError = isProperNumberValue(consitution, 1, 99);
    errMsgs.sizeError = isProperNumberValue(size, 1, 99);
    errMsgs.appError = isProperNumberValue(appearance, 1, 99);
    errMsgs.eduError = isProperNumberValue(education, 1, 99);
    errMsgs.intError = isProperNumberValue(intelligence, 1, 99);
    errMsgs.powError = isProperNumberValue(power, 1, 99);
    errMsgs.luckError = isProperNumberValue(luck, 0, 99);
    
    // If any field has an error, then haError is true
    if(!!errMsgs.strError || !!errMsgs.dexError || !!errMsgs.conError || !!errMsgs.sizeError || !!errMsgs.appError
    || !!errMsgs.eduError || !!errMsgs.intError || !!errMsgs.powError || !!errMsgs.luckError){
        errMsgs.hasError = true;
    }

    // Return the errMsgs object to give a report on what the validation check discovered
    return errMsgs;
}

/**
 * validateUpdatedStats is function that will validate the inputs on the EditStatsForm form. It will return an object that packages the error messages of the form.
 * 
 * @param {Object}      characterStats 
 * 
 * @returns {Object}
 */
export function validateUpdatedStats(characterStats){
    const {strength, dexterity, consitution, size, appearance, intelligence, education, power, luck, sanity, health, build, movement, magic_points} = characterStats;
    const errMsgs = {
        hasError: false,
        strengthErr: "",
        dexterityErr: "",
        consitutionErr: "", 
        sizeErr: "",
        appearanceErr: "",
        intelligenceErr: "",
        educationErr: "",
        powerErr: "", 
        luckErr: "",
        sanityErr: "",
        healthErr: "",
        magicPointsErr: "",
        movementErr: "",
        buildErr: ""
    }

    /*This website only supports making "human" characters so a maximum of 99 is imposed on character statistics.
    Similarily, a minimum score of 1 is imposed on all statistics except Luck, Sanity, Health, Magic Points, and Build.
    All stats are required.
    All stats must be integer numbers.
    */
    errMsgs.strengthErr = isProperNumberValue(strength, 1, 99);
    errMsgs.dexterityErr = isProperNumberValue(dexterity, 1, 99);
    errMsgs.consitutionErr = isProperNumberValue(consitution, 1, 99);
    errMsgs.sizeErr = isProperNumberValue(size, 1, 99);
    errMsgs.appearanceErr = isProperNumberValue(appearance, 1, 99);
    errMsgs.educationErr = isProperNumberValue(education, 1, 99);
    errMsgs.intelligenceErr = isProperNumberValue(intelligence, 1, 99);
    errMsgs.powerErr = isProperNumberValue(power, 1, 99);
    errMsgs.luckErr = isProperNumberValue(luck, 0, 99);

    errMsgs.sanityErr = isProperNumberValue(sanity, 0, 99);
    errMsgs.healthErr = isProperNumberValue(health, 0, 40);
    errMsgs.magicPointsErr = isProperNumberValue(magic_points, 0, 40);
    errMsgs.movementErr = isProperNumberValue(movement, 0, 16);
    errMsgs.buildErr = isProperNumberValue(build, -2, 2);
    
    // If any field has an error, then haError is true
    if(!!errMsgs.strengthErr || !!errMsgs.dexterityErr || !!errMsgs.consitutionErr || !!errMsgs.sizeErr
    || !!errMsgs.appearanceErr || !!errMsgs.educationErr || !!errMsgs.intelligenceErr || !!errMsgs.powerErr 
    || !!errMsgs.luckErr || !!errMsgs.sanityErr || !!errMsgs.healthErr || !!errMsgs.magicPointsErr
    || !!errMsgs.movementErr || !!errMsgs.buildErr){
        errMsgs.hasError = true;
    }

    // Return the errMsgs object to give a report on what the validation check discovered
    return errMsgs;
}

/**
 * validateInvestigatorSkills is function that will validate the inputs on the InvestigatorSkillsForm form. It will return an object that packages the error messages of the form.
 * 
 * @param {string || number}      background 
 * @param {Object[]}              occupationalSkills 
 * @param {Object[]}              personalSkills 
 * 
 * @returns {Object}
 */
export function validateInvestigatorSkills(background, occupationalSkills, personalSkills){
    const errMsgs = {
        hasError: false,
        backgroundErr: "",
        occupationalSkillsErr: [],
        personalSkillsErr: []
    }

    /* An investigator must have selected a background.
    An investigator must have chosen 8 occupational skills.
    The values of the occupational skills must be integer numbers.
    Skill points cannot be less than the skill's base value.
    Skill points cannot exceed 99.
    Skill points cannot be lower than 1 (except for Cthulhu Mythos which starts at 0)
    Skill points must be integer numbers
    If a skill has been added, it must have a skill and points value associted with it (else it should be removed)
    */

    return errMsgs;

}

/**
 * validateUpdatedSkills is function that will validate the inputs on the EditSkillsForm form. It will return an object that packages the error messages of the form.
 * 
 * @param {Object[]}      characterSkills 
 * 
 * @returns {Object}
 */
export function validateUpdatedSkills(characterSkills){
    const errMsgs = { hasError: false, skillErrs: [] };
    /* Make sure all skills have a value
    That value is an unsigned integer
    That value is greater or equal to its base value
    That value is less than 100 
    */

    for(let index = 0; index < characterSkills.length; index++){
        
    }

    return errMsgs;
}

/**
 * validateInvestigatorExtras is function that will validate the inputs on the InvestigatorExtras form. It will return an object that packages the error messages of the form
 * 
 * @param {Object}      characterExtras 
 * 
 * @returns {Object}
 */
export function validateInvestigatorExtras(characterExtras){
    const {special_people, favoured_possession} = characterExtras;
    
    const errMsgs = {
        hasError: false,
        favPeopleErr: "",
        favPosseionErr: ""
      };

    // At this time, none of these fields are required so the only check necessary if to make sure that their size is under the dataset's character limit
    // TODO (later sprint) protect against injections

    // Special Person is a string and is limited to "Large" characters
    if(special_people.length < LARGE_CHAR_MAX){
        errMsgs.favPeopleErr = "The input exceeds its maximum number of characters";
        errMsgs.hasError = true;
    }

    // Favoured Possession is a string and is limited to "Large" characters
    if(favoured_possession.length < LARGE_CHAR_MAX){
        errMsgs.favPosseionErr = "The input exceeds its maximum number of characters";
        errMsgs.hasError = true;
    }

    // Return the errMsgs object to give a report on what the validation check discovered
    return errMsgs;
}

/**
 * isProperNumberValue is function that will generate an error message for an integer input for an investigator's stat or skill value. If verifies the input num, and at the end checks if it is within the range of min and max.
 * 
 * @param {string || number}      num 
 * @param {number}                min 
 * @param {number}                max
 * 
 * @returns {string}
 */
function isProperNumberValue(num, min, max){
    if(!num){
        return "Required field missing";
    }else if(isNaN(Number(num))){
        return "Must be a number";
    }else if(!Number.isInteger((Number(num)))){
        return "Must be an integer number";
    }else if(Number(num) < min || Number(num) > max){
        return `Out of range. Input must be between ${min} - ${max}`;
    }else{
        return "";
    }

}

export function validateCharacter(){

}