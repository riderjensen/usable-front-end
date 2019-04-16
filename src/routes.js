import UsableHome from './components/UsableHome'
import UsableRelated from './components/UsableRelated'
import UsableOne from './components/UsableOne'


export const routes = [
    { path: '', component: UsableHome },
    { path: '/related', component: UsableRelated },
    { path: '/:id', component: UsableOne },
];