import React, { useState, useContext } from 'react'
import { ApiContext } from './ApiContext'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import RedditPostCard from './RedditPostCard'

import axios from 'axios'
import CategoryCarousel from './CategoryCarousel'

const Home = () => {

  const [searchValue, setSearchValue] = useState('')
  const [redditPosts, setRedditPosts] = useState([])
  const redditToken = useContext(ApiContext)

  const handleSearch = () => {
    axios.get(`https://oauth.reddit.com/search?q=${searchValue}`,
      {
        headers: { 'Authorization': `Bearer ${redditToken}` }
      })
      .then(res => {
        setRedditPosts(res.data.data.children)
        console.log(res.data.data.children)
      })
      .catch(err => console.log(err))
  }

  return <main>
    <TextField
      value={searchValue}
      placeholder="Search..."
      variant="outlined"
      onChange={e => setSearchValue(e.target.value)}
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <IconButton
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
      }}
    />
    <CategoryCarousel/>
    {redditPosts.map((post, i) => <RedditPostCard key={i} post={post.data} />)}
  </main>

}

export default Home