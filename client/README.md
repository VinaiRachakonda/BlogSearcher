Light wrapper over GPT-3 semantic search that let's you ask contextual questions across different blogs.

Some interesting blogs:
* http://www.aaronsw.com/2002/feeds/pgessays.rss (Paul Graham Blog)
* http://shyamsankar.com/posts.atom (Shyam Sankar Blog)
* http://blog.samaltman.com/posts.atom (Sam Altman Blog)

Some interesting contexual questions:
* How do I become successful?
* How do I became a better founder?
* What is the meaning of life?

# To run client
`npm install`
`npm start`

# To run server
`python3 -m venv env`
`source env/bin/activate`
`pip install -r requirements.txt`
`python3 test.py`

You'll need to provide your own openai api key
