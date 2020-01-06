import ApiService from '@/services/api.service'
const UserService = {
  
  //*************************************************************************************************//
  //******************************************COMMON API(s)******************************************//
  //*************************************************************************************************//
  
  //******USER LOGIN*******//
  async login(loginInformation) {
    return await ApiService.postCheck('employee/login', loginInformation)
  },
  //******USER LOGOUT******//
  async logout() {
    return await ApiService.post('employee/logout', {});
  },

  //USER DETAILS BY USER ID//
  async getUserDetails(userId) {
    return await ApiService.get(`employee/getEmployee/${userId}`)
  },
  
  //***ALL USERS DETAILS***//
  async getUsersDetails() {
    return await ApiService.get('employee/getEmpBasicInfo')
  },

  //ALL USERS DETAILS PAGINATED//
  async getUsersDetailsPaginated(pageNumber, pageSize) {
    return await ApiService.get(`employee/getEmployees?page=${pageNumber}&pageSize=${pageSize}`)
  },

  //CHANGE EMPLOYEE PROFILE PICTURE//
  async changeProfilePicture(imageData, userId) {
    return await ApiService.post(`employee/${userId}/uploadImage`, imageData)
  },

  //ALL AVAILABLE DESIGNATIONS//
  async getDesignations() {
    return await ApiService.get(`designation/getDesignations`)
  },

  //ALL AVAILABLE SKILLS//
  async getSkills() {
    return await ApiService.get(`skill/getSkills`)
  },

  //ALL AVAILABLE GENDERS//
  async getGenders() {
    return await ApiService.get('gender/getGenders')
  },
  
  //ALL AVAILABLE COUNTRIES//
  async getCountries() {
    return await ApiService.get('country/getCountries')
  },
  
  //ALL AVAILABLE CITIES AGAINST A COUNTRY ID//
  async getCities(countryId) {
    return await ApiService.get(`country/${countryId}/getCities`)
  },

  //ALL AVAILABLE CERTIFICATES//
  async getCertificates() {
    return await ApiService.get('certificate/getCertificates')
  },

  //ALL AVAILABLE DEGREE LEVELS//
  async getDegreeLevels() {
    return await ApiService.get('degreeLevel/getLevels')
  },

  //DEGREE DETAILS AGAINST DEGREE-LEVEL-ID//
  async getDegreeDetails(degreeLevelId) {
    return await ApiService.get(`degreeLevel/getLevel/${degreeLevelId}`)
  },
  
  //*************************************************************************************************//
  //**************************************EMPLOYEE SIDE API(s)***************************************//
  //*************************************************************************************************//

  //****************************************EMPLOYEE PROFILE*****************************************//

  //*********EDIT**********//
  async editProfile(updatedInfo, userId) {
    return await ApiService.patch(`employee/${userId}/updateBasicInfo`, updatedInfo)
  },

  //*****************************************EMPLOYEE SKILLS*****************************************//

  //*********EDIT**********//
  async editSkills(skills, userId) {
    return await ApiService.post(`employee/${userId}/editSkill`, skills)
  },

  //****************************************EMPLOYEE EDUCATION***************************************//

  //*********ADD***********//
  async addEducation(education, userId) {
    return await ApiService.post(`employee/${userId}/addDegree`, education)
  },
  //*********EDIT**********//
  async editEducation(updatedInfo, userId, employeeDegreeId) {
    return await ApiService.patch(`employee/${userId}/updateDegree/${employeeDegreeId}`, updatedInfo)
  },
  //********DELETE*********//
  async deleteEmployeeEducation(userId, educationId) {
    return await ApiService.delete(`employee/${userId}/deleteDegree/${educationId}`)
  },

  //**************************************EMPLOYEE CERTIFICATION*************************************//

  //*********ADD***********//
  async addCertificate(certification, userId) {
    return await ApiService.post(`employee/${userId}/addCertificate`, certification)
  },
  //*********EDIT**********//
  async editCertification(updatedInfo, userId, certificateId) {
    return await ApiService.patch(`employee/${userId}/updateCertificate/${certificateId}`, updatedInfo)
  },
  //********DELETE*********//
  async deleteEmployeeCertification(userId, certificationId) {
    return await ApiService.delete(`employee/${userId}/deleteCertificate/${certificationId}`)
  },

  //***************************************EMPLOYEE EXPERIENCE***************************************//
  
  //*********ADD***********//
  async addEmployeeExperience(experience, userId) {
    return await ApiService.post(`employee/${userId}/addWorkExperience`, experience)
  },
  //*********EDIT**********//
  async editEmployeeExperience(experience, userId, workExperienceId) {
    return await ApiService.patch(`employee/${userId}/updateWorkExperience/${workExperienceId}`, experience)
  },
  //********DELETE*********//
  async deleteEmployeeExperience(userId, experienceId) {
    return await ApiService.delete(`employee/${userId}/deleteWorkExperience/${experienceId}`)
  },

  //*************************************************************************************************//
  //****************************************ADMIN SIDE API(s)****************************************//
  //*************************************************************************************************//
  
  //*******************************************CHART DATA********************************************//
  
  //*********SKILL*********//
  async getSkillsChartData() {
    return await ApiService.get(`employee/getEmpSkillCount`);
  },

  //******DESIGNATION******//
  async getDesignationChartData() {
    return await ApiService.get(`employee/getEmpDesignationCount`);
  },

  //***************************************AVAILABLE DESIGNATIONS************************************//
  
  //*********ADD***********//
  async addDesignation(designation) {
    return await ApiService.post(`designation/addDesignation`, {
      designation: designation
    })
  },
  //********UPDATE*********//
  async updateDesignation(designationId, designation) {
    return await ApiService.patch(`designation/updateDesignation/${designationId}`, {
      designation: designation
    })
  },
  //********DELETE*********//
  async deleteDesignation(designationId) {
    return await ApiService.delete(`designation/deleteDesignation/${designationId}`)
  },

  //****************************************AVAILABLE COUNTRIES**************************************//
  
  //*********ADD***********//
  async addCountryWithCities(countryWithCities) {
    return await ApiService.post(`country/addCities`, countryWithCities)
  },
  //*********ADD***********//
  async addACityToExistingCountry(cityObject) {
    return await ApiService.post(`city/addCity`, cityObject)
  },
  //********UPDATE*********//
  async updateCountry(countryObject) {
    return await ApiService.patch(`country/updateCountry/${countryObject.id}`, countryObject)
  },
  //********DELETE*********//
  async deleteCountry(countryId) {
    return await ApiService.delete(`country/deleteCountry/${countryId}`)
  },

  //*****************************************AVAILABLE GENDERS***************************************//
  
  //*********ADD***********//
  async addGender(newGender) {
    return await ApiService.post(`gender/addGender`, {
      gender: newGender
    })
  },
  //********UPDATE*********//
  async updateGender(genderName, genderId) {
    return await ApiService.patch(`gender/updateGender/${genderId}`, {
      gender: genderName
    })
  },
  //********DELETE*********//
  async deleteGender(genderId) {
    return await ApiService.delete(`gender/deleteGender/${genderId}`)
  },

  //*****************************************AVAILABLE DEGREES***************************************//
  
  //*********ADD***********//
  async addDegreesWithLevel(levelWithDegrees) {
    return await ApiService.post(`degreeLevel/addWithDegree`, levelWithDegrees)
  },
  //*********ADD***********//
  async addADegreeToExistingLevel(degreeObject) {
    return await ApiService.post(`degree/addDegree`, degreeObject)
  },
  //********UPDATE*********//
  async updateDegree(degreeLevelDetails) {
    return await ApiService.patch(`degreeLevel/updateLevel/${degreeLevelDetails.id}`, degreeLevelDetails)
  },
  //********DELETE*********//
  async deleteDegree(degreeLevelId) {
    return await ApiService.delete(`degreeLevel/deleteLevel/${degreeLevelId}`)
  },

  //***************************************AVAILABLE CERTIFICATES************************************//
  
  //*********ADD***********//
  async addCertificateAdmin(certificateName) {
    return await ApiService.post(`certificate/addCertificate`, {
      certification: certificateName
    })
  },
  //********UPDATE*********//
  async updateCertificate(certificateId, certificateName) {
    return await ApiService.patch(`certificate/updateCertificate/` + certificateId, {
      certification: certificateName
    })
  },
  //********DELETE*********//
  async deleteCertificate(certificateId) {
    return await ApiService.delete(`certificate/deleteCertificate/${certificateId}`)
  },
  
  //******************************************AVAILABLE SKILLS***************************************//
  
  //*********ADD***********//
  async addSkillAdmin(newSkill) {
    return await ApiService.post(`skill/addSkill`, {
      skill: newSkill
    })
  },
  //********UPDATE*********//
  async updateSkill(skillName, skillId) {
    return await ApiService.patch(`skill/updateSkill/${skillId}`, {
      skill: skillName
    })
  },
  //********DELETE*********//
  async deleteSkill(skillId) {
    return await ApiService.delete(`skill/deleteSkill/${skillId}`)
  },
  
  //*********************************************EMPLOYEES*******************************************//
  
  //*********ADD***********//
  async registerEmployee(userDetails) {
    return await ApiService.post(`employee/signUp`, userDetails)
  },
  //********DELETE*********//
  async deleteEmployee(employeeId) {
    return await ApiService.delete(`employee/${employeeId}/deleteEmployee`)
  },
  //***UPDATE CREDENTIALS**//
  async updateCredentials(credentials, userId) {
    doconsole(credentials)
    return await ApiService.patch(`employee/${userId}/updateLoginCredentials`, credentials)
  }
}
export default UserService