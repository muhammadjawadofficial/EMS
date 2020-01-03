const server = 'http://192.168.0.29:2000/'

const login = {
    //incorrect login text
    failure: "Email or Password is incorrect. Please try again!!",

    //successfully login text
    success: "Signing you in. Please wait...",

    //successfully login text for toast
    toast: "Successfully Signed In",

    //login information while checking text
    check: "Checking..."

}

//Network Error
const network_error = "Network Error. Please try again later!!"

const adminPanelTableTransition = {
    name: 'flip-list'
}

const image = {
  convert(image) {
    return 'data:image/jpeg;base64,' + btoa(new Uint8Array(image)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  }
}

const education = {
  set(education) {
    if(education.id)
    {
      return {
        instituteName: education.empDegree.instituteName,
        cgpa: education.empDegree.cgpa,
        percentage: education.empDegree.percentage,
        degreeLevelId: education.degreeLevel.id,
        degreeId: education.id,
        startYear: education.empDegree.startYear,
        endYear: education.empDegree.endYear,
      }
    } else {
      return {
        instituteName: education.instituteName,
        cgpa: education.cgpa,
        percentage: education.percentage,
        degreeLevelId: education.degreeLevelId,
        degreeId: education.degreeId,
        startYear: education.startYear,
        endYear: education.endYear,
      }
    }
  },
  get() {
    return {
      instituteName: '',
      cgpa: '',
      percentage: '',
      degreeLevelId: '',
      degreeId: '',
      startYear: '',
      endYear: '',
    }
  }
}
const experience = {
  set(experience) {
    return {
      company: experience.company,
      startYear: experience.startYear,
      endYear: experience.endYear,
      jobDescription: experience.jobDescription,
      designation: experience.designation,
    }
  },
  get() {
    return {
      company: '',
      startYear: '',
      endYear: '',
      jobDescription: '',
      designation: '',
    }
  }
}

const certificate = {
  set(certificate) {
    if (certificate.id) {
      return {
        certificateId: certificate.id,
        title: certificate.empCertifications.title,
        organization: certificate.empCertifications.organization,
        completionDate: certificate.empCertifications.completionDate,
        location: certificate.empCertifications.location
      }
    } else {
      return {
        certificateId: certificate.certificateId,
        title: certificate.title,
        organization: certificate.organization,
        completionDate: certificate.completionDate,
        location: certificate.location
      }
    }
  },
  get() {
    return {
      certificateId: '',
      title: '',
      organization: '',
      completionDate: '',
      location: ''
    }
  }
}

const basicInfo = {
  get(){
    return {
      firstName: '',
      lastName: '',
      contactNumber: '',
      age: null,
      genderId: null,
      address: '',
      cityId: null,
      countryId: null,
      description: '',
      designationId: ''
    }
  },

  set(basicInfo) {
    return {
      firstName: basicInfo.firstName,
      lastName: basicInfo.lastName,
      contactNumber: basicInfo.contactNumber,
      age: basicInfo.age,
      genderId: basicInfo.genderId,
      address: basicInfo.address,
      cityId: basicInfo.cityId,
      countryId: basicInfo.countryId,
      description: basicInfo.description,
      designationId: basicInfo.designationId
    }
  }
}

const skill = {
  get(){
    return {
      id: null,
      skill: null,
    }
  },
  set(skill){
    return {
      id: skill.id,
      skill: skill.skill,
    }
  }
}

const gender = {
  get(){
    return {
      id: null,
      gender: null,
    }
  },
  set(gender){
    return {
      id: gender.id,
      gender: gender.gender,
    }
  }
}

const designation = {
  get(){
    return{
      id: null,
      designation: null,
    }
  },
  set(designation){
    return{
      id: designation.id,
      designation: designation.designation,
    }
  },
}

export {
  server,
  network_error,
  login,
  education,
  certificate,
  basicInfo,
  image,
  adminPanelTableTransition,
  skill,
  gender,
  experience,
  designation
}