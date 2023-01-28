import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors({
    origin: '*'      // This option says it dosent care where the request originated from
}))
app.use(express.json())

app.get('/', async (req, res) => {   // This is just in place for use as a test and can be removed
    res.status(200).send({
        message: 'Whats Up',
    })
})

app.post('/', async (req, res) => {
    try {

        const responce = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.prompt,
            temperature: 0,
            max_tokens: 128,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty:0,
        });

        res.status(200).send({
            bot: responce.data.choices[0].text
        });
    } catch (error) {
      console.log(error);
      res.status(500).send(error || 'Something went wrong');
    }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
