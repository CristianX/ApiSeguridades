const crypto = require('crypto')

const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

const encrypt = text => {
    const iv = '8fdb43a3846a8807259fc76b4e54e4a6'

    const cipher = crypto.createCipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'))

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

    return  encrypted.toString('hex')
    
}

const decrypt = hash => {
    const iv = '8fdb43a3846a8807259fc76b4e54e4a6'
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'))

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()])

    return decrpyted.toString()
}

module.exports = {
    encrypt,
    decrypt
}