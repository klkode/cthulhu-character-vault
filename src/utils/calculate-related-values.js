
export function calcBuild(str, size) {
    // Calculate the sum of strength and size
    const sum = str + size;

    // Calculate the build using the CoC 7e build calculation table values
    // (Note only human builds are being considered for calculation)
    let build;
    if(sum <= 64){
      build = -2;
    }else if(sum >= 65 && sum <= 84){
      build = -1;
    }else if(sum >= 85 && sum <= 124){
      build = 0;
    }else if(sum >= 125 && sum <= 164){
      build = 1;
    }else{
      build = 2;
    }

    return build;

  }

  export function calcHealth(con, size) {
    // Calculate the health points using CoC 7e rules, which is (CON + SIZE) / 10 rounded down
    const health = Math.floor((con + size) / 10);

    return health;
  }

  export function calcMagicPoints(power) {
    // Calculate the magic points using CoC 7e rules, which is 1/5 of POWER rounded down
    const mp = Math.floor(power / 5);

    return mp;
  }

  export function calcSanity(power) {
    // No calculation needed as CoC 7e rules is that initial SAN = POW
    return power;

  }

  export function determineDodgeMin(dexterity){
    // The default Dodge score is the investigator's dexterity score halved (rounded down)
    return Math.floor(dexterity / 2);

  }

  export function determineLanguageOwnMin(education){
    // The default Language(Own) [in this sprint English === Own] is the same as the investigator's education score
    return education;

  }

  export function maxSanity(mythosScore){
    // An investigator cannot have a sanity score higher than 100 - their Cthulhu Mythos score
    return 100 - mythosScore;

  }
