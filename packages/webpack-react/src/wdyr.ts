import React from 'react'

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  console.log(whyDidYouRender)
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    // logOnDifferentValues: true,
    // logOwnerReasons: false,
    trackHooks: true,
  })
}
