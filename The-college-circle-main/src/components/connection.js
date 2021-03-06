import axios from 'axios'

const api = axios.create({baseURL:"http://localhost:3001/database"})

export const collegeregistration = (payload)=>api.post('/collegeregistrationform',payload)
export const staffregistration = (payload)=>api.post('/staffregistrationform',payload)
export const getcollegeregistrationform = (id) => api.get(`/getcollegeregistrationform/${id}`)
export const deletecollegeregistration = (id) => api.delete(`/deletecollegeregistration/${id}`)
export const approvecollegeregistration = (id) => api.get(`/approvecollegeregistration/${id}`)
export const participantregistration = (payload)=>api.post('/participantregistration',payload)
export const getparticipantregistrationform = (id) => api.get(`/getparticipantregistration/${id}`)
export const deleteparticipantRegistration = (id) => api.delete(`/deleteparticipantRegistration/${id}`)
export const approveparticipantRegistration = (id) => api.get(`/approveparticipantRegistration/${id}`)
export const login = (payload) =>api.post('/login',payload)
export const addpost = (payload) =>api.post('/addpost',payload)
export const getpost = (name) => api.get(`/getpost/${name}`)
export const addcompany = (payload) =>api.post('/addcompany',payload, {
    headers: {
        'content-type': 'multipart/form-data',
    },
})
export const getcompany = (name) => api.get(`/getcompany/${name}`)
export const addalumni = (payload) =>api.post('/addalumni',payload, {
    headers: {
        'content-type': 'multipart/form-data',
    },
})
export const getalumni = (name) => api.get(`/getalumni/${name}`)
export const addclub = (payload) =>api.post('/addclub',payload, {
    headers: {
        'content-type': 'multipart/form-data',
    },
})
export const getclub = (name) => api.get(`/getclub/${name}`)
export const getClubById = (name)=> api.get(`/getClubById/${name}`)
export const addClubevent = (payload) =>api.post('/addClubevent',payload)
export const getevent = (name) => api.get(`/getevent/${name}`)
export const getcollegename = () => api.get('/getcollegename')