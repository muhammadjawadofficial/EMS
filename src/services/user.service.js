import Vue from 'vue'

import router from '@/router'
Vue.use(router)

import ApiService from '@/services/api.service'

const UserService = {
  async login(loginInformation) {
    return await ApiService.postCheck('employee/login', loginInformation)
  },
  async logout() {
    return await ApiService.post('employee/logout', {});
  },
  async addUser(firstName, lastName, email, password) {
    const userInformation = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
    return await ApiService.post('auth/signup', userInformation)
  },
  async getUserDetails(userId) {
    return await ApiService.get(`employee/getEmployee/${userId}`)
  },
  async editProfile(updatedInfo, userId) {
    return await ApiService.patch(`employee/${userId}/updateBasicInfo`, updatedInfo)
  },
  async editSkills(skills, userId) {
    return await ApiService.post(`employee/${userId}/editSkill`, skills)
  },
  async editEducation(updatedInfo, userId, employeeDegreeId) {
    return await ApiService.patch(`employee/${userId}/updateDegree/${employeeDegreeId}`, updatedInfo)
  },
  async editCertification(updatedInfo, userId, certificateId) {
    return await ApiService.patch(`employee/${userId}/updateCertificate/${certificateId}`, updatedInfo)
  },
  async addCertificate(certification, userId) {
    return await ApiService.post(`employee/${userId}/addCertificate`, certification)
  },
  async addEducation(education, userId) {
    return await ApiService.post(`employee/${userId}/addDegree`, education)
  },
  async addSkill(skill) {
    return await ApiService.put('Users/addSkills', {
      skills: skill.trim()
    })
  },
  async getGenders() {
    return await ApiService.get('gender/getGenders')
  },
  async updateGender(genderName, genderId) {
    return await ApiService.patch(`gender/updateGender/${genderId}`, {
      gender: genderName
    })
  },
  async getCountries() {
    return await ApiService.get('country/getCountries')
  },
  async getCities(countryId) {
    return await ApiService.get(`country/${countryId}/getCities`)
  },
  async getCertificates() {
    return await ApiService.get('certificate/getCertificates')
  },
  async getDegreeLevels() {
    return await ApiService.get('degreeLevel/getLevels')
  },
  async getDegreeTypes(degreeLevelId) {
    return await ApiService.get(`degreeLevel/getLevel/${degreeLevelId}`)
  },
  async getDegreeDetails(degreeLevelId) {
    return await ApiService.get(`degreeLevel/getLevel/${degreeLevelId}`)
  },
  async addDegreesWithLevel(levelWithDegrees) {
    return await ApiService.post(`degreeLevel/addWithDegree`, levelWithDegrees)
  },
  async addADegreeToExistingLevel(degreeObject) {
    return await ApiService.post(`degree/addDegree`, degreeObject)
  },
  async getSkills() {
    return await ApiService.get(`skill/getSkills`)
  },
  async updateCertificate(certificateId, certificateName) {
    return await ApiService.patch(`certificate/updateCertificate/` + certificateId, {
      certification: certificateName
    })
  },
  async addCertificateAdmin(certificateName) {
    return await ApiService.post(`certificate/addCertificate`, {
      certification: certificateName
    })
  },
  async getUsersDetails() {
    return await ApiService.get('employee/getEmpBasicInfo')
  },
  async getUsersDetailsPaginated(pageNumber, pageSize) {
    return await ApiService.get(`employee/getEmployees?page=${pageNumber}&pageSize=${pageSize}`)
  },
  async updateCredentials(credentials, userId) {
    return await ApiService.patch(`employee/${userId}/updateLoginCredentials`, credentials)
  },
  async updateDegree(degreeLevelDetails) {
    return await ApiService.patch(`degreeLevel/updateLevel/${degreeLevelDetails.id}`, degreeLevelDetails)
  },
  async changeProfilePicture(imageData, userId) {
    return await ApiService.post(`employee/${userId}/uploadImage`, imageData)
  },
  async updateSkill(skillName, skillId) {
    return await ApiService.patch(`skill/updateSkill/${skillId}`, {
      skill: skillName
    })
  },
  async registerEmployee(userDetails) {
    return await ApiService.post(`employee/signUp`, userDetails)
  },
  async addSkillAdmin(newSkill) {
    return await ApiService.post(`skill/addSkill`, {
      skill: newSkill
    })
  },
  async addGender(newGender) {
    return await ApiService.post(`gender/addGender`, {
      gender: newGender
    })
  },
  async deleteEmployee(employeeId) {
    return await ApiService.delete(`employee/${employeeId}/deleteEmployee`)
  },
  async deleteSkill(skillId) {
    return await ApiService.delete(`skill/deleteSkill/${skillId}`)
  },
  async deleteDegree(degreeLevelId) {
    return await ApiService.delete(`degreeLevel/deleteLevel/${degreeLevelId}`)
  },
  async deleteCertificate(certificateId) {
    return await ApiService.delete(`certificate/deleteCertificate/${certificateId}`)
  },
  async deleteGender(genderId) {
    return await ApiService.delete(`gender/deleteGender/${genderId}`)
  },
  async deleteEducation(employeeId, empDegreeId) {
    return await ApiService.delete(`employee/${employeeId}/deleteDegree/${empDegreeId}`)
  },
  async deleteCertification(employeeId, empCertificationId) {
    return await ApiService.delete(`employee/${employeeId}/deleteCertificate/${empCertificationId}`)
  },
  async getSkillsChartData() {
    return await ApiService.get(`employee/getEmpSkillCount`);
  },
  async getSkillsDesignationData() {
    return await ApiService.get(`employee/getEmpDesignationCount`);
  },
  async addEmployeeExperience(experience, userId) {
    return await ApiService.post(`employee/${userId}/addWorkExperience`, experience)
  },
  async editEmployeeExperience(experience, userId, workExperienceId) {
    return await ApiService.patch(`employee/${userId}/updateWorkExperience/${workExperienceId}`, experience)
  },
  async getDesignations() {
    return await ApiService.get(`designation/getDesignations`)
  },
  async deleteEmployeeEducation(userId, educationId) {
    return await ApiService.delete(`employee/${userId}/deleteDegree/${educationId}`)
  },
  async deleteEmployeeCertification(userId, certificationId) {
    return await ApiService.delete(`employee/${userId}/deleteCertificate/${certificationId}`)
  },
  async deleteEmployeeExperience(userId, experienceId) {
    return await ApiService.delete(`employee/${userId}/deleteWorkExperience/${experienceId}`)
  },
  async addDesignation(designation) {
    return await ApiService.post(`designation/addDesignation`, {
      designation: designation
    })
  },
  async updateDesignation(designationId, designation) {
    return await ApiService.patch(`designation/updateDesignation/${designationId}`, {
      designation: designation
    })
  },
  async deleteDesignation(designationId) {
    return await ApiService.delete(`designation/deleteDesignation/${designationId}`)
  }
}
export default UserService