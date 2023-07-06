import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()
const router = express.Router()

const configurate = new Configuration({
    apiKey:'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'
})
const openai = new OpenAIApi(configurate)

router.route('/').get((req, res) => {
    res.send('Hello from DALL-E')
})

router.post('/', async (req, res) => {
    try {
        const {prompt} = req.body
        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json'
        })

        const image=aiResponse.data.data[0].b64_json

        res.status(200).json({photo:image})

    } catch (error) {
     console.log(error)   
     res.status(500).send(error?.response.data.error.message)
    }
})

export default router