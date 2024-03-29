export class API {
    // static getCatPetDonDetails() {
    //     return fetch('http://127.0.0.1:8000/api/cpd/', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(resp => resp.json())
    //     // .then(resp => console.log(resp))
    //     // .catch(err => console.log(err))
    // }
    
    
    static getPetDetails() {
        return fetch('http://127.0.0.1:8000/api/pet_details/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        // .then(resp => console.log(resp))
        // .catch(err => console.log(err))
    }

    static postPetDetails(body) {
        return fetch('http://127.0.0.1:8000/api/pet_details/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json() )
    }
    static deletePetDetails(body) {
        return fetch('http://127.0.0.1:8000/api/pet_details/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json() )
    }
    static getCategory() {
        return fetch('http://127.0.0.1:8000/api/category/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        // .then(resp => console.log(resp))
        // .catch(err => console.log(err))
    }

    static postCategory(body) {
        return fetch('http://127.0.0.1:8000/api/category/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json() )
        // .then(res => console.log(res))
    }

    static getLoginDetails() {
        return fetch('http://127.0.0.1:8000/api/login_details/', {
        // return fetch('https://pet-adoption-application.onrender.com/api/login_details/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        // .then(resp => console.log(resp))
        // .catch(err => console.log(err))
    }

    static postLoginDetails(body) {
        return fetch('http://127.0.0.1:8000/api/login_details/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json() )
    }
    static putLoginDetails(body) {
        return fetch('http://127.0.0.1:8000/api/login_details/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json() )
    }
    static getAdoptions() {
        return fetch('http://127.0.0.1:8000/api/adoption_details/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        // .then(resp => console.log(resp))
        // .catch(err => console.log(err))
    }
    static postAdoptionDetails(body) {
        return fetch('http://127.0.0.1:8000/api/adoption_details/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json() )
    }
    static getDonations() {
        return fetch('http://127.0.0.1:8000/api/donations/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        // .then(resp => console.log(resp))
        // .catch(err => console.log(err))
    }
}