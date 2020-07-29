import React, { useState, useContext, useEffect } from 'react'
import { ApiContext } from './ApiContext'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import RedditPostCard from './RedditPostCard'
import LoadingCard from './LoadingCard'

import axios from 'axios'
import CategoryCarousel from './CategoryCarousel'

const Home = () => {

  const [searchValue, setSearchValue] = useState('')
  const [category, setCategory] = useState('hot')
  const [redditPosts, setRedditPosts] = useState([])
  const redditToken = useContext(ApiContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`https://oauth.reddit.com/${category}`,
      {
        headers: { 'Authorization': `Bearer ${redditToken}` }
      })
      .then(res => {
        setRedditPosts(res.data.data.children)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [category, redditToken])

  const handleCategory = (e) => setCategory(e.target.value)

  const handleSearch = () => {
    setLoading(true)
    axios.get(`https://oauth.reddit.com/search?q=${searchValue}`,
      {
        headers: { 'Authorization': `Bearer ${redditToken}` }
      })
      .then(res => {
        setRedditPosts(res.data.data.children)
        setLoading(false)
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
    <CategoryCarousel handleCategory={handleCategory}/>
    {loading ?
      Array(6).fill(0).map((el, i) => <LoadingCard key={i} />) :
      redditPosts.map((post, i) => <RedditPostCard key={i} post={post.data} loading={loading} />)
    }
  </main>

}

export default Home


