import { createStore } from 'vuex'
import user, {  UserStoreProps } from './user'


export interface GloablDataProps {
    user: UserStoreProps,
}
const store = createStore({
    modules: {
        user,
    },
})

export default store