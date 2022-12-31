export default ({ app }, inject) => {
  // Inject $upload(msg) in Vue, context and store.
  // inject("upload", msg => console.log(`Hello ${msg}!`));
  inject("parseUrl", (url) => {
    let newUrl = null;
    if (url !== null) {
      newUrl = url.startsWith("http") ? url : `http://` + url;
    } else {
      newUrl = "";
    }
    return newUrl;
  });
  inject("capitalizeAllFirstLater", async (content) => {
    let finalSentence = "";
    if (content !== null) {
      content = content.toLowerCase();

      finalSentence = content.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      );
    }

    return finalSentence;
  });
  inject("getRegistrationPatientTypeText", (val) => {
    let options = [
      { value: 0, text: "Penunjang" },
      { value: 1, text: "Rawat Inap" },
      { value: 2, text: "Rawat Jalan" },
      { value: 3, text: "Rawat Darurat" },
      { value: 4, text: "Readmisi Rawat Inap" },
      { value: 5, text: "Konsul Klinik Dari Rawat Inap" },
      { value: 6, text: "Konsul Klinik Dari Rawat Jalan" },
    ];

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === val) {
        return options[i].text;
      }
    }
    return "-";
  });
  inject("getPaymentMethodText", (val) => {
    let options = [
      { value: 0, text: "UMUM", color: "success" },
      { value: 1, text: "BPJS PBI", color: "primary" },
      { value: 2, text: "BPJS NON PBI", color: "primary" },
      { value: 3, text: "JAMPERSAL", color: "warning" },
      { value: 4, text: "JR", color: "warning" },
      { value: 5, text: "BPJS KETENAGAKERJAAN", color: "warning" },
      { value: 6, text: "VIP", color: "danger" },
    ];

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === val) {
        return options[i].text;
      }
    }
    return "-";
  });
  inject("getGenderText", (val) => {
    switch (val) {
      case "M":
        return "Laki-laki";
        break;
      case "F":
        return "Perempuan";
        break;

      default:
        break;
    }
    return "-";
  });
  inject("calculateAge", (val) => {
    val = new Date(val);
    let diff_ms = Date.now() - val.getTime();
    let age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  });
  const mergeObject = (targetObject, sourceObject) => {
    const copyTargetObject = targetObject;
    const copySourceObject = sourceObject;
    // const copyTargetObject = JSON.parse(JSON.stringify(targetObject));
    // const copySourceObject = JSON.parse(JSON.stringify(sourceObject));

    for (const key in copySourceObject) {
      if (
        copySourceObject.hasOwnProperty(key) &&
        copyTargetObject.hasOwnProperty(key)
      ) {
        if (
          typeof copySourceObject[key] === "object" &&
          !(copySourceObject[key] instanceof Array) &&
          copyTargetObject[key] !== null
        ) {
          copyTargetObject[key] = mergeObject(
            copyTargetObject[key],
            copySourceObject[key]
          );
        } else {
          copyTargetObject[key] = copySourceObject[key];
        }
      }
    }
    return copyTargetObject;
  };
  inject("deepMergeObject", (targetObject = {}, sourceObject = {}) => {
    return mergeObject(targetObject, sourceObject);
  });
  inject("getMedicalSupportText", (val) => {
    let options = [
      { value: 0, text: "Laboratorium", color: "success" },
      { value: 1, text: "Radiologi", color: "primary" },
      { value: 2, text: "Hemodialisa", color: "primary" },
      { value: 3, text: "Fisioterapi", color: "warning" },
      { value: 4, text: "Talasemi", color: "warning" },
    ];

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === val) {
        return options[i].text;
      }
    }
    return "-";
  });
  inject("getMedicineText", (optionsType, val) => {
    let options = [];
    switch (optionsType) {
      case "type":
        options = [
          { value: 0, text: "Obat Cair" },
          { value: 1, text: "Tablet" },
          { value: 2, text: "Kapsul" },
          { value: 3, text: "Oles" },
          { value: 4, text: "Suppositoria" },
          { value: 5, text: "Tetes" },
          { value: 6, text: "Inhaler" },
          { value: 7, text: "Suntik" },
          { value: 8, text: "Implan" },
        ];
        break;
      case "category":
        options = [
          { value: 0, text: "Obat Bebas" },
          { value: 1, text: "Obat Keras" },
          { value: 2, text: "Obat Wajib Apotek" },
          { value: 3, text: "Obat Golongan Narkotika" },
          { value: 4, text: "Obat Psikotropika" },
          { value: 5, text: "Obat Herbal" },
        ];
        break;

      default:
        break;
    }
    for (let i = 0; i < options.length; i++) {
      if (i === val) {
        return options[i].text;
      }
    }
    return "-";
  });
  inject("toCurrency", (value) => {
    if (typeof value !== "number") {
      return value;
    }
    var formatter = new Intl.NumberFormat("id-Id", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
  });
  inject("toNumberSeparated", (value) => {
    if (typeof value !== "number") {
      return value;
    }
    var formatter = new Intl.NumberFormat("id-Id");
    return formatter.format(value);
  });
  inject("parsingLaboratoryVariableType", (val) => {
    let retVal = "";

    switch (val) {
      case 0:
        retVal = "Numerik";
        break;
      case 1:
        retVal = "Boolean";
        break;
      case 2:
        retVal = "Teks";
        break;

      default:
        retVal = "";
        break;
    }

    return retVal;
  });
  inject("parsingNameObject", (obj) => {
    if (typeof obj !== "object") {
      return "-";
    }
    let retVal = "";

    obj.frontTitle ? (retVal += obj.frontTitle + " ") : retVal + "";
    obj.fullName ? (retVal += obj.fullName + " ") : retVal + "";
    obj.endTitle ? (retVal += obj.endTitle) : retVal + "";

    return retVal;
  });
  inject("parsingGender", (val) => {
    if (val !== "M" && val !== "F") {
      return "-";
    }
    if (val === "M") {
      return "Pria";
    }
    if (val === "F") {
      return "Wanita";
    }
  });
  inject("parsingApiUrl", (val) => {
    if (val) {
      return process.env.API_URL + "/" + val;
    } else {
      return process.env.API_URL;
    }
  });
  inject("parsingAgeObject", (obj) => {
    if (typeof obj !== "object") {
      return "-";
    }
    let retVal = "";

    obj.ageYear ? (retVal += obj.ageYear + " Tahun ") : (retVal += "0 Tahun ");
    obj.ageMonth
      ? (retVal += obj.ageMonth + " Bulan ")
      : (retVal += "0 Bulan ");
    obj.ageDay ? (retVal += obj.ageDay + " Hari") : (retVal += "0 Hari");

    return retVal;
  });
  inject("switchDay", (obj) => {
    switch (obj.day) {
      case 1:
        return "Senin";
        break;
      case 2:
        return "Selasa";
        break;
      case 3:
        return "Rabu";
        break;
      case 4:
        return "Kamis";
        break;
      case 5:
        return "Jumat";
        break;
      case 6:
        return "Sabtu";
        break;
      case 7:
        return "Minggu";
        break;

      default:
        return "-";
        break;
    }
  });
  inject("parsingAddress", (content) => {
    let restructuredAddress = "";

    if (content?.location) {
      restructuredAddress = restructuredAddress + content.location;
    }
    if (content?.village?.name) {
      restructuredAddress = restructuredAddress + ", " + content.village.name;
    }
    if (content?.village?.district?.name) {
      restructuredAddress =
        restructuredAddress + ", " + content.village.district.name;
    }
    if (content?.village?.district?.city?.name) {
      restructuredAddress =
        restructuredAddress + ", " + content.village.district.city.name;
    }
    if (content?.village?.district?.city?.province?.name) {
      restructuredAddress =
        restructuredAddress +
        ", " +
        content.village.district.city.province.name;
    }

    if (content?.zipCode) {
      restructuredAddress = restructuredAddress + " (" + content.zipCode + ")";
    }

    return restructuredAddress;
  });
};
