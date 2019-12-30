import ApiService from '@/services/api.service'
import {
  TokenService
} from '@/services/storage.service'
import Vue from 'vue'
import router from '@/router'
Vue.use(router)
// import {
//   server
// } from '@/constants'

const server = process.env.NODE_SERVER

const UserService = {
  //edited
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
    // try {
    //   const response = await ApiService.post(server + 'auth/signup', userInformation)
    //   return response
    // } catch (e) {
    //   // doconsole(e)
    //   // doconsole(e.message)
    //   // doconsole(e.response)
    //   return e.response
    // }
  },

  //edited
  async getUserDetails(userId) {
    return await ApiService.get(`employee/getEmployee/${userId}`)
    // try {
    //   const response = await ApiService.get(`${server}employee/getEmployee/${userId}`)
    //   return response
    // } catch (e) {
    //   Vue.toasted.global.error()
    //   router.push({
    //     path: '/404'
    //   })
    //   return e.response
    // }
  },

  //edited
  async editProfile(updatedInfo, userId) {
    return await ApiService.patch(`employee/${userId}/updateBasicInfo`, updatedInfo)
    // try {
    //   const response = await ApiService.patch(server + `employee/${TokenService.getCurrentEmployeeId()}/updateBasicInfo`, updatedInfo)
    //   Vue.toasted.global.update()
    //   return response
    // } catch (e) {
    //   Vue.toasted.global.error()
    //   return e.response
    // }
  },

  async editSkills(skills, userId) {
    return await ApiService.post(`employee/${userId}/editSkill`, skills)
    // try {
    //   const response = await ApiService.patch(server + 'Users/editProfile/' + userId, skills)
    //   return response
    // } catch (e) {
    //   doconsole(e.response)
    //   return e.response
    // }
  },

  //edited
  async editEducation(updatedInfo, userId, employeeDegreeId) {
    return await ApiService.patch(`employee/${userId}/updateDegree/${employeeDegreeId}`, updatedInfo)
    // try {
    //   const response = await ApiService.patch(server + `employee/${userId}/updateDegree/${employeeDegreeId}`, updatedInfo)
    //   doconsole(response.data.success)
    //   return response.data.success
    // } catch (error) {
    //   doconsole(error.response)
    //   return error.response.data.success
    // }
  },

  async editCertification(updatedInfo, userId, certificateId) {
    return await ApiService.patch(`employee/${userId}/updateCertificate/${certificateId}`, updatedInfo)
    // try {
    //   const response = await ApiService.patch(server + 'Users/editProfile/' + userId, certifications)
    //   return response
    // } catch (e) {
    //   doconsole(e.response)
    //   return e.response
    // }
  },

  //edited
  async addCertificate(certification, userId) {
    return await ApiService.post(`employee/${userId}/addCertificate`, certification)
    // try {
    //   const response = await ApiService.post(server + `employee/${userId}/addCertificate`, certification)
    //   doconsole(response)
    //   return response
    // } catch (e) {
    //   doconsole('error')
    //   doconsole(e.response)
    //   return e.response
    // }
  },

  //edited
  async addEducation(education, userId) {
    return await ApiService.post(`employee/${userId}/addDegree`, education)
    // try {
    //   const response = await ApiService.post(server + `employee/${userId}/addDegree`, education)
    //   doconsole(response.data)
    //   return response.data
    // } catch (e) {
    //   doconsole('error')
    //   doconsole(e.response.data)
    //   return e.response.data.success
    // }
  },

  async addSkill(skill) {
    return await ApiService.put('Users/addSkills', {
      skills: skill.trim()
    })
    // try {
    //   const response = await ApiService.put(server + 'Users/addSkills', {
    //     skills: skill.trim()
    //   })
    //   doconsole(response)
    //   return response
    // } catch (e) {
    //   doconsole('error')
    //   doconsole(e.response)
    //   return e.response
    // }
  },

  //edited all
  // async getUsersDetails() {
  //   try {
  //     const response = await ApiService.get(server + 'employee/getEmpBasicInfo')
  //     return response
  //   } catch (e) {
  //     return e.response
  //   }
  // },
  async getGenders() {
    return await ApiService.get('gender/getGenders')
    // try {
    //   const response = await ApiService.get(server + 'gender/getGenders')
    //   // doconsole(response)
    //   return response.data.genders
    // } catch (e) {
    //   doconsole('error occured while fetching recoreds')
    //   return e.response
    // }
  },

  async updateGender(genderName, genderId){
    return await ApiService.patch(`gender/updateGender/${genderId}`, { gender: genderName})
  },

  async getCountries() {
    return await ApiService.get('country/getCountries')
    // try {
    //   const response = await ApiService.get(server + 'country/getCountries')
    //   // doconsole(response.data.countries)
    //   return response.data.countries
    // } catch (error) {
    //   doconsole('error occured while fetching recoreds')
    //   return error.response
    // }
  },

  async getCities(countryId) {
    return await ApiService.get(`country/${countryId}/getCities`)
    // try {
    //   const response = await ApiService.get(`${server}country/${countryId}/getCities`)
    //   // doconsole(response.data.countries.cities)
    //   return response.data.countries.cities
    // } catch (error) {
    //   doconsole('error occured while fetching recoreds')
    //   return error.response
    // }
  },

  async getCertificates() {
    return await ApiService.get('certificate/getCertificates')
    // try {
    //   const response = await ApiService.get(server + 'certificate/getCertificates')
    //   return response
    // } catch (error) {
    //   return error.response
    // }
  },

  async getDegreeLevels() {
    return await ApiService.get('degreeLevel/getLevels')
    // try {
    //   const response = await ApiService.get(server + 'degreeLevel/getLevels')
    //   return response
    // } catch (error) {
    //   return error.response
    // }
  },

  async getDegreeTypes(degreeLevelId) {
    return await ApiService.get(`degreeLevel/getLevel/${degreeLevelId}`)
    // try {
    //   const response = await ApiService.get(server + `degreeLevel/${degreeLevelId}/getDegree`)
    //   doconsole(response)
    //   return response.data.degrees
    // } catch (error) {
    //   return error.response
    // }
  },

  async getDegreeDetails(degreeLevelId) {
    return await ApiService.get(`degreeLevel/getLevel/${degreeLevelId}`)
    // try {
    //   const response = await ApiService.get(server + `degreeLevel/getLevel/${degreeLevelId}`)
    //   doconsole(response)
    //   return response
    // } catch (error) {
    //   return error.response
    // }
  },

  async addDegreesWithLevel(levelWithDegrees){
    return await ApiService.post(`degreeLevel/addWithDegree`, levelWithDegrees)
  },

  async addADegreeToExistingLevel(degreeObject) {
    return await ApiService.post(`degree/addDegree`, degreeObject)
    // try {
    //   const response = await ApiService.post(server + `degree/addDegree`,degreeObject)
    //   return response
    // } catch (error) {
    //   return error.response
    // }
  },

  async getSkills() {
    return await ApiService.get(`skill/getSkills`)
    // try {
    //   const response = await ApiService.get(server + `skill/getSkills`)
    //   return response
    // } catch (error) {
    //   return error.response
    // }
  },

  async updateCertificate(certificateId, certificateName) {
    return await ApiService.patch(`certificate/updateCertificate/` + certificateId, {
      certification: certificateName
    })
    // try {
    //   const response = await ApiService.patch(server + `certificate/updateCertificate/` + certificateId, {
    //     certificateName: certificateName
    //   })
    //   return response
    // } catch (error) {
    //   return error.response
    // }
  },

  async addCertificateAdmin(certificateName){
    return await ApiService.post(`certificate/addCertificate`, { certification: certificateName})
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

  async registerEmployee(userDetails){
    return await ApiService.post(`employee/signUp`, userDetails)
  },

  
  async addSkillAdmin(newSkill){
    return await ApiService.post(`skill/addSkill`, {skill: newSkill})
  },
  
  async addGender(newGender){
    return await ApiService.post(`gender/addGender`, {gender: newGender})
  },
  
  async deleteEmployee(employeeId){
    return await ApiService.delete(`employee/${employeeId}/deleteEmployee`)
  },

  async deleteSkill(skillId){
    return await ApiService.delete(`skill/deleteSkill/${skillId}`)
  },

  async deleteDegree(degreeLevelId){
    return await ApiService.delete(`degreeLevel/deleteLevel/${degreeLevelId}`)
  },

  async deleteCertificate(certificateId){
    return await ApiService.delete(`certificate/deleteCertificate/${certificateId}`)
  },

  async deleteGender(genderId){
    return await ApiService.delete(`gender/deleteGender/${genderId}`)
  },

  async deleteEducation(employeeId, empDegreeId){
    return await ApiService.delete(`employee/${employeeId}/deleteDegree/${empDegreeId}`)
  },

  async deleteCertification(employeeId, empCertificationId){
    return await ApiService.delete(`employee/${employeeId}/deleteCertificate/${empCertificationId}`)
  },

  async getSkillsChartData(){
    return await ApiService.get(`employee/getEmpSkillCount`);
  },

  async getSkillsDesignationData(){
    return await ApiService.get(`employee/getEmpDesignationCount`);
  },

  async addEmployeeExperience(experience, userId){
    return await ApiService.post(`employee/${userId}/addWorkExperience`, experience)
  },

  async editEmployeeExperience(experience, userId, workExperienceId){
    return await ApiService.patch(`employee/${userId}/updateWorkExperience/${workExperienceId}`, experience)
  },
  
  async getDesignations(){
    return await ApiService.get(`designation/getDesignations`)
  },

  async deleteEmployeeEducation(userId, educationId){
    return await ApiService.delete(`employee/${userId}/deleteDegree/${educationId}`)
  },

  async deleteEmployeeCertification(userId, certificationId){
    return await ApiService.delete(`employee/${userId}/deleteCertificate/${certificationId}`)
  },

  async deleteEmployeeExperience(userId, experienceId){
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