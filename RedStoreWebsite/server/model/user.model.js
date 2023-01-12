



class User {


    constructor(usernameObject) {
        this.user = usernameObject
    }

    addUsernameMetada(newAuthenticador) {
        this.user.authenticator.push(newAuthenticador)
    }
    findUsernameMetadaBySecret(secretId) {
        return this.user.authenticator.find((data) => {
            return data.authenticator.secret == secretId
        })
    }
    updateUsernameMetadaBySecret(secretId) {

    }
    deleteUsernameMetadaBySecretId(secretId) {
        let indexSearch = this.user.authenticator.indexOf((object) => {
            return object.secret == secretId
        })
        this.user.authenticator.splice(indexSearch, 1);

    }
}

// How to update the QR for a user without being affected 
// the use of the app 
//TODO: 
