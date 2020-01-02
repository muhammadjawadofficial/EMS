import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//employee components
import login from '@/components/UserLogin/UserLogin'
import pageProfile from '@/components/Profile/AppProfile'
import list from '@/components/Developers/AppDevelopers'

import page404 from '@/components/common/The404'

//admin-side components
import adminPanel from '@/components/AdminPanel/AppAdminPanel'
import adminDashboard from '@/components/AdminPanel/AdminPanelDashboard/AdminPanelDashboard'
import employeeList from '@/components/AdminPanel/AdminPanelEmployees/EmployeeList'
import employeeEdit from '@/components/AdminPanel/AdminPanelEmployees/EmployeeEdit'
import educationList from '@/components/AdminPanel/AdminPanelEducation/EducationList'
import educationEdit from '@/components/AdminPanel/AdminPanelEducation/EducationEdit'
import certificateList from '@/components/AdminPanel/AdminPanelCertificates/CertificateList'
import designationList from '@/components/AdminPanel/AdminPanelDesignations/DesignationsList'
import skillList from '@/components/AdminPanel/AdminPanelSkills/SkillList'
import genderList from '@/components/AdminPanel/AdminPanelGenders/GendersList'
import countryList from '@/components/AdminPanel/AdminPanelCityCountry/CityCountryList'
import countryEdit from '@/components/AdminPanel/AdminPanelCityCountry/CityCountryEdit'


import {
  TokenService
} from '@/services/storage.service'

const router = new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login,
      meta: {
        public: true, // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/pageProfile',
      name: 'My Profile',
      component: pageProfile,
      meta: {
        onlyWhenEmployee: true,
        navigationLink: true
      }
    },
    {
      path: '/list',
      name: 'Developers',
      component: list,
      meta: {
        onlyWhenEmployee: true,
        navigationLink: true
      }
    },
    {
      path: '/admin/',
      component: adminPanel,
      meta: {
        onlyWhenAdmin: true,
        navigationLink: true
      },
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: adminDashboard
        },
        {
          path: 'listEmployees',
          name: 'listEmployees',
          component: employeeList
        },
        {
          path: 'listSkill',
          name: 'listSkill',
          component: skillList
        },
        {
          path: 'listEmployees/:id',
          name: 'editEmployees',
          component: employeeEdit
        },
        {
          path: 'listEducation',
          name: 'listEducation',
          component: educationList
        },
        {
          path: 'editEducation/:id',
          name: 'editEducation',
          component: educationEdit
        },
        {
          path: 'listCertificate',
          name: 'listCertificate',
          component: certificateList
        },
        {
          path: 'listGenders',
          name: 'listGenders',
          component: genderList
        },
        {
          path: 'listDesignations',
          name: 'listDesignations',
          component: designationList
        },
        {
          path: 'listCountry',
          name: 'listCountry',
          component: countryList
        },
        {
          path: 'editCountry/:id',
          name: 'editCountry',
          component: countryEdit
        },
        {
          path: '404',
          name: 'admin404',
          component: page404
        },
      ]
    },
    {
      path: '/404',
      name: '404',
      component: page404,
      meta: {
        public: true
      }
    },
    // {
    //   path: '*',
    //   redirect: '/404'
    // },
  ]
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  const onlyWhenAdmin = to.matched.some(record => record.meta.onlyWhenAdmin)
  const onlyWhenEmployee = to.matched.some(record => record.meta.onlyWhenEmployee)
  const loggedIn = !!TokenService.getToken();
  const loggedInAdmin = TokenService.getIsAdmin() == 'true' ? true : false;

  if (!isPublic && !loggedIn) {
    return next({
      path: '/',
      // query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    if(loggedInAdmin)
      return next('/admin')
    return next('/list')
  }

  if (!loggedInAdmin && onlyWhenAdmin) {
    return next('/404')
  }

  if(loggedInAdmin && onlyWhenEmployee)
  {
    return next('/admin/404')
  }
  next();
})

export default router;