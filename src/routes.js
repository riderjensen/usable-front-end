import UsableForm from './components/UsableForm'
import UsableHome from './components/UsableHome'
import UsableContact from './components/UsableContact'
import UsableRelated from './components/UsableRelated'


export const routes = [
    { path: '', component: UsableHome },
    { path: '/new-test', component: UsableForm },
    { path: '/related', component: UsableRelated },
    { path: '/contact-us', component: UsableContact }
];