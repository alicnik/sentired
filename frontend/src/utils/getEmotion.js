const getEmotion = (sentimentScore) => {
  if (sentimentScore >= 1.5) {
    return 'ecstatic'
  } else if (sentimentScore > 0.5) {
    return 'happy'
  } else if (sentimentScore > -0.5) {
    return 'neutral'
  } else if (sentimentScore <= -1.5) {
    return 'angry'
  } else if (sentimentScore <= -0.5) {
    return 'sad' 
  }
}

export default getEmotion