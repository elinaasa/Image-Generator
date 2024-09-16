import {Request, Response, NextFunction} from 'express';
import fetchData from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const commentPost = async (
  req: Request<{}, {}, {text: string}>,
  res: Response<{response: string}>,
  next: NextFunction
) => {
  try {
    const {text} = req.body;

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an 18th-century English aristocrat. Respond in a sarcastic and hostile manner.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      max_tokens: 150,
    };

    const response = await fetchData(
      process.env.OPENAI_API_URL + '/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    const aiResponse = result.choices[0].message.content;

    res.json({response: aiResponse});
  } catch (error) {
    next(error);
  }
};

export {commentPost};
